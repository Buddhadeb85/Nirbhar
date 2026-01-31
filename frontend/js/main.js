function calculateBudget() {
  const income = Number(document.getElementById("income").value);
  const expenses = Number(document.getElementById("expenses").value);

  const savings = income - expenses;

  const result = document.getElementById("result");

  if (!income || !expenses) {
    result.textContent = "⚠️ Please enter both values";
    result.style.color = "red";
    return;
  }

  result.textContent = `💵 Your monthly savings: ₹ ${savings}`;
  result.style.color = savings >= 0 ? "green" : "red";
}

document.addEventListener("DOMContentLoaded", function () {

  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");

  /* Toggle menu */
  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebar.classList.toggle("closed");
  });

  /* Multi-level submenu */
  document.querySelectorAll(".menu-item.has-children").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      item.classList.toggle("open");

      const subMenu = item.nextElementSibling;
      if (subMenu) {
        subMenu.style.display =
          subMenu.style.display === "block" ? "none" : "block";
      }
    });
  });

  /* Navigation */
  document.querySelectorAll(".menu-item[data-link]").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      const link = item.getAttribute("data-link");
      if (link) window.location.href = link;
    });
  });

  /* Outside click close */
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth < 768 &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      sidebar.classList.add("closed");
    }
  });

  /* Resize logic (NO AUTO OPEN) */
  function handleMenuResize() {
    if (window.innerWidth < 768) {
      sidebar.classList.add("closed");
    }
  }

  handleMenuResize();
  window.addEventListener("resize", handleMenuResize);

});
