// Alternate views of the site that are built alongside the main page.
import * as canvas from "./canvas/render.js";

export const designs = [
  { slug: "canvas", path: "canvas", name: "Canvas", render: canvas.render },
];
