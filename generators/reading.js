document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const entryCount = parseInt(document.getElementById("entryCount").value, 10);

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Reading Log";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Month: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Table
  const table = document.createElement("table");
  table.className = "schedule-table";

  const headerRow = document.createElement("tr");
  ["Title", "Author", "Start", "Finish", "Rating"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  for (let i = 0; i < entryCount; i++) {
    const row = document.createElement("tr");

    // Title
    const titleCell = document.createElement("td");
    titleCell.className = "slot";
    row.appendChild(titleCell);

    // Author
    const authorCell = document.createElement("td");
    authorCell.className = "slot";
    row.appendChild(authorCell);

    // Start date
    const startCell = document.createElement("td");
    startCell.className = "slot";
    row.appendChild(startCell);

    // Finish date
    const finishCell = document.createElement("td");
    finishCell.className = "slot";
    row.appendChild(finishCell);

    // Rating (1–5 checkboxes)
    const ratingCell = document.createElement("td");
    ratingCell.className = "schedule-day-cell";

    for (let r = 0; r < 5; r++) {
      const box = document.createElement("div");
      box.className = "schedule-checkbox";
      box.style.marginRight = "6px";
      ratingCell.appendChild(box);
    }

    row.appendChild(ratingCell);

    table.appendChild(row);
  }

  page.appendChild(table);

  // Notes
  const notesHeader = document.createElement("h2");
  notesHeader.textContent = "Notes / Summary";
  page.appendChild(notesHeader);

  const notesBox = document.createElement("div");
  notesBox.className = "notes-box";
  notesBox.style.height = "100px";
  page.appendChild(notesBox);

  preview.appendChild(page);
  document.getElementById("downloadBtn").classList.remove("hidden");
}

function downloadPDF() {
  const page = document.querySelector(".planner-page");

  const opt = {
    margin: 0,
    filename: "reading-log.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
