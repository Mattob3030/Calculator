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
        depthGroup.style.display = "none";
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
  });

  // ===== CALCULATE =====
  document.getElementById("hn-calc").addEventListener("click", function () {

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
      <div style="margin-bottom:10px;">
        <strong>Hoerr Nursery's StoneMarket Estimate ${formattedDate}</strong>
      </div>

      <div style="margin-bottom:10px;">
        <strong>Results:</strong>
      </div>

      <div><strong>Material:</strong> ${material.name}</div>
      ${mode !== "yards" ? `<div><strong>Area:</strong> ${totalArea.toFixed(2)} sq ft</div>` : ""}
      <div><strong>Cubic Feet:</strong> ${cubicFeet.toFixed(2)}</div>
      <div><strong>Cubic Yards:</strong> ${cubicYards.toFixed(2)}</div>

      <div style="margin-top:10px;">
        <strong>Tons (est.):</strong> ${tons.toFixed(2)}
      </div>

      <div style="margin-top:6px;">
        <strong>Estimated Cost:</strong> $${totalPrice.toFixed(2)}
      </div>

      <div style="margin-top:15px;">
        <strong>Call us today to order: 309-689-2513</strong><br>
        <strong>Located 8020 N. Shade Tree Dr. Peoria, IL 61615</strong><br>
        <strong>HoerrNursery.com</strong>
      </div>
    `;
  });

  // ===== PRINT BUTTON =====
  const printBtn = document.getElementById("hn-print");

  if (printBtn) {
    printBtn.onclick = function () {
      const w = window.open("", "_blank");
      const resultHTML = document.getElementById("hn-result").innerHTML;

      w.document.write(`
        <html>
          <head>
            <title>Material Estimate</title>
            <style>
              body { font-family: Arial; padding:40px; color:#222; }
              .container { max-width:700px; margin:auto; }
              h1 { text-align:center; margin-bottom:20px; }
              .footer { margin-top:30px; font-size:13px; text-align:center; }
            </style>
          </head>
          <body>
            <div class="container">
              ${resultHTML}
              <div class="footer">
                Hoerr Nursery • 309-689-2513
              </div>
            </div>
          </body>
        </html>
      `);

      w.document.close();
      w.print();
    };
  }

  // ===== INIT =====
  addBtn.click();
}

// ===== START =====
waitForMaterials(initCalculator);
