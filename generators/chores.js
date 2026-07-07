document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const choreCount = parseInt(document.getElementById("choreCount").value, 10);
  const start = document.getElementById("weekStart").value;

  const days =
    start === "Mon"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Chore Chart";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Table
  const table = document.createElement("table");
  table.className = "schedule-table";

  // Header row
  const headerRow = document.createElement("tr");

  const choreHeader = document.createElement("th");
  choreHeader.textContent = "Chore";
  choreHeader.className = "header";
  headerRow.appendChild(choreHeader);

  days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    th.className = "header";
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  // Chore rows
  for (let i = 0; i < choreCount; i++) {
    const row = document.createElement("tr");

    const choreCell = document.createElement("td");
    choreCell.className = "schedule-name-cell";
    row.appendChild(choreCell);

    days.forEach(() => {
      const cell = document.createElement("td");
      cell.className = "schedule-day-cell";

      const box = document.createElement("div");
      box.className = "schedule-checkbox";

      cell.appendChild(box);
      row.appendChild(cell);
    });

    table.appendChild(row);
  }

  page.appendChild(table);

  // Notes section
  const notesHeader = document.createElement("h2");
  notesHeader.textContent = "Notes";
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
    filename: "chore-chart.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
