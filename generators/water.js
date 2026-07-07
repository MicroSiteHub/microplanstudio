document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const glassCount = parseInt(document.getElementById("glassCount").value, 10);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Water Tracker";

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

  const labelHeader = document.createElement("th");
  labelHeader.textContent = "Glass #";
  labelHeader.className = "header";
  headerRow.appendChild(labelHeader);

  days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    th.className = "header";
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  // Rows for each glass
  for (let i = 1; i <= glassCount; i++) {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.className = "schedule-name-cell";
    labelCell.textContent = i;
    row.appendChild(labelCell);

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

  // Notes
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
    filename: "water-tracker.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
