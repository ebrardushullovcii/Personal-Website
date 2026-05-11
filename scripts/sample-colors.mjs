import { readFileSync } from "node:fs";
import zlib from "node:zlib";

function readPng(file) {
  const buffer = readFileSync(file);
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const chunks = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const start = offset + 8;
    const end = start + length;
    if (type === "IHDR") {
      width = buffer.readUInt32BE(start);
      height = buffer.readUInt32BE(start + 4);
      colorType = buffer[start + 9];
    }
    if (type === "IDAT") chunks.push(buffer.subarray(start, end));
    if (type === "IEND") break;
    offset = end + 4;
  }
  const bpp = colorType === 2 ? 3 : 4;
  const stride = width * bpp;
  const raw = zlib.inflateSync(Buffer.concat(chunks));
  const rows = [];
  let pos = 0;
  let prev = Buffer.alloc(stride);
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    return pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y += 1) {
    const filter = raw[pos++];
    const cur = Buffer.from(raw.subarray(pos, pos + stride));
    pos += stride;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? cur[x - bpp] : 0;
      const up = prev[x];
      const ul = x >= bpp ? prev[x - bpp] : 0;
      if (filter === 1) cur[x] = (cur[x] + left) & 255;
      else if (filter === 2) cur[x] = (cur[x] + up) & 255;
      else if (filter === 3) cur[x] = (cur[x] + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) cur[x] = (cur[x] + paeth(left, up, ul)) & 255;
    }
    rows.push(cur);
    prev = cur;
  }
  return { width, height, bpp, rows };
}

const points = [
  [10, 10], [100, 100], [300, 100], [1000, 100], [500, 500], [1000, 1300],
  [289, 89], [289, 209], [656, 428], [277, 892], [277, 1190],
];

for (const file of process.argv.slice(2)) {
  const image = readPng(file);
  console.log(file, image.width, image.height);
  for (const [x, y] of points) {
    const i = x * image.bpp;
    const row = image.rows[y];
    console.log(`${x},${y}`, [row[i], row[i + 1], row[i + 2]]);
  }
}
