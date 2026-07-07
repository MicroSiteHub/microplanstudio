document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

function generate() {
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  const extraLines =
    parseInt(document.getElementById("extraLines").value, 10) || 0;

  const page = document.createElement("div");
  page.className = "planner-page";

  // Header
  const header = document.createElement("div");
  header.className = "planner-header";

  const title = document.createElement("h1");
  title.textContent = "Gratitude Journal";

  const dateBox = document.createElement("div");
  dateBox.className = "date-box";
  dateBox.textContent = "Date: ____________________";

  header.appendChild(title);
  header.appendChild(dateBox);
  page.appendChild(header);

  // Prompt 1
  const p1Header = document.createElement("h3");
  p1Header.textContent = "Something I'm grateful for today";
  page.appendChild(p1Header);

  const p1Box = document.createElement("div");
  p1Box.className = "notes-box";
  p1Box.style.height = "60px";
  page.appendChild(p1Box);

  // Prompt 2
  const p2Header = document.createElement("h3");
  p2Header.textContent = "A positive moment I experienced";
  page.appendChild(p2Header);

  const p2Box = document.createElement("div");
  p2Box.className = "notes-box";
  p2Box.style.height = "60px";
  page.appendChild(p2Box);

  // Prompt 3
  const p3Header = document.createElement("h3");
  p3Header.textContent = "Someone who made my day better";
  page.appendChild(p3Header);

  const p3Box = document.createElement("div");
  p3Box.className = "notes-box";
  p3Box.style.height = "60px";
  page.appendChild(p3Box);

  // Prompt 4
  const p4Header = document.createElement("h3");
  p4Header.textContent = "A small joy I noticed";
  page.appendChild(p4Header);

  const p4Box = document.createElement("div");
  p4Box.className = "notes-box";
  p4Box.style.height = "60px";
  page.appendChild(p4Box);

  // Prompt 5
  const p5Header = document.createElement("h3");
  p5Header.textContent = "Something I often take for granted";
  page.appendChild(p5Header);

  const p5Box = document.createElement("div");
  p5Box.className = "notes-box";
  p5Box.style.height = "60px";
  page.appendChild(p5Box);

  // Additional Reflections
  const notesHeader = document.createElement("h3");
  notesHeader.textContent = "Additional Reflections";
  page.appendChild(notesHeader);

  const notesBox = document.createElement("div");
  notesBox.className = "notes-box";
  notesBox.style.height = "80px";
  page.appendChild(notesBox);

  // Extra blank space
  if (extraLines > 0) {
    const extraHeader = document.createElement("h3");
    extraHeader.textContent = "Extra Space";
    page.appendChild(extraHeader);

    const extraBox = document.createElement("div");
    extraBox.className = "notes-box";
    extraBox.style.height = `${extraLines * 20}px`;
    page.appendChild(extraBox);
  }

  preview.appendChild(page);
  document.getElementById("downloadBtn").classList.remove("hidden");
}

function downloadPDF() {
  const page = document.querySelector(".planner-page");

  const opt = {
    margin: 0,
    filename: "gratitude-journal.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(page).save();
}
