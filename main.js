(function () {
  var data = window.BBD_DATA || {};
  /* Invisible code watermark: BBD-TM-WM-2026 */

  function byId(id) {
    return document.getElementById(id);
  }

  function renderHeroBadges() {
    var host = byId("heroBadges");
    if (!host || !Array.isArray(data.heroBadges)) return;

    host.innerHTML = data.heroBadges
      .map(function (item) {
        return '<span class="hero-badge">' + item + "</span>";
      })
      .join("");
  }

  function renderServiceCards() {
    var host = byId("serviceCards");
    if (!host || !Array.isArray(data.services)) return;

    host.innerHTML = data.services
      .map(function (svc) {
        var items = (svc.items || [])
          .map(function (item) {
            return "<li>" + item + "</li>";
          })
          .join("");
        var isFullDetail = svc.title === "Full Detail";
        var cardClass = isFullDetail ? "service-card full-detail-featured" : "service-card";
        var dealNote = isFullDetail ? '<p class="deal-note">$10 off limited deal</p>' : "";

        return (
          '<article class="' + cardClass + '">' +
          "<h3>" + svc.title + "</h3>" +
          '<p class="price">' + startingAtPrice(svc.price) + "</p>" +
          dealNote +
          "<p>" + svc.description + "</p>" +
          "<ul>" + items + "</ul>" +
          "</article>"
        );
      })
      .join("");
  }

  function roundToNearestFive(value) {
    var amount = Number(value);
    if (!Number.isFinite(amount)) return 0;
    return Math.round(amount / 5) * 5;
  }

  function money(value) {
    return "$" + roundToNearestFive(value).toLocaleString("en-US");
  }

  function startingAtPrice(value) {
    return "Starting at " + money(value);
  }

  function renderOfferPricing() {
    var tabsHost = byId("offerVehicleTabs");
    var cardsHost = byId("offerPricingCards");
    var tiers = Array.isArray(data.offerPricingTiers) ? data.offerPricingTiers : [];
    if (!tabsHost || !cardsHost || !tiers.length) return;

    function paintCards(tierId) {
      var tier = tiers.find(function (item) {
        return item.id === tierId;
      }) || tiers[0];

      cardsHost.innerHTML =
        '<article class="price-card">' +
        "<h3>Exterior Detail</h3>" +
        '<p class="price">' + money(tier.prices.exterior) + "</p>" +
        "<p>Paint-safe exterior wash with wheel and tire cleaning.</p>" +
        "</article>" +
        '<article class="price-card">' +
        "<h3>Interior Detail</h3>" +
        '<p class="price">' + money(tier.prices.interior) + "</p>" +
        "<p>Vacuum, wipe-down, and interior refresh.</p>" +
        "</article>" +
        '<article class="price-card featured">' +
        "<h3>Full Detail</h3>" +
        '<p class="price">' + money(tier.prices.fullDetail) + "</p>" +
        "<p>Complete interior and exterior detailing service.</p>" +
        "</article>";
    }

    tabsHost.addEventListener("click", function (event) {
      var button = event.target.closest(".pricing-tab");
      if (!button) return;

      tabsHost.querySelectorAll(".pricing-tab").forEach(function (tab) {
        tab.classList.remove("selected");
        tab.setAttribute("aria-selected", "false");
      });

      button.classList.add("selected");
      button.setAttribute("aria-selected", "true");
      paintCards(button.getAttribute("data-tier"));
    });

    var defaultTab = tabsHost.querySelector(".pricing-tab.selected") || tabsHost.querySelector(".pricing-tab");
    if (!defaultTab) return;
    paintCards(defaultTab.getAttribute("data-tier"));
  }

  function renderServiceAreas() {
    var cardsHost = byId("serviceAreaCards");
    if (cardsHost && Array.isArray(data.serviceAreas)) {
      cardsHost.innerHTML = data.serviceAreas
        .map(function (area) {
          var photo = area.image
            ? '<div class="area-photo"><img src="' + area.image + '" alt="' + area.name + ' city view" loading="lazy" /></div>'
            : "";

          return (
            '<article class="area-card" id="' + area.id + '">' +
            photo +
            "<h3>" + area.name + "</h3>" +
            "<p>" + area.description + "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    var listHost = byId("extraAreas");
    if (listHost && Array.isArray(data.extraAreas)) {
      listHost.innerHTML = data.extraAreas
        .map(function (area) {
          return "<li>" + area + "</li>";
        })
        .join("");
    }
  }

  function renderOptionButtons(id, options, singleSelect) {
    var host = byId(id);
    if (!host || !Array.isArray(options)) return;

    if (id === "addOnServices" && host.closest("form")) {
      host.innerHTML = options
        .map(function (opt, index) {
          return (
            '<label class="option-check">' +
            '<input type="checkbox" class="option-check-input" value="' + opt + '" aria-label="' + opt + '" />' +
            "<span>" + opt + "</span>" +
            "</label>"
          );
        })
        .join("");
      return;
    }
    if (id === "addOnServices") {
      host.innerHTML = options
        .map(function (opt) {
          return '<span class="option-static">' + opt + "</span>";
        })
        .join("");
      return;
    }

    host.innerHTML = options
      .map(function (opt, index) {
        var selectedClass = singleSelect && index === 0 ? " selected" : "";
        var single = singleSelect ? "true" : "false";
        return (
          '<button type="button" class="option-btn' +
          selectedClass +
          '" data-single="' +
          single +
          '">' +
          opt +
          "</button>"
        );
      })
      .join("");
  }

  function initOptionSelection() {
    document.querySelectorAll(".options-grid").forEach(function (grid) {
      grid.addEventListener("click", function (event) {
        var button = event.target.closest(".option-btn");
        if (!button) return;

        var groupId = grid.getAttribute("id");
        if (groupId === "detailTypes") {
          var label = button.textContent.trim();
          var isFull = label === "Full Detail";
          var isInteriorOrExterior = label === "Interior Detail" || label === "Exterior Detail";
          var fullButton = Array.from(grid.querySelectorAll(".option-btn")).find(function (btn) {
            return btn.textContent.trim() === "Full Detail";
          });

          if (isFull && !button.classList.contains("selected")) {
            grid.querySelectorAll(".option-btn").forEach(function (btn) {
              btn.classList.remove("selected");
            });
            button.classList.add("selected");
            return;
          }

          if (isInteriorOrExterior && fullButton) {
            fullButton.classList.remove("selected");
          }
        }

        var isSingle = button.getAttribute("data-single") === "true";
        if (isSingle) {
          grid.querySelectorAll(".option-btn").forEach(function (btn) {
            btn.classList.remove("selected");
          });
          button.classList.add("selected");
          return;
        }

        button.classList.toggle("selected");
      });
    });
  }

  function selectedTextFrom(containerId) {
    var host = byId(containerId);
    if (!host) return "";

    var values = [];

    values = values.concat(
      Array.from(host.querySelectorAll(".option-btn.selected")).map(function (el) {
        return el.textContent.trim();
      })
    );

    values = values.concat(
      Array.from(host.querySelectorAll(".option-check-input:checked")).map(function (el) {
        return el.value.trim();
      })
    );

    return values.join(", ");
  }

  function initQuoteForm() {
    var form = byId("quoteForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var fd = new FormData(form);
      var firstName = (fd.get("firstName") || "").toString().trim();
      var lastName = (fd.get("lastName") || "").toString().trim();
      var phone = (fd.get("phone") || "").toString().trim();
      var email = (fd.get("email") || "").toString().trim();
      var vehicle = (fd.get("vehicle") || "").toString().trim();
      var notes = (fd.get("notes") || "").toString().trim();
      var detailTypes = selectedTextFrom("detailTypes") || "Not selected";
      var addOns = selectedTextFrom("addOnServices") || "None";

      var lines = [
        "Name: " + [firstName, lastName].join(" ").trim(),
        "Phone: " + phone,
        "Email: " + email,
        "Vehicle: " + vehicle,
        "Type of detail: " + detailTypes,
        "Add-ons: " + addOns,
        "Notes: " + (notes || "None")
      ];

      var subject = "Quote Request - " + (vehicle || "Vehicle Detail");
      var body = lines.join("\n");
      var to = data.contactEmail || "beauzstewart@gmail.com";

      window.location.href =
        "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  function initScrollReveal() {
    var targets = document.querySelectorAll(
      ".service-card, .area-card, .price-card, .process-card, .testimonial-card, .highlight-panel, .split-content"
    );

    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add("fade-in");
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeroBadges();
    renderServiceCards();
    renderOfferPricing();
    renderServiceAreas();
    renderOptionButtons("detailTypes", data.detailTypes || [], false);
    renderOptionButtons("addOnServices", data.addOns || [], false);
    initOptionSelection();
    initQuoteForm();
    initScrollReveal();
  });
})();
