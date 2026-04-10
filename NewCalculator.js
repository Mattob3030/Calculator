document.addEventListener("DOMContentLoaded", function () {

  const list = document.querySelector(".hn-area-list");
  const addBtn = document.getElementById("hn-add");
  const calcBtn = document.getElementById("hn-calc");
  const printBtn = document.getElementById("hn-print");
  const resultDiv = document.getElementById("hn-result");
  const materialDropdown = document.getElementById("hn-material");

  // BUILD MATERIAL DROPDOWN
  MATERIALS.forEach(mat => {
    const opt = document.createElement("option");
    opt.value = mat.id;
    opt.textContent = `${mat.name} ($${mat.price}/ton)`;
    materialDropdown.appendChild(opt);
  });

  // ADD AREA ROW
  function addRow() {
    const row = document.createElement("div");
    row.className = "hn-area-row";

    row.innerHTML = `
      <input type="number" placeholder="Length (ft)">
      <input type="number" placeholder="Width (ft)">
      <button type="button" class="hn-remove">X</button>
    `;

    row.querySelector(".hn-remove").onclick = () => row.remove();
    list.appendChild(row);
  }

  addBtn.onclick = addRow;
  addRow();

  // TOGGLE MODE
  document.querySelectorAll("input[name='mode']").forEach(r => {
    r.addEventListener("change", () => {
      document.getElementById("hn-multi").style.display =
        r.value === "multi" ? "block" : "none";

      document.getElementById("hn-total").style.display =
        r.value === "total" ? "block" : "none";
    });
  });

  // CALCULATE
  calcBtn.onclick = function () {

    let totalSqFt = 0;
    const mode = document.querySelector("input[name='mode']:checked").value;

    if (mode === "multi") {
      document.querySelectorAll(".hn-area-row").forEach(row => {
        const [l, w] = row.querySelectorAll("input");
        const len = parseFloat(l.value);
        const wid = parseFloat(w.value);
        if (len && wid) totalSqFt += len * wid;
      });
    } else {
      let val = parseFloat(document.getElementById("hn-total-input").value);
      const unit = document.getElementById("hn-unit").value;

      if (!val) {
        resultDiv.innerHTML = "Enter total area.";
        return;
      }

      totalSqFt = unit === "acres" ? val * 43560 : val;
    }

    const depth = parseFloat(document.getElementById("hn-depth").value);
    const matId = parseInt(materialDropdown.value);
    const material = MATERIALS.find(m => m.id === matId);

    if (!totalSqFt || !depth || !material) {
      resultDiv.innerHTML = "Please complete all fields.";
      return;
    }

    // COVERAGE CALCULATION (based on your system)
    const depthFactor = depth;
    const adjustedCoverage = material.coverage / depthFactor;

    const tonsNeeded = totalSqFt / adjustedCoverage;
    const totalCost = tonsNeeded * material.price;

    const output = `
      <strong>Material Estimate</strong><br><br>
      Area: ${totalSqFt.toFixed(0)} sq ft<br>
      Material: ${material.name}<br>
      Depth: ${depth}"<br>
      Tons Needed: ${tonsNeeded.toFixed(2)} tons<br>
      Estimated Cost: $${totalCost.toFixed(2)}
    `;

    resultDiv.innerHTML = output;

    printBtn.style.display = "block";
    printBtn.dataset.print = output;
  };

  // PRINT
  printBtn.onclick = function () {
    const w = window.open("", "_blank");
    w.document.write(`
      <html>
        <head><title>Material Estimate</title></head>
        <body style="font-family: Arial; padding:20px;">
          ${this.dataset.print}
        </body>
      </html>
    `);
    w.document.close();
    w.print();
  };

});
