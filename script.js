document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     HELPER
  ===================================================== */

  const $ = (selector) => document.querySelector(selector);

  const $$ = (selector) => [
    ...document.querySelectorAll(selector)
  ];


  /* =====================================================
     YEAR
  ===================================================== */

  const year = $("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================================
     PARTICLES
  ===================================================== */

  const particleContainer = $("#particles");

  if (particleContainer) {

    for (let i = 0; i < 55; i++) {

      const particle = document.createElement("i");

      particle.className = "p";

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.top =
        80 + Math.random() * 30 + "%";

      particle.style.animationDuration =
        8 + Math.random() * 16 + "s";

      particle.style.animationDelay =
        Math.random() * 12 + "s";

      const size =
        Math.random() > 0.85 ? 3 : 2;

      particle.style.width = size + "px";
      particle.style.height = size + "px";

      particleContainer.appendChild(particle);
    }

  }


  /* =====================================================
     TYPING EFFECT
  ===================================================== */

  const typing = $("#typing");

  if (typing) {

    const words = [
      "WEB DEVELOPER",
      "NETWORK ENTHUSIAST",
      "DIGITAL CREATOR",
      "TKJ STUDENT",
      "TECH EXPLORER"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeWriter() {

      const word = words[wordIndex];

      if (!deleting) {

        charIndex++;

        typing.textContent =
          word.slice(0, charIndex);

        if (charIndex >= word.length) {

          deleting = true;

          setTimeout(typeWriter, 1400);

          return;
        }

      } else {

        charIndex--;

        typing.textContent =
          word.slice(0, charIndex);

        if (charIndex <= 0) {

          deleting = false;

          wordIndex =
            (wordIndex + 1) % words.length;

          setTimeout(typeWriter, 350);

          return;
        }

      }

      setTimeout(
        typeWriter,
        deleting ? 45 : 80
      );

    }

    typeWriter();

  }


  /* =====================================================
     NAVBAR
  ===================================================== */

  const nav = $("#nav");

  function updateNavbar() {

    if (!nav) return;

    nav.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

 const sections = $$(
  "main section[id]:not(#cv)"
);

  const navLinks = $$(
    "#links a"
  );

  function updateActiveNav() {

    const position =
      window.scrollY +
      window.innerHeight * 0.35;

    let current = "beranda";

    sections.forEach(section => {

      if (position >= section.offsetTop) {
        current = section.id;
      }

    });

    navLinks.forEach(link => {

      const target =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === "#" + current
      );

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  updateActiveNav();


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menu = $("#menu");
  const links = $("#links");

  if (menu && links) {

    menu.addEventListener(
      "click",
      () => {

        links.classList.toggle("open");

        menu.setAttribute(
          "aria-expanded",
          links.classList.contains("open")
        );

      }
    );

  }

  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        links?.classList.remove("open");

        menu?.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


  /* =====================================================
     THEME
  ===================================================== */

  const theme = $("#theme");

  function setTheme(mode) {

    const isLight =
      mode === "light";

    document.body.classList.toggle(
      "light",
      isLight
    );

    if (theme) {

      theme.textContent =
        isLight ? "☀" : "☾";

      theme.setAttribute(
        "aria-label",
        isLight
          ? "Aktifkan dark mode"
          : "Aktifkan light mode"
      );

    }

    localStorage.setItem(
      "theme",
      mode
    );

  }

  const savedTheme =
    localStorage.getItem("theme");

  setTheme(
    savedTheme === "light"
      ? "light"
      : "dark"
  );

  theme?.addEventListener(
    "click",
    () => {

      const isLight =
        document.body.classList.contains("light");

      setTheme(
        isLight ? "dark" : "light"
      );

    }
  );


  /* =====================================================
     REVEAL ON SCROLL
  ===================================================== */

  const revealElements =
    $$(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            entry.target.classList.add("show");

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.1
        }
      );

    revealElements.forEach(
      element =>
        revealObserver.observe(element)
    );

  } else {

    revealElements.forEach(
      element =>
        element.classList.add("show")
    );

  }


  /* =====================================================
     COUNTER
  ===================================================== */

  const counters =
    $$("[data-count]");

  if ("IntersectionObserver" in window) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            const element =
              entry.target;

            const target =
              Number(element.dataset.count);

            if (!Number.isFinite(target)) {
              return;
            }

            const duration = 1100;

            const start =
              performance.now();

            function animate(time) {

              const progress =
                Math.min(
                  (time - start) / duration,
                  1
                );

              const eased =
                1 -
                Math.pow(
                  1 - progress,
                  3
                );

              element.textContent =
                Math.round(
                  target * eased
                );

              if (progress < 1) {

                requestAnimationFrame(
                  animate
                );

              }

            }

            requestAnimationFrame(
              animate
            );

            counterObserver.unobserve(
              element
            );

          });

        },
        {
          threshold: 0.5
        }
      );

    counters.forEach(
      counter =>
        counterObserver.observe(counter)
    );

  } else {

    counters.forEach(counter => {

      counter.textContent =
        counter.dataset.count;

    });

  }


  /* =====================================================
     HERO 3D MOTION
  ===================================================== */

  const scene = $("#scene");

  /*
     Efek mouse hanya digunakan pada elemen dekorasi.
     Kartu avatar/foto tetap stabil.
  */

  const sceneDecorations =
    scene
      ? scene.querySelectorAll(
          ".scene-grid, .aura, .orbit, .hud"
        )
      : [];

  if (
    scene &&
    sceneDecorations.length &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    scene.addEventListener(
      "pointermove",
      event => {

        const rect =
          scene.getBoundingClientRect();

        targetX =
          (
            (event.clientX - rect.left) /
            rect.width -
            0.5
          ) * 8;

        targetY =
          -(
            (
              (event.clientY - rect.top) /
              rect.height -
              0.5
            ) * 8
          );

      }
    );

    scene.addEventListener(
      "pointerleave",
      () => {

        targetX = 0;
        targetY = 0;

      }
    );

    function animateScene() {

      currentX +=
        (targetX - currentX) * 0.05;

      currentY +=
        (targetY - currentY) * 0.05;

      sceneDecorations.forEach(
        (element, index) => {

          const depth =
            0.35 + index * 0.12;

          element.style.transform =
            `translate3d(
              ${currentX * depth}px,
              ${currentY * depth}px,
              0
            )`;

        }
      );

      requestAnimationFrame(
        animateScene
      );

    }

    animateScene();

  }


  /* =====================================================
     CUSTOM CURSOR
  ===================================================== */

  const cursor = $("#cursor");
  const cursorDot = $("#cursorDot");

  if (
    cursor &&
    cursorDot &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let dotX = 0;
    let dotY = 0;

    window.addEventListener(
      "pointermove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left =
          mouseX + "px";

        cursor.style.top =
          mouseY + "px";

      }
    );

    function cursorAnimation() {

      dotX +=
        (mouseX - dotX) * 0.25;

      dotY +=
        (mouseY - dotY) * 0.25;

      cursorDot.style.left =
        dotX + "px";

      cursorDot.style.top =
        dotY + "px";

      requestAnimationFrame(
        cursorAnimation
      );

    }

    cursorAnimation();


    $$(
      "a, button, .project, .skill-card"
    ).forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {

          document.body.classList.add(
            "cursor-hover"
          );

        }
      );

      element.addEventListener(
        "mouseleave",
        () => {

          document.body.classList.remove(
            "cursor-hover"
          );

        }
      );

    });

  }


  /* =====================================================
     PROJECT FILTER
  ===================================================== */

  const filterButtons =
    $$(".filters button");

  const projects =
    $$(".project");

  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          item =>
            item.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
          button.dataset.filter;

        projects.forEach(project => {

          const category =
            project.dataset.cat;

          const visible =
            filter === "all" ||
            category === filter;

          if (visible) {

            project.style.display = "";

            requestAnimationFrame(() => {

              project.style.opacity = "1";
              project.style.transform = "";

            });

          } else {

            project.style.opacity = "0";
            project.style.transform =
              "scale(.95)";

            setTimeout(() => {

              if (
                project.style.opacity === "0"
              ) {

                project.style.display =
                  "none";

              }

            }, 250);

          }

        });

      }
    );

  });


  /* =====================================================
     PROJECT MODAL
  ===================================================== */

  const modal = $("#modal");
  const modalTitle = $("#mtitle");
  const modalText = $("#mtext");
  const closeModal = $("#close");

  function openProjectModal(project) {

    if (!modal) return;

    if (modalTitle) {

      modalTitle.textContent =
        project.dataset.title ||
        "Project";

    }

    if (modalText) {

      modalText.textContent =
        project.dataset.description ||
        "Project information.";

    }

    modal.classList.add("open");

    document.body.style.overflow =
      "hidden";

  }

  function closeProjectModal() {

    modal?.classList.remove("open");

    document.body.style.overflow =
      "";

  }

  projects.forEach(project => {

    project.addEventListener(
      "click",
      () => {

        openProjectModal(project);

      }
    );

    project.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openProjectModal(project);

        }

      }
    );

  });

  closeModal?.addEventListener(
    "click",
    closeProjectModal
  );

  modal?.addEventListener(
    "click",
    event => {

      if (event.target === modal) {

        closeProjectModal();

      }

    }
  );


  /* =====================================================
     ESCAPE
  ===================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeProjectModal();

        links?.classList.remove("open");

        menu?.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =====================================================
     COPY EMAIL
  ===================================================== */

  const toast = $("#toast");

  $$("[data-copy]").forEach(button => {

    button.addEventListener(
      "click",
      async () => {

        const value =
          button.dataset.copy;

        try {

          await navigator.clipboard.writeText(
            value
          );

        } catch {

          const textarea =
            document.createElement("textarea");

          textarea.value =
            value;

          textarea.style.position =
            "fixed";

          textarea.style.opacity =
            "0";

          document.body.appendChild(
            textarea
          );

          textarea.select();

          document.execCommand("copy");

          textarea.remove();

        }

        if (toast) {

          toast.textContent =
            "Email berhasil disalin.";

          toast.classList.add("show");

          setTimeout(() => {

            toast.classList.remove("show");

          }, 1800);

        }

      }
    );

  });


  /* =====================================================
     BACK TO TOP
  ===================================================== */

  const topButton =
    $("#topButton");

  function updateTopButton() {

    if (!topButton) return;

    topButton.classList.toggle(
      "show",
      window.scrollY > 600
    );

  }

  window.addEventListener(
    "scroll",
    updateTopButton,
    { passive: true }
  );

  updateTopButton();

  topButton?.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* =====================================================
     SMOOTH NAVIGATION
  ===================================================== */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute("href");

        if (
          !id ||
          id === "#" ||
          id.length < 2
        ) return;

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        const offset = 65;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }
    );

  });


  /* =====================================================
     CONSOLE
  ===================================================== */

  console.log(
    "%c JUANG DIGITAL PROFILE ",
    "background:#5de1ff;color:#03101a;font-weight:bold;padding:8px 12px;border-radius:5px;"
  );

  console.log(
    "%c SYSTEM ONLINE ",
    "color:#55e6a5;font-weight:bold;"
  );

});