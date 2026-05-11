document.addEventListener("DOMContentLoaded", function () {

  // EXCLUDED PAGES
  const excludedPages = [
    "/netpsagreement"
  ];

  const excludedDomains = [
    "plants.hoerrnursery.com"
  ];

  if (
    excludedPages.includes(window.location.pathname) ||
    excludedDomains.includes(window.location.hostname)
  ) {

    const searchContainer = document.querySelector(".hn-search");

    if (searchContainer) {
      searchContainer.style.display = "none";
    }

    return;
  }

  const input = document.getElementById("hn-search-input");
  const button = document.getElementById("hn-search-btn");
  const message = document.getElementById("hn-search-message");

  const searchData = [
    { url: "/sod", keywords: ["sod", "grass", "turf"] },
    { url: "/garden-center", keywords: ["garden center", "plants", "nursery"] },
    { url: "/garden-shop", keywords: ["shop", "store", "garden shop"] },
    { url: "/stone-market-1", keywords: ["stone", "rock", "gravel", "sand", "delivery", "mulch", "better earth", "compost", "topsoil", "top soil", "dirt", "fill dirt",] },
    { url: "/trees", keywords: ["trees"] },
    { url: "/netpsagreement", keywords: [
   // TREES
"american beech","american beech tree","bald cypress","banana tree",
"chestnut","horseshoe chestnut","crape myrtle","fruit cocktail tree",
"multi fruit tree","red buckeye tree","shade tree",
"sycamore","thuja","thuja green giant","weeping cherry",
"ever red japanese maple","crimson queen","green giant",

// SHRUBS
"aronia","low scape mound aronia","butterfly bush","dwarf butterfly bush",
"dwarf buddleia","button bush","elderberry","black tower elderberry",
"mock orange","smokebush","winecraft black smokebush","snowball",
"rose","roses","david austin","carolina allspice",
"calycanthus floridus","jostaberry",

// PERENNIALS
"anemones","black-eyed susans","daylilies","dianthus","forget me nots",
"heuchera","hyssop","iris","lavender","mukdenia","mullein",
"peonies","painted fern","stiff tickseed","verbascum",
"raspberry echinacea","orange daylilies",

// ANNUALS
"nemesia","pentas","supertunia","supertunia bubblegum",
"supertunia picasso","angelface perfectly pink",

// GRASSES
"big blue stem","karl forester",

// VINES / CLIMBERS
"amethyst falls wisteria vine","climbing black eye susan vine",
"vine black eye susan","part shade vines","vines for part shade",
"honey suckle",

// TROPICALS / HOUSEPLANTS
"asparagus fern","black magic colocasia","gardenia","orchid",
"pony tail palm","venus fly trap","fiscus","foscus",

// EDIBLES
"aji rico","blueberry","borage","carolina reaper","chives",
"cucumber","dill","grapes","jalapeno","jalapeño","onion",
"pepper","rhubarb","spinach","strawberry","sweet potato",
"tomato","vegetables",

// GENERAL / COMMON SEARCHES
"juniper","juniper bush","ornamental","perennial",
"banana tree","topiary","topiaries", "roses", "rose",

// COMMON MISSPELLINGS
"creeping pholx","gerranium","gerraniums","lillac",
"lillies","perinal","sefum","drawf tree"
  ] },
    { url: "/bulbsseeds", keywords: ["bulbs", "seeds"] },
    { url: "/plant-pharmacy", keywords: ["plant care", "fertilizer", "disease", "insect control"] },

    { url: "/landscape", keywords: ["landscape", "landscaping", "yard", "outdoor design"] },
    { url: "/landscapedesign", keywords: ["landscape design", "design service"] },
    { url: "/landscape-maintenance", keywords: ["maintenance", "lawn care", "yard maintenance"] },
    { url: "/wedesign", keywords: ["we design you install", "diy landscape", "design only"] },
    { url: "/hoerr-commercial-services", keywords: ["commercial landscaping", "commercial services"] },

    { url: "/calculatorcontractor", keywords: ["calculator", "estimate", "materials calculator"] },

    { url: "/events", keywords: ["events"] },
    { url: "/workshops", keywords: ["workshops", "classes"] },

    { url: "/resources", keywords: ["resources", "guides"] },
    { url: "/garden-blog", keywords: ["blog", "articles", "tips"] },

    { url: "/about", keywords: ["about", "company", "history"] },
    { url: "/home#hours", keywords: ["contact", "phone", "location", "hours", "open"] },
    { url: "/careers", keywords: ["careers", "jobs", "employment"] },
    { url: "/gift-cards", keywords: ["gift card", "gift cards"] },
    { url: "/warranty", keywords: ["warranty", "guarantee"] }
  ];

  // ===== SEARCH LOGGING FUNCTION (FIXED) =====
  function logSearch(term, matched) {
    const data = JSON.stringify({
      query: term,
      matched: matched,
      timestamp: new Date().toISOString()
    });

    navigator.sendBeacon(
      "https://script.google.com/macros/s/AKfycbycJWVxXGno4Kj7RsJgJhgAlaoVp6e6tGGatD7DtfUwKMO4om611OuObr_jabarYAvJ4g/exec",
      data
    );
  }

  function handleSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    if (message) message.textContent = "";

    // 1. Exact match
    for (let page of searchData) {
      if (page.keywords.includes(query)) {
        logSearch(query, true);
        window.location.href = page.url;
        return;
      }
    }

    // 2. Partial match
    for (let page of searchData) {
      for (let keyword of page.keywords) {
        if (query.includes(keyword)) {
          logSearch(query, true);
          window.location.href = page.url;
          return;
        }
      }
    }

    // 3. No match found
    if (message) {
      message.textContent = "No results found. Please use PLANT FINDER to search for plants!";
    }

    logSearch(query, false);
  }

  button.addEventListener("click", handleSearch);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  input.addEventListener("input", function () {
    if (message) message.textContent = "";
  });

});
