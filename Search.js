document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("hn-search-input");
  const button = document.getElementById("hn-search-btn");

  const searchData = [
    { url: "/sod", keywords: ["sod", "grass", "turf"] },
    { url: "/garden-center", keywords: ["garden center", "plants", "nursery"] },
    { url: "/garden-shop", keywords: ["shop", "store", "garden shop"] },
    { url: "/stone-market-1", keywords: ["stone", "rock", "gravel"] },
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

    { url: "/stone-market-1", keywords: ["calculator", "estimate", "materials calculator"] },

    { url: "/events", keywords: ["events"] },
    { url: "/workshops", keywords: ["workshops", "classes"] },

    { url: "/resources", keywords: ["resources", "guides"] },
    { url: "/garden-blog", keywords: ["blog", "articles", "tips"] },

    { url: "/about", keywords: ["about", "company"] },
    { url: "/contact", keywords: ["contact", "phone", "location"] },
    { url: "/careers", keywords: ["careers", "jobs", "employment"] },
    { url: "/gift-cards", keywords: ["gift card", "gift cards"] },
    { url: "/warranty", keywords: ["warranty", "guarantee"] }
  ];

  function handleSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

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

    // 3. Fallback to Squarespace search
    window.location.href = "/search?q=" + encodeURIComponent(query);
  }

  button.addEventListener("click", handleSearch);

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

});
