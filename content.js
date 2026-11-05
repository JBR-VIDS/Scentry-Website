/* ==========================================================================
   SCENTRY: SITE CONTENT
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit for words, links, and numbers.
   Photos are separate: drop image files into the "photos" folder
   (see README.md for the exact file names).

   QUICK RULES
   - Text goes inside "quote marks". Keep the commas at the end of each line.
   - To use a quote mark INSIDE text, put a backslash first:  \"like this\"
   - Lines starting with // are notes for humans. The website ignores them.
   - If the site shows a red "content.js has a problem" box, a comma, quote
     mark, or bracket went missing in your last edit. Undo it.
   - Lines marked  CONFIRM  are my best guess. Check them before you publish.
   ========================================================================== */

window.SITE = {

  settings: {
    // true  = empty spots (photos, team cards, contact) show a dashed "add this" box. Good while building.
    // false = empty spots are hidden, so the public site never shows gaps.
    showPlaceholders: true,
  },

  /* ---------- Basics ---------- */
  brand: {
    name: "Scentry",
    tagline: "Odor removal for sports gear.",
    // Your contact email. Leave "" until you want one shown.
    email: "Scentry2028@gmail.com",
    // Link to a Google Form survey, or "" to hide the button.
    surveyUrl: "",
    // The incubator program, if you want it credited. Leave name "" to hide.
    // YouTube: paste the channel link, and the link to each video (up to a few). Leave "" / [] to show a "coming soon" box.
    //   videos: [ { title: "Meet Scentry", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" } ]
    youtubeChannel: "https://www.youtube.com/@Scentry-Official",
    videos: [],
    incubator: { name: "Incubator EDU", url: "" },   // add the program's web address in url if you want it linked
  },

  /* ---------- Top of the page ---------- */
  hero: {
    headline: "Your gear shouldn't give you away.",
    text: "Cleats, bags, pads, and helmets hold on to sweat long after practice ends. Scentry is a student-built way to get the smell out, made for high school athletes, their moms, and their coaches.",
    primaryLabel: "Follow the project",      // goes to the Contact section
    toggleOff: "Without Scentry",
    toggleOn: "With Scentry",
  },

  /* ---------- The problem ---------- */
  problem: {
    title: "Most gear can't go in the wash.",
    intro: "So the smell stays, practice after practice. These are the places it hides.",
    items: [
      { name: "Cleats and shoes", why: "Closed, warm, and damp every time they come off." },
      { name: "Gym and duffel bags", why: "Everything that smells ends up zipped inside together." },
      { name: "Pads, guards, and helmets", why: "Foam and padding soak up sweat and don't dry fast." },
      { name: "Gloves and mouthguard cases", why: "Small, always damp, and carried everywhere." },
    ],
  },

  /* ---------- Who it is for ---------- */
  audience: {
    title: "Built for the people who live with the smell.",
    intro: "High school sports put the same gear in the same bag, car, and locker room every day. Three groups feel it most.",
    // CONFIRM: these describe each group in your own words. Update them as your interviews teach you more.
    groups: [
      { who: "High school athletes", text: "They carry the gear everywhere and are the ones who get teased when the bag gives them away." },
      { who: "Moms of athletes", text: "They smell it in the car and the laundry room, and they are usually the ones who deal with it." },
      { who: "Coaches", text: "They manage shared equipment bags, locker rooms, and team gear that no one has time to clean." },
    ],
  },

  /* ---------- What Scentry is ---------- */
  product: {
    title: "What we are building",
    lead: "Scentry is a two-in-one sprayer for sports gear: one bottle of antibacterial spray, one of mint, and a slider on top that picks which one the button sprays.",
    goals: [
      { title: "Two solutions, one button", text: "Slide to 1 for the antibacterial spray or 2 for the mint. Raised dimples on top tell you which is which by touch." },
      { title: "A real lock", text: "Slide to LOCK and the button cannot be pressed. The lid is a second lock, so it is designed not to go off inside a gym bag." },
      { title: "Built around bottles you can buy", text: "The body is two standard 2 oz spray bottles. We 3D print the frame, selector, and lid, so a bottle is easy to swap or refill." },
    ],
    status: "Prototype V2",              // small badge on the model
    // The interactive 3D model. Leave file "" to show the photo box instead.
    model: { file: "models/scentry-model.json", caption: "Our real CAD model. Drag to turn it." },
  },

  /* ---------- What we have learned (customer discovery) ---------- */
  discovery: {
    title: "We are listening first.",
    intro: "Before building more, we are asking the people who live with the gear: high school athletes, their moms, and their coaches.",
    questions: [
      "How often does the gear smell, and what do you do about it now?",
      "What have you already tried, and why did it not stick?",
      "What would you pay to make it go away?",
    ],
    // Add real numbers from your survey when you have them, for example:
    //   { value: "42", label: "athletes and parents surveyed" },
    // Leave empty ( [] ) until then. Do not publish numbers you have not collected.
    stats: [],
    // Short quotes from interviews (with permission). Leave empty ( [] ) for none.
    //   { text: "I keep my cleats in the garage.", who: "High school soccer player" }
    quotes: [],
  },

  /* ---------- Where we are ---------- */
  progress: {
    title: "Where we are",
    // status: "done", "now", or "next".  CONFIRM all four.
    steps: [
      { status: "done", title: "Chose the problem", text: "Gear odor, and why washing is not an option." },
      { status: "done", title: "Started customer discovery", text: "Surveys and interviews with athletes, moms, and coaches." },
      { status: "now",  title: "Building and testing prototypes", text: "Version 2 of the 3D-printed design, with a fit-test print to check every part." },
      { status: "next", title: "Small pilot with a local team", text: "Real gear, real practices, honest feedback." },
    ],
  },

  /* ---------- The team (photos: photos/team/<first name in lowercase>.jpg) ---------- */
  teamSection: {
    title: "Who is behind it",
    intro: "A student team, with a parent mentor in their corner.",
    // Names are your call. Only publish names and photos with permission, and for
    // students under 18, with a parent's OK. First names only is a common choice.
    //   { name: "Alex", role: "Product and testing" }
    members: [],
    emptyPreviewCount: 3,
  },

  /* ---------- Questions ---------- */
  faq: {
    title: "Questions",
    items: [
      // CONFIRM each answer is true today.
      { q: "Can I buy Scentry?", a: "Not yet. We are a student project at the prototype stage. Follow along below and we will share news when there is some." },
      { q: "Who is making it?", a: "A student team, supported by a parent mentor, as part of Incubator EDU." },
      { q: "What is inside it?", a: "Two standard 2 oz spray bottles, one with an antibacterial solution and one with a mint solution, held in a 3D-printed frame with a slide selector on top." },
      { q: "How can I help?", a: "Answer our short survey, tell us what you have tried on your own gear, or let us test with your team. We especially want to hear from high school athletes, moms, and coaches." },
      { q: "Is it safe?", a: "We will not make safety or performance claims until we have tested them properly. Anything we publish here will say how we know." },
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    title: "Follow along",
    text: "Tell us about the worst-smelling bag you own. Seriously, it helps.",
  },

  footerNote: "Scentry is a student project. What we describe here is what we are building and testing, not a guarantee.",
};
