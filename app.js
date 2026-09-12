// ===========================================================
// AquaGuard — Hospital Water Safety
// Demo data + interactions. No backend: everything lives in
// memory for the session, matching the "demo workspace" banner.
// ===========================================================

const PAGE_TITLES = {
  dashboard: "OVERVIEW",
  assets: "HOSPITAL SETUP",
  risks: "RISK REGISTER",
  monitoring: "MONITORING",
  report: "COMPLIANCE REPORT",
  plan: "PSA DOCUMENT",
};

// ---- Demo data --------------------------------------------

let risks = [
  {
    hazard: "Legionella growth",
    location: "Cooling tower CT-04",
    level: "high",
    control: "Weekly biocide dosing + monthly culture test",
    owner: "Facilities · R. Nieto",
    review: "18 Sep 2026",
  },
  {
    hazard: "Stagnant outlets",
    location: "Ward 3, unused rooms",
    level: "medium",
    control: "Weekly flushing cycle, logged per outlet",
    owner: "Nursing · Ward 3 lead",
    review: "22 Sep 2026",
  },
  {
    hazard: "Backflow risk",
    location: "Dialysis unit supply",
    level: "medium",
    control: "Annual backflow preventer inspection",
    owner: "Facilities · M. Ortiz",
    review: "03 Oct 2026",
  },
  {
    hazard: "Tank temperature drift",
    location: "Cold-water tank 2",
    level: "low",
    control: "Daily automated temperature logging",
    owner: "Facilities · Automated",
    review: "12 Dec 2026",
  },
];

let monitoringPoints = [
  {
    date: "10 Sep",
    title: "Cooling tower CT-04 — temperature",
    detail: "Automated sensor · every 4h",
    value: "38.2 °C",
    status: "overdue",
  },
  {
    date: "10 Sep",
    title: "Ward 3 — flushing cycle confirmation",
    detail: "Manual check · nursing staff",
    value: "Unconfirmed",
    status: "overdue",
  },
  {
    date: "09 Sep",
    title: "ICU outlets — residual chlorine",
    detail: "Laboratory feed · weekly",
    value: "0.42 mg/L",
    status: "ok",
  },
  {
    date: "09 Sep",
    title: "Cold-water tank 1 — temperature",
    detail: "Automated sensor · every 6h",
    value: "19.8 °C",
    status: "ok",
  },
  {
    date: "08 Sep",
    title: "Dialysis unit — endotoxin test",
    detail: "Laboratory feed · monthly",
    value: "Due 14 Sep",
    status: "due",
  },
  {
    date: "07 Sep",
    title: "Distribution zone 6 — flow rate",
    detail: "Automated sensor · daily",
    value: "Within range",
    status: "ok",
  },
];

let assets = [
  { name: "Cold-water tank 1", detail: "4,000 L · Rooftop plant room", role: "Storage" },
  { name: "Cold-water tank 2", detail: "4,000 L · Rooftop plant room", role: "Storage" },
  { name: "Cooling tower CT-04", detail: "Building B, service yard", role: "Critical asset" },
  { name: "ICU distribution loop", detail: "Zone 3 · 6 outlets", role: "Critical unit" },
  { name: "Dialysis unit supply", detail: "Zone 5 · dedicated line", role: "Critical unit" },
  { name: "CSSD water supply", detail: "Zone 7 · dedicated line", role: "Critical unit" },
];

// ---- Navigation ---------------------------------------------

function setActivePage(pageId) {
  document.querySelectorAll(".page").forEach((el) => {
    el.classList.toggle("active", el.id === pageId);
  });
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });
  const label = document.getElementById("page-name");
  if (label) label.textContent = PAGE_TITLES[pageId] || pageId.toUpperCase();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach((btn) => {
  btn.addEventListener("click", () => setActivePage(btn.dataset.page));
});

document.querySelectorAll("[data-page-target]").forEach((btn) => {
  btn.addEventListener("click", () => setActivePage(btn.dataset.pageTarget));
});

// ---- Renderers ------------------------------------------------

function renderAttentionList() {
  const el = document.getElementById("attention-list");
  if (!el) return;
  const items = monitoringPoints.filter((m) => m.status !== "ok").slice(0, 3);
  el.innerHTML = items
    .map(
      (m) => `
      <div class="attention-row">
        <span class="dot ${m.status === "overdue" ? "coral" : "amber"}"></span>
        <div class="body">
          <strong>${m.title}</strong>
          <span>${m.detail}</span>
        </div>
        <span class="tag ${m.status === "overdue" ? "coral" : "amber"}">${
          m.status === "overdue" ? "Overdue" : "Due soon"
        }</span>
      </div>`
    )
    .join("");
}

function renderRiskTable() {
  const el = document.getElementById("risk-table");
  if (!el) return;
  el.innerHTML = risks
    .map(
      (r) => `
      <tr>
        <td class="hazard"><strong>${r.hazard}</strong><span>${r.location}</span></td>
        <td><span class="risk-badge ${r.level}">${
          r.level.charAt(0).toUpperCase() + r.level.slice(1)
        }</span></td>
        <td>${r.control}</td>
        <td>${r.owner}</td>
        <td>${r.review}</td>
      </tr>`
    )
    .join("");
  const count = document.getElementById("risk-count");
  if (count) count.textContent = risks.length;
}

function renderMonitoringList() {
  const el = document.getElementById("monitoring-list");
  if (!el) return;
  el.innerHTML = monitoringPoints
    .map(
      (m) => `
      <div class="monitoring-row">
        <span class="date">${m.date}</span>
        <div class="body">
          <strong>${m.title}</strong>
          <span>${m.detail}</span>
        </div>
        <span class="value">${m.value}</span>
        <span class="status ${m.status}">${
          m.status === "ok" ? "On track" : m.status === "overdue" ? "Overdue" : "Due soon"
        }</span>
      </div>`
    )
    .join("");
  const overdueCount = monitoringPoints.filter((m) => m.status !== "ok").length;
  const total = document.getElementById("overdue-total");
  if (total) total.textContent = overdueCount;
  const monitorCount = document.getElementById("monitor-count");
  if (monitorCount) monitorCount.textContent = overdueCount;
}

function renderAssetGrid() {
  const el = document.getElementById("asset-grid");
  if (!el) return;
  el.innerHTML = assets
    .map(
      (a) => `
      <div class="asset-card">
        <strong>${a.name}</strong>
        <span>${a.detail}</span>
        <span class="role">${a.role}</span>
      </div>`
    )
    .join("");
}

function renderAll() {
  renderAttentionList();
  renderRiskTable();
  renderMonitoringList();
  renderAssetGrid();
}

renderAll();

// ---- Toast ------------------------------------------------

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ---- Add-record dialog ---------------------------------------

const dialog = document.getElementById("entry-dialog");
const dialogKicker = document.getElementById("dialog-kicker");
const dialogTitle = document.getElementById("dialog-title");
const titleInput = document.getElementById("record-title");
const detailInput = document.getElementById("record-detail");
let pendingType = null;

const DIALOG_CONFIG = {
  asset: {
    kicker: "NEW ASSET",
    title: "Add a water-system asset",
    titlePlaceholder: "e.g. Rooftop header tank",
    detailPlaceholder: "e.g. Zone 4 · 2,000 L",
  },
  risk: {
    kicker: "NEW RISK",
    title: "Add a risk",
    titlePlaceholder: "e.g. Low outlet usage",
    detailPlaceholder: "e.g. Facilities team",
  },
  check: {
    kicker: "NEW READING",
    title: "Add a monitoring reading",
    titlePlaceholder: "e.g. Ward 5 — outlet temperature",
    detailPlaceholder: "e.g. Manual check · nursing staff",
  },
};

function openDialog(type) {
  pendingType = type;
  const cfg = DIALOG_CONFIG[type];
  dialogKicker.textContent = cfg.kicker;
  dialogTitle.textContent = cfg.title;
  titleInput.placeholder = cfg.titlePlaceholder;
  detailInput.placeholder = cfg.detailPlaceholder;
  titleInput.value = "";
  detailInput.value = "";
  dialog.showModal();
  titleInput.focus();
}

document.getElementById("add-asset")?.addEventListener("click", () => openDialog("asset"));
document.getElementById("add-risk")?.addEventListener("click", () => openDialog("risk"));
document.getElementById("add-check")?.addEventListener("click", () => openDialog("check"));

dialog?.addEventListener("close", () => {
  if (dialog.returnValue !== "default" || !pendingType) {
    pendingType = null;
    return;
  }
  const title = titleInput.value.trim();
  const detail = detailInput.value.trim();
  if (!title || !detail) {
    pendingType = null;
    return;
  }

  if (pendingType === "asset") {
    assets.unshift({ name: title, detail, role: "New asset" });
    renderAssetGrid();
    showToast("Asset added");
  } else if (pendingType === "risk") {
    risks.unshift({
      hazard: title,
      location: detail,
      level: "medium",
      control: "Control measure not yet defined",
      owner: detail,
      review: "To be scheduled",
    });
    renderRiskTable();
    showToast("Risk added to register");
  } else if (pendingType === "check") {
    monitoringPoints.unshift({
      date: "Today",
      title,
      detail,
      value: "Pending",
      status: "due",
    });
    renderMonitoringList();
    renderAttentionList();
    showToast("Reading logged");
  }
  pendingType = null;
});

// ---- Export buttons (demo workspace: simulate, don't fabricate files) --

document.getElementById("export-report")?.addEventListener("click", () => {
  showToast("Report export started — this is a demo workspace");
});

document.getElementById("export-plan")?.addEventListener("click", () => {
  showToast("PSA export started — this is a demo workspace");
});

document.getElementById("save-record")?.addEventListener("click", (e) => {
  if (!titleInput.value.trim() || !detailInput.value.trim()) {
    e.preventDefault();
    titleInput.reportValidity();
  }
});
