document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const start = parseInt(document.getElementById("startTime").value, 10);
  const end = parseInt(document.getElementById("endTime").value, 10);
  const interval = parseInt(document.getElementById("interval").value, 10);

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Time-Block Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Date: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Table
  const table = document.createElement("table");
  table.className = "schedule-table";

  // Generate rows
  for (let hour = start; hour < end; hour++) {
    for (let m = 0; m < 60; m += interval) {
      const row = document.createElement("tr");

      const timeCell = document.createElement("td");
      timeCell.className = "header";

      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const displayMin = m.toString().padStart(2, "0");
      const ampm = hour < 12 ? "AM" : "PM";

      timeCell.textContent = `${displayHour}:${displayMin} ${ampm}`;
      row.appendChild(timeCell);

      const slotCell = document.createElement("td");
      slotCell.className = "slot";
      row.appendChild(slotCell);

      table.appendChild(row);
    }
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
    filename: "timeblock-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
