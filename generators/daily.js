document.getElementById("generateBtn").addEventListener("click", () => {
  const layout = document.getElementById("layoutSelect").value;
  const preview = document.getElementById("previewArea");

  let html = "";
  if (layout === "simple") html = renderSimpleLayout();
  if (layout === "schedule") html = renderScheduleLayout();
  if (layout === "tasks") html = renderTasksOnlyLayout();
  preview.innerHTML = html;

  document.getElementById("downloadBtn").classList.remove("hidden");
});

function renderSimpleLayout() {
  return `
    <div class="planner-page">
      <div class="planner-header">
        <h1>Daily Planner</h1>
        <div class="date-box">Date: ____________________</div>
      </div>

      <div class="planner-row">
        <div class="planner-column">
          <h2>Top Priorities</h2>
          <ul class="priority-list">
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <h2>Schedule</h2>
          <table class="schedule-table">
            ${Array.from({ length: 4 })
              .map(
                (_, i) =>
                  `<tr>
                    <td class="time">${i + 8}:00am</td>
                    <td class="slot"></td>
                </tr>`,
              )
              .join("")}
            ${Array.from({ length: 1 })
              .map(
                (_, i) =>
                  `<tr>
                    <td class="time">${i + 12}:00pm</td>
                    <td class="slot"></td>
                </tr>`,
              )
              .join("")}
            ${Array.from({ length: 7 })
              .map(
                (_, i) =>
                  `<tr>
                    <td class="time">${i + 1}:00pm</td>
                    <td class="slot"></td>
                </tr>`,
              )
              .join("")}
          </table>
        </div>

        <div class="planner-column">
          <h2>Tasks</h2>
          <ul class="task-list">
            ${Array.from({ length: 12 })
              .map(() => `<li><span class="checkbox"></span></li>`)
              .join("")}
          </ul>
        </div>
      </div>

      <h2>Notes</h2>
      <div class="notes-box"></div>
    </div>
  `;
}

function renderScheduleLayout() {
  return `
    <div class="planner-page">
      <div class="planner-header">
        <h1>Daily Schedule</h1>
        <div class="date-box">Date: ____________________</div>
      </div>

      <div class="planner-row">
        <div class="planner-column">
          <h2>Top Priorities</h2>
          <ul class="priority-list">
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <h2>Notes</h2>
          <div class="notes-box"></div>
        </div>

        <div class="planner-column">
          <h2>Schedule</h2>
          <table class="schedule-table">
            ${Array.from({ length: 4 })
              .map(
                (_, i) =>
                  `<tr>
                    <td class="time">${i + 8}:00am</td>
                    <td class="slot"></td>
                </tr>`,
              )
              .join("")}
            ${Array.from({ length: 1 })
              .map(
                (_, i) =>
                  `<tr>
                    <td class="time">${i + 12}:00pm</td>
                    <td class="slot"></td>
                </tr>`,
              )
              .join("")}
            ${Array.from({ length: 7 })
              .map(
                (_, i) =>
                  `<tr>
                    <td class="time">${i + 1}:00pm</td>
                    <td class="slot"></td>
                </tr>`,
              )
              .join("")}
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderTasksOnlyLayout() {
  return `
    <div class="planner-page">
      <div class="planner-header">
        <h1>Task Planner</h1>
        <div class="date-box">Date: ____________________</div>
      </div>

      <h2>Tasks</h2>
      <ul class="task-list">
        ${Array.from({ length: 20 })
          .map(() => `<li><span class="checkbox"></span></li>`)
          .join("")}
      </ul>

      <h2>Notes</h2>
      <div class="notes-box"></div>
    </div>
  `;
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.querySelector(".planner-page");

  const opt = {
    margin: 0, // absolutely required
    filename: "daily-planner.pdf",
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

  html2pdf().set(opt).from(element).save();
});
