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
  title.textContent = "To-Do List";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Date: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Task list
  const listHeader = document.createElement("h2");
  listHeader.textContent = "Tasks";
  page.appendChild(listHeader);

  const ul = document.createElement("ul");
  ul.className = "task-list";

  for (let i = 0; i < taskCount; i++) {
    const li = document.createElement("li");

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";

    const text = document.createElement("span");
    text.textContent = "";

    li.appendChild(checkbox);
    li.appendChild(text);
    ul.appendChild(li);
  }

  page.appendChild(ul);

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
    filename: "todo-list.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
