// Canvas mode: pan, zoom, edge-anchored connectors with labels, minimap, and a stepped tour.
(() => {
  const viewport = document.getElementById("viewport");
  const world = document.getElementById("world");
  const links = document.getElementById("links");
  const minimap = document.getElementById("minimap");
  const graphEl = document.getElementById("graph");
  if (!viewport || !world || !graphEl) return;
  if (window.matchMedia("(max-width: 800px)").matches) {
    document.body.classList.add("small");
    return;
  }
  const graph = JSON.parse(graphEl.textContent);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const W = Number(viewport.dataset.worldW);
  const H = Number(viewport.dataset.worldH);
  const nodes = new Map([...world.querySelectorAll(".node")].map((el) => [el.dataset.node, el]));
  const pathsGroup = links.querySelector(".link-paths");
  const labelsGroup = links.querySelector(".link-labels");

  /* ---------- view state ---------- */
  const view = { x: 0, y: 0, k: 1 };
  const MIN_K = 0.32;
  const MAX_K = 1.6;
  let raf = null;
  const apply = () => {
    raf = null;
    world.style.transform = `translate3d(${view.x.toFixed(1)}px, ${view.y.toFixed(1)}px, 0) scale(${view.k.toFixed(3)})`;
    drawMinimap();
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };
  // Pan limits follow the nodes' bounding box, not the world box, so the slack
  // is the same on every side regardless of where the layout sits in the world.
  let bounds = { x1: 0, y1: 0, x2: W, y2: H };
  const measureBounds = () => {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    nodes.forEach((el) => {
      x1 = Math.min(x1, el.offsetLeft);
      y1 = Math.min(y1, el.offsetTop);
      x2 = Math.max(x2, el.offsetLeft + el.offsetWidth);
      y2 = Math.max(y2, el.offsetTop + el.offsetHeight);
    });
    if (Number.isFinite(x1)) bounds = { x1, y1, x2, y2 };
  };
  const clamp = () => {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const pad = Math.max(48, 160 * view.k);
    // Content larger than the viewport: its left edge may come at most `pad` in
    // from the left, its right edge at most `pad` in from the right. Content
    // smaller than the viewport: it floats anywhere while staying `pad` clear of
    // both edges. Either way the slack is symmetric.
    const range = (size, lo, hi) => {
      const a = size - pad - hi * view.k;
      const b = pad - lo * view.k;
      return a <= b ? [a, b] : [b, a];
    };
    const [minX, maxX] = range(vw, bounds.x1, bounds.x2);
    const [minY, maxY] = range(vh, bounds.y1, bounds.y2);
    view.x = Math.max(minX, Math.min(maxX, view.x));
    view.y = Math.max(minY, Math.min(maxY, view.y));
  };
  const rectOf = (id) => {
    const el = nodes.get(id);
    return { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight, cx: el.offsetLeft + el.offsetWidth / 2, cy: el.offsetTop + el.offsetHeight / 2 };
  };
  const viewFor = (wx, wy, k) => ({ x: viewport.clientWidth / 2 - wx * k, y: viewport.clientHeight / 2 - wy * k, k });
  const fitNode = (id, pad = 1.06) => {
    const r = rectOf(id);
    const k = Math.max(MIN_K, Math.min(1, Math.min(viewport.clientWidth / (r.w * pad + 120), viewport.clientHeight / (r.h * pad + 140))));
    return viewFor(r.cx, r.cy, k);
  };
  const fitAll = () => {
    const bw = bounds.x2 - bounds.x1;
    const bh = bounds.y2 - bounds.y1;
    const k = Math.max(MIN_K, Math.min(1, Math.min(viewport.clientWidth / (bw + 160), viewport.clientHeight / (bh + 160))));
    return viewFor(bounds.x1 + bw / 2, bounds.y1 + bh / 2, k);
  };

  let anim = null;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const animateTo = (target, duration = 900) =>
    new Promise((resolve) => {
      if (anim) cancelAnimationFrame(anim);
      if (reduceMotion) {
        Object.assign(view, target);
        clamp();
        apply();
        resolve();
        return;
      }
      const from = { ...view };
      const start = performance.now();
      const step = (now) => {
        const e = easeOut(Math.min(1, (now - start) / duration));
        view.x = from.x + (target.x - from.x) * e;
        view.y = from.y + (target.y - from.y) * e;
        view.k = from.k + (target.k - from.k) * e;
        apply();
        if (e < 1) anim = requestAnimationFrame(step);
        else {
          anim = null;
          resolve();
        }
      };
      anim = requestAnimationFrame(step);
    });

  /* ---------- focus and connector highlighting ---------- */
  let focused = null;
  const focus = (id) => {
    focused = id;
    nodes.forEach((el, key) => {
      const connected = id && graph.edges.some(([a, b]) => (a === id && b === key) || (b === id && a === key));
      el.classList.toggle("focus", key === id);
      el.classList.toggle("near", Boolean(id) && connected);
    });
    world.classList.toggle("has-focus", Boolean(id));
    pathsGroup.querySelectorAll("path").forEach((path) => {
      const on = id && (path.dataset.from === id || path.dataset.to === id);
      path.classList.toggle("on", Boolean(on));
    });
    labelsGroup.querySelectorAll("g").forEach((label) => {
      const on = id && (label.dataset.from === id || label.dataset.to === id);
      label.classList.toggle("on", Boolean(on));
    });
  };

  /* ---------- connectors anchored to node edges ---------- */
  // Point where the segment from rect centre toward (tx, ty) exits the rectangle, inset a little.
  const exitPoint = (r, tx, ty) => {
    const dx = tx - r.cx;
    const dy = ty - r.cy;
    if (!dx && !dy) return { x: r.cx, y: r.cy };
    const sx = (r.w / 2 + 10) / Math.abs(dx || 1e-6);
    const sy = (r.h / 2 + 10) / Math.abs(dy || 1e-6);
    const s = Math.min(sx, sy);
    return { x: r.cx + dx * s, y: r.cy + dy * s };
  };
  const drawLinks = () => {
    const paths = [];
    const labels = [];
    for (const [a, b, text] of graph.edges) {
      const ra = rectOf(a);
      const rb = rectOf(b);
      const p = exitPoint(ra, rb.cx, rb.cy);
      const q = exitPoint(rb, ra.cx, ra.cy);
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      // Gentle curve, bending away from the straight line by a fraction of the length.
      const bend = Math.min(90, dist * 0.14);
      const nx = -dy / dist;
      const ny = dx / dist;
      const cx = (p.x + q.x) / 2 + nx * bend;
      const cy = (p.y + q.y) / 2 + ny * bend;
      paths.push(`<path d="M ${p.x.toFixed(1)} ${p.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}" data-from="${a}" data-to="${b}" marker-end="url(#arrow-head)" />`);
      // Label at the curve midpoint (t = 0.5 on a quadratic).
      const lx = 0.25 * p.x + 0.5 * cx + 0.25 * q.x;
      const ly = 0.25 * p.y + 0.5 * cy + 0.25 * q.y;
      const w = text.length * 6.6 + 18;
      labels.push(`<g data-from="${a}" data-to="${b}" transform="translate(${lx.toFixed(1)} ${ly.toFixed(1)})"><rect x="${(-w / 2).toFixed(1)}" y="-11" width="${w.toFixed(1)}" height="22" rx="11" /><text y="4" text-anchor="middle">${text}</text></g>`);
    }
    pathsGroup.innerHTML = paths.join("");
    labelsGroup.innerHTML = labels.join("");
    if (focused) focus(focused);
  };

  /* ---------- minimap ---------- */
  const miniView = minimap?.querySelector(".mini-view");
  const buildMinimap = () => {
    if (!minimap) return;
    minimap.querySelectorAll(".mini-node").forEach((el) => el.remove());
    const sx = minimap.clientWidth / W;
    const sy = minimap.clientHeight / H;
    nodes.forEach((el, id) => {
      const m = document.createElement("span");
      const kind = [...el.classList].find((c) => c.startsWith("node-") && c !== "node") || "node-x";
      m.className = `mini-node mini-${kind.slice(5)}`;
      m.style.left = `${el.offsetLeft * sx}px`;
      m.style.top = `${el.offsetTop * sy}px`;
      m.style.width = `${el.offsetWidth * sx}px`;
      m.style.height = `${el.offsetHeight * sy}px`;
      m.dataset.node = id;
      minimap.appendChild(m);
    });
  };
  const drawMinimap = () => {
    if (!minimap || !miniView) return;
    const sx = minimap.clientWidth / W;
    const sy = minimap.clientHeight / H;
    miniView.style.left = `${(-view.x / view.k) * sx}px`;
    miniView.style.top = `${(-view.y / view.k) * sy}px`;
    miniView.style.width = `${(viewport.clientWidth / view.k) * sx}px`;
    miniView.style.height = `${(viewport.clientHeight / view.k) * sy}px`;
  };
  minimap?.addEventListener("click", (event) => {
    const rect = minimap.getBoundingClientRect();
    stopTour();
    animateTo(viewFor(((event.clientX - rect.left) / rect.width) * W, ((event.clientY - rect.top) / rect.height) * H, view.k), 600);
  });

  /* ---------- pan, pinch, wheel ---------- */
  let dragging = false;
  let moved = false;
  let last = { x: 0, y: 0 };
  const pointers = new Map();
  let pinchStart = null;
  const zoomAt = (cx, cy, factor, absolute = false) => {
    const rect = viewport.getBoundingClientRect();
    const px = cx - rect.left;
    const py = cy - rect.top;
    const nextK = Math.max(MIN_K, Math.min(MAX_K, absolute ? factor : view.k * factor));
    const wx = (px - view.x) / view.k;
    const wy = (py - view.y) / view.k;
    view.k = nextK;
    view.x = px - wx * nextK;
    view.y = py - wy * nextK;
    clamp();
    schedule();
  };
  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = { dist: Math.hypot(a.x - b.x, a.y - b.y), k: view.k, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
      return;
    }
    dragging = true;
    moved = false;
    last = { x: event.clientX, y: event.clientY };
    viewport.classList.add("dragging");
  });
  window.addEventListener("pointermove", (event) => {
    if (pointers.has(event.pointerId)) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2 && pinchStart) {
      const [a, b] = [...pointers.values()];
      zoomAt(pinchStart.mid.x, pinchStart.mid.y, (pinchStart.k * Math.hypot(a.x - b.x, a.y - b.y)) / pinchStart.dist, true);
      return;
    }
    if (!dragging) return;
    const dx = event.clientX - last.x;
    const dy = event.clientY - last.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    last = { x: event.clientX, y: event.clientY };
    view.x += dx;
    view.y += dy;
    clamp();
    schedule();
  });
  const endPointer = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchStart = null;
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove("dragging");
    if (moved) {
      const swallow = (e) => {
        e.stopPropagation();
        e.preventDefault();
      };
      viewport.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => viewport.removeEventListener("click", swallow, { capture: true }), 0);
    }
  };
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);
  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * 0.0022));
      else {
        view.x -= event.deltaX;
        view.y -= event.deltaY;
        clamp();
        schedule();
      }
    },
    { passive: false },
  );

  /* ---------- controls ---------- */
  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      const rect = viewport.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, Number(button.dataset.zoom) > 0 ? 1.25 : 0.8);
    });
  });
  document.querySelector("[data-fit]")?.addEventListener("click", () => {
    stopTour();
    focus(null);
    animateTo(fitAll(), 700);
  });
  nodes.forEach((el, id) => {
    const go = () => {
      focus(id);
      animateTo(fitNode(id), 700);
    };
    el.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      if (touring) setTourIndex(Math.max(0, graph.tour.findIndex(([tid]) => tid === id)), { animate: true });
      else go();
    });
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target === el) go();
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.target.closest("input, textarea, button, a")) return;
    if (touring && (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ")) {
      event.preventDefault();
      tourNext();
      return;
    }
    if (touring && (event.key === "ArrowLeft" || event.key === "ArrowUp")) {
      event.preventDefault();
      tourPrev();
      return;
    }
    const step = 160;
    const map = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    if (map[event.key]) {
      event.preventDefault();
      view.x += map[event.key][0];
      view.y += map[event.key][1];
      clamp();
      schedule();
    } else if (event.key === "Escape") {
      stopTour();
      focus(null);
    }
  });

  /* ---------- stepped tour ---------- */
  const tourButton = document.querySelector("[data-tour]");
  const tourbar = document.getElementById("tourbar");
  const tourCount = tourbar?.querySelector(".tour-count");
  const tourLabel = tourbar?.querySelector(".tour-label");
  let touring = false;
  let tourIndex = 0;
  const setTourIndex = (index, { animate = true } = {}) => {
    tourIndex = Math.max(0, Math.min(graph.tour.length - 1, index));
    const [id, label] = graph.tour[tourIndex];
    focus(id);
    if (tourCount) tourCount.textContent = `${tourIndex + 1} / ${graph.tour.length}`;
    if (tourLabel) tourLabel.textContent = label;
    tourbar?.querySelector("[data-tour-prev]")?.toggleAttribute("disabled", tourIndex === 0);
    const next = tourbar?.querySelector("[data-tour-next]");
    if (next) next.textContent = tourIndex === graph.tour.length - 1 ? "Finish" : "Next →";
    if (animate) animateTo(fitNode(id), 900);
  };
  const startTour = () => {
    touring = true;
    tourButton?.classList.add("active");
    const label = tourButton?.querySelector("span");
    if (label) label.textContent = "End tour";
    if (tourbar) tourbar.hidden = false;
    document.getElementById("hint")?.classList.add("fade");
    setTourIndex(0);
  };
  const stopTour = () => {
    if (!touring) return;
    touring = false;
    tourButton?.classList.remove("active");
    const label = tourButton?.querySelector("span");
    if (label) label.textContent = "Take the tour";
    if (tourbar) tourbar.hidden = true;
  };
  const toast = document.getElementById("toast");
  let toastTimer = null;
  const showToast = (html, ms = 4200) => {
    if (!toast) return;
    toast.innerHTML = html;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), ms);
  };
  const tourNext = () => {
    if (tourIndex >= graph.tour.length - 1) {
      stopTour();
      focus(null);
      animateTo(fitAll(), 800);
      showToast('That was the tour. Drag around, click any node, or <a href="/">head back to the site</a>.', 5000);
      return;
    }
    setTourIndex(tourIndex + 1);
  };
  const tourPrev = () => setTourIndex(tourIndex - 1);
  const callout = document.getElementById("tour-callout");
  const dismissCallout = () => callout?.classList.add("gone");
  setTimeout(dismissCallout, 9000);
  viewport.addEventListener("pointerdown", dismissCallout, { once: true });
  tourButton?.addEventListener("click", () => {
    dismissCallout();
    if (touring) stopTour();
    else startTour();
  });
  tourbar?.querySelector("[data-tour-next]")?.addEventListener("click", tourNext);
  tourbar?.querySelector("[data-tour-prev]")?.addEventListener("click", tourPrev);
  tourbar?.querySelector("[data-tour-stop]")?.addEventListener("click", () => {
    stopTour();
    focus(null);
  });

  /* ---------- init ---------- */
  const init = () => {
    measureBounds();
    drawLinks();
    buildMinimap();
    focus("start");
    Object.assign(view, fitNode("start"));
    clamp();
    apply();
  };
  init();
  document.body.classList.add("ready");
  const redraw = () => {
    measureBounds();
    drawLinks();
    buildMinimap();
    drawMinimap();
  };
  window.addEventListener("load", redraw);
  if (document.fonts?.ready) document.fonts.ready.then(redraw);
  world.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", redraw, { once: true });
  });
  window.addEventListener("resize", () => {
    buildMinimap();
    clamp();
    schedule();
  });
  setTimeout(() => document.getElementById("hint")?.classList.add("fade"), 7000);
})();
