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
      "Tashfin Rahman, Partner and Chief Business Officer at Home Inn in Dhaka. Business finance, costing and marketing, with writing and a CV to download.",

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

    // The two-sentence profile at the top of the one-page CV. The About
    // section on the site is longer; a CV cannot afford that.
    cvProfile:
      "Partner and Chief Business Officer at Home Inn, a Dhaka firm that designs and builds architecture, interiors and custom furniture. BBA student at North South University with a background in accounting, budgeting and cost tracking, and an interest in how data supports financial decisions.",

    linkedin: "https://www.linkedin.com/in/tashfinrahman",
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

    // --- Visitor counting -------------------------------------------------
    // Null means no analytics at all and no third-party script on the page.
    //
    // To switch it on: make a free account at goatcounter.com, pick a code
    // (it becomes <code>.goatcounter.com), and put that code here. Nothing
    // else to change; it covers the home page and every written piece.
    //
    // GoatCounter sets no cookies and stores no personal data, so this needs
    // no consent banner and no privacy policy.
    analytics: null,
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
     2b. REACH — the map of where the work has been.
     ----------------------------------------------------------------------------
     Empty the `districts` list and the whole section disappears, map and all.

     Names are matched against a table of every district in Bangladesh, held
     in app.js, spelled the way the government spells them: Barishal,
     Chattogram, Cumilla, Bogura, Jashore, Jhenaidah. A name that is not in
     that table is skipped quietly, so check your spelling if a dot is
     missing.
     ----------------------------------------------------------------------- */
  reach: {
    heading: "Where the work has been",
    lead:
      "Home Inn has designed, built and fitted out across Bangladesh since 2015: corporate offices and banks, showrooms, resorts and homes. These are the districts its company profile names by project.",

    // Counted up from zero as the section scrolls into view. `plain` keeps a
    // year written as 2015 rather than 2,015.
    stats: [
      { value: 2015, label: "building since", plain: true },  // plain: shown as a year, not counted
      { value: 130, label: "projects delivered" },
      { value: 13, label: "districts reached" },
    ],

    // Drawn slightly larger than the rest. Leave it out for no emphasis.
    home: "Dhaka",

    districts: [
      "Dhaka",
      "Narayanganj",
      "Narsingdi",
      "Manikganj",
      "Tangail",
      "Gopalganj",
      "Natore",
      "Rangpur",
      "Sylhet",
      "Noakhali",
      "Chattogram",
      "Barishal",
    ],

    note:
      "Twelve districts are named by project in the company profile. The firm's own figure is thirteen, so one is not listed there; add it to the list above and it appears on the map.",
  },

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
      cvBullets: [
        "Co-own the firm and share decisions on direction, spending and growth.",
        "Run budgeting, cost tracking and bookkeeping, and prepare the summaries the partners plan against.",
        "Set the advertising approach, and designed the firm's brand identity and company profile.",
      ],
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
      cvBullets: [
        "Advise on campaign ideas, messaging and audiences for AI-made posters and videos.",
        "Turn client needs into clear requirements for custom models, and check output for brand fit.",
      ],
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
      cvBullets: [
        "Kept the daily books for sales, payments and expenses, and matched payments to orders.",
        "Prepared regular sales and expense reports in Google Sheets for management.",
      ],
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
  work: [],

  /* --------------------------------------------------------------------------
     4b. WRITING \u2014 pieces you have published, newest first.
     ----------------------------------------------------------------------------
     Each one lives as its own page under /writing/, so it has its own address
     and can turn up in a search on its own. Add a piece here and it appears in
     this section and in the nav.

       {
         title: "What the piece is called",
         date: "Oct 2026",
         summary: "One or two sentences. This is what people read before deciding to click.",
         url: "writing/some-slug/",
       }
     ----------------------------------------------------------------------- */
  writing: [
    {
      title: "Keeping the books for a shop and for a project business",
      date: "Oct 2026",
      summary:
        "A shop's books are a volume problem and a project business's books are a timing problem. What changes between them, and the habit I had to drop carrying one over to the other.",
      url: "writing/bookkeeping-shop-vs-project/",
    },
    {
      title: "What you are actually paying for in a fit-out quote",
      date: "Oct 2026",
      summary:
        "Most people ask for a price before anyone has seen the room, and a price given at that stage has to be padded. Here is how a quote is actually built, what moves it, and what a client can do to keep it steady.",
      url: "writing/fit-out-quote/",
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
      cvLine: "Team project comparing five loan-approval models. I covered the banking side and framed model errors in lending terms.",
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
      cvLine: "Helped plan and run the club's science fairs and handled committee administration.",
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
