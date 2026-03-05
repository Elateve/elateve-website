const products = [

  // ─── HOME ───
  {
    id: 1,
    category: "home",
    name: "Parachute Cloud Cotton Robe",
    description: "Hotel-grade softness. European flax, Portuguese craft.",
    price: "$129",
    image: "https://parachutehome.com/cdn/shop/files/cloud-cotton-robe_moss_main_01-min.jpg?v=1762839107",
    link: null,
    whyElateveLoves: "Makes hotel-grade bathrobes, bedding and mattresses. Very popular gift item. Made in LA with European flax and Portuguese craftsmanship.",
    badge: null
  },
  {
    id: 2,
    category: "home",
    name: "Parachute REST / RISE Candle",
    description: "Morning energy or evening calm — perfectly balanced.",
    price: "$54",
    image: "https://parachutehome.com/cdn/shop/files/the-parachute-candle-_rise_rest__01-min.jpg?v=1762839112",
    link: null,
    whyElateveLoves: "Awakens your senses in the morning or calms you at the end of the day. Perfect for working with your rhythm. And a great gift.",
    badge: null
  },
  {
    id: 3,
    category: "home",
    name: "Unisex Hooded Waffle Robe — 100% Turkish Cotton",
    description: "Finest cotton from Turkey. Spa at home every day.",
    price: "$89",
    image: "https://m.media-amazon.com/images/I/814fP1aVB+L._AC_SX522_.jpg",
    link: "https://amzn.to/3NdT1VR",
    whyElateveLoves: "Finest cotton from Turkey. Spa at home every day.",
    badge: null
  },
  {
    id: 4,
    category: "home",
    name: "Rain Shower Head — Filters Metals, Chlorine & Impurities",
    description: "Glow up your skin and hair. Filter the impurities.",
    price: "$165",
    image: "https://m.media-amazon.com/images/I/61VaOp-znvL._AC_SX425_.jpg",
    link: "https://amzn.to/3MY2Vuw",
    whyElateveLoves: "Glow up your skin and hair and filter those impurities. Technology at its finest.",
    badge: null
  },
  {
    id: 5,
    category: "home",
    name: "Anti-Breakage Shampoo for Hard Water Damage",
    description: "Hard water ruins hair. Science finally fixes it.",
    price: "$28",
    image: "https://m.media-amazon.com/images/I/61uNs+3faUL._SY355_.jpg",
    link: "https://amzn.to/4b8KjQS",
    whyElateveLoves: "Hard water ruins hair. Science finally fixes it.",
    badge: null
  },
  {
    id: 6,
    category: "home",
    name: "Break Down Anti-Flake Scalp Soak",
    description: "Healthy hair starts at the root.",
    price: "$38",
    image: "https://m.media-amazon.com/images/I/519-frEZnNL._SY450_.jpg",
    link: "https://amzn.to/3MEJgjr",
    whyElateveLoves: "Healthy hair starts at the root. Apple cider vinegar does the work.",
    badge: null
  },
  {
    id: 7,
    category: "home",
    name: "Chesapeake Bay Candle — Stillness + Purity (Rose Water)",
    description: "One light. Instant stillness.",
    price: "$20.45",
    image: "https://m.media-amazon.com/images/I/51boT6TVQrL._AC_SX342_SY445_.jpg",
    link: "https://amzn.to/4boc09j",
    whyElateveLoves: "One light. Instant stillness.",
    badge: "Splurge"
  },
  {
    id: 8,
    category: "home",
    name: "Caraway Nonstick Ceramic Frying Pan 10.5\" — Cream",
    description: "Cook beautifully. No toxins, no compromise.",
    price: "$125",
    image: "https://m.media-amazon.com/images/I/61Pq9puQ+IL._AC_SY450_.jpg",
    link: "https://amzn.to/3Pc98DR",
    whyElateveLoves: "Cook beautifully. No toxins, no compromise.",
    badge: "Splurge"
  },
  {
    id: 9,
    category: "home",
    name: "Caraway Non-stick Ceramic Cookware Set 12 Piece — Cream",
    description: "The full kitchen upgrade. PFAS-free, ceramic, timeless.",
    price: "$445",
    image: "https://m.media-amazon.com/images/I/71+tC3QLigL._AC_SY450_.jpg",
    link: "https://amzn.to/4aNLS7S",
    whyElateveLoves: "Cook beautifully. No toxins, no compromise.",
    badge: "Splurge"
  },
  {
    id: 10,
    category: "home",
    name: "Caraway Cookware Set 12 Piece — eBay Deal",
    description: "Same elevated cookware, smarter price on eBay.",
    price: "$379.95",
    image: "https://m.media-amazon.com/images/I/71+tC3QLigL._AC_SY450_.jpg",
    link: "https://www.ebay.com/itm/146938993023",
    whyElateveLoves: "Your kitchen, elevated. Clean cooking made permanent.",
    badge: "Save"
  },
  {
    id: 11,
    category: "home",
    name: "CAROTE 14-Piece Ceramic Non-Stick Cookware Set",
    description: "Chef-quality cooking. Ceramic clean conscience.",
    price: "$72.99",
    image: "https://m.media-amazon.com/images/I/71E9N30pgZL._AC_SY450_.jpg",
    link: "https://amzn.to/4b23Faf",
    whyElateveLoves: "Chef-quality cooking. Ceramic clean conscience.",
    badge: "Save"
  },
  {
    id: 12,
    category: "home",
    name: "GreenPan 12-Piece Nonstick Swift Ceramic Cookware Set — Cream",
    description: "European double ceramic coating. Dishwasher safe. Built to last.",
    price: "$199",
    image: "https://m.media-amazon.com/images/I/716McT6cy6L._AC_SY450_.jpg",
    link: "https://amzn.to/4r9u37Y",
    whyElateveLoves: "European quality. Many items dishwasher safe, which Caraway is not. Double ceramic coating. Longer lasting, less warping.",
    badge: null
  },

  // ─── WELLNESS ───
  {
    id: 13,
    category: "wellness",
    name: "Manucurist System Green™ — Professional Manicure Gift Set",
    description: "The natural nail revolution. Made in France.",
    price: "$49",
    image: "https://m.media-amazon.com/images/I/61RFIOwMXYL._SY450_.jpg",
    link: "https://amzn.to/4b5Y7eN",
    whyElateveLoves: "Join the new natural nail revolution! Made in France, this system is green baby!",
    badge: null
  },
  {
    id: 14,
    category: "wellness",
    name: "Caudalie Beauty Elixir Face Mist",
    description: "Parisian pharmacy secret. Now yours.",
    price: "$49",
    image: "https://m.media-amazon.com/images/I/31PoFlCOOxL._SX342_SY445_.jpg",
    link: "https://amzn.to/4ssSONv",
    whyElateveLoves: "Parisian pharmacy secret. Now yours.",
    badge: null
  },
  {
    id: 15,
    category: "wellness",
    name: "Dr. Barbara Sturm Glow Cream 1.7 Fl Oz",
    description: "Luxury dermatology, bottled. Skin that speaks for itself.",
    price: "$240",
    image: "https://m.media-amazon.com/images/I/516Yluiu0KL._AC_SX569_.jpg",
    link: "https://amzn.to/47cpoLk",
    whyElateveLoves: "Luxury dermatology, bottled. Skin that speaks for itself. Save $60 with your Amazon Prime card.",
    badge: null
  },
  {
    id: 16,
    category: "wellness",
    name: "Kiehl's Ultra Facial Cream",
    description: "52 years of cult status. Your moisture barrier, fortified.",
    price: "$39",
    image: "https://m.media-amazon.com/images/I/312mNYB1swL._SX342_SY445_.jpg",
    link: "https://amzn.to/4slWLU3",
    whyElateveLoves: "52 years of cult status. Your moisture barrier, fortified.",
    badge: null
  },
  {
    id: 17,
    category: "wellness",
    name: "BIODANCE Bio-Collagen Real Deep Mask (16-pack)",
    description: "Korean skincare precision. Wake up to different skin.",
    price: "$62",
    image: "https://m.media-amazon.com/images/I/417w02ffAmL._SY300_SX300_.jpg",
    link: "https://amzn.to/4rM64Nj",
    whyElateveLoves: "Korean skincare precision. Wake up to different skin.",
    badge: null
  },
  {
    id: 18,
    category: "wellness",
    name: "Shark CryoGlow LED Face Mask with Under-Eye Cooling",
    description: "Clinic-grade light therapy. At home, every night.",
    price: "$349",
    image: "https://m.media-amazon.com/images/I/41tC93P4YpL._SY300_SX300_.jpg",
    link: "https://amzn.to/4uaHTtn",
    whyElateveLoves: "Clinic-grade light therapy. At home, every night. Save $60 with your Amazon Prime card.",
    badge: null
  },
  {
    id: 19,
    category: "wellness",
    name: "Oura Ring 4 Sizing Kit — Size Before You Buy",
    description: "Know before you invest. Precision starts here.",
    price: "$10",
    image: "https://m.media-amazon.com/images/I/518Qh+G3I5L._AC_SY300_SX300_.jpg",
    link: "https://amzn.to/3NgSpPi",
    whyElateveLoves: "Know before you invest. Precision starts here.",
    badge: null
  },
  {
    id: 20,
    category: "wellness",
    name: "Oura Ring 4 — Ceramic Cloud",
    description: "Wear your wellness data. Invisibly.",
    price: "$499",
    image: "https://m.media-amazon.com/images/I/616DjZer3GL._AC_SY300_SX300_.jpg",
    link: "https://amzn.to/4rROFCX",
    whyElateveLoves: "Wear your wellness data. Invisibly.",
    badge: "Splurge"
  },
  {
    id: 21,
    category: "wellness",
    name: "RingConn Gen 2 Smart Ring — Sleep Apnea Monitoring",
    description: "Full health tracking. Zero subscriptions, ever.",
    price: "$299",
    image: "https://m.media-amazon.com/images/I/61uxIbcWPRL._AC_SY355_.jpg",
    link: "https://amzn.to/4aS8yDZ",
    whyElateveLoves: "Full health tracking. Zero subscriptions, ever.",
    badge: "Save"
  },
  {
    id: 22,
    category: "wellness",
    name: "Beast Mighty 850 Plus Personal Blender — Carbon Black",
    description: "Smoothies in seconds. Power that fits your counter.",
    price: "$149",
    image: "https://m.media-amazon.com/images/I/71fGyjFnuUL._AC_SY300_SX300_.jpg",
    link: "https://amzn.to/4l7tdHs",
    whyElateveLoves: "Smoothies in seconds. Power that fits your counter.",
    badge: null
  },

  // ─── EXPERIENCE ───
  {
    id: 23,
    category: "experience",
    name: "Luxury Hotel Gift Experience for Two",
    description: "The gift that lets them choose their dream stay.",
    price: "Price varies",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    link: null,
    whyElateveLoves: "The premium hotel gift experience. Over 750,000 hotels across 170+ countries. Let them choose their destination and dates.",
    badge: "Splurge"
  },
  {
    id: 24,
    category: "experience",
    name: "WONDERBOX — Getaway Experience Gift for 2",
    description: "Give memories, not things. 52,000 hotels await.",
    price: "$199",
    image: "https://m.media-amazon.com/images/I/61WQbae3dtL._SX342_.jpg",
    link: "https://amzn.to/4aRfLnJ",
    whyElateveLoves: "Absolutely no hassle and truly appreciated — the recipient chooses their own dates and destination. Great gift for graduation, birthday, wedding, or anniversary!",
    badge: "Save"
  },

  // ─── WEALTH ───
  {
    id: 25,
    category: "wealth",
    name: "Fossil Women's Logan Leather RFID-Blocking Wallet",
    description: "RFID protection meets timeless leather. Smart and stylish.",
    price: "$100",
    image: "https://m.media-amazon.com/images/I/41I4t8xTPlL._AC_SY500_.jpg",
    link: "https://amzn.to/3OMEKQw",
    whyElateveLoves: "RFID protection meets timeless leather. Smart and stylish. Garnet red for attracting wealth :)",
    badge: null
  },
  {
    id: 26,
    category: "wealth",
    name: "Michael Kors Jet Set Travel Continental Wallet",
    description: "Signature luxury, everyday carry. Travel like you mean it.",
    price: "$119.63",
    image: "https://m.media-amazon.com/images/I/71PfILqudtL._AC_SY450_.jpg",
    link: "https://amzn.to/3OHTJLB",
    whyElateveLoves: "Signature luxury, everyday carry. Travel like you mean it.",
    badge: null
  },

];

module.exports = products;
