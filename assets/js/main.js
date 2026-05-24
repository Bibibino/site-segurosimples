document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  var header = document.querySelector(".site-header");

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (document.body.classList.contains("home-page") && header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll("[data-accordion-trigger]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".accordion-item");
      var expanded = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(expanded));
    });
  });

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-filter]").forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");
    });
  });

  document.querySelectorAll("[data-date-br]").forEach(function (field) {
    field.addEventListener("input", function () {
      var value = field.value.replace(/\D/g, "").slice(0, 8);
      var parts = [];

      if (value.length > 0) {
        parts.push(value.slice(0, 2));
      }
      if (value.length > 2) {
        parts.push(value.slice(2, 4));
      }
      if (value.length > 4) {
        parts.push(value.slice(4, 8));
      }

      field.value = parts.join("/");
    });
  });

  document.querySelectorAll("[data-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");
      document.querySelectorAll("[data-tab]").forEach(function (item) {
        item.classList.remove("is-active");
      });
      document.querySelectorAll("[data-panel]").forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-panel") === target);
      });
      tab.classList.add("is-active");
    });
  });

  document.querySelectorAll("[data-redirect-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var destination = form.getAttribute("data-redirect-form");
      var requiredFields = form.querySelectorAll("[required]");
      var valid = true;

      requiredFields.forEach(function (field) {
        if (!field.checkValidity()) {
          valid = false;
        }
      });

      if (!valid) {
        form.reportValidity();
        return;
      }

      window.location.href = destination;
    });
  });

  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var message = document.querySelector("[data-contact-success]");
      if (message) {
        message.classList.add("is-visible");
      }
      form.reset();
    });
  });
});
