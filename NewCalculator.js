console.log("External JS loaded");

// ===== WAIT FOR MATERIALS =====
function waitForMaterials(callback) {
  if (typeof MATERIALS !== "undefined") {
    callback();
  } else {
    setTimeout(() => waitForMaterials(callback), 100);
  }
}

// ===== EMAIL FUNCTION =====
function sendOrderEmail() {
  const materialDropdown = document.getElementById("hn-material");
  const materialText = materialDropdown?.options[materialDropdown.selectedIndex]?.text || "";
  const result = document.getElementById("hn-result")?.innerText || "";

  if (!result) {
    alert("Please calculate materials first.");
    return;
  }

  const subject = encodeURIComponent("StoneMarket Order Request");

  const body = encodeURIComponent(
`*** PLEASE COMPLETE ALL CONTACT INFO BEFORE SENDING! ***

NAME:
PHONE NUMBER:
ADDRESS:
DELIVERY REQUESTED? (YES/NO):

----------------------------

ORDER DETAILS:

Material: ${materialText}

${result}

*** Please allow 3 business days to process this order request ***
----------------------------

(Submitted via SquareSpace Material Calculator)`
  );

  window.location.href = `mailto:pwiltz@hoerrnursery.com?subject=${subject}&body=${body}`;
}

// ===== MAIN INIT FUNCTION =====
function initCalculator() {

  const materialDropdown = document.getElementById("hn-material");
  const addBtn = document.getElementById("hn-add");
  const printBtn = document.getElementById("hn-print");

  if (!materialDropdown || !addBtn) {
    console.error("Required elements not found");
    return;
  }

  // ===== PRINT FUNCTION (RESTORED) =====
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

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

  // ===== SOD TOGGLE =====
  materialDropdown.addEventListener("change", () => {
    const selected = materialDropdown.value;
    const currentMode = document.querySelector('input[name="mode"]:checked').value;

    if (selected === "sod") {
      depthGroup.style.display = "none";
    } else {
      if (currentMode === "yards") {
        depthGroup.style.display = "none";
      } else {
        depthGroup.style.display = "block";
      }
    }
  });

  function updateUnitsForMode(mode) {
    const rows = document.querySelectorAll(".hn-area-row");

    rows.forEach(row => {
      const select = row.querySelector(".hn-unit");
      if (!select) return;

      let acresOption = select.querySelector('option[value="acres"]');
      let label = row.querySelector(".hn-unit-label");

      if (mode === "multi") {
        if (acresOption) acresOption.remove();
        select.value = "sqft";
        select.style.display = "none";

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
        select.style.display = "";

        if (!acresOption) {
          const option = document.createElement("option");
          option.value = "acres";
          option.textContent = "Acres";
          select.appendChild(option);
        }

        if (label) label.remove();
      }
    });
  }

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
        depthGroup.style.display = "none";
      }

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
      <span class="hn-row-result"></span>
      <button class="hn-remove">X</button>
    `;

    row.querySelector(".hn-remove").addEventListener("click", () => {
      row.remove();
      if (document.querySelectorAll(".hn-area-row").length === 0) {
        addBtn.click();
      }
    });

    const lengthInput = row.querySelector(".hn-length");
    const widthInput = row.querySelector(".hn-width");
    const resultDisplay = row.querySelector(".hn-row-result");

    function updateRowResult() {
      const length = parseFloat(lengthInput.value) || 0;
      const width = parseFloat(widthInput.value) || 0;

      if (length > 0 && width > 0) {
        const area = length * width;
        resultDisplay.textContent = `${area.toFixed(2)} sq ft`;
      } else {
        resultDisplay.textContent = "";
      }
    }

    lengthInput.addEventListener("input", updateRowResult);
    widthInput.addEventListener("input", updateRowResult);

    areaList.appendChild(row);

    const currentMode = document.querySelector('input[name="mode"]:checked').value;
    updateUnitsForMode(currentMode);
  });

  // ===== CALCULATE =====
  document.getElementById("hn-calc").addEventListener("click", function () {

    const mode = document.querySelector('input[name="mode"]:checked').value;
    const selectedMaterialId = document.getElementById("hn-material").value;

    let totalArea = 0;
    let cubicYards = 0;
    let cubicFeet = 0;

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

      if (selectedMaterialId === "sod") {
        if (totalArea <= 0) {
          document.getElementById("hn-result").innerHTML = "Please enter valid area.";
          return;
        }

        const rolls = Math.ceil(totalArea / 10);
        const totalCost = rolls * 8.5;

        document.getElementById("hn-result").innerHTML = `
          <strong>Sod Estimate</strong><br>
          Area: ${totalArea.toFixed(2)} sq ft<br>
          Rolls: ${rolls}<br>
          Total: $${totalCost.toFixed(2)}
        `;

        document.getElementById("hn-order-btn").style.display = "inline-block";
        return;
      }

      const depth = parseFloat(document.getElementById("hn-depth").value) || 0;

      if (totalArea <= 0 || depth <= 0) {
        document.getElementById("hn-result").innerHTML = "Please enter valid area and depth.";
        return;
      }

      cubicFeet = totalArea * (depth / 12);
      cubicYards = cubicFeet / 27;
    }

    const material = MATERIALS.find(m => m.id == selectedMaterialId);

    if (!material) {
      document.getElementById("hn-result").innerHTML = "Please select a material.";
      return;
    }

    const tons = (cubicFeet * material.density) / 2000;
    const totalPrice = tons * material.price;

    document.getElementById("hn-result").innerHTML = `
      Material: ${material.name}<br>
      Cubic Yards: ${cubicYards.toFixed(2)}<br>
      Tons: ${tons.toFixed(2)}<br>
      Total: $${totalPrice.toFixed(2)}
    `;

    document.getElementById("hn-order-btn").style.display = "inline-block";
  });

  addBtn.click();
}

waitForMaterials(initCalculator);
