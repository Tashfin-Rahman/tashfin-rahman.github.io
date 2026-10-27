/* The Home Inn brand identity entry, parked on 2026-10-27 at Tashfin's
   request: he wants to supply other work before Selected Work goes back on
   the site. Nothing is lost. Paste this array over `work: []` in content.js
   and the section and its nav link return.

   The three images are still in assets/work/:
     home-inn-logo-variants.jpg   contact sheet of the thirteen logo variants
     home-inn-brand-palette.jpg   the five brand colours with hex values
     home-inn-visiting-card.jpg   front of the card

   The back of the card was deliberately never published: it carries the
   factory address, a hotline and an email that are not otherwise public.

   This supersedes the older, longer version in work-entries.js, whose three
   Home Inn pieces described the firm's work rather than his. */

  work: [
    {
      title: "Home Inn brand identity",
      client: "Home Inn",
      date: "2026",
      type: "Brand identity",

      // fit: "contain" because a logo sheet must not be cropped the way a
      // photograph can be. ratio keeps the three shots the same height.
      fit: "contain",
      ratio: "4 / 3",
      image: [
        {
          src: "assets/work/home-inn-logo-variants.jpg",
          alt: "Thirteen variants of the Home Inn logo designed by Tashfin Rahman: primary, shadowed, three-dimensional, gradient, dark, backlit, outline, monochrome, reversed on burgundy and app icons",
        },
        {
          src: "assets/work/home-inn-brand-palette.jpg",
          alt: "The five-colour Home Inn palette designed by Tashfin Rahman: Cherry Red C2272D, Burgundy 7A1B2B, Stone Grey 6B6A68, Black 1D1E20 and White F5F5F3",
        },
        {
          src: "assets/work/home-inn-visiting-card.jpg",
          alt: "Front of the Home Inn visiting card designed by Tashfin Rahman, showing the roof monogram and the line All under one roof",
        },
      ],

      brief:
        "Home Inn had been building across Bangladesh since 2015 without a settled identity. Every sign, card and document was drawn from scratch, so no two looked related, and there was nothing to send a corporate client who asked what the firm was.",
      did:
        "I designed the mark, an H that reads as a roof, and built it out into thirteen variants so there is a correct file for every surface: flat, shadowed, three-dimensional, outline, monochrome, reversed out of burgundy, and app icons. I set a five-colour palette around Cherry Red and Burgundy, drew the visiting cards and supplied them print-ready in CMYK with bleed, and wrote and laid out the twenty-page company profile the firm sends to prospective clients.",
      outcome:
        "One set of files now covers every surface the firm needs, so nobody redraws the logo to put it on something. The profile is what goes to a corporate client who asks what Home Inn is, and the cards are the ones we hand out.",
      link: "https://homeinn.xyz",
    },
  ],
