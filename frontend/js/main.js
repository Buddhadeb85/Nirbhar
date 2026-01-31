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

/* =========================================
   CLEAN RESPONSIVE MULTI-LEVEL MENU SCRIPT
   Works with plain HTML + CSS
========================================= */

/* ---------- ELEMENT REFERENCES ---------- */
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

/* ---------- SAFETY CHECK ---------- */
if (!sidebar || !toggleBtn) {
  console.error("Sidebar or Toggle Button not found");
}

/* ---------- TOGGLE SIDEBAR ---------- */
toggleBtn.addEventListener("click", function (e) {
  e.stopPropagation(); // prevent outside click close
  sidebar.classList.toggle("closed");
});

/* ---------- MULTI-LEVEL SUBMENU TOGGLE ---------- */
document.querySelectorAll(".menu-item.has-children").forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.stopPropagation(); // stop parent close

    item.classList.toggle("open");

    const subMenu = item.nextElementSibling;
    if (!subMenu) return;

    subMenu.style.display =
      subMenu.style.display === "block" ? "none" : "block";
  });
});

/* ---------- MENU ITEM NAVIGATION ---------- */
document.querySelectorAll(".menu-item[data-link]").forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.stopPropagation(); // do not close immediately

    const link = item.getAttribute("data-link");
    if (link) {
      window.location.href = link;
    }
  });
});

/* ---------- CLICK OUTSIDE TO CLOSE (MOBILE) ---------- */
document.addEventListener("click", function (e) {
  const clickedInsideMenu = sidebar.contains(e.target);
  const clickedToggle = toggleBtn.contains(e.target);

  if (
    window.innerWidth < 768 &&
    !clickedInsideMenu &&
    !clickedToggle
  ) {
    sidebar.classList.add("closed");
  }
});

/* ---------- AUTO COLLAPSE / EXPAND ON RESIZE ---------- */
function handleMenuResize() {
  if (window.innerWidth >= 768) {
    sidebar.classList.remove("closed");
  } else {
    sidebar.classList.add("closed");
  }
}

handleMenuResize();
window.addEventListener("resize", handleMenuResize);

/* ---------- OPTIONAL: ESC KEY TO CLOSE ---------- */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    sidebar.classList.add("closed");
  }
});
