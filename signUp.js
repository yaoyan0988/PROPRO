//橫向測側欄
const navBar = document.querySelector("nav"),
      menuBtns = document.querySelectorAll(".fa-bars"),
      lists = document.querySelector(".lists");
    menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
      });
    });
    lists.addEventListener("click", () => {
      navBar.classList.remove("open");
    });