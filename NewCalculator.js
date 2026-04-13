console.log("External JS loaded");

// ===== WAIT FOR MATERIALS =====
function waitForMaterials(callback) {
  if (typeof MATERIALS !== "undefined") {
    callback();
  } else {
    setTimeout(() => waitForMaterials(callback), 100);
  }
}

// ===== MAIN INIT FUNCTION =====
function initCalculator() {

  const materialDropdown = document.getElementById("hn-material");
  const addBtn = document.getElementById("hn-add");

  if (!materialDropdown || !addBtn) {
    console.error("Required elements not found");
    return;
  }

  // ===== POPULATE MATERIALS =====
  materialDropdown.innerHTML = '<option value="">Select Material</option>';

  MATERIALS.forEach(mat => {
    const option = document.createElement("option");
    option.value = mat.id;
    option.textContent = mat.name;
    materialDropdown.appendChild(option);
  });

  // ===== MODE TOGGLE =====
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const multiSection = document.getElementById("hn-multi");
  const totalSection = document.getElementById("hn-total");

  // 🔧 CONTROL UNIT + LABEL BEHAVIOR
  function updateUnitsForMode(mode) {
    const rows = document.querySelectorAll(".hn-area-row");

    rows.forEach(row => {
      const select = row.querySelector(".hn-unit");
      if (!select) return;

      let acresOption = select.querySelector('option[value="acres"]');
      let label = row.querySelector(".hn-unit-label");

      if (mode === "multi") {
        // Remove acres
        if (acresOption) acresOption.remove();

        // Force sqft
        select.value = "sqft";

        // Hide dropdown
        select.style.display = "none";

        // Add label if missing
        if (!label) {
          const span = document.createElement("span");
          span.className = "hn-unit-label";
          span.textContent = "Sq Ft";
          span.style.fontWeight = "600";
          span.style.minWidth = "60px";
          span.style.textAlign = "center";

          select.parentNode.insertBefore(span, select.nextSibling);
        }

      } else {
        // Show dropdown
        select.style.display = "";

        // Restore acres if missing
        if (!acresOption) {
          const option = document.createElement("option");
          option.value = "acres";
          option.textContent = "Acres";
          select.appendChild(option);
        }

        // Remove label
        if (label) label.remove();
      }
    });
  }

  modeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const selected = document.querySelector('input[name="mode"]:checked').value;

      if (selected === "multi") {
        multiSection.style.display = "block";
        totalSection.style.display = "none";
        addBtn.style.display = "inline-block";
      } else {
        multiSection.style.display = "none";
        totalSection.style.display = "block";
        addBtn.style.display = "none";
      }

      // 🔧 APPLY UNIT RULES
      updateUnitsForMode(selected);
    });
  });

  // ===== ADD AREA ROW =====
  const areaList = document.querySelector(".hn-area-list");

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

    row.querySelector(".hn-remove").addEventListener("click", () => {
      row.remove();

      if (document.querySelectorAll(".hn-area-row").length === 0) {
        addBtn.click();
      }
    });

    areaList.appendChild(row);

    // 🔧 APPLY CURRENT MODE TO NEW ROW
    const currentMode = document.querySelector('input[name="mode"]:checked').value;
    updateUnitsForMode(currentMode);
  });

  // ===== CALCULATE =====
  document.getElementById("hn-calc").addEventListener("click", function () {
const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
}
    let totalArea = 0;
    const mode = document.querySelector('input[name="mode"]:checked').value;

    if (mode === "multi") {
      const rows = document.querySelectorAll(".hn-area-row");

      rows.forEach(row => {
        const length = parseFloat(row.querySelector(".hn-length").value) || 0;
        const width = parseFloat(row.querySelector(".hn-width").value) || 0;
        const unit = row.querySelector(".hn-unit").value;

        let area = length * width;
        if (unit === "acres") area *= 43560;

        totalArea += area;
      });

    } else {
      let input = parseFloat(document.getElementById("hn-total-input").value) || 0;
      let unit = document.getElementById("hn-unit").value;

      if (unit === "acres") input *= 43560;

      totalArea = input;
    }

    const depthInches = parseFloat(document.getElementById("hn-depth").value) || 0;

    if (totalArea <= 0 || depthInches <= 0) {
      document.getElementById("hn-result").innerHTML = "Please enter valid area and depth.";
      return;
    }

    // ===== MATERIAL =====
    const selectedMaterialId = document.getElementById("hn-material").value;
    const material = MATERIALS.find(m => m.id == selectedMaterialId);

    if (!material) {
      document.getElementById("hn-result").innerHTML = "Please select a material.";
      return;
    }

    // ===== CALCULATIONS =====
    const depthFeet = depthInches / 12;
    const cubicFeet = totalArea * depthFeet;
    const cubicYards = cubicFeet / 27;

    const pounds = cubicFeet * material.density;
    const tons = pounds / 2000;
    const totalPrice = tons * material.price;

    // ===== OUTPUT =====
    document.getElementById("hn-result").innerHTML = `
      <strong>Hoerr Nursery's StoneMarket Estimate ${formattedDate}</strong><br><br>
      <strong>Results:</strong><br><br>
      <strong>Area:</strong> ${totalArea.toFixed(2)} sq ft<br>
      <strong>Cubic Feet:</strong> ${cubicFeet.toFixed(2)}<br>
      <strong>Cubic Yards:</strong> ${cubicYards.toFixed(2)}<br><br>
      <strong>Tons (est.):</strong> ${tons.toFixed(2)}<br>
      <strong>Estimated Cost:</strong> $${totalPrice.toFixed(2)}<br><br>
      <strong>Call us today to order: 309-689-2513 • Located 8020 N. Shade Tree Dr. Peoria, IL 61615</strong>
    `;
  });

  // ===== PRINT BUTTON (SAFE) =====
  const printBtn = document.getElementById("hn-print");

  if (printBtn) {
    printBtn.onclick = function () {
      const w = window.open("", "_blank");
      const resultHTML = document.getElementById("hn-result").innerHTML;

      w.document.write(`
        <html>
          <head><title>Material Estimate</title></head>
          <body style="font-family: Arial; padding:20px;">
            ${resultHTML}
          </body>
        </html>
      `);

      w.document.close();
      w.print();
    };
  }

  // ===== INIT FIRST ROW =====
  addBtn.click();

  // 🔧 ENSURE CORRECT MODE ON LOAD
  const initialMode = document.querySelector('input[name="mode"]:checked').value;
  updateUnitsForMode(initialMode);
}

// ===== START =====
waitForMaterials(initCalculator);
