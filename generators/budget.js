document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const expenseCount = parseInt(
    document.getElementById("expenseCount").value,
    10,
  );

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Budget Planner";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Month: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Income Section
  const incomeHeader = document.createElement("h2");
  incomeHeader.textContent = "Income";
  page.appendChild(incomeHeader);

  const incomeTable = document.createElement("table");
  incomeTable.className = "schedule-table";

  const incomeHead = document.createElement("tr");
  ["Source", "Amount"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    incomeHead.appendChild(th);
  });
  incomeTable.appendChild(incomeHead);

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 2; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    incomeTable.appendChild(row);
  }

  page.appendChild(incomeTable);

  // Expenses Section
  const expenseHeader = document.createElement("h2");
  expenseHeader.textContent = "Expenses";
  page.appendChild(expenseHeader);

  const expenseTable = document.createElement("table");
  expenseTable.className = "schedule-table";

  const expenseHead = document.createElement("tr");
  ["Category", "Amount"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    expenseHead.appendChild(th);
  });
  expenseTable.appendChild(expenseHead);

  for (let i = 0; i < expenseCount; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 2; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    expenseTable.appendChild(row);
  }

  page.appendChild(expenseTable);

  // Savings Goals
  const savingsHeader = document.createElement("h2");
  savingsHeader.textContent = "Savings Goals";
  page.appendChild(savingsHeader);

  const savingsTable = document.createElement("table");
  savingsTable.className = "schedule-table";

  const savingsHead = document.createElement("tr");
  ["Goal", "Target Amount", "Deadline"].forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    th.className = "header";
    savingsHead.appendChild(th);
  });
  savingsTable.appendChild(savingsHead);

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let c = 0; c < 3; c++) {
      const cell = document.createElement("td");
      cell.className = "slot";
      row.appendChild(cell);
    }
    savingsTable.appendChild(row);
  }

  page.appendChild(savingsTable);

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
    filename: "budget-planner.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
