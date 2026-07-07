document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const dayCount = parseInt(document.getElementById("dayCount").value, 10);

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Sleep Tracker";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Table
  const table = document.createElement("table");
  table.className = "schedule-table";

  const headerRow = document.createElement("tr");
  ["Day", "Bedtime", "Wake Time", "Hours Slept", "Quality"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  for (let i = 1; i <= dayCount; i++) {
    const row = document.createElement("tr");

    // Day label
    const dayCell = document.createElement("td");
    dayCell.className = "slot";
    dayCell.textContent = `Day ${i}`;
    row.appendChild(dayCell);

    // Bedtime
    const bedCell = document.createElement("td");
    bedCell.className = "slot";
    row.appendChild(bedCell);

    // Wake time
    const wakeCell = document.createElement("td");
    wakeCell.className = "slot";
    row.appendChild(wakeCell);

    // Hours slept
    const hoursCell = document.createElement("td");
    hoursCell.className = "slot";
    row.appendChild(hoursCell);

    // Quality checkboxes (3 levels)
    const qualityCell = document.createElement("td");
    qualityCell.className = "schedule-day-cell";

    ["😴", "🙂", "😕"].forEach(() => {
      const box = document.createElement("div");
      box.className = "schedule-checkbox";
      box.style.marginRight = "6px";
      qualityCell.appendChild(box);
    });

    row.appendChild(qualityCell);

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
    filename: "sleep-tracker.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
