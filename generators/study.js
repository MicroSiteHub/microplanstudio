document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const subjectCount = parseInt(
    document.getElementById("subjectCount").value,
    10,
  );
  const assignmentCount = parseInt(
    document.getElementById("assignmentCount").value,
    10,
  );

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Study Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Week of: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Subjects
  const subjectHeader = document.createElement("h2");
  subjectHeader.textContent = "Subjects";
  page.appendChild(subjectHeader);

  const subjectTable = document.createElement("table");
  subjectTable.className = "schedule-table";

  const subjectHead = document.createElement("tr");
  ["Subject", "Priority"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    subjectHead.appendChild(th);
  });
  subjectTable.appendChild(subjectHead);

  for (let i = 0; i < subjectCount; i++) {
    const row = document.createElement("tr");

    const subjectCell = document.createElement("td");
    subjectCell.className = "slot";
    row.appendChild(subjectCell);

    const priorityCell = document.createElement("td");
    priorityCell.className = "slot";
    row.appendChild(priorityCell);

    subjectTable.appendChild(row);
  }

  page.appendChild(subjectTable);

  // Assignments
  const assignHeader = document.createElement("h2");
  assignHeader.textContent = "Assignments & Deadlines";
  page.appendChild(assignHeader);

  const assignTable = document.createElement("table");
  assignTable.className = "schedule-table";

  const assignHead = document.createElement("tr");
  ["Assignment", "Subject", "Due Date", "Status"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    assignHead.appendChild(th);
  });
  assignTable.appendChild(assignHead);

  for (let i = 0; i < assignmentCount; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    assignTable.appendChild(row);
  }

  page.appendChild(assignTable);

  // Study Schedule
  const scheduleHeader = document.createElement("h2");
  scheduleHeader.textContent = "Study Schedule";
  page.appendChild(scheduleHeader);

  const scheduleBox = document.createElement("div");
  scheduleBox.className = "notes-box";
  scheduleBox.style.height = "100px";
  page.appendChild(scheduleBox);

  // Exam Prep
  const examHeader = document.createElement("h2");
  examHeader.textContent = "Exam Prep";
  page.appendChild(examHeader);

  const examBox = document.createElement("div");
  examBox.className = "notes-box";
  examBox.style.height = "80px";
  page.appendChild(examBox);

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
    filename: "study-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
