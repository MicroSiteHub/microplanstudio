document
  .getElementById("generateBtn")
  .addEventListener("click", generateTracker);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generateTracker() {
  const habitCount = parseInt(document.getElementById("habitCount").value, 10);
  const weekCount = habitCount <= 6 ? 3 : habitCount <= 12 ? 2 : 1; // auto-adjust weeks based on habit count

  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Habit Tracker";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = `Date: ____________________`;

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let w = 1; w <= weekCount; w++) {
    const weekLabel = document.createElement("h2");
    weekLabel.textContent = `Week ${w}`;
    page.appendChild(weekLabel);

    const table = document.createElement("table");
    table.className = "schedule-table";

    // Header row
    const headerRow = document.createElement("tr");

    const habitHeader = document.createElement("th");
    habitHeader.textContent = "Habit";
    habitHeader.className = "header";
    headerRow.appendChild(habitHeader);

    days.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      th.className = "header";
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Habit rows
    for (let i = 0; i < habitCount; i++) {
      const row = document.createElement("tr");

      const habitCell = document.createElement("td");
      habitCell.className = "schedule-name-cell";
      habitCell.textContent = ""; // blank for user to write
      row.appendChild(habitCell);

      days.forEach(() => {
        const cell = document.createElement("td");
        cell.className = "schedule-day-cell";
        row.appendChild(cell);
        const checkbox = document.createElement("div");
        checkbox.className = "schedule-checkbox";
        cell.appendChild(checkbox);
      });

      table.appendChild(row);
    }

    page.appendChild(table);
  }

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
  const preview = document.getElementById("previewArea");
  const page = preview.querySelector(".planner-page");

  const opt = {
    margin: 0, // absolutely required
    filename: "habit-tracker.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2, // 2 is enough; 3 sometimes causes overflow
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
  };

  html2pdf().set(opt).from(page).save();
}
