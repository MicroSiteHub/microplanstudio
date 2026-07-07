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
  title.textContent = "Mood Tracker";

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
  ["Day", "Mood"].forEach((h) => {
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

    // Mood icons (5-point scale)
    const moodCell = document.createElement("td");
    moodCell.className = "schedule-day-cell";

    // 5 moods: 😄 🙂 😐 🙁 😢
    const moods = ["😄", "🙂", "😐", "🙁", "😢"];

    moods.forEach(() => {
      const box = document.createElement("div");
      box.className = "schedule-checkbox";
      box.style.marginRight = "6px";
      moodCell.appendChild(box);
    });

    row.appendChild(moodCell);
    table.appendChild(row);
  }

  page.appendChild(table);

  // Notes
  const notesHeader = document.createElement("h2");
  notesHeader.textContent = "Notes / Reflection";
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
    filename: "mood-tracker.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
