(function () {
  "use strict";

  //ADAPTAR A PANTALLA

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };

  var counter = function () {
    $(".js-counter").countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($("#colorlib-counter").length > 0) {
      $("#colorlib-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };

  // ANIMACIONES DE CONTENIDO
  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  var burgerMenu = function () {
    $(".js-colorlib-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $this = $(this);

      if ($("body").hasClass("offcanvas")) {
        $this.removeClass("active");
        $("body").removeClass("offcanvas");
      } else {
        $this.addClass("active");
        $("body").addClass("offcanvas");
      }
    });
  };

  // Al hacer click fuera, el menu se cierra
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-colorlib-nav-toggle").removeClass("active");
        }
      }
    });

    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });
  };

  var isClickScrolling = false;

  var clickMenu = function () {
    $('#navbar a:not([class="external"])').click(function (event) {
      var section = $(this).data("nav-section"),
        navbar = $("#navbar");

      // Resaltar inmediatamente la sección clicada
      navActive(section);

      if ($('[data-section="' + section + '"]').length) {
        isClickScrolling = true;
        $("html, body").animate(
          {
            scrollTop: $('[data-section="' + section + '"]').offset().top - 55,
          },
          500,
          function () {
            // Reaplicar tras completar la animación y reactivar detección de scroll
            navActive(section);
            setTimeout(function () {
              isClickScrolling = false;
            }, 100);
          }
        );
      }

      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflejar el scroll en el menu
  var navActive = function (section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.find("a").removeAttr("aria-current");
    $el.each(function () {
      var $link = $(this)
        .find('a[data-nav-section="' + section + '"]');
      $link.closest("li").addClass("active");
      $link.attr("aria-current", "true");
    });
  };

  var navigationSection = function () {
    var $section = $("section[data-section]");

    $section.waypoint(
      function (direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "150px",
      }
    );

    $section.waypoint(
      function (direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function () {
          return -$(this.element).height() + 155;
        },
      }
    );

    // Al hacer scroll cerca del final, activar la última sección navegable
    $(window).on("scroll", function () {
      if (isClickScrolling) return;

      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();

      if (scrollTop + windowHeight >= docHeight - 100) {
        // Encontrar la última sección con un enlace de navegación correspondiente
        var lastNavSection = null;
        $section.each(function () {
          var sectionName = $(this).data("section");
          if ($('#navbar a[data-nav-section="' + sectionName + '"]').length > 0) {
            lastNavSection = sectionName;
          }
        });
        if (lastNavSection) {
          navActive(lastNavSection);
        }
      }
    });
  };

  var sliderMain = function () {
    $("#colorlib-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });
  };

  var stickyFunction = function () {
    var h = $(".image-content").outerHeight();

    if ($(window).width() <= 992) {
      $("#sticky_item").trigger("sticky_kit:detach");
    } else {
      $(".sticky-parent").removeClass("stick-detach");
      $("#sticky_item").trigger("sticky_kit:detach");
      $("#sticky_item").trigger("sticky_kit:unstick");
    }

    $(window).resize(function () {
      var h = $(".image-content").outerHeight();
      $(".sticky-parent").css("height", h);

      if ($(window).width() <= 992) {
        $("#sticky_item").trigger("sticky_kit:detach");
      } else {
        $(".sticky-parent").removeClass("stick-detach");
        $("#sticky_item").trigger("sticky_kit:detach");
        $("#sticky_item").trigger("sticky_kit:unstick");

        $("#sticky_item").stick_in_parent();
      }
    });

    $(".sticky-parent").css("height", h);
  };

  var owlCrouselFeatureSlide = function () {
    $(".owl-carousel").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      autoplay: true,
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-arrow-left3 owl-direction'></i>",
        "<i class='icon-arrow-right3 owl-direction'></i>",
      ],
    });
  };

  // Documento listo
  $(function () {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();

    clickMenu();
    // navActive() - desactivado;
    navigationSection();
    // windowScroll() - desactivado;

    mobileMenuOutsideClick();
    sliderMain();
    stickyFunction();
    owlCrouselFeatureSlide();
  });
})();

var Accordion = function (el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  // Variables privadas del acordeón
  var links = this.el.find(".link");
  // Evento de click
  links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  // Evento de teclado (Enter y Espacio) para accesibilidad
  links.on("keydown", { el: this.el, multiple: this.multiple }, function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      Accordion.prototype.dropdown.call(this, e);
    }
  });
};

Accordion.prototype.dropdown = function (e) {
  var $el = e.data.el;
  var $this = $(this);
  var $next = $this.next();
  var isOpen = $this.parent().hasClass("open");

  $next.slideToggle();
  $this.parent().toggleClass("open");

  // Actualizar estado ARIA expandido
  $this.attr("aria-expanded", !isOpen);

  if (!e.data.multiple) {
    $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
    // Cerrar estados ARIA de los demás elementos
    $el.find(".link").not($this).attr("aria-expanded", "false");
  }
};

var accordion = new Accordion($("#accordion"), false);

function enableDarkMode() {
  var element = document.body;
  var toggle = document.getElementById("dark-mode");
  var btn = document.getElementById("dark-mode-btn");
  var announcer = document.getElementById("sr-announcer");

  if (element.classList.contains("dark-mode")) {
    // Actualmente oscuro → cambiar a claro
    element.classList.remove("dark-mode");
    if (toggle) {
      toggle.src = "images/night-mode.png";
    }
    if (btn) {
      btn.setAttribute("aria-label", "Activar Modo Oscuro");
      btn.title = "Activar Modo Oscuro";
    }
    if (announcer) {
      announcer.textContent = "Modo claro activado";
    }
  } else {
    // Actualmente claro → cambiar a oscuro
    element.classList.add("dark-mode");
    if (toggle) {
      toggle.src = "images/light-mode.png";
    }
    if (btn) {
      btn.setAttribute("aria-label", "Activar Modo Claro");
      btn.title = "Activar Modo Claro";
    }
    if (announcer) {
      announcer.textContent = "Modo oscuro activado";
    }
  }
}

// Detectar automáticamente la preferencia de modo oscuro del sistema al cargar
(function () {
  var prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    enableDarkMode();
  }
})();

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
