// ===== GET ELEMENTS =====
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const depthInput = document.getElementById("depth");
const unitSelect = document.getElementById("unitSelect");
const resultElement = document.getElementById("result");


// ===== CONVERSION FUNCTION =====
function convertVolume(cubicFeet, unit) {
  switch (unit) {
    case "yards":
      return cubicFeet / 27; // 1 yd³ = 27 ft³
    case "meters":
      return cubicFeet / 35.3147; // 1 m³ = 35.3147 ft³
    default:
      return cubicFeet;
  }
}


// ===== MAIN CALCULATION =====
function calculate() {
  const length = parseFloat(lengthInput.value);
  const width = parseFloat(widthInput.value);
  const depth = parseFloat(depthInput.value);

  // Prevent NaN / empty inputs
  if (!length || !width || !depth) {
    resultElement.textContent = "--";
    return;
  }

  const cubicFeet = length * width * depth;

  const selectedUnit = unitSelect.value;
  const converted = convertVolume(cubicFeet, selectedUnit);

  let unitLabel = "ft³";
  if (selectedUnit === "yards") unitLabel = "yd³";
  if (selectedUnit === "meters") unitLabel = "m³";

  resultElement.textContent = `${converted.toFixed(2)} ${unitLabel}`;
}


// ===== EVENT LISTENERS =====
lengthInput.addEventListener("input", calculate);
widthInput.addEventListener("input", calculate);
depthInput.addEventListener("input", calculate);
unitSelect.addEventListener("change", calculate);


// ===== INITIAL RUN (optional) =====
calculate();
