/* ============================================================================
   app.js — renders content.js into index.html and runs the motion.
   You shouldn't need to edit this file to change what's on the site; add your
   details to content.js instead.
   ========================================================================= */
(function () {
  "use strict";

  var CV = window.CV;
  if (!CV) {
    document.getElementById("main").textContent =
      "content.js did not load. Check that it sits next to index.html.";
    return;
  }

  var meta = CV.meta || {};

  /* --- Small helpers ----------------------------------------------------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    // textContent, never innerHTML: content stays plain text, so an ampersand
    // or an angle bracket in a job title can't break the page.
    if (text != null && text !== "") node.textContent = text;
    return node;
  }

  function filled(value) {
    return value != null && String(value).trim() !== "";
  }

  // "+880 1568 116144" -> "tel:+8801568116144"; a tel: link must not carry
  // the spaces that make the number readable on screen.
  function telHref(phone) {
    return "tel:" + String(phone).split(" ").join("");
  }

  // A TODO left in content.js should still show on the page — that's how you
  // remember to fill it — but it must never reach the structured data, where
  // search engines would read it as your real employer.
  function isPlaceholder(value) {
    return filled(value) && String(value).trim().toUpperCase().indexOf("TODO") === 0;
  }

  // "Jan 2025" + "Present" -> "Jan 2025 — Present"; a missing end just shows
  // the start, so a one-off (a certificate, a single year) reads correctly.
  function dateRange(start, end) {
    if (filled(start) && filled(end)) return start + " — " + end;
    return filled(start) ? String(start) : filled(end) ? String(end) : "";
  }

  // Marks a node for the scroll-reveal engine. `kind` picks the movement:
  // "" rises, "slide" comes in from the left, "pop" scales up.
  function reveal(node, kind) {
    node.setAttribute("data-reveal", kind || "");
    return node;
  }

  function appendTags(parent, items) {
    if (!Array.isArray(items) || !items.length) return;
    var tags = el("div", "tags");
    items.filter(filled).forEach(function (item) {
      tags.appendChild(el("span", "tag", item));
    });
    parent.appendChild(tags);
  }

  /* --- Section registry --------------------------------------------------
     Each section declares its nav label and a render function that returns
     true when it actually produced something. Anything returning false gets
     pulled out of the document, so an empty array in content.js leaves no
     stray heading and no dead nav link.
     -------------------------------------------------------------------- */

  var sections = [
    { id: "about", label: "About", render: renderAbout },
    { id: "experience", label: "Experience", render: renderExperience },
    { id: "reach", label: "Reach", render: renderReach },
    { id: "work", label: "Work", render: renderWork },
    { id: "blog", label: "Blog", render: renderWriting },
    { id: "projects", label: "Projects", render: renderProjects },
    { id: "education", label: "Education", render: renderEducation },
    { id: "skills", label: "Skills", render: renderSkills },
    { id: "leadership", label: "Leadership", render: renderLeadership },
    { id: "certifications", label: "Certifications", render: renderCertifications },
    { id: "contact", label: "Contact", render: renderContact },
  ];

  /* --- Head -------------------------------------------------------------- */

  function renderHead() {
    var name = filled(meta.name) ? meta.name : "Portfolio";
    var lead = (CV.experience || []).filter(function (e) {
      return filled(e.org) && !isPlaceholder(e.org);
    })[0];
    // A sentence written by hand reads better than one assembled from fields,
    // so meta.description wins when it is there. The built version stays as a
    // fallback for anyone who deletes it.
    var description;
    if (filled(meta.description)) {
      description = meta.description;
    } else {
      description = filled(meta.tagline)
        ? name + " — " + meta.tagline + "."
        : name + ".";
      if (lead && filled(lead.role) && filled(lead.org)) {
        description += " " + lead.role + " at " + lead.org;
        description += filled(meta.location) ? ", " + meta.location + "." : ".";
      }
    }

    // Search results truncate around 60 characters, so only fold the tagline
    // into the title when the whole thing still fits.
    var withTagline = filled(meta.tagline) ? name + " — " + meta.tagline : name;
    document.title = withTagline.length <= 60 ? withTagline : name;

    setMeta("name", "description", description);
    setMeta("name", "author", name);
    setMeta("property", "og:title", document.title);
    setMeta("property", "og:description", description);
    if (filled(meta.siteUrl)) setMeta("property", "og:url", meta.siteUrl);

    // Absolute URLs, because social scrapers and search engines will not
    // resolve a relative path from a tag.
    var base = "";
    if (filled(meta.siteUrl)) {
      base = meta.siteUrl;
      while (base.charAt(base.length - 1) === "/") base = base.slice(0, -1);
    }
    function absolute(path) {
      if (!filled(path)) return null;
      if (path.indexOf("http") === 0) return path;
      return base ? base + "/" + path : path;
    }
    var photoUrl = absolute(meta.heroBanner) || absolute(meta.headshot);

    if (base) {
      setMeta("property", "og:url", base + "/");
      setLink("canonical", base + "/");
    }
    if (photoUrl) {
      setMeta("property", "og:image", photoUrl);
      setMeta("property", "og:image:alt", name + ", " + (meta.tagline || ""));
      setMeta("name", "twitter:image", photoUrl);
      setMeta("name", "twitter:card", "summary_large_image");
    }

    // A ProfilePage wrapping a Person is the pattern search engines and answer
    // engines use to decide this page IS this person, rather than a page that
    // happens to mention them. That distinction is what gets your own site
    // ranked for your own name.
    var person = {
      "@type": "Person",
      "@id": base + "/#person",
      name: name,
    };
    if (filled(meta.tagline)) person.description = meta.tagline;
    if (base) person.url = base + "/";
    if (filled(meta.email)) person.email = meta.email;
    if (filled(meta.phone)) person.telephone = meta.phone;

    if (filled(meta.location)) {
      var where = meta.location.split(",");
      person.address = { "@type": "PostalAddress", addressLocality: where[0].trim() };
      if (where.length > 1) {
        person.address.addressCountry = where[where.length - 1].trim();
      }
    }

    if (photoUrl) {
      person.image = {
        "@type": "ImageObject",
        url: photoUrl,
        caption: name,
      };
    }

    // Several people share this name, and search engines were showing them
    // instead. Splitting the name and stating plainly which person this is
    // gives both Google and the answer engines something to match on.
    var nameParts = name.split(/\s+/);
    if (nameParts.length > 1) {
      person.givenName = nameParts[0];
      person.familyName = nameParts[nameParts.length - 1];
    }
    if (filled(meta.disambiguation)) {
      person.disambiguatingDescription = meta.disambiguation;
    }

    // sameAs is for other pages about the SAME person — profiles, not
    // employers. Getting this wrong confuses the entity rather than helping.
    var profiles = [meta.linkedin, meta.github]
      .concat(meta.profiles || [])
      .filter(filled)
      .filter(function (url, i, all) { return all.indexOf(url) === i; });
    if (profiles.length) person.sameAs = profiles;

    var school = (CV.education || []).filter(function (e) {
      return filled(e.institution) && !isPlaceholder(e.institution);
    })[0];
    if (school) {
      person.alumniOf = { "@type": "EducationalOrganization", name: school.institution };
    }

    var job = (CV.experience || []).filter(function (e) {
      return filled(e.org) && !isPlaceholder(e.org);
    })[0];
    if (job) {
      if (filled(job.role)) person.jobTitle = job.role;
      person.worksFor = { "@type": "Organization", name: job.org };
      // The employer's own site ties the two entities together.
      if (filled(job.link)) person.worksFor.url = job.link;
    }

    // Languages belong in knowsLanguage, not knowsAbout — "Bangla (native)"
    // listed as a topic of expertise is the kind of thing that makes a graph
    // look sloppy to the systems reading it.
    var topics = [];
    var languages = [];
    (CV.skills || []).forEach(function (group) {
      var isLanguage = /language/i.test(group.group || "");
      (group.items || []).filter(filled).forEach(function (item) {
        if (isLanguage) {
          var lang = item.replace(/\s*\([^)]*\)\s*$/, "").trim();
          if (lang && languages.indexOf(lang) === -1) languages.push(lang);
        } else if (topics.indexOf(item) === -1) {
          topics.push(item);
        }
      });
    });
    if (topics.length) person.knowsAbout = topics.slice(0, 24);
    if (languages.length) person.knowsLanguage = languages;

    // Current roles beyond the main one are affiliations, not employers.
    var alsoAt = (CV.experience || []).filter(function (e) {
      return filled(e.org) && !isPlaceholder(e.org) && /present/i.test(e.end || "");
    }).slice(1).map(function (e) {
      var org = { "@type": "Organization", name: e.org };
      if (filled(e.link)) org.url = e.link;
      return org;
    });
    if (alsoAt.length) person.affiliation = alsoAt;

    var graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": base + "/#page",
          url: base + "/",
          name: document.title,
          inLanguage: "en",
          mainEntity: { "@id": base + "/#person" },
        },
        person,
      ],
    };

    document.getElementById("person-schema").textContent = JSON.stringify(graph);
    setFavicon(name);
  }

  function setLink(rel, href) {
    var tag = document.head.querySelector('link[rel="' + rel + '"]');
    if (!tag) {
      tag = document.createElement("link");
      tag.setAttribute("rel", rel);
      document.head.appendChild(tag);
    }
    tag.setAttribute("href", href);
  }

  function setMeta(attr, key, value) {
    var tag = document.head.querySelector("meta[" + attr + '="' + key + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", value);
  }

  // Tab icon drawn from your initials, so it follows meta.name like everything
  // else rather than being a file you'd have to remember to replace.
  function setFavicon(name) {
    var initials = name
      .split(" ")
      .filter(function (part) { return part.length; })
      .slice(0, 2)
      .map(function (part) { return part.charAt(0).toUpperCase(); })
      .join("");

    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
      "<rect width='64' height='64' rx='13' fill='#0c0e13'/>" +
      "<text x='32' y='45' text-anchor='middle' fill='#d8a857'" +
      " font-family='Georgia,serif' font-size='31'>" + initials + "</text></svg>";

    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "data:image/svg+xml," + encodeURIComponent(svg);
    document.head.appendChild(link);
  }

  /* --- Hero -------------------------------------------------------------- */

  function renderHero() {
    document.querySelectorAll("[data-field]").forEach(function (node) {
      var value = meta[node.dataset.field];
      node.textContent = filled(value) ? value : "";
    });

    var hero = document.getElementById("top");

    // A contact line for the printed CV only. The buttons and the contact
    // section are both hidden on paper, so without this the CV goes out with
    // no way to reach him.
    var reach = [meta.location, meta.phone, meta.email].filter(filled);
    if (reach.length) {
      var line = el("p", "print-contact", reach.join("  \u00b7  "));
      var heroText = hero.querySelector(".hero-text");
      var tagline = heroText.querySelector(".tagline");
      if (tagline) {
        tagline.insertAdjacentElement("afterend", line);
      } else {
        heroText.appendChild(line);
      }
    }

    // Full-width photo banner. Only built when meta.heroBanner is set, so the
    // hero falls back to the plain layout until you add a picture.
    if (filled(meta.heroBanner)) {
      var banner = el("div", "hero-banner");
      var bannerImg = document.createElement("img");
      bannerImg.src = meta.heroBanner;
      // Descriptive, not empty: this is the image that should come back when
      // someone searches the name, so it needs text a crawler can read.
      bannerImg.alt = filled(meta.name)
        ? meta.name + (filled(meta.tagline) ? " — " + meta.tagline : "")
        : "";
      // A wrong path would leave a dead letterbox at the top of the page.
      bannerImg.addEventListener("error", function () {
        banner.remove();
        hero.classList.remove("hero-has-banner");
      });
      banner.appendChild(bannerImg);
      hero.classList.add("hero-has-banner");
      // Inside .hero-inner, not the bare hero: on wide screens the photo
      // becomes a column beside the text and has to share the content grid.
      var inner = hero.querySelector(".hero-inner");
      inner.insertBefore(banner, inner.firstChild);
    }

    if (filled(meta.headshot)) {
      var img = document.getElementById("headshot");
      img.src = meta.headshot;
      img.alt = filled(meta.name) ? "Photograph of " + meta.name : "";
      img.hidden = false;
    }

    var links = document.getElementById("hero-links");

    if (meta.contactMode === "email" && filled(meta.email)) {
      links.appendChild(button("Email", "mailto:" + meta.email, true));
    } else if (document.getElementById("contact")) {
      links.appendChild(button("Get in touch", "#contact", true));
    } else if (filled(meta.linkedin)) {
      links.appendChild(button("LinkedIn", meta.linkedin, true));
    }

    if (filled(meta.cvFile)) links.appendChild(button("Download CV", meta.cvFile));
    if (filled(meta.phone)) links.appendChild(button("Call", telHref(meta.phone)));
    if (filled(meta.linkedin) && !links.querySelector('[href="' + meta.linkedin + '"]')) {
      links.appendChild(button("LinkedIn", meta.linkedin));
    }
    if (filled(meta.github)) links.appendChild(button("GitHub", meta.github));

    // Stagger the hero in on load.
    ["eyebrow", "h1", "tagline"].forEach(function (sel) {
      var node = hero.querySelector("." + sel) || hero.querySelector(sel);
      if (node) reveal(node);
    });
    if (links.children.length) reveal(links);
  }

  function button(label, href, primary) {
    var a = el("a", primary ? "btn btn-primary" : "btn", label);
    a.href = href;
    if (/^https?:/i.test(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    if (href === meta.cvFile) a.setAttribute("download", "");
    return a;
  }

  /* --- Sections ---------------------------------------------------------- */

  function renderAbout() {
    var paragraphs = (CV.about || []).filter(filled);
    if (!paragraphs.length) return false;

    var body = document.getElementById("about-body");
    paragraphs.forEach(function (text) {
      body.appendChild(reveal(el("p", null, text)));
    });
    return true;
  }

  function renderExperience() {
    var entries = (CV.experience || []).filter(function (job) {
      return filled(job.role) || filled(job.org);
    });
    if (!entries.length) return false;

    fillTimeline("experience-body", entries);
    return true;
  }

  function renderLeadership() {
    var entries = (CV.leadership || []).filter(function (item) {
      return filled(item.role) || filled(item.org);
    });
    if (!entries.length) return false;

    fillTimeline("leadership-body", entries);
    return true;
  }

  // Experience and Leadership have the same shape, so they share a renderer.
  function fillTimeline(bodyId, entries) {
    var body = document.getElementById(bodyId);
    entries.forEach(function (job) {
      var li = reveal(el("li", "entry"), "slide");

      var head = el("div", "entry-head");
      head.appendChild(el("h3", "entry-title", job.role));
      var dates = dateRange(job.start, job.end);
      if (dates) head.appendChild(el("span", "entry-dates", dates));
      li.appendChild(head);

      if (filled(job.org) || filled(job.location)) {
        var line = el("p", "entry-meta");
        if (filled(job.link)) {
          var orgLink = el("a", "org", job.org);
          orgLink.href = job.link;
          orgLink.target = "_blank";
          orgLink.rel = "noopener noreferrer";
          line.appendChild(orgLink);
        } else {
          line.appendChild(el("span", "org", job.org));
        }
        if (filled(job.location)) {
          line.appendChild(document.createTextNode(" · " + job.location));
        }
        li.appendChild(line);
      }

      // One line explaining an organisation the reader won't recognise.
      if (filled(job.note)) li.appendChild(el("p", "entry-note", job.note));

      var bullets = (job.bullets || []).filter(filled);
      if (bullets.length) {
        var list = el("ul", "bullets");
        bullets.forEach(function (text) {
          list.appendChild(el("li", null, text));
        });
        li.appendChild(list);
      }

      body.appendChild(li);
    });
  }

  function renderEducation() {
    var entries = (CV.education || []).filter(function (item) {
      return filled(item.degree) || filled(item.institution);
    });
    if (!entries.length) return false;

    var body = document.getElementById("education-body");
    entries.forEach(function (item) {
      var li = reveal(el("li", "entry"), "slide");

      var head = el("div", "entry-head");
      head.appendChild(el("h3", "entry-title", item.degree));
      var dates = dateRange(item.start, item.end);
      if (dates) head.appendChild(el("span", "entry-dates", dates));
      li.appendChild(head);

      var line = el("p", "entry-meta");
      line.appendChild(el("span", "org", item.institution));
      if (filled(item.location)) {
        line.appendChild(document.createTextNode(" · " + item.location));
      }
      if (filled(item.result)) {
        line.appendChild(document.createTextNode(" "));
        line.appendChild(el("span", "entry-result", item.result));
      }
      li.appendChild(line);

      var details = (item.details || []).filter(filled);
      if (details.length) {
        var list = el("ul", "bullets");
        details.forEach(function (text) {
          list.appendChild(el("li", null, text));
        });
        li.appendChild(list);
      }

      body.appendChild(li);
    });
    return true;
  }

  // Selected Work: the place to post client and campaign pieces. Image-first,
  // because marketing work is judged on sight before it's read.
  function renderWork() {
    var entries = (CV.work || []).filter(function (item) {
      return filled(item.title);
    });
    if (!entries.length) return false;

    var rows = [
      ["brief", "Brief"],
      ["did", "What I made"],
      ["outcome", "Outcome"],
    ];

    // The markup was taken out of index.html when the section came off the
    // site, so this is null until it is put back. Without the guard, adding
    // entries to content.js alone would throw instead of saying nothing.
    var body = document.getElementById("work-body");
    if (!body) return false;

    entries.forEach(function (item) {
      var card = reveal(el("article", "work-item"), "pop");

      // `image` takes one path, or a list of them for a small gallery. A list
      // entry may be { src, alt } so each shot carries its own alt text, which
      // is what lets the individual photos surface in image search.
      var shots = [];
      if (Array.isArray(item.image)) {
        shots = item.image.filter(function (shot) {
          return filled(typeof shot === "string" ? shot : shot && shot.src);
        });
      } else if (filled(item.image)) {
        shots = [item.image];
      }

      if (shots.length) {
        var frame = el("div", "work-image");
        if (shots.length > 1) frame.classList.add("is-gallery");
        if (filled(item.ratio)) frame.style.setProperty("--shot", item.ratio);
        // Photographs can be cropped to fit; a logo or a layout cannot, so a
        // card of brand work asks for the whole image inside the frame.
        if (item.fit === "contain") frame.classList.add("is-contain");

        shots.forEach(function (shot) {
          var img = document.createElement("img");
          img.src = typeof shot === "string" ? shot : shot.src;
          img.alt =
            typeof shot !== "string" && filled(shot.alt) ? shot.alt : item.title;
          img.loading = "lazy";
          // A wrong path would otherwise leave an empty block on the page. Drop
          // the broken shot, and if that empties the frame, fall back to the
          // text-only layout rather than leaving a gap.
          img.addEventListener("error", function () {
            img.remove();
            if (!frame.querySelector("img")) {
              frame.remove();
              card.classList.add("work-item-textonly");
            }
          });
          frame.appendChild(img);
        });

        card.appendChild(frame);
      } else {
        card.classList.add("work-item-textonly");
      }

      var text = el("div", "work-text");

      var kicker = [item.type, item.client].filter(filled);
      if (kicker.length) {
        text.appendChild(el("p", "work-kicker", kicker.join(" · ")));
      }

      var head = el("div", "entry-head");
      head.appendChild(el("h3", null, item.title));
      if (filled(item.date)) head.appendChild(el("span", "entry-dates", item.date));
      text.appendChild(head);

      rows.forEach(function (row) {
        if (!filled(item[row[0]])) return;
        var p = el("p", "work-row work-row-" + row[0]);
        p.appendChild(el("span", "work-row-label", row[1] + ":"));
        p.appendChild(document.createTextNode(" " + item[row[0]]));
        text.appendChild(p);
      });

      if (filled(item.link)) {
        var link = el("a", "project-link", "See the work →");
        link.href = item.link;
        if (/^https?:/i.test(item.link)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        text.appendChild(link);
      }

      card.appendChild(text);
      body.appendChild(card);
    });
    return true;
  }

  function renderWriting() {
    var entries = (CV.writing || []).filter(function (piece) {
      return filled(piece.title) && filled(piece.url) && !isPlaceholder(piece.title);
    });
    if (!entries.length) return false;

    var body = document.getElementById("blog-body");

    // index.html carries a plain copy of the list for crawlers without
    // JavaScript. Clear it before rendering so nothing appears twice.
    body.textContent = "";

    // The home page shows the newest few and sends the rest to /blog/. At one
    // piece a month the full list would otherwise push Projects, Education and
    // Contact a long way down the page within a year.
    var HOME_MAX = 3;

    entries.slice(0, HOME_MAX).forEach(function (piece) {
      var card = reveal(el("article", "piece"), "up");

      var head = el("div", "entry-head");
      var h3 = el("h3");
      var link = el("a", "piece-link", piece.title);
      link.href = piece.url;
      h3.appendChild(link);
      head.appendChild(h3);
      if (filled(piece.date)) {
        head.appendChild(el("span", "entry-dates", piece.date));
      }
      card.appendChild(head);

      if (filled(piece.summary)) {
        card.appendChild(el("p", "piece-summary", piece.summary));
      }

      body.appendChild(card);
    });

    var all = reveal(el("p", "blog-all"), "up");
    var allLink = el(
      "a",
      "piece-link",
      entries.length > HOME_MAX
        ? "All " + entries.length + " posts"
        : "All posts"
    );
    allLink.href = "blog/";
    all.appendChild(allLink);
    body.appendChild(all);

    return true;
  }

  function renderProjects() {
    var entries = (CV.projects || []).filter(function (p) {
      return filled(p.title);
    });
    if (!entries.length) return false;

    var rows = [
      ["Question", "question"],
      ["Method", "method"],
      ["Finding", "finding"],
    ];

    var body = document.getElementById("projects-body");
    entries.forEach(function (project) {
      var card = reveal(el("article", "project"), "pop");

      var head = el("div", "entry-head");
      head.appendChild(el("h3", null, project.title));
      if (filled(project.period)) {
        head.appendChild(el("span", "entry-dates", project.period));
      }
      card.appendChild(head);

      var dl = el("dl", "project-rows");
      rows.forEach(function (row) {
        if (!filled(project[row[1]])) return;
        var group = el("div", "project-row");
        group.appendChild(el("dt", null, row[0]));
        group.appendChild(el("dd", null, project[row[1]]));
        dl.appendChild(group);
      });
      if (dl.children.length) card.appendChild(dl);

      appendTags(card, project.tools);

      if (filled(project.link)) {
        var link = el("a", "project-link", "View project →");
        link.href = project.link;
        if (/^https?:/i.test(project.link)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        card.appendChild(link);
      }

      body.appendChild(card);
    });
    return true;
  }

  function renderSkills() {
    var groups = (CV.skills || []).filter(function (group) {
      return Array.isArray(group.items) && group.items.filter(filled).length;
    });
    if (!groups.length) return false;

    var body = document.getElementById("skills-body");
    groups.forEach(function (group) {
      var block = reveal(el("div", "skill-group"));
      if (filled(group.group)) block.appendChild(el("h3", null, group.group));
      appendTags(block, group.items);
      body.appendChild(block);
    });
    return true;
  }

  function renderCertifications() {
    var entries = (CV.certifications || []).filter(function (c) {
      return filled(c.name);
    });
    if (!entries.length) return false;

    var body = document.getElementById("certifications-body");
    entries.forEach(function (cert) {
      var li = reveal(el("li", "cert"));
      li.appendChild(el("span", "cert-name", cert.name));
      if (filled(cert.issuer)) li.appendChild(el("span", "cert-issuer", cert.issuer));
      if (filled(cert.date)) li.appendChild(el("span", "cert-date", cert.date));
      if (filled(cert.note)) li.appendChild(el("span", "cert-note", cert.note));
      body.appendChild(li);
    });
    return true;
  }

  function renderContact() {
    var body = document.getElementById("contact-body");
    var mode = meta.contactMode;

    if (mode === "email" && !filled(meta.email)) mode = null;
    if (mode === "form" && !filled(meta.formEndpoint)) mode = null;
    if (mode === "linkedin" && !filled(meta.linkedin)) mode = null;
    if (!mode && filled(meta.linkedin)) mode = "linkedin";
    if (!mode) return false;

    if (mode === "form") {
      body.appendChild(reveal(el("p", "contact-lead", "Send me a message and I'll get back to you.")));

      var form = reveal(el("form", "contact-form"));
      form.action = meta.formEndpoint;
      form.method = "POST";

      [
        ["name", "Name", "text"],
        ["email", "Email", "email"],
      ].forEach(function (field) {
        var label = el("label", null, field[1]);
        var input = document.createElement("input");
        input.type = field[2];
        input.name = field[0];
        input.required = true;
        label.appendChild(input);
        form.appendChild(label);
      });

      var messageLabel = el("label", null, "Message");
      var textarea = document.createElement("textarea");
      textarea.name = "message";
      textarea.required = true;
      messageLabel.appendChild(textarea);
      form.appendChild(messageLabel);

      form.appendChild(el("button", "btn btn-primary", "Send"));
      body.appendChild(form);
      return true;
    }

    body.appendChild(
      reveal(
        el(
          "p",
          "contact-lead",
          mode === "email"
            ? filled(meta.phone)
              ? "Email or call, whichever suits you. I read everything that comes in."
              : "Email is the quickest way to reach me. I read everything that comes in."
            : "The best place to reach me is LinkedIn."
        )
      )
    );

    var actions = reveal(el("div", "contact-actions"));
    if (mode === "email") {
      actions.appendChild(button("Email " + meta.email, "mailto:" + meta.email, true));
    }
    if (filled(meta.phone)) {
      actions.appendChild(button(meta.phone, telHref(meta.phone)));
    }
    if (filled(meta.linkedin)) {
      actions.appendChild(button("LinkedIn", meta.linkedin, mode !== "email"));
    }
    if (filled(meta.cvFile)) actions.appendChild(button("Download CV", meta.cvFile));
    body.appendChild(actions);
    return true;
  }


  /* --- The map -----------------------------------------------------------
     An outline of Bangladesh with a dot on every district the firm has
     worked in. The outline is Natural Earth's 50m boundary, projected once
     on the way in and pasted here as a path. MAP keeps the numbers that
     projection used, so a latitude and longitude put a dot in the right
     place on it.
     -------------------------------------------------------------------- */

  var MAP = {
    viewBox: "0 0 1000 1361",
    lon0: 88.023438,
    lat1: 26.571533,
    kx: 0.9157959636063627,
    scale: 231.27010113568417,
    pad: 12,
    path: "M229.7 1047.7L230.7 1026.2L229.4 1005.8L212.8 951.1L202 923.1L203.4 914L202.6 910.2L197.6 874.2L190.7 852.1L187.2 828.6L203.6 794.8L197 789.3L178.1 784.9L160.5 779L156.1 770.3L163.9 737L154.8 724L141.7 710.8L137.6 705.5L133.3 698.7L127.2 682L138.9 646.9L155.3 606.1L158.2 590.6L160.9 563.6L162.4 553.3L160.3 543.1L143.1 531.3L112.6 526.6L91.1 516.7L78.5 501.8L67.8 495.8L54.7 500.2L37.9 494.4L23.8 479.5L12 461.5L13.4 453.1L16.6 441.8L38.8 395.2L47 393.8L66.2 402.8L73.4 402.8L86 384.3L103.7 331.9L128.6 332L150.5 333.7L165.4 336.4L180.1 334.7L195.6 330.5L204 323.9L208.6 315.5L207 308.2L188.1 298.3L180.8 290.9L175.5 269.9L169.9 262L132.7 260.9L113.5 251.3L102.8 242.6L83.9 214L60.6 192.8L38.3 187.8L29.6 180.9L24.9 170L27.7 154.3L34.4 140L39 124L56.8 103L77.8 84.6L87.1 72L100.3 58.7L101.9 51.4L99.5 43.1L88.8 35.1L81.5 32.6L80.3 27.4L85.4 13.7L95.6 12L116.8 24.4L138.4 44.6L151.2 62.5L151.7 76.7L160 79L168.4 79.6L182.4 85.9L196.9 83.9L206.3 87.4L212.6 86.2L214.9 78L207.9 66L202.8 57.4L208.7 48.9L215.3 47.2L222.8 49.3L233 57L240.4 72.9L241.8 97.4L258.3 119.7L280.1 135.5L297.1 142.8L317.7 148L335.3 143L344.1 127.4L340.1 113.6L342.9 101.2L349.9 94.3L360.9 94.7L369.2 104.6L393.1 157.7L388.2 181.3L393.5 245.9L387.5 288.5L388.5 297.7L391.2 304.8L395.3 307.7L402.3 307.6L431.4 315.7L456 324.6L483.7 332.7L523.7 339L548.2 336.9L560.5 336.7L585.3 338.6L650.5 335.2L704.5 334.3L726.4 340.4L744 342.6L804.1 338.3L864.7 336.3L897.6 349.8L933.3 371.9L953.4 388.4L957 397.8L954.8 405.9L948.1 410.3L935.8 410.4L907.4 399.7L902.6 402.9L903.1 424.9L902.2 428.4L896.2 448.1L879.1 492.5L875.8 512.3L872.2 517.4L867.8 520.1L854.4 520.9L844 524.2L839.6 531.4L832.8 546.4L828.2 561.5L821.6 566.2L806 558L796.3 559.3L784.1 562.8L771.9 571.4L763.4 582.1L753.9 585.7L725.6 583.6L720.2 585.1L716.6 592.7L713.7 602.4L691.6 625.1L683.2 661.6L676.4 685.2L677.5 703.6L696.2 751.6L709.2 813.8L714.2 820.2L718.5 822.2L720.5 820.7L720.1 807.8L720.9 792.2L727 788.5L734.8 791.8L742.3 805.3L750.7 830.2L759.7 839.9L773.6 842.7L789.6 836.9L801.5 825.6L806.3 813.5L802.9 789.5L802.2 771.5L809.8 754.5L837.1 729.1L841.1 721.3L839.3 699.6L839.3 679.3L849.7 678L863.5 681.2L881.1 671.2L886.5 671L893.8 681.8L906.3 679.9L915.5 724.1L925 763.1L924.9 781.9L926.5 821.8L930.8 854.4L937.5 861.8L945.4 879.2L952.6 899.4L958.3 910.7L962.1 947.7L966.9 974.4L973.1 1058.1L976 1074.3L977.7 1083.1L978 1159.7L979.9 1192.4L986.7 1219.4L988 1229.7L981.3 1238L974.6 1239.6L968.4 1226.6L954.2 1216.6L933.1 1205.9L924.2 1198.8L913.5 1201.6L898.3 1217.8L892.3 1232.7L894.9 1253.8L899.7 1274.5L910.2 1286.3L911.1 1299.4L914.8 1316.3L920.3 1331.9L922.9 1348.7L919.4 1349L906.8 1327.5L895.4 1304.2L866.1 1260.1L856.5 1181.1L855.9 1142.2L835.8 1096.3L822.5 1032.9L817.1 1016.4L824.1 995.9L825.3 988.2L821.5 989.9L811.2 1000.5L797.9 975.2L789.2 952.5L754.6 905.6L744.5 884.8L744.1 864.6L729.2 884.9L708.9 899.2L688.2 920.7L674.5 927.2L630.9 931.2L605.7 902.4L569.6 832.1L564.8 816.2L569.6 774.8L561 735.7L561.1 715L558.6 701.2L552.1 704.3L549.6 713.8L550.9 728.3L548.3 740.5L517 738.1L487.6 732.6L513.5 753.1L541.3 757.9L555.8 776.4L557.5 790.8L556.7 807L542.4 818.3L529.3 825.5L531.8 841L547.6 860L528.4 865.3L523.2 877.7L522.8 895.4L532.4 910.9L536.2 922.4L533.9 933.1L543.2 944.5L556.8 968.5L561.1 985.5L555.5 1009.5L547.7 1018.8L535.3 1027.9L506 1058.1L491.7 1092.5L479.5 1108.6L464.3 1111.6L458.3 1104.5L445.7 1095.3L445.5 1078.5L449.2 1065.2L475 1033L461 1037.4L445.1 1046.5L420.9 1064L413.3 1042.4L408.2 1022.4L408.1 997.9L427.5 961.4L405.6 979.6L399.5 1002.4L402.2 1029.2L399.4 1048.2L390.8 1073.1L379.1 1088L360.3 1097.5L351.9 1112.2L339.2 1123L338.8 1101.5L334.8 1073L321.2 1005.5L318.2 1020L325.3 1061.9L324.9 1089.1L314.6 1110.6L293.7 1133.8L277.8 1137L268.5 1133.5L254.2 1119.1L238.7 1098.7L236.1 1065.8L229.7 1047.7ZM595.3 1048.6L558.5 1056.7L539.7 1054.2L574.7 993.5L573.6 966.4L568.1 944.2L550.3 926.4L549.3 913.7L541.3 896.4L537.1 876.1L557 869.6L573 881.2L575.3 887.6L578.7 904.2L586.7 921.5L614.5 957.1L614 978.9L606.4 1032.3L595.3 1048.6Z",
  };

  // Every district, so a name in content.js is all it takes. Government
  // spellings, with the older ones people still type kept as aliases.
  var DISTRICTS = {
    Dhaka: [23.81, 90.41], Gazipur: [23.99, 90.42], Narayanganj: [23.62, 90.5],
    Narsingdi: [23.92, 90.72], Manikganj: [23.86, 90.0], Munshiganj: [23.55, 90.53],
    Tangail: [24.25, 89.92], Kishoreganj: [24.44, 90.78], Faridpur: [23.6, 89.84],
    Gopalganj: [23.01, 89.83], Madaripur: [23.17, 90.2], Shariatpur: [23.2, 90.35],
    Rajbari: [23.76, 89.64],
    Mymensingh: [24.75, 90.4], Jamalpur: [24.92, 89.94], Netrokona: [24.88, 90.73],
    Sherpur: [25.02, 90.02],
    Chattogram: [22.36, 91.78], "Cox's Bazar": [21.44, 92.0], Cumilla: [23.46, 91.18],
    Noakhali: [22.87, 91.1], Feni: [23.02, 91.4], Brahmanbaria: [23.96, 91.11],
    Chandpur: [23.23, 90.65], Lakshmipur: [22.94, 90.83], Khagrachhari: [23.12, 91.98],
    Rangamati: [22.65, 92.17], Bandarban: [22.19, 92.22],
    Sylhet: [24.9, 91.87], Moulvibazar: [24.48, 91.77], Habiganj: [24.37, 91.41],
    Sunamganj: [25.07, 91.4],
    Rajshahi: [24.37, 88.6], Natore: [24.41, 89.0], Pabna: [24.0, 89.24],
    Bogura: [24.85, 89.37], Sirajganj: [24.45, 89.7], Naogaon: [24.8, 88.94],
    "Chapai Nawabganj": [24.6, 88.28], Joypurhat: [25.1, 89.02],
    Rangpur: [25.75, 89.24], Dinajpur: [25.63, 88.64], Thakurgaon: [26.03, 88.47],
    Panchagarh: [26.33, 88.56], Nilphamari: [25.93, 88.86], Lalmonirhat: [25.92, 89.45],
    Kurigram: [25.81, 89.64], Gaibandha: [25.33, 89.54],
    Khulna: [22.81, 89.56], Jashore: [23.17, 89.21], Satkhira: [22.72, 89.07],
    Bagerhat: [22.65, 89.79], Narail: [23.17, 89.5], Magura: [23.49, 89.42],
    Jhenaidah: [23.54, 89.17], Kushtia: [23.9, 89.12], Chuadanga: [23.64, 88.84],
    Meherpur: [23.76, 88.63],
    Barishal: [22.7, 90.37], Patuakhali: [22.36, 90.33], Bhola: [22.69, 90.65],
    Pirojpur: [22.58, 89.98], Jhalokathi: [22.64, 90.2], Barguna: [22.15, 90.13],
    // Older spellings, same places.
    Barisal: [22.7, 90.37], Chittagong: [22.36, 91.78], Comilla: [23.46, 91.18],
    Bogra: [24.85, 89.37], Jessore: [23.17, 89.21]
  };

  function place(lat, lng) {
    return [
      (lng - MAP.lon0) * MAP.kx * MAP.scale + MAP.pad,
      (MAP.lat1 - lat) * MAP.scale + MAP.pad
    ];
  }

  function svgEl(tag, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function renderReach() {
    var reach = CV.reach || {};
    var names = (reach.districts || []).filter(function (name) {
      return DISTRICTS[name];
    });
    if (!names.length) return false;

    if (filled(reach.heading)) {
      document.getElementById("reach-h").textContent = reach.heading;
    }

    var grid = el("div", "reach");

    var figure = reveal(el("figure", "reach-map"), "pop");
    var svg = svgEl("svg", {
      viewBox: MAP.viewBox,
      role: "img",
      "aria-label": "Map of Bangladesh with " + names.length + " districts marked: " + names.join(", ")
    });
    // pathLength normalises the outline to 1 so the dash animation that draws
    // it does not need to know how long it really is.
    svg.appendChild(svgEl("path", { class: "reach-outline", d: MAP.path, pathLength: "1" }));

    names.forEach(function (name, i) {
      var at = place(DISTRICTS[name][0], DISTRICTS[name][1]);
      var home = name === reach.home;
      var pin = svgEl("g", {
        class: "reach-pin" + (home ? " is-home" : ""),
        style: "--d:" + (900 + i * 90) + "ms"
      });
      pin.appendChild(svgEl("circle", { class: "reach-halo", cx: at[0], cy: at[1], r: home ? 54 : 34 }));
      pin.appendChild(svgEl("circle", { class: "reach-dot", cx: at[0], cy: at[1], r: home ? 16 : 10 }));
      var label = svgEl("title", {});
      label.textContent = name;
      pin.appendChild(label);
      svg.appendChild(pin);
    });

    figure.appendChild(svg);
    grid.appendChild(figure);

    var side = el("div", "reach-side");
    if (filled(reach.lead)) side.appendChild(reveal(el("p", "reach-lead", reach.lead)));

    var stats = (reach.stats || []).filter(function (s) {
      return s && s.value != null;
    });
    if (stats.length) {
      var row = el("div", "stats");
      stats.forEach(function (stat) {
        var card = reveal(el("div", "stat"), "up");
        var value = el("strong", "stat-value", "0");
        value.setAttribute("data-count", stat.value);
        if (stat.plain) value.setAttribute("data-plain", "");
        card.appendChild(value);
        if (filled(stat.label)) card.appendChild(el("span", "stat-label", stat.label));
        row.appendChild(card);
      });
      side.appendChild(row);
    }

    var list = reveal(el("ul", "district-list"));
    names.forEach(function (name) {
      list.appendChild(el("li", null, name));
    });
    side.appendChild(list);

    if (filled(reach.note)) side.appendChild(reveal(el("p", "reach-note", reach.note)));

    grid.appendChild(side);
    document.getElementById("reach-body").appendChild(grid);
    return true;
  }

  /* --- Counting numbers --------------------------------------------------
     Any element carrying data-count runs from zero to that number when it
     first scrolls into view. data-plain leaves a year unformatted.
     -------------------------------------------------------------------- */

  function setupCounters() {
    var nodes = [].slice.call(document.querySelectorAll("[data-count]"));
    if (!nodes.length) return;

    function show(node, value) {
      node.textContent = value.toLocaleString("en");
    }

    // A year counting up from zero reads as a wrong number for a second,
    // so data-plain writes it out and leaves it alone.
    nodes = nodes.filter(function (node) {
      if (!node.hasAttribute("data-plain")) return true;
      node.textContent = node.getAttribute("data-count");
      return false;
    });
    if (!nodes.length) return;

    var still = false;
    try {
      still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (err) {
      still = false;
    }

    if (still || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        show(node, Number(node.getAttribute("data-count")));
      });
      return;
    }

    function run(node) {
      var target = Number(node.getAttribute("data-count"));
      var started = null;
      var span = 1100;
      function frame(now) {
        if (started === null) started = now;
        var t = Math.min(1, (now - started) / span);
        var eased = 1 - Math.pow(1 - t, 3);
        show(node, Math.round(target * eased));
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    var watcher = new IntersectionObserver(
      function (records, obs) {
        records.forEach(function (record) {
          if (!record.isIntersecting) return;
          run(record.target);
          obs.unobserve(record.target);
        });
      },
      { threshold: 0.4 }
    );
    nodes.forEach(function (node) {
      watcher.observe(node);
    });
  }

  /* --- The travelling rail -----------------------------------------------
     A gold line that fills down each timeline as you scroll past it, with a
     dot at the leading end. Progress is published as --p on the list.
     -------------------------------------------------------------------- */

  function setupRails() {
    var lists = [].slice.call(document.querySelectorAll(".timeline"));
    if (!lists.length) return;

    lists.forEach(function (list) {
      // Absolutely positioned, so it never becomes a row of the grid.
      list.appendChild(el("div", "rail"));
    });

    var ticking = false;
    function update() {
      lists.forEach(function (list) {
        var box = list.getBoundingClientRect();
        var mark = window.innerHeight * 0.58;
        var ratio = box.height > 0 ? (mark - box.top) / box.height : 0;
        list.style.setProperty("--p", Math.min(1, Math.max(0, ratio)).toFixed(4));
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
    window.addEventListener("resize", update, { passive: true });
    update();
  }


  /* --- Visitor counting --------------------------------------------------
     Only ever runs when meta.analytics holds a code. No code, no request,
     no third-party script on the page at all.
     -------------------------------------------------------------------- */

  function setupAnalytics() {
    var code = (window.CV && window.CV.meta && window.CV.meta.analytics) || null;
    if (!code || String(code).trim() === "") return;
    // A local copy of the site should not report visits as if they were real.
    if (location.protocol === "file:" || location.hostname === "localhost") return;

    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "//gc.zgo.at/count.js";
    tag.setAttribute(
      "data-goatcounter",
      "https://" + String(code).trim() + ".goatcounter.com/count"
    );
    document.body.appendChild(tag);
  }

  /* --- Navigation -------------------------------------------------------- */

  function buildNav(live) {
    var nav = document.getElementById("nav");
    live.forEach(function (section) {
      var a = el("a", null, section.label);
      a.href = "#" + section.id;
      nav.appendChild(a);
    });

    if (!("IntersectionObserver" in window)) return;

    var links = {};
    nav.querySelectorAll("a").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });

    var observer = new IntersectionObserver(
      function (records) {
        records.forEach(function (record) {
          var link = links[record.target.id];
          if (!link) return;
          if (record.isIntersecting) {
            Object.keys(links).forEach(function (id) {
              links[id].removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-70px 0px -60% 0px" }
    );

    live.forEach(function (section) {
      var node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });
  }

  /* --- Motion ------------------------------------------------------------
     The hidden starting state lives behind .anim on <html>, which is added
     here. If this script fails or JavaScript is off, the class never lands
     and the page renders as plain visible content.
     -------------------------------------------------------------------- */

  function setupMotion() {
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("anim");

    // Elements that share a parent come in one after another rather than
    // all at once.
    var groups = new Map();
    document.querySelectorAll("[data-reveal]").forEach(function (node) {
      var siblings = groups.get(node.parentNode) || [];
      siblings.push(node);
      groups.set(node.parentNode, siblings);
    });
    groups.forEach(function (siblings) {
      siblings.forEach(function (node, i) {
        node.style.setProperty("--d", Math.min(i, 6) * 85 + "ms");
      });
    });

    var revealer = new IntersectionObserver(
      function (records, obs) {
        records.forEach(function (record) {
          if (!record.isIntersecting) return;
          record.target.classList.add("is-in");
          obs.unobserve(record.target); // play once, then stop watching
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal], .entry").forEach(function (node) {
      revealer.observe(node);
    });

    // Section headings draw their rule when the section arrives.
    var sectionObs = new IntersectionObserver(
      function (records, obs) {
        records.forEach(function (record) {
          if (!record.isIntersecting) return;
          record.target.classList.add("is-in");
          obs.unobserve(record.target);
        });
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    document.querySelectorAll(".section").forEach(function (node) {
      sectionObs.observe(node);
    });
  }

  function setupProgress() {
    var bar = el("div", "progress");
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* --- Theme -------------------------------------------------------------
     Dark is the default by design. Switch the default by changing the
     fallback below from "dark" to "light".
     -------------------------------------------------------------------- */

  function initTheme() {
    var toggle = document.getElementById("theme-toggle");
    var stored = null;

    // Browser storage can be blocked or empty (private windows, cleared site
    // data), so every read and write is guarded and the page works without it.
    try {
      stored = localStorage.getItem("portfolio-theme");
    } catch (err) {
      stored = null;
    }

    document.documentElement.setAttribute(
      "data-theme",
      stored === "light" || stored === "dark" ? stored : "dark"
    );

    function current() {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    }

    // The icon itself is drawn by the stylesheet from data-theme, so there is
    // nothing to redraw here beyond what a screen reader is told.
    function paint() {
      var next = current() === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    }

    function quiet() {
      try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (err) {
        return false;
      }
    }

    // How far the circle has to grow to reach the furthest corner of the
    // window from where it started. Without this the sweep stops short on a
    // wide screen and the old theme is left showing in a corner.
    function reach(x, y) {
      return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    }

    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      var root = document.documentElement;

      function apply() {
        root.setAttribute("data-theme", next);
        try {
          localStorage.setItem("portfolio-theme", next);
        } catch (err) {
          /* Not persisted; the choice still applies for this visit. */
        }
        paint();
      }

      // The icon spins once as it changes shape. Independent of the sweep,
      // so it still happens where view transitions are unavailable.
      var icon = toggle.querySelector(".toggle-icon");
      if (icon && !quiet()) {
        icon.classList.remove("is-turning");
        void icon.offsetWidth; // restart the animation rather than ignore it
        icon.classList.add("is-turning");
      }

      if (!document.startViewTransition || quiet()) {
        apply();
        return;
      }

      var box = toggle.getBoundingClientRect();
      var x = box.left + box.width / 2;
      var y = box.top + box.height / 2;
      var to = reach(x, y);

      var change = document.startViewTransition(apply);
      change.ready
        .then(function () {
          root.animate(
            {
              clipPath: [
                "circle(0px at " + x + "px " + y + "px)",
                "circle(" + to + "px at " + x + "px " + y + "px)"
              ]
            },
            {
              duration: 620,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)"
            }
          );
        })
        .catch(function () {
          /* A transition can be interrupted by a second click. The theme is
             already applied either way, so there is nothing to undo. */
        });
    });

    paint();
  }

  /* --- Boot -------------------------------------------------------------- */

  initTheme();
  renderHead();

  var live = sections.filter(function (section) {
    var rendered = section.render();
    if (!rendered) {
      var node = document.getElementById(section.id);
      if (node) node.remove();
    }
    return rendered;
  });

  // After the sections, so the hero's primary button only links to #contact
  // when a contact section actually exists.
  renderHero();

  buildNav(live);
  setupMotion();
  setupProgress();
  setupCounters();
  setupRails();
  setupAnalytics();

  document.getElementById("footer-year").textContent = new Date().getFullYear();

  var header = document.getElementById("site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
