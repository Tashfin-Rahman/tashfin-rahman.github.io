/* ============================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT.
   ----------------------------------------------------------------------------
   Everything on the site comes from this object. Add a job, a project or a
   piece of work here and the page picks it up on reload. No HTML to touch.

   Rules:
   - Any section you leave as an empty array []  disappears from the page and
     the nav entirely. Nothing renders half-empty.
   - Set a value to null (not "") when you don't have it, e.g. cvFile: null.
   - Dates are plain strings, so write them however you like ("Jan 2025",
     "2026", "Summer 2025"). Use end: "Present" for anything ongoing.

   Anything marked TODO still needs your input.
   ========================================================================= */

window.CV = {
  /* --------------------------------------------------------------------------
     1. WHO YOU ARE — drives the hero, the browser tab, and Google results.
     ----------------------------------------------------------------------- */
  meta: {
    name: "Tashfin Rahman",
    tagline: "Business finance and AI-assisted marketing",

    // The line Google prints under your name in search results, and the one
    // that shows when someone shares the link. Keep it under about 155
    // characters or it gets cut off mid-sentence.
    description:
      "Tashfin Rahman, Partner and Chief Business Officer at Home Inn in Dhaka. Business finance, costing and marketing, with selected work and a CV to download.",

    // Suburb-level detail left off deliberately: your CV goes to people you
    // chose, this page is public. Change it if you'd rather be precise.
    location: "Dhaka, Bangladesh",

    // Where the site lives. Used for the social and search-engine tags.
    siteUrl: "https://tashfin-rahman.github.io",

    // --- Contact ---------------------------------------------------------
    // You chose email + phone. Both are public here, so expect some spam and
    // the odd cold call. Switch contactMode to "form" any time to hide them.
    //   "email"    — mailto link (and the phone below, if set)
    //   "form"     — a form posting to formEndpoint; nothing exposed
    //   "linkedin" — LinkedIn button only
    contactMode: "email",
    email: "tashfinrahman010@gmail.com",
    phone: "+880 1568 116144",
    formEndpoint: null,

    linkedin: "https://www.linkedin.com/in/tashfin-rahman-24712828b",
    github: "https://github.com/Tashfin-Rahman",

    // Other accounts that are the SAME person. These are never shown on the
    // page — they go into the structured data only, so search engines can
    // tie the accounts together and tell you apart from your namesakes.
    profiles: [
      "https://www.facebook.com/tashfin.islam.216294",
      "https://www.instagram.com/t_tash__",
    ],

    // Several people share this name and were outranking you. This single
    // sentence is what search engines and AI assistants use to tell you
    // apart from them, so keep it specific: city, employer, field.
    disambiguation:
      "The Tashfin Rahman based in Dhaka, Bangladesh who is Partner and Chief Business Officer at Home Inn, an architecture and interiors firm, and a BBA student at North South University. Not to be confused with others of the same name.",
    cvFile: "assets/cv.pdf",

    // Full-width photo across the top of the page. Wants a LANDSCAPE image,
    // ideally 2000px wide or more — see assets/README.md for what works.
    //
    // PRE-WIRED: save your photo as assets/tashfin-rahman.jpg and it appears
    // next reload, with no code change needed. Until that file exists the
    // hero quietly falls back to the plain text layout (you'll see one
    // harmless 404 in the browser console; it goes away once the file is in).
    heroBanner: "assets/tashfin-rahman.jpg",

    headshot: null,         // optional small circular photo, square crop
  },

  /* --------------------------------------------------------------------------
     2. ABOUT
     ----------------------------------------------------------------------- */
  about: [
    "I am Partner and Chief Business Officer at Home Inn, and a BBA student at North South University. Home Inn has designed and built architecture, interiors and custom furniture since 2015, 130 projects across 13 districts of Bangladesh. I look after the budgeting, cost tracking and bookkeeping, and I designed the firm's brand identity and its company profile. I also advise Haifa Intelligence, an AI studio, on marketing. Before this I spent two and a half years keeping the books for an online store.",
    "I am building an agency of my own. Most small businesses I meet here have either their numbers in order or their marketing in order, rarely both. That gap is where I want to work.",
    "I am interested in how data helps with financial decisions, particularly in lending, budgeting and cost forecasting.",
  ],

  /* --------------------------------------------------------------------------
     3. EXPERIENCE — most recent first.
     ----------------------------------------------------------------------- */
  experience: [
    /* When the agency is ready to list, add a block here — entries render in
       the order they appear, so the newest venture goes at the top:
         {
           role: "Founder",
           org: "Agency name",
           location: "Dhaka, Bangladesh",
           start: "2026",
           end: "Present",
           bullets: ["What it does and for whom.", "What you handle day to day."],
         },
    */
    {
      role: "Partner & Chief Business Officer",
      org: "Home Inn",
      location: "Dhaka, Bangladesh",
      start: "2026",
      end: "Present",
      note: "Architecture, interiors and custom furniture, built across Bangladesh since 2015 under the trade licence of M/S Ahasan Enterprise. 73 corporate and 57 residential projects in 13 districts.",
      link: "https://homeinn.xyz",
      bullets: [
        "Co-own the firm and share decisions on direction, spending and growth with the other partners.",
        "Keep the budgets, track costs and do the bookkeeping. The partners plan against the summaries I prepare.",
        "Set the advertising approach across all four lines of work: architectural design, interiors, custom furniture and property.",
        "Designed the firm's brand identity, from the logo and colour palette through to print-ready visiting cards, and wrote the twenty-page company profile we send to corporate clients.",
      ],
    },
    {
      role: "AI Marketing Advisor",
      org: "Haifa Intelligence",
      location: "Dhaka, Bangladesh",
      start: "2026",
      end: "Present",
      // Shown in smaller type under the role, to explain an org people won't know.
      note: "An AI studio that trains its own business-tailored models and hosts them privately for individual and commercial clients.",
      link: "https://haifa-ai.com",
      bullets: [
        "Advise on campaign ideas, messaging and audiences for posters and promotional videos made with AI.",
        "Turn what a client actually needs into clear requirements for their custom model.",
        "Check the generated work for brand fit and clarity before it goes to the client.",
      ],
    },
    {
      role: "Senior Accountant",
      org: "Steam Store Bangladesh",
      location: "Dhaka, Bangladesh",
      start: "Jul 2022",
      end: "Jan 2025",
      note: "Online store selling digital products.",
      bullets: [
        "Kept the daily books for sales, payments and expenses, and matched incoming payments to orders.",
        "Watched the daily transactions for anything out of the ordinary and raised it early.",
        "Prepared regular sales and expense reports in Google Sheets for management.",
      ],
    },
  ],

  /* --------------------------------------------------------------------------
     4. SELECTED WORK — the place to post what you make.
     ----------------------------------------------------------------------------
     This section is hidden while the list is empty, so nothing half-finished
     ships. Add your first piece and it appears, along with its nav link.

     Copy this template into the array below for each piece:

       {
         title: "Ramadan campaign for a local restaurant",
         client: "Client name, or null to keep it private",
         date: "Mar 2026",
         type: "Campaign",          // Campaign / Poster series / Case study / Video
         image: "assets/work/ramadan.jpg",   // optional; square-ish or 4:3 works best
         brief: "What the client needed, in one sentence.",
         did: "What you actually made and how.",
         outcome: "What came of it — reach, enquiries, sales, repeat business. A number if you have one; drop the line entirely if you don't.",
         link: null,                // optional: a live post, a PDF, a drive folder
       },

     Only `title` is required. Any field you leave out is simply not shown, so
     a piece with just a title, an image and a one-line brief still looks right.
     ----------------------------------------------------------------------- */
  work: [
    {
      title: "Brand identity and company profile for Home Inn",
      client: "Home Inn",
      date: "2026",
      type: "Brand identity",
      ratio: "16 / 10",
      fit: "contain",
      image: [
        {
          src: "assets/work/home-inn-brand-visiting-card-front.jpg",
          alt: "Home Inn visiting card, front \u2014 logo and the line All Under One Roof",
        },
        {
          src: "assets/work/home-inn-brand-visiting-card-back.jpg",
          alt: "Home Inn visiting card, back \u2014 contact details for Tashfin Rahman, Partner and Chief Business Officer",
        },
        {
          src: "assets/work/home-inn-brand-colour-palette.jpg",
          alt: "Home Inn brand colour palette \u2014 five colours with hex values: cherry red, burgundy, stone grey, black and white",
        },
        {
          src: "assets/work/home-inn-brand-social-cover.jpg",
          alt: "Home Inn social media cover in a blueprint style, listing architecture, interiors, construction, custom furniture and property sales",
        },
      ],
      brief:
        "The firm had been working since 2015 without a settled public face. The website gave one version of the name, the logo and invoices another, and there was no agreed palette or print specification.",
      did:
        "I designed the identity and made the pieces that came out of it: thirteen logo variants for signage, app icons and print, a five-colour palette with fixed values, double-sided visiting cards supplied to the printer as CMYK with bleed and crop marks, social covers and highlight icons, and a twenty-page company profile.",
      outcome:
        "The firm now uses one name and one look across its website, print, signage and social accounts, and has a profile it can hand to a prospective client.",
      link: "https://homeinn.xyz",
    },
    {
      title: "Architectural design and 3D visualisation",
      client: null,                 // residential clients are named only with permission
      date: "2024 \u2013 2026",
      type: "Architecture",
      ratio: "4 / 3",
      image: [
        {
          src: "assets/work/home-inn-modern-house-design-dhaka.jpg",
          alt: "Modern house design by Home Inn, Dhaka \u2014 3D visualisation of a rendered facade with timber screening",
        },
        {
          src: "assets/work/home-inn-residential-exterior-render.jpg",
          alt: "Home Inn residential exterior render showing a white rendered elevation and terrace",
        },
        {
          src: "assets/work/home-inn-architectural-elevation-bangladesh.jpg",
          alt: "Home Inn architectural elevation for a residence in Bangladesh, shown as a 3D view",
        },
      ],
      brief:
        "Residential work starts with a site visit and measurements, then 2D plans and 3D views, revised with the client until the drawings are signed off and costed.",
      did:
        "The drawings are the studio's work. Mine is the costing behind them, working out whether a design can be built for what the client wants to spend.",
      outcome:
        "57 residential projects across 13 districts so far.",
      link: "https://homeinn.xyz",
    },
    {
      title: "Custom furniture, made in our own workshop",
      client: null,
      date: "Ongoing",
      type: "Custom furniture",
      ratio: "4 / 5",
      image: [
        {
          src: "assets/work/home-inn-carved-wooden-wardrobe.jpg",
          alt: "Carved wooden wardrobe made to order by Home Inn, Dhaka",
        },
        {
          src: "assets/work/home-inn-mirrored-dressing-unit.jpg",
          alt: "Mirrored dressing unit in wood, custom made by Home Inn",
        },
        {
          src: "assets/work/home-inn-office-workstation-desk.jpg",
          alt: "Office workstation desk with drawer pedestal, custom built by Home Inn",
        },
        {
          src: "assets/work/home-inn-steel-display-shelving.jpg",
          alt: "Steel display shelving unit for a retail showroom, made by Home Inn",
        },
      ],
      brief:
        "Wardrobes, dressing units, workstations, desks and display shelving, all made to order. Each piece is drawn for the room it will stand in rather than picked from a catalogue.",
      did:
        "I cost and price this line before anything is quoted. Nothing here is standard, so each piece has to be worked out on its own.",
      outcome:
        "Everything is built in our own workshop, so the margin and the quality control stay with us.",
      link: "https://homeinn.xyz/en/furniture",
    },
    {
      title: "Duplex and triplex construction",
      client: null,
      date: "Since 2015",
      type: "Construction",
      ratio: "4 / 5",
      image: [
        {
          src: "assets/work/home-inn-duplex-residence-bangladesh.jpg",
          alt: "Completed duplex residence built by Home Inn in Bangladesh, front elevation",
        },
      ],
      brief:
        "We build duplex and triplex homes alongside the interiors work, with one team from the first visit through construction, fit-out and after-service.",
      did:
        "I track cost against plan while the job is running, so an overrun shows up early enough to do something about it.",
      outcome:
        "Part of 73 corporate and 57 residential projects across 13 districts.",
      link: "https://homeinn.xyz",
    },
  ],

  /* --------------------------------------------------------------------------
     5. EDUCATION
     ----------------------------------------------------------------------- */
  education: [
    {
      degree: "Bachelor of Business Administration (Hons.)",
      institution: "North South University",
      location: "Dhaka, Bangladesh",
      start: "Summer 2025",
      end: "Present",
      result: null,          // add a CGPA here once it's worth showing
      details: [],           // TODO (optional): relevant coursework, any award
    },
  ],

  /* --------------------------------------------------------------------------
     6. PROJECTS & ANALYSES
     ----------------------------------------------------------------------- */
  projects: [
    {
      title: "CreditSense AI — Loan Approval Prediction",
      period: "Banking domain contributor",
      question: "Which model predicts loan approval most reliably, and how should the errors be weighted when a bank is the one acting on them?",
      method: "A team project comparing five classifiers, evaluated leak-free and cross-validated. I covered the banking side, explaining how lenders weigh credit history, income and loan amount.",
      finding: "We judged the models on what their mistakes would cost rather than on accuracy alone. Approving a bad loan costs a lender far more than turning down a good one, so the two mistakes should not carry equal weight.",
      tools: ["Python", "scikit-learn"],
      link: "https://github.com/Danial-Dirar/CreditSense-AI",
    },
  ],

  /* --------------------------------------------------------------------------
     7. SKILLS
     ----------------------------------------------------------------------- */
  skills: [
    {
      group: "Business & Marketing",
      items: ["Business analytics", "Market research", "Campaign planning", "AI-assisted content marketing"],
    },
    {
      group: "Finance & Accounting",
      items: ["Bookkeeping", "Budgeting", "Cost tracking", "Financial reporting", "Project costing"],
    },
    {
      group: "Tools",
      items: ["Microsoft Excel", "Word", "PowerPoint", "Google Sheets", "Generative AI tools"],
    },
    {
      group: "Soft skills",
      items: ["Team leadership", "Public speaking", "Event planning", "Working across teams"],
    },
    {
      group: "Languages",
      items: ["Bangla (native)", "English (fluent)"],
    },
    {
      group: "Research interests",
      items: ["Budget and cost forecasting", "Business data collection", "AI applications in finance"],
    },
  ],

  /* --------------------------------------------------------------------------
     8. LEADERSHIP & ACTIVITIES
     ----------------------------------------------------------------------- */
  leadership: [
    {
      role: "Assistant Organizing Secretary",
      org: "Monipur School and College Science Club",
      location: "Dhaka, Bangladesh",
      start: "Dec 2021",
      end: "Dec 2022",
      bullets: [
        "Helped plan and run the club's science fairs, from scheduling and logistics to looking after participants.",
        "Handled executive and administrative work for the club committee.",
      ],
    },
  ],

  /* --------------------------------------------------------------------------
     9. CERTIFICATIONS & AWARDS — empty, so the section stays hidden.
     ----------------------------------------------------------------------- */
  certifications: [],
};
