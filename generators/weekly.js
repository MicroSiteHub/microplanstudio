document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Weekly Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Determine week start
  const start = document.getElementById("weekStart").value;
  const days =
    start === "Mon"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Weekly layout table
  const table = document.createElement("table");
  table.className = "schedule-table";

  const headerRow = document.createElement("tr");
  days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    th.className = "header";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Rows for writing space
  for (let i = 0; i < 12; i++) {
    const row = document.createElement("tr");
    days.forEach(() => {
      const cell = document.createElement("td");
      cell.className = "slot";
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
    filename: "weekly-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
