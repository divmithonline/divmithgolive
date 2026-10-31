/* ==========================================================================
   SITE CONFIG — edit everything here. No other file needs to change.
   Save the file, then refresh the page.
   Times are in milliseconds (1000 = 1 second).
   Opacities go from 0 (invisible) to 1 (fully visible).
   ========================================================================== */
window.SITE_CONFIG = {

  /* ---------- Text content ---------- */
  siteTitle: "S. Divmith Kodituwakku",     // browser tab title
  name: "S. DIVMITH KODITUWAKKU",
  copyright: "© 2026 BY DIVMITH KODITUWAKKU",
  email: "divmith.kodituwakku@gmail.com",

  /* About me sections. Add, remove or reorder items.
     Leave `title` or `text` empty to hide it. */
  about: [
    {
      title: "Sesanda Divmith Kodituwakku is a stage presenter, creative strategist, and science enthusiast focused on turning complex ideas into practical, engaging outcomes. Backed by experience in team leadership and stage presence, he establishes structure, clarity, and momentum across public presentations and group efforts.",
      text: "Fueled by a constant curiosity for how science and design intersect, he balances analytical thinking with sharp creative execution. Whether driving team projects forward, designing visual assets, or keeping a program moving with purpose, he brings focus, high energy, and clear direction to every initiative."
    }
  ],

  /* Social links. `id` picks the icon: linkedin | instagram | x | bluesky
     Remove a line to remove that link. */
  socials: [
    { id: "linkedin",  label: "LinkedIn",  url: "https://lk.linkedin.com/in/divmithkodituwakku" },
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/divmithonline" },
    { id: "x",         label: "X",         url: "https://x.com/divmithonline" },
    { id: "bluesky",   label: "Bluesky",   url: "https://bsky.app/profile/divmithonline.bsky.social" }
  ],

  /* ---------- Loading screen ---------- */
  loader: {
    enabled: true,
    lines: ["@DIVMITHKODITUWAKKU", "@DIVMITHONLINE"],
    uppercase: true,
    background: "black",   // loading screen color
    opacity: 0.6,              // 1 = solid, lower lets the video show through
    textOpacity: 1,          // opacity of the usernames
    fontSize: 13,            // px
    letterSpacing: 0.1,     // em
    gap: 9,                 // space between the usernames (px)
    lineDelay: 0,          // time between one username appearing and the next
    lineFade: 700,           // fade-in time of each username
    hold: 1000,              // how long to stay after the last username is shown
    fadeOut: 700,            // fade-out time of the whole loading screen
    waitForVideo: true,      // keep loading until the background video can play
    maxWait: 5000            // ...but never wait longer than this
  },

  /* ---------- Reveal: name → about me → email → social links → footer ---------- */
  reveal: {
    enabled: true,
    startDelay: 300,         // delay before the first item, counted from when the loading screen starts to fade out
    step: 500,               // delay between one item and the next
    fade: 900,               // fade-in time of each item
    rise: 0                  // px each item slides up while fading in (0 = no slide)
  },

  /* ---------- Other animation ---------- */
  animation: {
    enabled: true,           // false turns off ALL animation
    hoverFade: 250           // fade in / fade out time of the hover box on the email
  },

  /* ---------- Opacity of each part of the page ---------- */
  opacity: {
    name: 1,
    about: 1,
    email: 1,
    socials: 1,
    footer: 0.7
  },

  /* ---------- Background video, overlay color and noise ---------- */
  background: {
    video: "https://cdn.pixabay.com/video/2021/09/10/88116-602317818_large.mp4",
    poster: "",              // optional image shown while the video loads
    dimColor: "#000309",     // color laid over the video (any color: "black", "#000000", ...)
    dim: 0.7,                // strength of that color: 0 = video fully visible, 1 = solid color
    noise: {
      enabled: false,
      opacity: 0.22,         // strength of the gray noise
      grain: 0.8,            // grain fineness: higher = finer
      size: 240,             // size of the noise tile in px
      animate: false          // gentle film-grain flicker
    }
  },

  /* ---------- Colors, font and sizes ---------- */
  theme: {
    pageBg: "#000309",       // page color behind the video
    text: "#ffffff",
    barBg: "#000309",        // color of the hover box
    barOpacity: 0.7,         // opacity of the hover box
    font: "'Newsreader', 'Times New Roman', Times, serif",   // font family used everywhere
    fontUrl: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..500&display=swap",
                             // link that loads the font (Google Fonts "embed" link). Leave "" for a font already on the computer.
    fontFiles: [],           // OR use your own font files, e.g.
                             // [{ file: "fonts/MyFont-Regular.woff2", weight: 400, style: "normal" },
                             //  { file: "fonts/MyFont-Italic.woff2",  weight: 400, style: "italic" }]
                             // then set font to "'CustomFont', serif"
    uppercase: true,         // false = normal capitalisation (email stays lowercase)
    aboutUppercase: false,   // true = about me text in capitals, false = shown exactly as you type it
    barWidth: "90%",         // width of the email hover box (use "100%" for edge to edge)
    fontSize: 19,            // about me text (px)
    nameSize: 22,            // your name (px)
    emailSize: 19,           // email (px)
    footerSize: 13,          // footer text size, the copyright line (px)
    iconSize: 20,          // social icon size in px (null = same as smallSize)
    iconGap: 15,             // space between social icons (px)
    contentGap: 35,// space between about me, email and social icons (px)
    socialHover: false       // true = social icons also get the hover box
  },

  /* ---------- Phone / small screens ----------
     These values replace the ones above when the screen is narrower than `breakpoint`.
     Delete a line (or set it to null) to keep the desktop value. */
  mobile: {
    breakpoint: 600,         // screens narrower than this many px count as a phone
    fontSize: 15,            // about me text
    nameSize: 18,            // your name
    emailSize: 16,           // email
    footerSize: 12,          // footer text size
    iconSize: 22,            // social icons (a bit bigger so they are easy to tap)
    iconGap: 22,             // space between social icons
    contentGap: 24,          // space between about me, email and social icons
    barWidth: "100%",        // width of the email hover box
    pagePadding: 20,         // space around the page edge (px)
    loaderFontSize: 12       // loading screen usernames
  }
};
