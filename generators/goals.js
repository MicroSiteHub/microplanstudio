document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const goalCount = parseInt(document.getElementById("goalCount").value, 10);

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Goal Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Date: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Generate goal blocks
  for (let i = 1; i <= goalCount; i++) {
    const goalHeader = document.createElement("h2");
    goalHeader.textContent = `Goal ${i}`;
    page.appendChild(goalHeader);

    // Goal title
    const goalTitle = document.createElement("div");
    goalTitle.className = "notes-box";
    goalTitle.style.height = "40px";
    page.appendChild(goalTitle);

    // Why this goal matters
    const whyHeader = document.createElement("h2");
    whyHeader.textContent = "Why this goal matters";
    page.appendChild(whyHeader);

    const whyBox = document.createElement("div");
    whyBox.className = "notes-box";
    whyBox.style.height = "80px";
    page.appendChild(whyBox);

    // Steps table
    const stepsHeader = document.createElement("h2");
    stepsHeader.textContent = "Steps / Milestones";
    page.appendChild(stepsHeader);

    const table = document.createElement("table");
    table.className = "schedule-table";

    const headerRow = document.createElement("tr");
    ["Step", "Deadline", "Done"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.className = "header";
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    for (let r = 0; r < 5; r++) {
      const row = document.createElement("tr");

      const stepCell = document.createElement("td");
      stepCell.className = "slot";
      row.appendChild(stepCell);

      const deadlineCell = document.createElement("td");
      deadlineCell.className = "slot";
      row.appendChild(deadlineCell);

      const doneCell = document.createElement("td");
      doneCell.className = "slot";
      row.appendChild(doneCell);

      table.appendChild(row);
    }

    page.appendChild(table);
  }

  // Notes section
  const notesHeader = document.createElement("h2");
  notesHeader.textContent = "General Notes";
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
    filename: "goal-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
