import { readFileSync } from "node:fs";

const file = process.argv[2];
const threshold = Number(process.argv[3] ?? 75);
const minCount = Number(process.argv[4] ?? 500);

if (!file) {
  console.error("Usage: node scripts/analyze-image.mjs <png> [threshold] [minCount]");
  process.exit(1);
}

const buffer = readFileSync(file);
if (buffer.toString("ascii", 1, 4) !== "PNG") {
  console.error("Only PNG files are supported.");
  process.exit(1);
}

let offset = 8;
let width = 0;
let height = 0;
const chunks = [];

while (offset < buffer.length) {
  const length = buffer.readUInt32BE(offset);
  const type = buffer.toString("ascii", offset + 4, offset + 8);
  const dataStart = offset + 8;
  const dataEnd = dataStart + length;
  if (type === "IHDR") {
    width = buffer.readUInt32BE(dataStart);
    height = buffer.readUInt32BE(dataStart + 4);
    const bitDepth = buffer[dataStart + 8];
    const colorType = buffer[dataStart + 9];
    if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
      console.error(`Unsupported PNG format: bitDepth=${bitDepth} colorType=${colorType}. Expected RGB8 or RGBA8.`);
      process.exit(1);
    }
    globalThis.__pngColorType = colorType;
  }
  if (type === "IDAT") chunks.push(buffer.subarray(dataStart, dataEnd));
  if (type === "IEND") break;
  offset = dataEnd + 4;
}

const zlib = await import("node:zlib");
const raw = zlib.inflateSync(Buffer.concat(chunks));
const bytesPerPixel = globalThis.__pngColorType === 2 ? 3 : 4;
const stride = width * bytesPerPixel;
const rows = [];
let pos = 0;
let prev = Buffer.alloc(stride);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < height; y += 1) {
  const filter = raw[pos];
  pos += 1;
  const cur = Buffer.from(raw.subarray(pos, pos + stride));
  pos += stride;
  for (let x = 0; x < stride; x += 1) {
    const left = x >= bytesPerPixel ? cur[x - bytesPerPixel] : 0;
    const up = prev[x];
    const upLeft = x >= bytesPerPixel ? prev[x - bytesPerPixel] : 0;
    if (filter === 1) cur[x] = (cur[x] + left) & 255;
    else if (filter === 2) cur[x] = (cur[x] + up) & 255;
    else if (filter === 3) cur[x] = (cur[x] + Math.floor((left + up) / 2)) & 255;
    else if (filter === 4) cur[x] = (cur[x] + paeth(left, up, upLeft)) & 255;
    else if (filter !== 0) throw new Error(`Unsupported filter ${filter}`);
  }
  rows.push(cur);
  prev = cur;
}

function ranges(entries) {
  const result = [];
  for (const [index, count] of entries) {
    const last = result[result.length - 1];
    if (last && index === last.end + 1) {
      last.end = index;
      last.max = Math.max(last.max, count);
    } else {
      result.push({ start: index, end: index, max: count });
    }
  }
  return result;
}

const colEntries = [];
for (let x = 0; x < width; x += 1) {
  let count = 0;
  for (let y = 0; y < height; y += 1) {
    const i = x * bytesPerPixel;
    const row = rows[y];
    if (row[i] + row[i + 1] + row[i + 2] > threshold) count += 1;
  }
  if (count >= minCount) colEntries.push([x, count]);
}

const rowEntries = [];
for (let y = 0; y < height; y += 1) {
  let count = 0;
  const row = rows[y];
  for (let x = 0; x < width; x += 1) {
    const i = x * bytesPerPixel;
    if (row[i] + row[i + 1] + row[i + 2] > threshold) count += 1;
  }
  if (count >= minCount) rowEntries.push([y, count]);
}

console.log(JSON.stringify({ file, width, height, threshold, minCount, columns: ranges(colEntries), rows: ranges(rowEntries) }, null, 2));
