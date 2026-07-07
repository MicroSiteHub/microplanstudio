document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const habitCount = parseInt(document.getElementById("habitCount").value, 10);

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Weekly Review";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Weekly Wins
  const winsHeader = document.createElement("h2");
  winsHeader.textContent = "Weekly Wins";
  page.appendChild(winsHeader);

  const winsBox = document.createElement("div");
  winsBox.className = "notes-box";
  winsBox.style.height = "80px";
  page.appendChild(winsBox);

  // Challenges
  const challengesHeader = document.createElement("h2");
  challengesHeader.textContent = "Challenges";
  page.appendChild(challengesHeader);

  const challengesBox = document.createElement("div");
  challengesBox.className = "notes-box";
  challengesBox.style.height = "80px";
  page.appendChild(challengesBox);

  // Lessons Learned
  const lessonsHeader = document.createElement("h2");
  lessonsHeader.textContent = "Lessons Learned";
  page.appendChild(lessonsHeader);

  const lessonsBox = document.createElement("div");
  lessonsBox.className = "notes-box";
  lessonsBox.style.height = "80px";
  page.appendChild(lessonsBox);

  // Habit Check-In
  const habitHeader = document.createElement("h2");
  habitHeader.textContent = "Habit Check-In";
  page.appendChild(habitHeader);

  const table = document.createElement("table");
  table.className = "schedule-table";

  const headerRow = document.createElement("tr");
  ["Habit", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  for (let i = 0; i < habitCount; i++) {
    const row = document.createElement("tr");

    const habitCell = document.createElement("td");
    habitCell.className = "schedule-name-cell";
    row.appendChild(habitCell);

    for (let d = 0; d < 7; d++) {
      const cell = document.createElement("td");
      cell.className = "schedule-day-cell";

      const box = document.createElement("div");
      box.className = "schedule-checkbox";

      cell.appendChild(box);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  page.appendChild(table);

  // Goals for Next Week
  const goalsHeader = document.createElement("h2");
  goalsHeader.textContent = "Goals for Next Week";
  page.appendChild(goalsHeader);

  const goalsBox = document.createElement("div");
  goalsBox.className = "notes-box";
  goalsBox.style.height = "80px";
  page.appendChild(goalsBox);

  // Notes
  const notesHeader = document.createElement("h2");
  notesHeader.textContent = "Additional Notes";
  page.appendChild(notesHeader);

  const notesBox = document.createElement("div");
  notesBox.className = "notes-box";
  notesBox.style.height = "80px";
  page.appendChild(notesBox);

  preview.appendChild(page);
  document.getElementById("downloadBtn").classList.remove("hidden");
}

function downloadPDF() {
  const page = document.querySelector(".planner-page");

  const opt = {
    margin: 0,
    filename: "weekly-review.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
