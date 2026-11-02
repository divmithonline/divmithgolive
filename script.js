(function () {
  "use strict";
  var C = window.SITE_CONFIG;
  var app = document.getElementById("app");

  var A = C.animation || {};
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var animOn = A.enabled !== false && !reduce;
  function ms(v, d) { return animOn ? (v == null ? d : v) : 0; }
  function num(v, d) { return v == null ? d : v; }

  var SVG_NS = "http://www.w3.org/2000/svg";
  var ICONS = {
    linkedin: { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    x: { d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" },
    bluesky: { d: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" },
    instagram: { stroke: true }
  };

  function iconSvg(id) {
    var def = ICONS[id];
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    if (!def) { return svg; }
    if (def.stroke) {
      svg.setAttribute("class", "stroke");
      var rect = document.createElementNS(SVG_NS, "rect");
      rect.setAttribute("x", "3"); rect.setAttribute("y", "3");
      rect.setAttribute("width", "18"); rect.setAttribute("height", "18");
      rect.setAttribute("rx", "5");
      var circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", "12"); circle.setAttribute("cy", "12"); circle.setAttribute("r", "4");
      var dot = document.createElementNS(SVG_NS, "circle");
      dot.setAttribute("cx", "17.5"); dot.setAttribute("cy", "6.5"); dot.setAttribute("r", "0.6");
      svg.appendChild(rect); svg.appendChild(circle); svg.appendChild(dot);
    } else {
      var path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", def.d);
      svg.appendChild(path);
    }
    return svg;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null && text !== "") n.textContent = text;
    return n;
  }
  function link(href, cls, text) {
    var a = el("a", cls, text);
    a.href = href;
    return a;
  }

  function hexToRgba(color, a) {
    var t = document.createElement("span");
    t.style.color = color;
    document.body.appendChild(t);
    var c = getComputedStyle(t).color;
    t.remove();
    var m = c.match(/[\d.]+/g) || [0, 0, 0];
    return "rgba(" + m[0] + "," + m[1] + "," + m[2] + "," + (a == null ? 1 : a) + ")";
  }

  var mq = window.matchMedia ? window.matchMedia("(max-width: " + num((C.mobile || {}).breakpoint, 600) + "px)") : null;
  function isPhone() { return !!(mq && mq.matches); }

  function themeNow() {
    var t = {}, k, base = C.theme || {}, m = C.mobile || {};
    for (k in base) t[k] = base[k];
    if (isPhone()) {
      for (k in m) { if (k !== "breakpoint" && m[k] != null) t[k] = m[k]; }
    }
    return t;
  }

  function applyVars() {
    var t = themeNow(), b = C.background || {}, root = document.documentElement.style;
    root.setProperty("--page-bg", t.pageBg);
    root.setProperty("--text", t.text);
    root.setProperty("--bar-bg", hexToRgba(t.barBg, num(t.barOpacity, 0.5)));
    root.setProperty("--bar-bg-clear", hexToRgba(t.barBg, 0));
    root.setProperty("--hover-fade", ms(A.hoverFade, 250) + "ms");
    root.setProperty("--font", t.font);
    root.setProperty("--bar-width", t.barWidth || "85%");
    root.setProperty("--fs", num(t.fontSize, 18) + "px");
    root.setProperty("--fs-name", num(t.nameSize, 24) + "px");
    root.setProperty("--fs-role", num(t.roleSize, 15) + "px");
    root.setProperty("--role-gap", num(t.roleGap, 6) + "px");
    root.setProperty("--role-op", num((C.opacity || {}).role, 0.8));
    root.setProperty("--fs-email", num(t.emailSize, 18) + "px");
    root.setProperty("--fs-footer", num(t.footerSize != null ? t.footerSize : t.smallSize, 14) + "px");
    if (t.iconSize != null) root.setProperty("--icon-size", t.iconSize + "px");
    root.setProperty("--icon-gap", num(t.iconGap, 20) + "px");
    var cg = num(t.contentGap, 28);
    root.setProperty("--gap-image", num(t.imageGap, cg) + "px");
    root.setProperty("--gap-about", num(t.aboutEmailGap, cg) + "px");
    root.setProperty("--gap-email", num(t.emailSocialsGap, cg) + "px");
    root.setProperty("--para-gap", num(t.paragraphGap, 22) + "px");
    root.setProperty("--line-h", num(t.lineHeight, 1.5));
    root.setProperty("--dim-rgba", hexToRgba(b.dimColor || t.pageBg, num(b.dim, 0.8)));
    var im = C.image || {};
    var iw = (isPhone() && t.imageWidth != null) ? t.imageWidth : num(im.width, 160);
    root.setProperty("--img-w", iw + "px");
    root.setProperty("--img-ratio", im.aspectRatio || "auto");
    root.setProperty("--img-radius", im.radius || "0");
    if (t.pagePadding != null) root.setProperty("--pad", t.pagePadding + "px");
    else root.removeProperty("--pad");
  }

  function applyConfig() {
    var t = C.theme || {}, b = C.background || {}, root = document.documentElement.style;
    applyVars();
    document.body.classList.toggle("upper", !!t.uppercase);
    document.body.classList.toggle("about-upper", !!t.aboutUppercase);

    if (t.fontUrl) {
      var lk = document.createElement("link");
      lk.rel = "stylesheet";
      lk.href = t.fontUrl;
      document.head.appendChild(lk);
    }
    if (t.fontFiles && t.fontFiles.length) {
      var st = document.createElement("style");
      st.textContent = t.fontFiles.map(function (f) {
        return "@font-face{font-family:'CustomFont';src:url('" + f.file + "');font-weight:" +
          (f.weight || 400) + ";font-style:" + (f.style || "normal") + ";font-display:swap;}";
      }).join("");
      document.head.appendChild(st);
    }
    document.title = C.siteTitle || "";

    var v = document.getElementById("bg-video");
    if (b.video) {
      v.src = b.video;
      if (b.poster) v.poster = b.poster;
      v.muted = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () {  });
    } else {
      v.remove();
    }

    var n = document.querySelector(".bg-noise");
    var nz = b.noise || {};
    if (nz.enabled) {
      var size = nz.size || 240;
      var svg =
        "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "'>" +
        "<filter id='n' x='0' y='0' width='100%' height='100%'>" +
        "<feTurbulence type='fractalNoise' baseFrequency='" + (nz.grain || 0.8) + "' numOctaves='2' stitchTiles='stitch'/>" +
        "<feColorMatrix type='saturate' values='0'/></filter>" +
        "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
      n.style.backgroundImage = "url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\")";
      n.style.backgroundSize = size + "px " + size + "px";
      n.style.opacity = nz.opacity;
      n.classList.toggle("animate", !!nz.animate && animOn);
    } else {
      n.remove();
    }
  }

  var blocks = [];
  var OP = C.opacity || {};

  function block(tag, cls, key) {
    var b = el(tag, "block " + cls);
    b.style.setProperty("--op", num(OP[key], 1));
    blocks.push(b);
    app.appendChild(b);
    return b;
  }

  function aboutParagraphs() {
    var a = C.about, out = [];
    if (typeof a === "string") a = [a];
    (a || []).forEach(function (s) {
      if (typeof s === "string") {
        s.split(/\n\s*\n/).forEach(function (p) { p = p.trim(); if (p) out.push(p); });
      } else if (s) {
        if (s.title && String(s.title).trim()) out.push(String(s.title).trim());
        if (s.text && String(s.text).trim()) out.push(String(s.text).trim());
      }
    });
    return out;
  }

  function emailLink() {
    var hidden = C.emailHidden !== false;
    var a = el("a", "email hover-bar " + (hidden ? "email-hidden" : "email-plain"));
    var addr = el("span", "email-addr");
    if (hidden) a.appendChild(el("span", "email-label", C.emailLabel || "CONTACT ME"));
    a.appendChild(addr);

    function arm() {
      if (!addr.textContent) addr.textContent = C.email;
      if (!a.getAttribute("href")) a.setAttribute("href", "mailto:" + C.email);
    }
    if (!hidden) { arm(); return a; }

    a.setAttribute("tabindex", "0");
    a.setAttribute("role", "link");
    ["pointerenter", "focus", "touchstart"].forEach(function (ev) {
      a.addEventListener(ev, arm, { passive: true });
    });
    var touch = window.matchMedia && window.matchMedia("(hover: none)").matches;
    a.addEventListener("click", function (e) {
      var wasArmed = !!a.getAttribute("href");
      arm();
      if (touch && !a.classList.contains("show")) {
        e.preventDefault();
        a.classList.add("show");
        return;
      }
      if (!wasArmed) { e.preventDefault(); window.location.href = "mailto:" + C.email; }
    });
    return a;
  }

  function addImage(inMain) {
    var I = C.image || {};
    if (!I.src) return;
    var b = block("div", "hero-image", "image");
    var img = el("img");
    img.src = I.src;
    img.alt = I.alt || "";
    img.addEventListener("error", function () { b.style.display = "none"; });
    b.appendChild(img);
    if (inMain) inMain(b);
  }

  function aboutItems() {
    var src = document.querySelectorAll("#about p"), out = [];
    for (var i = 0; i < src.length; i++) {
      if (src[i].textContent.trim()) out.push(src[i].cloneNode(true));
    }
    if (out.length) return out;
    return aboutParagraphs().map(function (t) { return el("p", "", t); });
  }

  function addName() {
    var head = block("header", "", "name");
    head.appendChild(el("h1", "site-name", C.name));
    if (C.role) head.appendChild(el("p", "site-role", C.role));
  }

  function addFooter() {
    var foot = block("footer", "footer", "footer");
    foot.textContent = C.copyright;
  }

  function addSocials(inMain) {
    if (!(C.socials && C.socials.length)) return;
    var soc = inMain(block("nav", "socials", "socials"));
    soc.setAttribute("aria-label", "Social links");
    C.socials.forEach(function (s) {
      var a = link(s.url, "icon-link" + ((C.theme || {}).socialHover ? " hover-bar" : ""));
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", s.label || s.id);
      a.title = s.label || s.id;
      a.appendChild(iconSvg(s.id));
      soc.appendChild(a);
    });
  }

  function newMain() {

    var main = el("main");
    app.appendChild(main);
    return function inMain(b) { main.appendChild(b); return b; };
  }

  function build() {
    var imgPos = (C.image || {}).position || "belowName";
    if (imgPos === "aboveName") addImage(null);
    addName();
    var inMain = newMain();
    if (imgPos === "belowName") addImage(inMain);

    var paras = aboutItems();
    if (paras.length) {
      var about = inMain(block("section", "about", "about"));
      paras.forEach(function (p) { about.appendChild(p); });
    }
    if (imgPos === "belowAbout") addImage(inMain);

    if (C.email) {
      var em = inMain(block("div", "email-wrap", "email"));
      em.appendChild(emailLink());
    }

    addSocials(inMain);
    addFooter();
  }

  function build404() {
    var N = C.notFound || {};
    if (N.showName !== false) addName();
    var inMain = newMain();

    if (N.title || N.message) {
      var box = inMain(block("section", "about notfound", "about"));
      if (N.title) box.appendChild(el("h2", "", N.title));
      if (N.message) box.appendChild(el("p", "", N.message));
    }
    if (N.linkText) {
      var w = inMain(block("div", "email-wrap", "email"));
      w.appendChild(link(N.linkUrl || "/", "email hover-bar", N.linkText));
    }
    if (N.showSocials) addSocials(inMain);
    addFooter();
  }

  function startReveal() {
    var R = C.reveal || {};
    var on = R.enabled !== false && animOn;
    var fade = on ? num(R.fade, 900) : 0;
    var start = on ? num(R.startDelay, 300) : 0;
    var step = on ? num(R.step, 500) : 0;
    var rise = on ? num(R.rise, 0) : 0;
    blocks.forEach(function (b, i) {
      b.style.setProperty("--rise", rise + "px");
      b.style.transitionDuration = fade + "ms";
      b.style.transitionDelay = (start + i * step) + "ms";
    });
    void app.offsetWidth;
    blocks.forEach(function (b) { b.classList.add("in"); });
  }

  function videoReady(maxWait) {
    return new Promise(function (resolve) {
      var v = document.getElementById("bg-video");
      if (!v || !(C.background || {}).video || v.readyState >= 3) { resolve(); return; }
      var done = false;
      function finish() { if (!done) { done = true; resolve(); } }
      v.addEventListener("canplay", finish);
      v.addEventListener("error", finish);
      setTimeout(finish, maxWait);
    });
  }

  function runLoader(onFadeStart) {
    var L = C.loader || {};
    var lines = L.lines || [];
    if (L.enabled === false || !lines.length) { onFadeStart(); return; }

    var loader = el("div", "loader");
    loader.style.background = hexToRgba(L.background || "#000", num(L.opacity, 1));
    var lfs = (isPhone() && (C.mobile || {}).loaderFontSize != null) ? C.mobile.loaderFontSize : num(L.fontSize, 20);
    loader.style.fontSize = lfs + "px";
    loader.style.letterSpacing = num(L.letterSpacing, 0.12) + "em";
    loader.style.gap = num(L.gap, 18) + "px";
    loader.style.color = (C.theme || {}).text || "#fff";
    document.body.appendChild(loader);

    var lineDelay = ms(L.lineDelay, 500);
    var lineFade = ms(L.lineFade, 700);
    lines.forEach(function (text, i) {
      var p = el("p", "loader-line", text);
      if (L.uppercase !== false) p.style.textTransform = "uppercase";
      p.style.transition = "opacity " + lineFade + "ms ease";
      loader.appendChild(p);
      setTimeout(function () { p.style.opacity = num(L.textOpacity, 1); }, 50 + i * lineDelay);
    });

    var minTime = new Promise(function (resolve) {
      setTimeout(resolve, 50 + (lines.length - 1) * lineDelay + lineFade + ms(L.hold, 1000));
    });
    var vid = L.waitForVideo === false ? Promise.resolve() : videoReady(num(L.maxWait, 5000));

    Promise.all([minTime, vid]).then(function () {
      var out = ms(L.fadeOut, 800);
      loader.style.transition = "opacity " + out + "ms ease";
      loader.style.opacity = 0;
      onFadeStart();
      setTimeout(function () { loader.remove(); }, out + 50);
    });
  }

  applyConfig();
  if (mq) {
    if (mq.addEventListener) mq.addEventListener("change", applyVars);
    else if (mq.addListener) mq.addListener(applyVars);
  }
  if (document.body.getAttribute("data-page") === "404") {
    var NF = C.notFound || {};
    document.title = NF.pageTitle || "Page not found";
    build404();
    if (NF.showLoader) runLoader(startReveal); else startReveal();
  } else {
    build();
    runLoader(startReveal);
  }
})();
