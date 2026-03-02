document.addEventListener("DOMContentLoaded", () => {
  // Плавное появление блоков при скролле
   const animated = document.querySelectorAll("[data-animate]");

   const observer = new IntersectionObserver(
      entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
         }
      });
      },
      {
      threshold: 0.15,
      }
   );

   animated.forEach(el => observer.observe(el));

  // Плавный скролл по якорям
   document.body.addEventListener("click", e => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement && target.getAttribute("href")?.startsWith("#")) {
      const id = target.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
         e.preventDefault();
         el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      }
   });


  // Бургер-меню для мобильной версии
   const burger = document.querySelector(".burger");
   const nav = document.querySelector(".nav");

   if (burger instanceof HTMLButtonElement && nav instanceof HTMLElement) {
      burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      burger.classList.toggle("is-active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
      });

      nav.addEventListener("click", e => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement && nav.classList.contains("is-open")) {
         nav.classList.remove("is-open");
         burger.classList.remove("is-active");
         document.body.style.overflow = "";
      }
      });

      window.addEventListener("resize", () => {
         if (window.innerWidth > 720 && nav.classList.contains("is-open")) {
            nav.classList.remove("is-open");
            burger.classList.remove("is-active");
            document.body.style.overflow = "";
         }
      });
   }
});