document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("hn-search-input");
  const button = document.getElementById("hn-search-btn");
  const message = document.getElementById("hn-search-message"); // 👈 MISSING LINE FIXED

  const searchData = [
    { url: "/sod", keywords: ["sod", "grass", "turf"] },
    { url: "/garden-center", keywords: ["garden center", "plants", "nursery"] },
    { url: "/garden-shop", keywords: ["shop", "store", "garden shop"] },
    { url: "/stone-market-1", keywords: ["stone", "rock", "gravel", "sand", "delivery", "mulch", "better earth", "compost"] },
    { url: "/trees", keywords: ["trees"] },
    { url: "/perennials", keywords: ["perennials"] },
    { url: "/annuals", keywords: ["annuals"] },
    { url: "/bulbsseeds", keywords: ["bulbs", "seeds"] },
    { url: "/plant-pharmacy", keywords: ["plant care", "fertilizer", "disease", "insect control"] },

    { url: "/landscape", keywords: ["landscape", "landscaping", "yard", "outdoor design"] },
    { url: "/landscapedesign", keywords: ["landscape design", "design service"] },
    { url: "/landscape-maintenance", keywords: ["maintenance", "lawn care", "yard maintenance"] },
    { url: "/wedesign", keywords: ["we design you install", "diy landscape", "design only"] },
    { url: "/hoerr-commercial-services", keywords: ["commercial landscaping", "commercial services"] },

    { url: "/calculatorcontractor", keywords: ["calculator", "estimate", "materials calculator"] }, // 👈 fixed URL

    { url: "/events", keywords: ["events"] },
    { url: "/workshops", keywords: ["workshops", "classes"] },

    { url: "/resources", keywords: ["resources", "guides"] },
    { url: "/garden-blog", keywords: ["blog", "articles", "tips"] },

    { url: "/about", keywords: ["about", "company", "history"] },
    { url: "/contact", keywords: ["contact", "phone", "location", "hours", "open"] },
    { url: "/careers", keywords: ["careers", "jobs", "employment"] },
    { url: "/gift-cards", keywords: ["gift card", "gift cards"] },
    { url: "/warranty", keywords: ["warranty", "guarantee"] }
  ];

  function handleSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    // Clear previous message
    if (message) message.textContent = "";

    // 1. Exact match
    for (let page of searchData) {
      if (page.keywords.includes(query)) {
        window.location.href = page.url;
        return;
      }
    }

    // 2. Partial match
    for (let page of searchData) {
      for (let keyword of page.keywords) {
        if (query.includes(keyword)) {
          window.location.href = page.url;
          return;
        }
      }
    }

    // 3. No match found
    if (message) {
      message.textContent = "No results found. Try a different keyword.";
    }
  }

  button.addEventListener("click", handleSearch);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Clear message when typing again
  input.addEventListener("input", function () {
    if (message) message.textContent = "";
  });

});
