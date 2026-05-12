document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("hn-search-input");
  const button = document.getElementById("hn-search-btn");
  const message = document.getElementById("hn-search-message");

  const searchData = [
    { url: "/sod", keywords: ["sod", "grass", "turf"] },
    { url: "/garden-center", keywords: ["garden center", "nursery", "bird baths", "statues", "pots", "hose", "watering can", "garden statues"] },
    { url: "/garden-shop", keywords: ["shop", "store", "garden shop"] },
    { url: "/stone-market-1", keywords: ["stone", "rock", "gravel", "sand", "delivery", "mulch", "better earth", "compost", "topsoil", "top soil", "dirt", "fill dirt",] },
    { url: "/trees", keywords: ["trees"] },
    { url: "/netpsagreement", keywords: [
  // TREES
"american beech","american beech tree","autumn blaze maple",
"bald cypress","banana tree","blue spruce","bur oak",
"catalpa tree","cherry tree","chestnut","coniferous trees",
"crabapple","crape myrtle","crimson queen",
"crimson queen japanese maple","dogwood","eastern redbud",
"eastern white pine","ever red japanese maple",
"fast growing tree","flowering dogwood","flowering trees",
"fruit cocktail tree","ginkgo trees","green giant",
"green giant arborvitae","hard maple trees",
"hearts a fire redbud","heritage birch tree",
"honey locust","horseshoe chestnut","japanese maple",
"japanese maples","lilac tree","magnolia tree",
"maple","maple trees","maples","multi fruit tree",
"norway spruce","oak","oaks","paper birch",
"pecan trees","red buckeye tree","red maple",
"rising sun redbud","sassafras trees","serviceberry",
"serviceberry tree","shade tree","small trees",
"spruce","sugar maple","sycamore","thuja",
"thuja green giant","tulip tree","weeping cherry",
"weeping willow","white oak","willow","arborvitae",

// SHRUBS
"abelia","aronia","azalea","baby kim lilac bush", "bush",
"barberry","black tower elderberry","boxwood",
"burning bush","butterfly bush","button bush",
"calycanthus floridus","carolina allspice",
"david austin","dwarf buddleia","dwarf butterfly bush",
"elderberry","endless summer hydrangea",
"fears buddleia","girards pleasant white azalea",
"holly bush","hydrangea","hydrangeas",
"hydrangeas tree","inkberry","jostaberry",
"knockout rose","lilac bush","lilac bushes",
"limelight hydrangea","low scape mound aronia",
"mango blue butterfly bush","mock orange",
"nanho blue butterfly bush","ninebark",
"oak leaf hydrangea","perennial bushes",
"potentilla","rhododendron","rose","rose of sharon",
"rose plant hybrid tea","rose tree","roses", "rose",
"shrubs","smokebush","snowball","spirea",
"viburnum","weigela","winecraft black smokebush",

// PERENNIALS
"anemones","astilbe","black eyed susan",
"black-eyed susans","bleeding heart","catmint",
"colored hosta","columbine","coneflower",
"coreopsis","creeping phlox","daylilies",
"daylily","delphinium","dianthus",
"forget me nots","ground cover","hardy hibiscus",
"heuchera","hollyhock plants","hosta","hostas",
"hyssop","iris","lavender","little bluestem grass",
"mukdenia","mullein","orange daylilies",
"painted fern","peonies","peony","perennial fountain grass",
"phlox","pink peony","raspberry echinacea",
"salvia","sedum","shasta daisy","stiff tickseed",
"sunflower","tickseed","verbascum","yarrow",

// ANNUALS
"alyssum","angelface perfectly pink","angelonia",
"begonia","canna lily","canna lily bulbs",
"calibrachoa","coleus","dahlia",
"dragon wing begonia","dusty miller",
"geranium","impatiens","lantana",
"lobelia","marigold","nemesia",
"pansy","pentas","petunia","petunias",
"salvia annual","snapdragon","supertunia",
"supertunia bubblegum","supertunia picasso",
"verbena","vista petunias","wave petunia",
"zinnia","zinnias",

// GRASSES
"big blue stem","big bluestem","blue fescue",
"feather reed grass","fiber optic grass",
"fountain grass","hakone grass",
"japanese forest grass","karl foerster grass",
"karl forester","little bluestem",
"maiden grass","mexican feather grass",
"northern sea oats","ornamental grass",
"pampas grass","pampass grass",
"pink muhly grass","prairie dropseed",
"ravenna grass","rush grass",
"sedge grass","switch grass","zebra grass",

// VINES / CLIMBERS
"amethyst falls wisteria vine","black eyed susan vine",
"bougainvillea","cardinal vines plant",
"clematis","climbing black eye susan vine",
"climbing flower","climbing flower vine",
"climbing hydrangea","climbing rose",
"crossvine","grape vine","honeysuckle vine",
"honey suckle","hydrangea vine","ivy",
"jasmine vine","moonflower vine",
"morning glory","part shade vines",
"passion flower vine","scarlet runner bean vine",
"silver lace vine","sweet pea vine",
"trumpet vine","vine black eye susan",
"virginia creeper","vines for part shade",
"wisteria",

// TROPICALS / HOUSEPLANTS
"aloe vera","asparagus fern","bird of paradise",
"black magic","black magic colocasia",
"cactus","calathea","croton",
"dieffenbachia","dracaena","ficus",
"fiddle leaf fig","fiscus","foscus",
"gardenia","indoor","indoor plant",
"money tree","monstera","orchid",
"parlor palm","peace lily","philodendron",
"pony tail","pony tail palm","pothos",
"rubber plant","snake plant","spider plant",
"succulents","venus fly trap","zz plant",

// EDIBLES
"aji rico","apple tree","basil",
"blueberry","blueberry bush","borage",
"cabbage plants","carolina reaper",
"cherry tree","chives","cilantro",
"cucumber","cucumber plant","dill",
"grapes","green beans","herbs",
"jalapeno","jalapeño","lady bell pepper",
"lettuce","mint","onion","parsley",
"peach tree","pear tree","pepper",
"pepper plant","raspberry bush",
"rhubarb","rhubarb plants","rosemary",
"spinach","strawberry","strawberry plant",
"sweet potato","thyme","tomato",
"tomato plant","tomato plants",
"vegetables","zucchini",

// WATER PLANTS / POND PLANTS
"water plants","pond plants","aquatic plants",
"water garden plants","pond flowers",
"water lilies","water lily","hardy water lily",
"tropical water lily","lily pads","lily pad",
"lotus","lotus plant","pond lotus",
"marginal pond plants","bog plants",
"aquatic grasses","oxygenating plants",
"floating pond plants","submerged pond plants",
"duckweed","water lettuce","water hyacinth",
"pickerel rush","pickerel plant",
"blue flag iris","yellow flag iris",
"corkscrew rush","horsetail rush",
"papyrus","dwarf papyrus",
"water canna","aquatic canna",
"taro pond plant","elephant ear pond plant",
"arrowhead plant","arrow arum",
"water poppy","water celery",
"parrot feather","anacharis",
"hornwort","cabomba",
"frogbit","water clover",
"aquatic mint","water forget me not",
"cardinal flower","lobelia cardinalis",
"marsh marigold","sweet flag",
"pickerel weed","water iris",
"koi pond plants","fish pond plants",
"plants for pond","plants for water garden",

// GENERIC PLANT TERMS
"plants","plant","flowers","flower",
"garden plants","landscape plants",
"landscaping plants","nursery plants",
"shrub","tree","trees",
"bushes","flower bushes",
"yard plants","outdoor plants",
"garden flowers","flower plants",
"native plants","pollinator plants",
"sun plants","shade plants",
"part shade plants","full sun plants",
"low maintenance plants",
"deer resistant plants",
"drought tolerant plants",
"fast growing plants",
"evergreen shrubs","evergreens",
"privacy plants","privacy trees",
"privacy shrubs","hedges",
"hedge plants","foundation plants",
"landscape shrubs","flowering shrubs",
"flowering plants","ornamental plants",
"patio plants","container plants",

// WATER PLANT MISSPELLINGS
"water lilly","water lillies",
"lilly pads","lilly pad",
"pond lants","pond plant",
"aquadic plants","aquatic pant",
"water hyacynth","water hyacinths",
"papryus","elephant ear pondplant",

// GENERAL / COMMON SEARCHES
"bag seed","banana tree","flowering trees",
"full sun oriental trees","grass seed",
"hanging basket","juniper","juniper bush",
"ornamental", "pink flowers",
"pond","rose","roses","seed",
"topiaries","topiary", "perennials", "perennial", "annuals", "annual", "tropicals", "house plant", "house plants", "houseplant", "houseplants",

// COMMON MISSPELLINGS
"black magic colorado’s","climbing fower",
"climbing fower vine","creeping pholx",
"drawf tree","drawf trees",
"gerranium","gerraniums","grass seet",
"hosts plants","lillac","lillies",
"orange daylillies","osmocost","perinal",
"sefum"
  ] },
    { url: "/bulbsseeds", keywords: ["bulbs", "seeds"] },
    { url: "/plant-pharmacy", keywords: ["plant care", "fertilizer", "disease", "insect control"] },

    { url: "/landscape", keywords: ["landscape", "landscaping", "yard", "outdoor design"] },
    { url: "/landscapedesign", keywords: ["landscape design", "design service"] },
    { url: "/landscape-maintenance", keywords: ["maintenance", "lawn care", "yard maintenance"] },
    { url: "/wedesign", keywords: ["we design you install", "diy landscape", "design only"] },
    { url: "/hoerr-commercial-services", keywords: ["commercial landscaping", "commercial services", "contractor"] },

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
