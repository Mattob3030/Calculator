console.log("Sod Calculator Loaded");

function initCalculator() {

  const addBtn = document.getElementById("hn-add");

  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const multiSection = document.getElementById("hn-multi");
  const totalSection = document.getElementById("hn-total");

  // MODE SWITCHING
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
    });
  });

  // ADD AREA ROW
  const areaList = document.querySelector(".hn-area-list");

  addBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "hn-area-row";

    row.innerHTML = `
      <input type="number" class="hn-length" placeholder="Length">
      <input type="number" class="hn-width" placeholder="Width">
      <span class="hn-unit-label">Sq Ft</span>
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

  // CALCULATE
  document.getElementById("hn-calc").addEventListener("click", function () {

    const mode = document.querySelector('input[name="mode"]:checked').value;

    let totalArea = 0;

    if (mode === "multi") {
      const rows = document.querySelectorAll(".hn-area-row");

      rows.forEach(row => {
        const length = parseFloat(row.querySelector(".hn-length").value) || 0;
        const width = parseFloat(row.querySelector(".hn-width").value) || 0;

        totalArea += (length * width);
      });

    } else {
      totalArea = parseFloat(document.getElementById("hn-total-input").value) || 0;
    }

    if (totalArea <= 0) {
      document.getElementById("hn-result").innerHTML = "Please enter valid area.";
      return;
    }

    const wastePercent = parseFloat(document.getElementById("hn-waste").value) || 0;
    const adjustedArea = totalArea * (1 + wastePercent / 100);

    const rolls = Math.ceil(adjustedArea / 10);
    const pallets = Math.ceil(adjustedArea / 500);

    // DELIVERY
    const deliveryChecked = document.getElementById("hn-delivery").checked;
    const deliveryCost = deliveryChecked ? 140 : 0;

    // FUTURE PRICING PLACEHOLDER
    const materialCost = 0;

    const totalCost = materialCost + deliveryCost;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US");

    document.getElementById("hn-result").innerHTML = `
      <div style="margin-bottom:10px;">
        <strong>Hoerr Nursery Sod Estimate ${formattedDate}</strong>
      </div>

      <div><strong>Total Area:</strong> ${totalArea.toFixed(2)} sq ft</div>
      <div><strong>Waste Added:</strong> ${wastePercent}%</div>
      <div><strong>Adjusted Area:</strong> ${adjustedArea.toFixed(2)} sq ft</div>

      <div style="margin-top:10px;">
        <strong>Rolls Needed:</strong> ${rolls}
      </div>

      <div>
        <strong>Pallets Needed:</strong> ${pallets}
      </div>

      <div style="margin-top:10px;">
        <strong>Delivery:</strong> ${deliveryChecked ? "Yes" : "No"}
      </div>

      ${deliveryChecked ? `<div><strong>Delivery Charge:</strong> $140</div>` : ""}

      <div style="margin-top:10px;">
        <strong>Material Total:</strong> $${materialCost}
      </div>

      ${deliveryChecked ? `<div><strong>Delivery:</strong> $${deliveryCost}</div>` : ""}

      <div>
        <strong>Grand Total:</strong> $${totalCost}
      </div>

      <div style="margin-top:15px;">
        <strong>309-689-2513</strong><br>
        <strong>8020 N. Shade Tree Dr. Peoria, IL</strong><br>
        <strong>HoerrNursery.com</strong>
      </div>
    `;

    document.getElementById("hn-order-btn").style.display = "inline-block";
  });

  // PRINT
  document.getElementById("hn-print").onclick = function () {
    const w = window.open("", "_blank");
    const resultHTML = document.getElementById("hn-result").innerHTML;

    w.document.write(`
      <html>
        <head>
          <title>Sod Estimate</title>
          <style>
            body { font-family: Arial; padding:40px; }
          </style>
        </head>
        <body>
          ${resultHTML}
        </body>
      </html>
    `);

    w.document.close();
    w.print();
  };

  // INIT
  addBtn.click();
}

document.addEventListener("DOMContentLoaded", initCalculator);
