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
    { id: "work", label: "Work", render: renderWork },
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
    var description = filled(meta.tagline)
      ? name + " — " + meta.tagline + "."
      : name + ".";
    if (lead && filled(lead.role) && filled(lead.org)) {
      description += " " + lead.role + " at " + lead.org;
      description += filled(meta.location) ? ", " + meta.location + "." : ".";
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

    // sameAs is for other pages about the SAME person — profiles, not
    // employers. Getting this wrong confuses the entity rather than helping.
    var profiles = [meta.linkedin, meta.github].filter(filled);
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

    var topics = [];
    (CV.skills || []).forEach(function (group) {
      (group.items || []).filter(filled).forEach(function (item) {
        if (topics.indexOf(item) === -1) topics.push(item);
      });
    });
    if (topics.length) person.knowsAbout = topics.slice(0, 24);

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

    var body = document.getElementById("work-body");
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
        var p = el("p", "work-row");
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
              ? "Email or call, whichever suits you — I read everything that comes in."
              : "The quickest way to reach me is by email — I read everything that comes in."
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

    function paint() {
      var next = current() === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + next + " theme");
      toggle.querySelector("[data-theme-icon]").textContent =
        current() === "dark" ? "☀" : "☾";
    }

    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch (err) {
        /* Not persisted; the choice still applies for this visit. */
      }
      paint();
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

  document.getElementById("footer-year").textContent = new Date().getFullYear();

  var header = document.getElementById("site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
