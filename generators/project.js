document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const taskCount = parseInt(document.getElementById("taskCount").value, 10);

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Project Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Date: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Project Overview
  const overviewHeader = document.createElement("h2");
  overviewHeader.textContent = "Project Overview";
  page.appendChild(overviewHeader);

  const overviewBox = document.createElement("div");
  overviewBox.className = "notes-box";
  overviewBox.style.height = "60px";
  page.appendChild(overviewBox);

  // Objectives
  const objHeader = document.createElement("h2");
  objHeader.textContent = "Key Objectives";
  page.appendChild(objHeader);

  const objBox = document.createElement("div");
  objBox.className = "notes-box";
  objBox.style.height = "80px";
  page.appendChild(objBox);

  // Task Breakdown
  const taskHeader = document.createElement("h2");
  taskHeader.textContent = "Task Breakdown";
  page.appendChild(taskHeader);

  const table = document.createElement("table");
  table.className = "schedule-table";

  const headerRow = document.createElement("tr");
  ["Task", "Owner", "Deadline", "Status"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  for (let i = 0; i < taskCount; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  page.appendChild(table);

  // Milestones
  const milestoneHeader = document.createElement("h2");
  milestoneHeader.textContent = "Milestones";
  page.appendChild(milestoneHeader);

  const milestoneBox = document.createElement("div");
  milestoneBox.className = "notes-box";
  milestoneBox.style.height = "80px";
  page.appendChild(milestoneBox);

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
    filename: "project-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
