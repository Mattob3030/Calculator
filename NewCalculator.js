// ===== MODE TOGGLE =====
const modeRadios = document.querySelectorAll('input[name="mode"]');
const multiSection = document.getElementById("hn-multi");
const totalSection = document.getElementById("hn-total");

modeRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    const selected = document.querySelector('input[name="mode"]:checked').value;

    if (selected === "multi") {
      multiSection.style.display = "block";
      totalSection.style.display = "none";
    } else {
      multiSection.style.display = "none";
      totalSection.style.display = "block";
    }
  });
});


// ===== ADD AREA ROW =====
const areaList = document.querySelector(".hn-area-list");
const addBtn = document.getElementById("hn-add");

addBtn.addEventListener("click", () => {
  const row = document.createElement("div");
  row.className = "hn-area-row";

  row.innerHTML = `
    <input type="number" class="hn-length" placeholder="Length">
    <input type="number" class="hn-width" placeholder="Width">
    <select class="hn-unit">
      <option value="sqft">Sq Ft</option>
      <option value="acres">Acres</option>
    </select>
    <button class="hn-remove">X</button>
  `;

  // Remove row
  row.querySelector(".hn-remove").addEventListener("click", () => {
    row.remove();
  });

  areaList.appendChild(row);
});


// ===== CALCULATE =====
document.getElementById("hn-calc").addEventListener("click", function () {

  let totalArea = 0;
  const mode = document.querySelector('input[name="mode"]:checked').value;

  // === MULTI AREA ===
  if (mode === "multi") {
    const rows = document.querySelectorAll(".hn-area-row");

    rows.forEach(row => {
      const length = parseFloat(row.querySelector(".hn-length").value) || 0;
      const width = parseFloat(row.querySelector(".hn-width").value) || 0;
      const unit = row.querySelector(".hn-unit").value;

      let area = length * width;

      // Convert acres → sqft
      if (unit === "acres") area *= 43560;

      totalArea += area;
    });

  } else {
    // === TOTAL AREA ===
    let input = parseFloat(document.getElementById("hn-total-input").value) || 0;
    let unit = document.getElementById("hn-unit").value;

    if (unit === "acres") input *= 43560;

    totalArea = input;
  }

  // === DEPTH ===
  const depthInches = parseFloat(document.getElementById("hn-depth").value) || 0;
  const depthFeet = depthInches / 12;

  // === VOLUME (BASE: cubic feet) ===
  const cubicFeet = totalArea * depthFeet;
  const cubicYards = cubicFeet / 27;
  const cubicMeters = cubicFeet * 0.0283168;

  // === OUTPUT ===
  document.getElementById("hn-result").innerHTML = `
    <strong>Estimated Material:</strong><br><br>
    ${cubicFeet.toFixed(2)} cubic feet<br>
    ${cubicYards.toFixed(2)} cubic yards<br>
    ${cubicMeters.toFixed(2)} cubic meters
  `;

});


// ===== INIT (ADD FIRST ROW) =====
addBtn.click();
