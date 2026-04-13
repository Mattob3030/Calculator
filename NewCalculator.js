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

  if (!materialDropdown || !addBtn) return;

  // ===== POPULATE MATERIALS =====
  materialDropdown.innerHTML = '<option value="">Select Material</option>';

  MATERIALS.forEach(mat => {
    const option = document.createElement("option");
    option.value = mat.id;
    option.textContent = mat.name;
    materialDropdown.appendChild(option);
  });

  // ===== MODE ELEMENTS =====
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const multiSection = document.getElementById("hn-multi");
  const totalSection = document.getElementById("hn-total");
  const yardsSection = document.getElementById("hn-yards");
  const depthGroup = document.getElementById("hn-depth-group");

  // ===== MODE SWITCHING =====
  modeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const selected = document.querySelector('input[name="mode"]:checked').value;

      if (selected === "multi") {
        multiSection.style.display = "block";
        totalSection.style.display = "none";
        yardsSection.style.display = "none";
        addBtn.style.display = "inline-block";
        depthGroup.style.display = "block";

      } else if (selected === "total") {
        multiSection.style.display = "none";
        totalSection.style.display = "block";
        yardsSection.style.display = "none";
        addBtn.style.display = "none";
        depthGroup.style.display = "block";

      } else if (selected === "yards") {
        multiSection.style.display = "none";
        totalSection.style.display = "none";
        yardsSection.style.display = "block";
        addBtn.style.display = "none";
        depthGroup.style.display = "none"; // 🔥 hide depth
      }
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
      <span class="hn-row-result"></span>
      <button class="hn-remove">X</button>
    `;

    row.querySelector(".hn-remove").onclick = () => {
      row.remove();
      if (document.querySelectorAll(".hn-area-row").length === 0) {
        addBtn.click();
      }
    };

    // live sqft calc
    const lengthInput = row.querySelector(".hn-length");
    const widthInput = row.querySelector(".hn-width");
    const resultDisplay = row.querySelector(".hn-row-result");

    function updateRow() {
      const l = parseFloat(lengthInput.value) || 0;
      const w = parseFloat(widthInput.value) || 0;
      resultDisplay.textContent = (l && w) ? `${(l*w).toFixed(2)} sq ft` : "";
    }

    lengthInput.addEventListener("input", updateRow);
    widthInput.addEventListener("input", updateRow);

    areaList.appendChild(row);
  });

  // ===== CALCULATE =====
  document.getElementById("hn-calc").onclick = function () {

    const mode = document.querySelector('input[name="mode"]:checked').value;

    let totalArea = 0;
    let cubicYards = 0;
    let cubicFeet = 0;

    // ===== MODE LOGIC =====
    if (mode === "yards") {
      cubicYards = parseFloat(document.getElementById("hn-yards-input").value) || 0;

      if (cubicYards <= 0) {
        document.getElementById("hn-result").innerHTML = "Please enter valid cubic yards.";
        return;
      }

      cubicFeet = cubicYards * 27;

    } else {

      if (mode === "multi") {
        document.querySelectorAll(".hn-area-row").forEach(row => {
          let l = parseFloat(row.querySelector(".hn-length").value) || 0;
          let w = parseFloat(row.querySelector(".hn-width").value) || 0;
          let unit = row.querySelector(".hn-unit").value;

          let area = l * w;
          if (unit === "acres") area *= 43560;

          totalArea += area;
        });

      } else {
        let input = parseFloat(document.getElementById("hn-total-input").value) || 0;
        let unit = document.getElementById("hn-unit").value;

        if (unit === "acres") input *= 43560;
        totalArea = input;
      }

      const depth = parseFloat(document.getElementById("hn-depth").value) || 0;

      if (totalArea <= 0 || depth <= 0) {
        document.getElementById("hn-result").innerHTML = "Please enter valid area and depth.";
        return;
      }

      cubicFeet = totalArea * (depth / 12);
      cubicYards = cubicFeet / 27;
    }

    // ===== MATERIAL =====
    const selectedMaterialId = document.getElementById("hn-material").value;
    const material = MATERIALS.find(m => m.id == selectedMaterialId);

    if (!material) {
      document.getElementById("hn-result").innerHTML = "Please select a material.";
      return;
    }

    const tons = (cubicFeet * material.density) / 2000;
    const totalPrice = tons * material.price;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US");

    // ===== OUTPUT =====
    document.getElementById("hn-result").innerHTML = `
      <strong>Hoerr Nursery's StoneMarket Estimate ${formattedDate}</strong><br><br>
      <strong>Material:</strong> ${material.name}<br>
      <strong>Cubic Yards:</strong> ${cubicYards.toFixed(2)}<br>
      <strong>Tons:</strong> ${tons.toFixed(2)}<br><br>
      <strong>Estimated Cost:</strong> $${totalPrice.toFixed(2)}
    `;
  };

  addBtn.click();
}

  // 🔧 ENSURE CORRECT MODE ON LOAD
  const initialMode = document.querySelector('input[name="mode"]:checked').value;
  updateUnitsForMode(initialMode);
}

// ===== START =====
waitForMaterials(initCalculator);
