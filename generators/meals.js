document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const start = document.getElementById("weekStart").value;
  const days =
    start === "Mon"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Meal Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Table
  const table = document.createElement("table");
  table.className = "schedule-table";

  // Header row (days)
  const headerRow = document.createElement("tr");

  const mealHeader = document.createElement("th");
  mealHeader.textContent = "Meal";
  mealHeader.className = "header";
  headerRow.appendChild(mealHeader);

  days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    th.className = "header";
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  // Meal rows
  meals.forEach((meal) => {
    const row = document.createElement("tr");

    const mealCell = document.createElement("td");
    mealCell.className = "slot";
    mealCell.textContent = meal;
    row.appendChild(mealCell);

    days.forEach(() => {
      const cell = document.createElement("td");
      cell.className = "slot";
      cell.style.height = "40px";
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  page.appendChild(table);

  // Notes / Shopping list
  const notesHeader = document.createElement("h2");
  notesHeader.textContent = "Shopping List / Notes";
  page.appendChild(notesHeader);

  const notesBox = document.createElement("div");
  notesBox.className = "notes-box";
  page.appendChild(notesBox);

  preview.appendChild(page);
  document.getElementById("downloadBtn").classList.remove("hidden");
}

function downloadPDF() {
  const page = document.querySelector(".planner-page");

  const opt = {
    margin: 0,
    filename: "meal-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
