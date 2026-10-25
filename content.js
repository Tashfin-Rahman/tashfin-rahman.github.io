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
    github: null,           // optional
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
    "BBA student at North South University with over two years of hands-on accounting experience in online retail. I am Partner and Chief Business Officer at Home Inn, an architecture, interiors and custom-furniture firm that has delivered 130 projects across 13 districts of Bangladesh since 2015, where I run the budgeting, cost tracking and bookkeeping. I also advise Haifa Intelligence, an AI studio, on marketing.",
    "I'm now building my own agency, bringing together the two things I keep coming back to: keeping a business's numbers straight, and using AI tools to make its marketing actually land.",
    "My research interest is in how data can support financial decisions — lending, budgeting and cost forecasting in particular.",
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
      note: "Architecture, interiors and custom furniture, designed and built across Bangladesh since 2015 under the trade licence of M/S Ahasan Enterprise — 73 corporate and 57 residential projects in 13 districts.",
      link: "https://homeinn.xyz",
      bullets: [
        "Co-own the business and share in key decisions on direction, spending and growth with the other partners.",
        "Run budgeting, cost tracking and bookkeeping, and prepare the financial summaries the partners plan against.",
        "Set advertising strategy across the firm's four lines: architectural design, interior design and implementation, custom furniture, and property.",
      ],
    },
    {
      role: "AI Marketing Advisor",
      org: "Haifa Intelligence",
      location: "Dhaka, Bangladesh",
      start: "2026",
      end: "Present",
      // Shown in smaller type under the role, to explain an org people won't know.
      note: "AI studio that trains its own business-tailored models and ships and hosts them privately for individual and commercial clients.",
      link: "https://haifa-ai.com",
      bullets: [
        "Advise on campaign ideas, messaging and target audiences for AI-made posters and promotional videos.",
        "Translate what client businesses need into clear requirements for their custom AI models.",
        "Review generated content for brand fit and clarity before it reaches clients.",
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
        "Kept the daily books for sales, payments and expenses, and matched incoming payments against orders.",
        "Monitored transactions to flag unusual fluctuations, and planned accordingly.",
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
        "Home Inn had been building since 2015 without one consistent public face. The website said \u201cHome Inn\u201d, while the logo and the invoices carried a different version of the name, and there was no agreed palette or print specification.",
      did:
        "Designed the identity and built it out: the logo in thirteen variants for signage, app icons and print; a five-colour palette with fixed hex values; double-sided visiting cards supplied to the printer as CMYK with bleed and crop marks; social covers and highlight icons; and a twenty-page company profile.",
      outcome:
        "One name and one look across the website, print, signage and social, and a profile the firm can hand to a prospective corporate client.",
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
        "Residential design at Home Inn runs from the first site visit and measurements through 2D plans and 3D views, revised with the client until the design is signed off and costed.",
      did:
        "I am Partner and Chief Business Officer. The drawings are the studio's; my side is the budgeting, cost tracking and project costing that decide whether a design can be built to the client's number.",
      outcome:
        "Home Inn has designed and built across Bangladesh since 2015, with 57 residential projects in 13 districts to date.",
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
        "A made-to-order line \u2014 wardrobes, dressing units, workstations, executive desks and display shelving \u2014 where each piece is drawn for the room it will stand in rather than picked from a catalogue.",
      did:
        "Made-to-order work only pays if every piece is costed properly before it is quoted. Costing and pricing this line is my part of it, alongside the books.",
      outcome:
        "Built in Home Inn's own workshop, which keeps the margin and the quality control in-house instead of with a subcontractor.",
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
        "Home Inn builds duplex and triplex homes alongside the interiors work, with one team from the first visit through construction, fit-out and after-service.",
      did:
        "Construction is where a budget goes wrong quietly. I track cost against plan as the job runs, so an overrun shows up while there is still time to act on it.",
      outcome:
        "Part of a body of work covering 73 corporate and 57 residential projects across 13 districts of Bangladesh.",
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
      method: "Team machine learning project comparing five classifiers, with leak-free, cross-validated evaluation. My contribution was the banking side: explaining how lenders actually weigh credit history, income and loan amount.",
      finding: "Framed model errors in lending terms rather than accuracy alone — approving a risky loan costs a lender far more than declining a safe one, so the two error types can't be treated as equivalent.",
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
        "Helped plan and run the club's science fairs, from scheduling and logistics to coordinating participants.",
        "Handled executive and administrative work for the club committee.",
      ],
    },
  ],

  /* --------------------------------------------------------------------------
     9. CERTIFICATIONS & AWARDS — empty, so the section stays hidden.
     ----------------------------------------------------------------------- */
  certifications: [],
};
