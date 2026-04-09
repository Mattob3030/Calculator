(function initCalculator() {

  const check = setInterval(() => {
    const materialSelect = document.getElementById("hn-material");

    if (!materialSelect) return;
    clearInterval(check);

    const addBtn = document.getElementById("hn-add");
    const list = document.querySelector(".hn-area-list");
    const calcBtn = document.getElementById("hn-calc");
    const result = document.getElementById("hn-result");
    const printBtn = document.getElementById("hn-print");

    // Populate materials
    for (let key in MATERIALS) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = MATERIALS[key].name;
      materialSelect.appendChild(opt);
    }

    // Add area row
    function addRow() {
      const row = document.createElement("div");
      row.className = "hn-area-row";

      row.innerHTML =
        '<input type="number" placeholder="Length (ft)">' +
        '<input type="number" placeholder="Width (ft)">' +
        '<select>' +
          '<option value="ft">Feet</option>' +
          '<option value="in">Inches</option>' +
        '</select>' +
        '<button class="hn-remove">×</button>';

      row.querySelector(".hn-remove").onclick = () => row.remove();
      list.appendChild(row);
    }

    addBtn.onclick = addRow;
    addRow();

    // Toggle modes
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
      radio.onchange = () => {
        document.getElementById("hn-multi").style.display =
          radio.value === "multi" ? "block" : "none";
        document.getElementById("hn-total").style.display =
          radio.value === "total" ? "block" : "none";
      };
    });

    // Calculate
    calcBtn.onclick = function () {
      const materialKey = materialSelect.value;
      const depth = parseFloat(document.getElementById("hn-depth").value);

      if (!materialKey || isNaN(depth) || depth <= 0) {
        result.innerHTML = "Please select a material and enter a valid depth.";
        return;
      }

      let totalSqFt = 0;
      const modeEl = document.querySelector('input[name="mode"]:checked');
      if (!modeEl) {
        result.innerHTML = "Please select a calculation mode.";
        return;
      }

      const mode = modeEl.value;

      if (mode === "multi") {
        document.querySelectorAll(".hn-area-row").forEach(row => {
          const l = parseFloat(row.children[0].value);
          const w = parseFloat(row.children[1].value);
          const unit = row.children[2].value;

          if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return;

          let area = l * w;
          if (unit === "in") area /= 144;

          totalSqFt += area;
        });

      } else {
        let val = parseFloat(document.getElementById("hn-total-input").value);
        const unit = document.getElementById("hn-unit").value;

        if (isNaN(val) || val <= 0) {
          result.innerHTML = "Please enter a valid total area.";
          return;
        }

        if (unit === "acres") val *= 43560;

        totalSqFt = val;
      }

      if (totalSqFt <= 0) {
        result.innerHTML = "Please enter valid area dimensions.";
        return;
      }

      // Volume calculations
      const cubicFeet = totalSqFt * (depth / 12);
      const cubicYards = cubicFeet / 27;
      const cubicMeters = cubicFeet * 0.0283168;

      const material = MATERIALS[materialKey];
      const coverage = material.coverage;
      const unitsNeeded = cubicYards / coverage;

      // Format helper
      const format = (num) =>
        num.toLocaleString(undefined, { maximumFractionDigits: 2 });

      // Output (safe string build)
      result.innerHTML =
        '<h3 style="margin-top:0;">Estimate</h3>' +

        '<strong>Area:</strong><br>' +
        format(totalSqFt) + ' sq ft<br><br>' +

        '<strong>Volume Needed:</strong><br>' +
        format(cubicFeet) + ' cubic feet<br>' +
        format(cubicYards) + ' cubic yards<br>' +
        format(cubicMeters) + ' cubic meters<br><br>' +

        '<strong>' + material.name + ':</strong><br>' +
        format(unitsNeeded) + ' ' + material.unit;

      printBtn.style.display = "block";
      printBtn.dataset.print = result.innerHTML;
    };

    // Print
    printBtn.onclick = function () {
      const w = window.open("", "_blank");
      w.document.write(
        '<html><head><title>Material Estimate</title></head>' +
        '<body style="font-family: Arial; padding:20px;">' +
        this.dataset.print +
        '</body></html>'
      );
      w.document.close();
      w.print();
    };

  }, 100);

})();
