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

/* --------------------------------
   MULTI LEVEL TOGGLE manu bar
-------------------------------- */
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const main = document.getElementById("mainContent");

/* --------------------------------
   TOGGLE SIDEBAR
-------------------------------- */
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("closed");
});

/* --------------------------------
   MULTI LEVEL TOGGLE
-------------------------------- */
document.querySelectorAll(".menu-item.has-children").forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    item.classList.toggle("open");

    const sub = item.nextElementSibling;
    sub.style.display = sub.style.display === "block" ? "none" : "block";
  });
});

/* --------------------------------
   PAGE NAVIGATION
-------------------------------- */
document.querySelectorAll(".menu-item[data-link]").forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = item.dataset.link;
  });
});

/* --------------------------------
   CLICK OUTSIDE → CLOSE (MOBILE)
-------------------------------- */
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 768 &&
    !sidebar.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    sidebar.classList.add("closed");
  }
});

/* --------------------------------
   AUTO HANDLE RESIZE
-------------------------------- */
function handleResize() {
  if (window.innerWidth >= 768) {
    sidebar.classList.remove("closed");
  } else {
    sidebar.classList.add("closed");
  }
}

handleResize();
window.addEventListener("resize", handleResize);


