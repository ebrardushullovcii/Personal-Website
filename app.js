(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasHover = window.matchMedia("(hover: hover)").matches;
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");

  /* ---------- navigation ---------- */
  if (toggle && nav) {
    const close = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Active section per nav group: the last target whose top has passed 40% of the viewport.
  const navGroups = [...document.querySelectorAll("[data-nav], .site-nav")].map((group) => ({
    links: [...group.querySelectorAll("a[href^='#']")].map((link) => ({ link, target: document.querySelector(link.getAttribute("href")) })).filter((item) => item.target),
  }));
  if (navGroups.length) {
    let navTick = false;
    const updateNav = () => {
      navTick = false;
      const line = window.scrollY + window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      for (const group of navGroups) {
        let active = null;
        for (const item of group.links) {
          if (item.target.offsetTop <= line) active = item;
        }
        if (atBottom) active = group.links[group.links.length - 1];
        group.links.forEach((item) => {
          const on = item === active;
          item.link.classList.toggle("active", on);
          if (on) item.link.setAttribute("aria-current", "true");
          else item.link.removeAttribute("aria-current");
        });
      }
    };
    const requestNav = () => {
      if (!navTick) {
        navTick = true;
        requestAnimationFrame(updateNav);
      }
    };
    updateNav();
    window.addEventListener("scroll", requestNav, { passive: true });
    window.addEventListener("resize", requestNav);
    window.addEventListener("load", updateNav);
  }

  /* ---------- reveal on scroll ---------- */
  const revealed = document.querySelectorAll(".reveal, .reveal-words");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealed.forEach((el) => el.classList.add("in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    revealed.forEach((el) => observer.observe(el));
  }

  /* ---------- experience ledger progress line ---------- */
  const ledger = document.getElementById("ledger");
  const progress = ledger?.querySelector(".ledger-progress");
  if (ledger && progress && !reduceMotion) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = ledger.getBoundingClientRect();
      const covered = Math.min(Math.max(window.innerHeight * 0.72 - rect.top, 0), rect.height);
      progress.style.height = `${covered}px`;
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  } else if (progress) {
    progress.style.height = "100%";
  }

  /* ---------- tilt on product screenshots ---------- */
  if (hasHover && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-3px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- copy email ---------- */
  document.querySelectorAll("[data-copy]").forEach((el) => {
    if (!navigator.clipboard) return;
    const label = el.querySelector("[data-copy-label]");
    el.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey) return;
      navigator.clipboard.writeText(el.dataset.copy).then(() => {
        if (!label) return;
        const previous = label.textContent;
        label.textContent = "copied";
        setTimeout(() => (label.textContent = previous), 1600);
      });
    });
  });

  /* ---------- hero collage: scroll parallax + pointer tilt ---------- */
  document.querySelectorAll(".collage").forEach((collage) => {
    const scene = collage.querySelector(".collage-scene");
    const shots = [...collage.querySelectorAll(".shot")];
    if (!scene || reduceMotion) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollOffset = 0;
    let raf = null;
    const render = () => {
      raf = null;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      scene.style.transform = `rotateX(${(-currentY * 4).toFixed(2)}deg) rotateY(${(currentX * 6).toFixed(2)}deg)`;
      shots.forEach((shot) => {
        const depth = Number(shot.dataset.depth || 0.5);
        shot.style.setProperty("--py", `${(-scrollOffset * depth * 0.12).toFixed(1)}px`);
      });
      if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) schedule();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    if (hasHover) {
      collage.addEventListener("pointermove", (event) => {
        const rect = collage.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width - 0.5;
        targetY = (event.clientY - rect.top) / rect.height - 0.5;
        schedule();
      });
      collage.addEventListener("pointerleave", () => {
        targetX = 0;
        targetY = 0;
        schedule();
      });
    }
    const onScroll = () => {
      const rect = collage.getBoundingClientRect();
      scrollOffset = Math.max(-400, Math.min(400, rect.top - window.innerHeight * 0.3));
      schedule();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  /* ---------- horizontal chronology ---------- */
  document.querySelectorAll(".chrono").forEach((chronoEl) => {
    const rail = chronoEl.querySelector(".rail");
    const detail = chronoEl.querySelector(".detail");
    if (!rail || !detail) return;
    const cards = [...detail.querySelectorAll(".detail-card")];
    const triggers = [...rail.querySelectorAll("[data-detail]")];
    const thumb = chronoEl.querySelector(".scrub-thumb");
    const edgeL = chronoEl.querySelector(".rail-edge-l");
    const edgeR = chronoEl.querySelector(".rail-edge-r");
    const hint = chronoEl.querySelector(".chrono-hint");
    const now = rail.querySelector(".now");
    const behavior = reduceMotion ? "auto" : "smooth";

    const order = (detail.dataset.order || "").split(",").filter(Boolean);
    const stepButtons = [...chronoEl.querySelectorAll("[data-step]")];
    const stepNames = [...chronoEl.querySelectorAll("[data-step-name]")];
    const stepCount = chronoEl.querySelector("[data-step-count]");
    let selectedId = null;
    const nameOf = (id) => cards.find((card) => card.dataset.id === id)?.dataset.name || "";
    const updateStepper = (id) => {
      const index = order.indexOf(id);
      stepButtons.forEach((button) => {
        const target = index + Number(button.dataset.step);
        button.disabled = index === -1 || target < 0 || target >= order.length;
      });
      stepNames.forEach((el) => {
        const target = index + Number(el.dataset.stepName);
        el.textContent = index === -1 || target < 0 || target >= order.length ? "" : nameOf(order[target]);
      });
      if (stepCount) stepCount.textContent = index === -1 ? "" : `${index + 1} / ${order.length}`;
    };
    // Bring the selected bar or card into the visible part of the rail.
    const reveal = (trigger) => {
      const left = trigger.offsetLeft;
      const right = left + trigger.offsetWidth;
      const viewL = rail.scrollLeft + 72;
      const viewR = rail.scrollLeft + rail.clientWidth - 72;
      if (left >= viewL && right <= viewR) return;
      rail.scrollTo({ left: Math.max(0, left - rail.clientWidth * 0.3), behavior });
    };
    const select = (id, { scroll = false, animate = true, focusRail = false } = {}) => {
      if (id === selectedId) return;
      selectedId = id;
      cards.forEach((card) => {
        const show = card.dataset.id === id;
        if (show && card.hidden && animate && !reduceMotion) {
          card.hidden = false;
          card.classList.add("enter");
          void card.offsetHeight;
          card.classList.remove("enter");
        } else {
          card.hidden = !show;
        }
      });
      triggers.forEach((trigger) => {
        const on = trigger.dataset.detail === id;
        trigger.classList.toggle("selected", on);
        if (on && animate && !reduceMotion) {
          trigger.classList.remove("flash");
          void trigger.offsetWidth;
          trigger.classList.add("flash");
        }
        if (on && focusRail) reveal(trigger);
      });
      updateStepper(id);
      if (scroll) detail.scrollIntoView({ behavior, block: "nearest" });
    };
    stepButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = order.indexOf(selectedId) + Number(button.dataset.step);
        if (index < 0 || index >= order.length) return;
        interacted();
        select(order[index], { focusRail: true });
      });
    });
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => select(trigger.dataset.detail, { scroll: window.innerWidth < 900 }));
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select(trigger.dataset.detail, { scroll: window.innerWidth < 900 });
        }
      });
    });

    const nowLeft = () => Math.max(0, parseFloat(now?.style.left || "0") - rail.clientWidth * 0.8);
    rail.scrollTo({ left: nowLeft(), behavior: "auto" });
    const interacted = () => chronoEl.classList.add("touched");
    const current = triggers.find((trigger) => trigger.classList.contains("current"));
    if (current) select(current.dataset.detail, { animate: false });

    rail.addEventListener(
      "wheel",
      (event) => {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          interacted();
          return;
        }
        const max = rail.scrollWidth - rail.clientWidth;
        if ((rail.scrollLeft <= 0 && event.deltaY < 0) || (rail.scrollLeft >= max - 1 && event.deltaY > 0)) return;
        event.preventDefault();
        interacted();
        rail.scrollLeft += event.deltaY;
      },
      { passive: false },
    );

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    rail.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startLeft = rail.scrollLeft;
      rail.classList.add("dragging");
    });
    rail.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      if (moved) {
        rail.scrollLeft = startLeft - dx;
        interacted();
      }
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      rail.classList.remove("dragging");
      if (moved) {
        const swallow = (event) => {
          event.stopPropagation();
          event.preventDefault();
        };
        rail.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(() => rail.removeEventListener("click", swallow, { capture: true }), 0);
      }
    };
    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => rail.addEventListener(type, endDrag));

    chronoEl.querySelectorAll("[data-scroll]").forEach((button) => {
      button.addEventListener("click", () => {
        interacted();
        rail.scrollBy({ left: Number(button.dataset.scroll) * rail.clientWidth * 0.7, behavior });
      });
    });
    chronoEl.querySelector("[data-jump='now']")?.addEventListener("click", () => {
      interacted();
      rail.scrollTo({ left: nowLeft(), behavior });
      if (current) select(current.dataset.detail);
    });
    rail.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        interacted();
        rail.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * 400, behavior });
      }
    });

    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? rail.scrollLeft / max : 0;
      if (thumb) {
        const width = Math.max(8, (rail.clientWidth / rail.scrollWidth) * 100);
        thumb.style.width = `${width}%`;
        thumb.style.left = `${ratio * (100 - width)}%`;
      }
      edgeL?.classList.toggle("on", rail.scrollLeft > 8);
      edgeR?.classList.toggle("on", rail.scrollLeft < max - 8);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // One-time nudge when the rail first comes into view, so the sideways scroll is discoverable.
    if (!reduceMotion && "IntersectionObserver" in window) {
      const nudge = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting || chronoEl.classList.contains("touched")) return;
          nudge.disconnect();
          const from = rail.scrollLeft;
          const start = performance.now();
          const step = (t) => {
            if (chronoEl.classList.contains("touched")) return;
            const p = Math.min(1, (t - start) / 1400);
            rail.scrollLeft = from - Math.sin(p * Math.PI) * 90;
            if (p < 1) requestAnimationFrame(step);
            else rail.scrollLeft = from;
          };
          setTimeout(() => requestAnimationFrame(step), 500);
        },
        { threshold: 0.6 },
      );
      nudge.observe(rail);
    }
    if (hint) setTimeout(() => hint.classList.add("seen"), 15000);
  });

  /* ---------- product clips: shelf loops play in view, collage loops play on hover ---------- */
  const loadClip = (video) => {
    if (!video.src && video.dataset.src) video.src = video.dataset.src;
  };
  const playClip = (video) => {
    loadClip(video);
    const started = video.play();
    if (started && started.catch) started.catch(() => {});
  };
  if (!reduceMotion) {
    const shelfClips = [...document.querySelectorAll(".shelf-loop")];
    if (shelfClips.length && "IntersectionObserver" in window) {
      const watcher = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) playClip(entry.target);
            else entry.target.pause();
          }),
        { rootMargin: "120px 0px", threshold: 0.3 },
      );
      shelfClips.forEach((video) => watcher.observe(video));
    }
    if (hasHover) {
      document.querySelectorAll(".shot").forEach((shot) => {
        const video = shot.querySelector(".shot-loop");
        if (!video) return;
        video.addEventListener("playing", () => shot.classList.add("playing"));
        shot.addEventListener("pointerenter", () => playClip(video));
        shot.addEventListener("pointerleave", () => {
          video.pause();
          shot.classList.remove("playing");
        });
      });
    }
  }

  /* ---------- product films in a dialog (links fall back to the plain video file) ---------- */
  const film = document.getElementById("film");
  if (film && typeof film.showModal === "function") {
    const filmVideo = film.querySelector(".film-video");
    const filmTitle = film.querySelector("#film-title");
    document.querySelectorAll("[data-film]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        filmTitle.textContent = link.dataset.title || "Product film";
        if (filmVideo.getAttribute("src") !== link.getAttribute("href")) {
          filmVideo.poster = link.dataset.poster || "";
          filmVideo.src = link.getAttribute("href");
        }
        filmVideo.currentTime = 0;
        document.documentElement.classList.add("film-open");
        film.showModal();
        const started = filmVideo.play();
        if (started && started.catch) started.catch(() => {});
      });
    });
    film.querySelector(".film-close").addEventListener("click", () => film.close());
    film.addEventListener("click", (event) => {
      if (event.target === film) film.close();
    });
    film.addEventListener("close", () => {
      filmVideo.pause();
      document.documentElement.classList.remove("film-open");
    });
  }

  /* ---------- warm up canvas mode after the page has settled ---------- */
  const canvasLink = document.querySelector(".canvas-link");
  if (canvasLink) {
    const warm = () => {
      ["/canvas/", "/canvas/styles.css", "/canvas/app.js"].forEach((href) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        link.as = href.endsWith(".css") ? "style" : href.endsWith(".js") ? "script" : "document";
        document.head.appendChild(link);
      });
    };
    if (document.readyState === "complete") setTimeout(warm, 1500);
    else window.addEventListener("load", () => setTimeout(warm, 1500), { once: true });
  }
})();
