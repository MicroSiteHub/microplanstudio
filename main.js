// MicroPlan Studio Main Orchestration Script
// Loads configs, populates menu, and manages dynamic generator loading

const GENERATORS_DIR = "./generators/";

// All available planners (in order)
const PLANNER_ORDER = [
  "budget",
  "chores",
  "cleaning",
  "homemaintenance",
  "meals",
  "daily",
  "goals",
  "monthly",
  "project",
  "timeblock",
  "todo",
  "weekly",
  "weeklyreview",
  "reading",
  "study",
  "fitness",
  "gratitude",
  "habits",
  "mood",
  "sleep",
  "water",
];

let configs = {};
let currentPlanner = null;
let currentScript = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadAllConfigs();
    populateMenu();
  } catch (error) {
    console.error("Error initializing MicroPlan Studio:", error);
  }
});

// Load all config files
async function loadAllConfigs() {
  for (const plannerKey of PLANNER_ORDER) {
    try {
      const response = await fetch(`${GENERATORS_DIR}${plannerKey}.json`);
      if (!response.ok) throw new Error(`Failed to load ${plannerKey}.json`);
      configs[plannerKey] = await response.json();
    } catch (error) {
      console.error(`Error loading config for ${plannerKey}:`, error);
    }
  }
}

// Populate the menu with tabbed planner cards
function populateMenu() {
  const tabButtons = document.getElementById("tabButtons");
  const tabContent = document.getElementById("tabContent");
  tabButtons.innerHTML = "";
  tabContent.innerHTML = "";

  // Group planners by category
  const categories = {
    productivity: { label: "Productivity", planners: [] },
    home: { label: "Home & Life", planners: [] },
    learning: { label: "Learning", planners: [] },
    wellness: { label: "Wellness", planners: [] },
  };

  PLANNER_ORDER.forEach((plannerKey) => {
    const config = configs[plannerKey];
    if (!config) return;

    const category = config.category || "productivity";
    if (categories[category]) {
      categories[category].planners.push({ key: plannerKey, config });
    }
  });

  // Create tab buttons and content
  let isFirst = true;
  Object.entries(categories).forEach(([categoryKey, categoryData]) => {
    if (categoryData.planners.length === 0) return;

    // Create tab button
    const tabButton = document.createElement("button");
    tabButton.className = `tab-button ${isFirst ? "active" : ""}`;
    tabButton.textContent = categoryData.label;
    tabButton.setAttribute("data-category", categoryKey);
    tabButton.addEventListener("click", () => switchTab(categoryKey));
    tabButtons.appendChild(tabButton);

    // Create tab content div
    const tabDiv = document.createElement("div");
    tabDiv.className = `menu-tab-content ${isFirst ? "active" : ""}`;
    tabDiv.id = `tab-${categoryKey}`;

    // Create menu grid inside tab
    const gridDiv = document.createElement("div");
    gridDiv.className = "menu-grid";

    categoryData.planners.forEach(({ key, config }) => {
      const card = document.createElement("div");
      card.className = "menu-card";
      card.innerHTML = `
        <h3>${config.name}</h3>
        <p>${config.tagline}</p>
      `;
      card.addEventListener("click", () => selectPlanner(key, card));
      gridDiv.appendChild(card);
    });

    tabDiv.appendChild(gridDiv);
    tabContent.appendChild(tabDiv);

    isFirst = false;
  });
}

// Switch between tabs
function switchTab(categoryKey) {
  // Update tab buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Update tab content
  document.querySelectorAll(".menu-tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });
  const activeTab = document.getElementById(`tab-${categoryKey}`);
  if (activeTab) {
    activeTab.classList.add("active");
  }
}

// Handle planner selection
async function selectPlanner(plannerKey, cardElement) {
  // Update active state
  document.querySelectorAll(".menu-card").forEach((card) => {
    card.classList.remove("active");
  });
  cardElement.classList.add("active");

  currentPlanner = plannerKey;

  // Show loading state
  const panel = document.getElementById("generatorPanel");
  const panelPlaceholder = document.getElementById("generatorPanelPlaceholder");
  const panelLoading = document.getElementById("generatorPanelLoading");
  panel.classList.add("hidden");
  panelPlaceholder.classList.add("hidden");
  panelLoading.classList.remove("hidden");

  // Reset the preview area
  const preview = document.getElementById("previewArea");
  preview.innerHTML = "";

  // Scroll to loading panel
  panelLoading.scrollIntoView({ behavior: "smooth", block: "start" });

  // Load the generator script
  await loadGeneratorScript(plannerKey);

  // Scroll to generator panel
  panelLoading.classList.add("hidden");
  panel.classList.remove("hidden");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function loadGeneratorScript(plannerKey) {
  const panel = document.getElementById("generatorPanel");

  try {
    // Remove previous script if it exists
    if (currentScript) {
      currentScript.remove();
    }

    // Remove old listeners by cloning
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    const newGenerateBtn = generateBtn.cloneNode(true);
    const newDownloadBtn = downloadBtn.cloneNode(true);

    generateBtn.parentNode.replaceChild(newGenerateBtn, generateBtn);
    downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);

    const config = configs[plannerKey];

    // Build UI based on planner type
    const uiHtml = await buildGeneratorUI(plannerKey, config);

    // Populate the panel elements
    const generatorHeader = panel.querySelector("#generatorHeader");
    const generatorIntro = panel.querySelector("#generatorIntro");
    const generatorUI = panel.querySelector("#generatorUI");
    if (generatorHeader) generatorHeader.textContent = config.title;
    if (generatorIntro) generatorIntro.textContent = config.intro;
    if (generatorUI) generatorUI.innerHTML = uiHtml;
    const relatedTools = buildRelatedToolsHtml(plannerKey, config);
    if (relatedTools)
      panel.querySelector("#relatedTools").innerHTML = relatedTools;

    // Load and execute the generator script
    const scriptTag = document.createElement("script");
    scriptTag.src = `${GENERATORS_DIR}${plannerKey}.js`;
    scriptTag.onload = () => {
      console.log(`Loaded generator script for ${plannerKey}`);
      recordEvent(`generator_loaded_${plannerKey}`);
    };
    scriptTag.onerror = () => {
      console.error(`Failed to load generator script for ${plannerKey}`);
      panel.innerHTML = `<p class="text-red-500">Error loading generator. Please try again.</p>`;
    };

    document.body.appendChild(scriptTag);
    currentScript = scriptTag;
  } catch (error) {
    console.error(`Error loading generator for ${plannerKey}:`, error);
    panel.innerHTML = `<p class="text-red-500">Error loading generator: ${error.message}</p>`;
  }
}

// Build UI HTML for each generator type
async function buildGeneratorUI(plannerKey, config) {
  // Try loading custom HTML file first
  try {
    const response = await fetch(`${GENERATORS_DIR}${plannerKey}.html`);
    if (response.ok) {
      const customHtml = await response.text();
      // Wrap custom HTML with styling and Generate button
      return `
        <div class="space-y-4">
          ${customHtml}
        </div>
      `;
    }
  } catch (e) {
    console.log(`No custom HTML for ${plannerKey}, using default UI`);
  }

  // Fallback to hardcoded UI map
  const uiMap = {
    budget: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Number of Expense Rows</label>
          <input type="number" id="expenseCount" class="border rounded px-3 py-2 w-full" value="12" min="5" max="25">
        </div>
      </div>
    `,
    habits: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Number of Habits to Track</label>
          <input type="number" id="habitCount" class="border rounded px-3 py-2 w-full" value="5" min="3" max="12">
        </div>
      </div>
    `,
    daily: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Layout Type</label>
          <select id="layoutSelect" class="border rounded px-3 py-2 w-full">
            <option value="simple">Simple (Priorities + Schedule)</option>
            <option value="schedule">Schedule (Hour-by-hour)</option>
            <option value="tasks">Tasks Only</option>
          </select>
        </div>
      </div>
    `,
  };

  // Return planner-specific UI if available, otherwise create a generic one
  if (uiMap[plannerKey]) {
    return uiMap[plannerKey];
  } else {
    // Generic UI for planners not yet customized
    const defaultRows = getDefaultInputValue(plannerKey);
    return `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Customize Your ${config.name}</label>
          <input type="number" id="${getDefaultInputId(plannerKey)}" class="border rounded px-3 py-2 w-full" value="${defaultRows}" min="5" max="25">
        </div>
      </div>
    `;
  }
}

// Helper: get default input ID for generator (maps planner name to expected input ID)
function getDefaultInputId(plannerKey) {
  const idMap = {
    budget: "expenseCount",
    chores: "choreCount",
    cleaning: "taskCount",
    homemaintenance: "entryCount",
    meals: "mealCount",
    daily: "dayCount",
    goals: "goalCount",
    monthly: "monthCount",
    project: "taskCount",
    timeblock: "blockCount",
    todo: "todoCount",
    weekly: "weekCount",
    weeklyreview: "reviewCount",
    reading: "bookCount",
    study: "subjectCount",
    fitness: "exerciseCount",
    gratitude: "gratitudeCount",
    habits: "habitCount",
    mood: "moodCount",
    sleep: "sleepCount",
    water: "waterCount",
  };
  return idMap[plannerKey] || "customization";
}

// Build related tools section
function buildRelatedToolsHtml(plannerKey, config) {
  const related = config.related || [];
  const cross = config.cross || [];
  const allRelated = [...related, ...cross];

  if (allRelated.length === 0) return "";

  const toolLinks = allRelated
    .map((toolKey) => {
      const toolConfig = configs[toolKey];
      return toolConfig
        ? `<button class="related-tool-item px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium transition-colors" onclick="selectPlannerFromRelated('${toolKey}')" style="cursor: pointer; white-space: nowrap;">
            ${toolConfig.name}
          </button>`
        : "";
    })
    .join("");

  return `
    <div class="mt-8 pt-6 border-t border-slate-200">
      <h4 class="font-semibold mb-3 text-sm text-slate-700">Related Tools</h4>
      <div class="flex flex-wrap gap-2">${toolLinks}</div>
    </div>
  `;
}

// Handle related tool selection
function selectPlannerFromRelated(plannerKey) {
  // Scroll to menu and click the tool
  const tabButton = document.querySelector(
    `[data-category="${configs[plannerKey].category}"]`,
  );
  if (tabButton) {
    tabButton.click();
  }
  // Find and click the card
  setTimeout(() => {
    const cards = document.querySelectorAll(".menu-card");
    for (const card of cards) {
      if (card.textContent.includes(configs[plannerKey].name)) {
        card.click();
        card.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  }, 100);
}

// Helper: get default input value
function getDefaultInputValue(plannerKey) {
  const defaults = {
    budget: 12,
    habits: 5,
    daily: 5,
    weekly: 7,
    monthly: 31,
    cleaning: 8,
    chores: 6,
  };
  return defaults[plannerKey] || 10;
}

// Helper: get display name for category
function getCategoryDisplay(category) {
  const categoryMap = {
    productivity: "Productivity",
    home: "Home & Life",
    learning: "Learning",
    wellness: "Wellness",
  };
  return categoryMap[category] || "Other";
}

// Analytics helper
function recordEvent(eventName) {
  if (window.gtag) {
    gtag("event", eventName, {
      event_category: "engagement",
      event_label: "microplan_studio",
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// CAROUSEL FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════

let currentSlide = 0;
const totalSlides = 4;

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function moveCarousel(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarousel();
}

function updateCarousel() {
  const slides = document.getElementById("carouselSlides");
  if (slides) {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Update dots
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.className =
        "carousel-dot w-2 h-2 rounded-full bg-indigo-600 cursor-pointer";
    } else {
      dot.className =
        "carousel-dot w-2 h-2 rounded-full bg-slate-300 cursor-pointer";
    }
  });
}

// Auto-advance carousel every 8 seconds
let carouselInterval;
function startCarouselAutoplay() {
  if (document.getElementById("carouselSlides")) {
    carouselInterval = setInterval(() => {
      moveCarousel(1);
    }, 8000);
  }
}

document.addEventListener("DOMContentLoaded", startCarouselAutoplay);
