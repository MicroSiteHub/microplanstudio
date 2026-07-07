document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const strengthCount = parseInt(
    document.getElementById("strengthCount").value,
    10,
  );
  const cardioCount = parseInt(
    document.getElementById("cardioCount").value,
    10,
  );

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Fitness Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Weekly Workout Plan
  const planHeader = document.createElement("h2");
  planHeader.textContent = "Weekly Workout Plan";
  page.appendChild(planHeader);

  const planBox = document.createElement("div");
  planBox.className = "notes-box";
  planBox.style.height = "80px";
  page.appendChild(planBox);

  // Strength Training Log
  const strengthHeader = document.createElement("h2");
  strengthHeader.textContent = "Strength Training";
  page.appendChild(strengthHeader);

  const strengthTable = document.createElement("table");
  strengthTable.className = "schedule-table";

  const strengthHead = document.createElement("tr");
  ["Exercise", "Sets", "Reps", "Weight"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    strengthHead.appendChild(th);
  });
  strengthTable.appendChild(strengthHead);

  for (let i = 0; i < strengthCount; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    strengthTable.appendChild(row);
  }

  page.appendChild(strengthTable);

  // Cardio Log
  const cardioHeader = document.createElement("h2");
  cardioHeader.textContent = "Cardio & Steps";
  page.appendChild(cardioHeader);

  const cardioTable = document.createElement("table");
  cardioTable.className = "schedule-table";

  const cardioHead = document.createElement("tr");
  ["Activity", "Duration", "Distance", "Steps"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    cardioHead.appendChild(th);
  });
  cardioTable.appendChild(cardioHead);

  for (let i = 0; i < cardioCount; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    cardioTable.appendChild(row);
  }

  page.appendChild(cardioTable);

  // Body Metrics
  const metricsHeader = document.createElement("h2");
  metricsHeader.textContent = "Body Metrics";
  page.appendChild(metricsHeader);

  const metricsBox = document.createElement("div");
  metricsBox.className = "notes-box";
  metricsBox.style.height = "80px";
  page.appendChild(metricsBox);

  // Weekly Goals
  const goalsHeader = document.createElement("h2");
  goalsHeader.textContent = "Weekly Goals";
  page.appendChild(goalsHeader);

  const goalsBox = document.createElement("div");
  goalsBox.className = "notes-box";
  goalsBox.style.height = "80px";
  page.appendChild(goalsBox);

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
    filename: "fitness-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
