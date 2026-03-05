import { useState, useEffect, useRef } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Linking, Animated, Dimensions, StatusBar,
} from "react-native";

const C = {
  cream:"#F7F5F0", creamDark:"#EDE9E0", gold:"#C5973E",
  charcoal:"#1A1A1A", grey:"#8A8A8A", greyLight:"#C4C4C4",
  white:"#FFFFFF", border:"#DDD9D0",
};

const PRODUCTS = [
  // HOME
  { id:1,  cat:"Home",       name:"Parachute Cloud Cotton Robe",                  desc:"Hotel-grade softness. European flax, Portuguese craft.",          price:"$129",   tag:null,      link:null,                                    loves:"Makes hotel-grade bathrobes, bedding and mattresses. Very popular gift item. Made in LA with European flax and Portuguese craftsmanship." },
  { id:2,  cat:"Home",       name:"Parachute REST / RISE Candle",                 desc:"Morning energy or evening calm — perfectly balanced.",            price:"$54",    tag:null,      link:null,                                    loves:"Awakens your senses in the morning or calms you at the end of the day. Perfect for working with your rhythm. And a great gift." },
  { id:3,  cat:"Home",       name:"Unisex Hooded Waffle Robe — Turkish Cotton",   desc:"Finest cotton from Turkey. Spa at home every day.",               price:"$89",    tag:null,      link:"https://amzn.to/3NdT1VR",              loves:"Finest cotton from Turkey. Spa at home every day." },
  { id:4,  cat:"Home",       name:"Rain Shower Head — Filters Metals & Chlorine", desc:"Glow up your skin and hair. Filter the impurities.",              price:"$165",   tag:null,      link:"https://amzn.to/3MY2Vuw",              loves:"Glow up your skin and hair and filter those impurities. Technology at its finest." },
  { id:5,  cat:"Home",       name:"Anti-Breakage Shampoo for Hard Water",         desc:"Hard water ruins hair. Science finally fixes it.",                price:"$28",    tag:null,      link:"https://amzn.to/4b8KjQS",              loves:"Hard water ruins hair. Science finally fixes it." },
  { id:6,  cat:"Home",       name:"Break Down Anti-Flake Scalp Soak",             desc:"Healthy hair starts at the root.",                                price:"$38",    tag:null,      link:"https://amzn.to/3MEJgjr",              loves:"Healthy hair starts at the root. Apple cider vinegar does the work." },
  { id:7,  cat:"Home",       name:"Chesapeake Bay Candle — Stillness + Purity",   desc:"One light. Instant stillness.",                                   price:"$20.45", tag:"Splurge", link:"https://amzn.to/4boc09j",              loves:"One light. Instant stillness." },
  { id:8,  cat:"Home",       name:"Caraway Ceramic Frying Pan 10.5\" — Cream",    desc:"Cook beautifully. No toxins, no compromise.",                     price:"$125",   tag:"Splurge", link:"https://amzn.to/3Pc98DR",              loves:"Cook beautifully. No toxins, no compromise." },
  { id:9,  cat:"Home",       name:"Caraway Cookware Set 12 Piece — Cream",        desc:"The full kitchen upgrade. PFAS-free, ceramic, timeless.",         price:"$445",   tag:"Splurge", link:"https://amzn.to/4aNLS7S",              loves:"Cook beautifully. No toxins, no compromise." },
  { id:10, cat:"Home",       name:"Caraway Cookware Set 12 Piece — eBay Deal",    desc:"Same elevated cookware, smarter price on eBay.",                  price:"$379.95",tag:"Save",    link:"https://www.ebay.com/itm/146938993023",loves:"Your kitchen, elevated. Clean cooking made permanent." },
  { id:11, cat:"Home",       name:"CAROTE 14-Piece Ceramic Cookware Set",         desc:"Chef-quality cooking. Ceramic clean conscience.",                 price:"$72.99", tag:"Save",    link:"https://amzn.to/4b23Faf",              loves:"Chef-quality cooking. Ceramic clean conscience." },
  { id:12, cat:"Home",       name:"GreenPan 12-Piece Nonstick Ceramic Set",       desc:"European double ceramic. Dishwasher safe. Built to last.",        price:"$199",   tag:null,      link:"https://amzn.to/4r9u37Y",              loves:"European quality. Many items dishwasher safe, which Caraway is not. Double ceramic coating. Longer lasting, less warping." },
  // WELLNESS
  { id:13, cat:"Wellness",   name:"Manucurist System Green\u2122 Gift Set",        desc:"The natural nail revolution. Made in France.",                    price:"$49",    tag:null,      link:"https://amzn.to/4b5Y7eN",              loves:"Join the new natural nail revolution! Made in France, this system is green baby!" },
  { id:14, cat:"Wellness",   name:"Caudalie Beauty Elixir Face Mist",             desc:"Parisian pharmacy secret. Now yours.",                            price:"$49",    tag:null,      link:"https://amzn.to/4ssSONv",              loves:"Parisian pharmacy secret. Now yours." },
  { id:15, cat:"Wellness",   name:"Dr. Barbara Sturm Glow Cream 1.7oz",           desc:"Luxury dermatology, bottled. Skin that speaks for itself.",       price:"$240",   tag:null,      link:"https://amzn.to/47cpoLk",              loves:"Luxury dermatology, bottled. Skin that speaks for itself. Save $60 with your Amazon Prime card." },
  { id:16, cat:"Wellness",   name:"Kiehl's Ultra Facial Cream",                   desc:"52 years of cult status. Your moisture barrier, fortified.",      price:"$39",    tag:null,      link:"https://amzn.to/4slWLU3",              loves:"52 years of cult status. Your moisture barrier, fortified." },
  { id:17, cat:"Wellness",   name:"BIODANCE Bio-Collagen Real Deep Mask",         desc:"Korean skincare precision. Wake up to different skin.",           price:"$62",    tag:null,      link:"https://amzn.to/4rM64Nj",              loves:"Korean skincare precision. Wake up to different skin." },
  { id:18, cat:"Wellness",   name:"Shark CryoGlow LED Face Mask",                 desc:"Clinic-grade light therapy. At home, every night.",               price:"$349",   tag:null,      link:"https://amzn.to/4uaHTtn",              loves:"Clinic-grade light therapy. At home, every night. Save $60 with your Amazon Prime card." },
  { id:19, cat:"Wellness",   name:"Oura Ring 4 Sizing Kit",                       desc:"Know before you invest. Precision starts here.",                  price:"$10",    tag:null,      link:"https://amzn.to/3NgSpPi",              loves:"Know before you invest. Precision starts here." },
  { id:20, cat:"Wellness",   name:"Oura Ring 4 — Ceramic Cloud",                  desc:"Wear your wellness data. Invisibly.",                             price:"$499",   tag:"Splurge", link:"https://amzn.to/4rROFCX",              loves:"Wear your wellness data. Invisibly." },
  { id:21, cat:"Wellness",   name:"RingConn Gen 2 Smart Ring",                    desc:"Full health tracking. Zero subscriptions, ever.",                 price:"$299",   tag:"Save",    link:"https://amzn.to/4aS8yDZ",              loves:"Full health tracking. Zero subscriptions, ever." },
  { id:22, cat:"Wellness",   name:"Beast Mighty 850 Plus Personal Blender",       desc:"Smoothies in seconds. Power that fits your counter.",             price:"$149",   tag:null,      link:"https://amzn.to/4l7tdHs",              loves:"Smoothies in seconds. Power that fits your counter." },
  // EXPERIENCE
  { id:23, cat:"Experience", name:"Luxury Hotel Gift Experience for Two",         desc:"The gift that lets them choose their dream stay.",                price:"Varies", tag:"Splurge", link:null,                                    loves:"The premium hotel gift experience. Over 750,000 hotels in 170+ countries. Let them choose their destination and dates." },
  { id:24, cat:"Experience", name:"WONDERBOX — Getaway Gift for 2",               desc:"Give memories, not things. 52,000 hotels await.",                price:"$199",   tag:"Save",    link:"https://amzn.to/4aRfLnJ",              loves:"No hassle. The recipient chooses their own dates and destination. Perfect for graduations, birthdays, weddings, anniversaries!" },
  // WEALTH
  { id:25, cat:"Wealth",     name:"Fossil Logan Leather RFID Wallet",             desc:"RFID protection meets timeless leather. Smart & stylish.",        price:"$100",   tag:null,      link:"https://amzn.to/3OMEKQw",              loves:"RFID protection meets timeless leather. Smart and stylish. Garnet red for attracting wealth :)" },
  { id:26, cat:"Wealth",     name:"Michael Kors Jet Set Travel Continental",      desc:"Signature luxury, everyday carry. Travel like you mean it.",      price:"$119.63",tag:null,      link:"https://amzn.to/3OHTJLB",              loves:"Signature luxury, everyday carry. Travel like you mean it." },
];

const JOURNAL = [
  { id:1, tag:"Wellness", read:"4 min", title:"5 European Morning Rituals That Actually Work",      body:"The continent's best-kept secrets for energy, skin, and mental clarity. From dry brushing to cold-finish showers and adaptogen teas, we break down the rituals European women swear by." },
  { id:2, tag:"Home",     read:"6 min", title:"How to Create a Luxury Home on a Real Budget",       body:"Affordable luxury is not a contradiction. It is a skill. The Elateve guide to curating your space with intention. Start with leather desk accessories, ceramic cookware, and one statement lamp." },
  { id:3, tag:"Wealth",   read:"5 min", title:"The Feng Shui Principles Behind Our Wealth Picks",   body:"Why red wallets, citrine crystals, and intentional placement can shift the energy around money. We explore the ancient practice through a modern European lens." },
  { id:4, tag:"Wellness", read:"7 min", title:"Collagen, NAD+ and Cell Renewal: What Science Says", body:"We break down the supplements worth your money and why cellular health is the new frontier of anti-aging. Spoiler: collagen and NAD+ are the two you actually need." },
];

const CATS = ["All","Wellness","Experience","Home","Wealth"];

const Eyebrow = ({ children, col }) => (
  <Text style={[s.eyebrow, col && { color: col }]}>{children}</Text>
);

const GoldBtn = ({ children, onPress, outline }) => (
  <TouchableOpacity onPress={onPress} style={[s.goldBtn, outline && s.goldBtnOut]}>
    <Text style={[s.goldBtnTxt, outline && { color: C.gold }]}>{children}</Text>
  </TouchableOpacity>
);

const Divider = () => (
  <View style={s.divRow}>
    <View style={s.divLine}/><Text style={s.divStar}>✦</Text><View style={s.divLine}/>
  </View>
);

const Badge = ({ label }) => (
  <View style={s.badge}><Text style={s.badgeTxt}>{label}</Text></View>
);

const ProductCard = ({ p, saved, onSave, onComingSoon }) => {
  const [lovesOpen, setLovesOpen] = useState(false);
  return (
    <View style={s.card}>
      {p.tag ? <Badge label={p.tag}/> : null}
      <TouchableOpacity onPress={() => onSave(p.id)} style={s.heartBtn}>
        <Text style={{ color: saved ? "#c0392b" : C.greyLight, fontSize:14 }}>{saved ? "♥" : "♡"}</Text>
      </TouchableOpacity>
      <View style={s.cardBody}>
        <Eyebrow col={C.gold}>{p.cat}</Eyebrow>
        <Text style={s.cardName}>{p.name}</Text>
        <Text style={s.cardDesc}>{p.desc}</Text>
        {p.loves ? (
          <View style={s.loves}>
            <TouchableOpacity onPress={() => setLovesOpen(o => !o)} style={s.lovesToggle}>
              <Text style={s.lovesToggleTxt}>♥  Why ELATEVE loves this</Text>
              <Text style={s.lovesArrow}>{lovesOpen ? "−" : "+"}</Text>
            </TouchableOpacity>
            {lovesOpen ? <Text style={s.lovesText}>{p.loves}</Text> : null}
          </View>
        ) : null}
        <View style={s.cardFooter}>
          <Text style={s.cardPrice}>{p.price}</Text>
          <TouchableOpacity
            onPress={() => p.link ? Linking.openURL(p.link) : onComingSoon && onComingSoon()}
            style={[s.shopBtn, !p.link && s.shopBtnSoon]}
          >
            <Text style={[s.shopBtnTxt, !p.link && { color: C.grey }]}>{p.link ? "SHOP" : "SOON"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const [tab, setTab]     = useState("home");
  const [cat, setCat]     = useState("All");
  const [saved, setSaved] = useState([]);
  const [jOpen, setJOpen] = useState(null);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [toast, setToast] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const toastOp = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const fire = (msg) => {
    setToast(msg);
    Animated.sequence([
      Animated.timing(toastOp, { toValue:1, duration:300, useNativeDriver:true }),
      Animated.delay(2000),
      Animated.timing(toastOp, { toValue:0, duration:300, useNativeDriver:true }),
    ]).start(() => setToast(""));
  };

  const toggleSave = (id) => {
    const isSaved = saved.includes(id);
    setSaved(p => isSaved ? p.filter(x => x !== id) : [...p, id]);
    fire(isSaved ? "Removed from saved" : "Saved to your edit  ✦");
  };

  const go = (t, c) => {
    setTab(t);
    if (c) setCat(c);
    scrollRef.current?.scrollTo({ y:0, animated:true });
  };

  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  const NAV = [
    { id:"home",    icon:"⌂", label:"Home" },
    { id:"shop",    icon:"◈", label:"Shop" },
    { id:"journal", icon:"✦", label:"Journal" },
    { id:"about",   icon:"◎", label:"About" },
    { id:"saved",   icon:"♡", label:"Saved" },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.cream}/>

      {toast ? (
        <Animated.View style={[s.toast, { opacity: toastOp }]}>
          <Text style={s.toastTxt}>{toast}</Text>
        </Animated.View>
      ) : null}

      {showNotif ? (
        <View style={s.notif}>
          <View style={s.notifIcon}><Text style={{ color:C.white, fontSize:16 }}>✦</Text></View>
          <View style={{ flex:1 }}>
            <Text style={s.notifTitle}>Stay Elevated</Text>
            <Text style={s.notifBody}>New curated finds and exclusive drops delivered to you first.</Text>
            <View style={{ flexDirection:"row", gap:8, marginTop:12 }}>
              <TouchableOpacity onPress={() => { setShowNotif(false); fire("Notifications enabled  ✦"); }} style={s.notifEnable}>
                <Text style={s.notifEnableTxt}>ENABLE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowNotif(false)} style={s.notifLater}>
                <Text style={s.notifLaterTxt}>LATER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      <View style={s.header}>
        <Text style={s.logo}>ELATEVE</Text>
      </View>

      <ScrollView ref={scrollRef} style={{ flex:1 }} showsVerticalScrollIndicator={false}>

        {tab === "home" && (
          <View>
            <View style={s.hero}>
              <Eyebrow>Curated for the Elevated Life</Eyebrow>
              <Text style={s.heroH1}>{"Elevate Your\nEveryday"}</Text>
              <Text style={s.heroSub}>{"European-curated essentials for a life well-lived.\nAffordable luxury, intentionally chosen."}</Text>
              <GoldBtn onPress={() => go("shop")}>EXPLORE THE EDIT</GoldBtn>
            </View>

            <View style={s.section}>
              <Eyebrow>Our Four Pillars</Eyebrow>
              <View style={s.pillarsGrid}>
                {[
                  { l:"Wellness",   s:"Body & mind rituals",   c:"Wellness" },
                  { l:"Experience", s:"Sensory elevation",      c:"Experience" },
                  { l:"Home",       s:"Beautiful spaces",       c:"Home" },
                  { l:"Wealth",     s:"Abundance & prosperity", c:"Wealth" },
                ].map(p => (
                  <TouchableOpacity key={p.l} onPress={() => go("shop", p.c)} style={s.pillar}>
                    <Text style={s.pillarLabel}>{p.l.toUpperCase()}</Text>
                    <Text style={s.pillarSub}>{p.s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Divider/>

            <View style={[s.section, { paddingBottom:0 }]}>
              <View style={s.rowBetween}>
                <Eyebrow col={C.charcoal}>Featured Picks</Eyebrow>
                <TouchableOpacity onPress={() => go("shop")}>
                  <Text style={s.viewAll}>View all →</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:20, gap:12, paddingBottom:8 }}>
              {PRODUCTS.slice(0,6).map(p => (
                <View key={p.id} style={s.featCard}>
                  <Eyebrow col={C.gold}>{p.cat}</Eyebrow>
                  <Text style={s.featName}>{p.name}</Text>
                  <Text style={s.featPrice}>{p.price}</Text>
                  <TouchableOpacity onPress={() => p.link ? Linking.openURL(p.link) : fire("Coming soon — watch this space  ✦")} style={s.shopBtn}>
                    <Text style={s.shopBtnTxt}>{p.link ? "SHOP" : "SOON"}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={s.testimonialSection}>
              <Eyebrow>What Our Community Says</Eyebrow>
              {[
                { q:"ELATEVE completely changed how I approach everyday purchases. Their wellness picks are spot-on.", name:"Sarah M.", loc:"New York, NY" },
                { q:"The curation is impeccable. Every product bought through their links has been worth it.", name:"Marcus L.", loc:"Los Angeles, CA" },
              ].map((t, i) => (
                <View key={i} style={s.testimonialCard}>
                  <Text style={{ color:C.gold, fontSize:11, letterSpacing:2 }}>★★★★★</Text>
                  <Text style={s.testimonialQ}>{'"' + t.q + '"'}</Text>
                  <Text style={s.testimonialName}>{t.name}</Text>
                  <Text style={s.testimonialLoc}>{t.loc}</Text>
                </View>
              ))}
            </View>

            <View style={s.newsletter}>
              <Eyebrow>Join the Elevation</Eyebrow>
              <Text style={s.newsletterH}>Join the Elevation</Text>
              <Text style={s.newsletterSub}>Curated finds and rituals for elevated living. Delivered weekly.</Text>
              {subbed ? (
                <Text style={{ color:C.gold, fontSize:12, letterSpacing:1.5, textTransform:"uppercase" }}>You are in. Welcome to the edit.</Text>
              ) : (
                <View style={{ gap:10, width:"100%" }}>
                  <TextInput value={email} onChangeText={setEmail} placeholder="Your email" placeholderTextColor={C.grey} style={s.input} keyboardType="email-address" autoCapitalize="none"/>
                  <GoldBtn onPress={() => { if(email){ setSubbed(true); fire("Welcome to Elateve"); }}}>SUBSCRIBE</GoldBtn>
                </View>
              )}
            </View>

            <View style={s.footer}>
              <Text style={s.footerLogo}>ELATEVE</Text>
              <Text style={s.footerTagline}>Elevate Your Everyday</Text>
              <Text style={s.footerSub}>A European Company</Text>
              <View style={s.footerLinks}>
                {["Wellness","Experience","Home","Wealth"].map(c => (
                  <TouchableOpacity key={c} onPress={() => go("shop", c)}>
                    <Text style={s.footerLink}>{c.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {tab === "shop" && (
          <View style={{ paddingBottom:20 }}>
            <View style={s.pageHeader}>
              <Eyebrow>The Edit</Eyebrow>
              <Text style={s.pageH2}>Shop the Elevation</Text>
              <Text style={s.pageSub}>European bestsellers, intentionally chosen.</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ borderBottomWidth:1, borderBottomColor:C.border }}>
              <View style={{ flexDirection:"row", paddingHorizontal:20 }}>
                {CATS.map(c => (
                  <TouchableOpacity key={c} onPress={() => setCat(c)} style={[s.catTab, cat===c && s.catTabActive]}>
                    <Text style={[s.catTabTxt, cat===c && s.catTabTxtActive]}>{c.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={s.productsGrid}>
              {filtered.map(p => (
                <View key={p.id} style={{ width:"48%" }}>
                  <ProductCard p={p} saved={saved.includes(p.id)} onSave={toggleSave} onComingSoon={() => fire("Coming soon — watch this space  ✦")}/>
                </View>
              ))}
            </View>
          </View>
        )}

        {tab === "journal" && (
          <View style={{ paddingBottom:20 }}>
            <View style={s.pageHeader}>
              <Eyebrow>The Elateve Journal</Eyebrow>
              <Text style={s.pageH2}>Wellness and Wealth Articles</Text>
              <Text style={s.pageSub}>Insights, rituals, and guidance for the elevated life.</Text>
            </View>
            <View style={{ padding:20 }}>
              {JOURNAL.map((a, i) => (
                <TouchableOpacity key={a.id} onPress={() => setJOpen(jOpen===i?null:i)} style={s.journalCard}>
                  <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <View style={{ flex:1, paddingRight:12 }}>
                      <View style={{ flexDirection:"row", alignItems:"center", gap:8, marginBottom:8 }}>
                        <View style={s.journalTag}><Text style={s.journalTagTxt}>{a.tag.toUpperCase()}</Text></View>
                        <Text style={s.journalRead}>{a.read}</Text>
                      </View>
                      <Text style={s.journalTitle}>{a.title}</Text>
                      <Text style={s.journalBody}>{jOpen===i ? a.body : a.body.slice(0,85)+"..."}</Text>
                      {jOpen===i && (
                        <TouchableOpacity onPress={() => go("shop")}>
                          <Text style={s.journalLink}>Shop related products</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <Text style={{ color:C.greyLight, fontSize:18 }}>{jOpen===i ? "-" : "+"}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.wealthBanner}>
              <Eyebrow col={C.gold}>Wealth and Abundance</Eyebrow>
              <Text style={s.wealthBannerH}>The Elateve Wealth Edit</Text>
              <Text style={s.wealthBannerSub}>Feng shui principles, prosperity crystals, and abundance rituals.</Text>
              <GoldBtn onPress={() => go("shop","Wealth")}>EXPLORE WEALTH PICKS</GoldBtn>
            </View>
          </View>
        )}

        {tab === "about" && (
          <View style={{ paddingBottom:20 }}>
            <View style={s.pageHeader}>
              <Eyebrow>Our Story</Eyebrow>
              <Text style={s.pageH2}>About ELATEVE</Text>
            </View>
            <View style={{ padding:24 }}>
              <Text style={s.aboutH}>The ELATEVE Story</Text>
              {[
                "Born in Europe, ELATEVE was founded on a simple belief: you do not need a massive budget to live beautifully. You just need better taste and the right guidance.",
                "As a European company, we bring a distinctly continental perspective to curation, blending timeless European taste with globally sourced products that resonate with modern life.",
                "Our community spans the globe. Every product we recommend has been chosen with the same discerning eye that defines European craftsmanship and design sensibility.",
              ].map((para, i) => (
                <Text key={i} style={s.aboutPara}>{para}</Text>
              ))}
              <Divider/>
              {[
                { t:"Wellness",   d:"Body and mind rituals. Supplements, skincare, and tools for cellular health." },
                { t:"Experience", d:"Sensory elevation. Candles, lamps, and luxuries that transform your space." },
                { t:"Home",       d:"Beautiful, functional spaces. Leather desk mats, ceramic cookware, and more." },
                { t:"Wealth",     d:"Abundance and prosperity. Feng shui tools, crystals, and intention-setting products." },
              ].map((p, i, arr) => (
                <View key={i} style={[s.pillarRow, i<arr.length-1 && { borderBottomWidth:1, borderBottomColor:C.border }]}>
                  <Text style={s.pillarRowLabel}>{p.t.toUpperCase()}</Text>
                  <Text style={s.pillarRowDesc}>{p.d}</Text>
                </View>
              ))}
              <View style={{ alignItems:"center", marginTop:20 }}>
                <Text style={s.europeanTag}>A EUROPEAN COMPANY</Text>
                <GoldBtn onPress={() => go("shop")} outline>SHOP THE EDIT</GoldBtn>
              </View>
            </View>
          </View>
        )}

        {tab === "saved" && (
          <View style={{ paddingBottom:20 }}>
            <View style={s.pageHeader}>
              <Eyebrow>Your Collection</Eyebrow>
              <Text style={s.pageH2}>Saved Items</Text>
            </View>
            <View style={{ padding:20 }}>
              {saved.length === 0 ? (
                <View style={s.emptyState}>
                  <Text style={{ fontSize:28, color:C.border, marginBottom:14 }}>{"♡"}</Text>
                  <Text style={s.emptyH}>Your edit is empty</Text>
                  <Text style={s.emptySub}>Tap the heart on any product to save it here</Text>
                  <GoldBtn onPress={() => go("shop")}>BROWSE THE EDIT</GoldBtn>
                </View>
              ) : (
                <View style={s.productsGrid}>
                  {PRODUCTS.filter(p => saved.includes(p.id)).map(p => (
                    <View key={p.id} style={{ width:"48%" }}>
                      <ProductCard p={p} saved={true} onSave={toggleSave} onComingSoon={() => fire("Coming soon — watch this space  ✦")}/>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

      </ScrollView>

      <View style={s.nav}>
        {NAV.map(n => (
          <TouchableOpacity key={n.id} onPress={() => go(n.id)} style={s.navItem}>
            <Text style={[s.navIcon, tab===n.id && { color:C.gold }]}>{n.icon}</Text>
            <Text style={[s.navLabel, tab===n.id && { color:C.gold, fontWeight:"500" }]}>{n.label.toUpperCase()}</Text>
            {tab===n.id && <View style={s.navDot}/>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root:{ flex:1, backgroundColor:C.cream },
  header:{ backgroundColor:C.cream, borderBottomWidth:1, borderBottomColor:C.border, paddingVertical:16, paddingTop:50, alignItems:"center" },
  logo:{ fontSize:15, fontWeight:"700", letterSpacing:8, color:C.gold },
  eyebrow:{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:C.grey, fontWeight:"400" },
  goldBtn:{ backgroundColor:C.gold, paddingVertical:13, paddingHorizontal:28, borderRadius:2, borderWidth:1, borderColor:C.gold, alignItems:"center" },
  goldBtnOut:{ backgroundColor:"transparent" },
  goldBtnTxt:{ color:C.white, fontSize:11, letterSpacing:2.5, textTransform:"uppercase", fontWeight:"600" },
  divRow:{ flexDirection:"row", alignItems:"center", marginVertical:24, paddingHorizontal:20 },
  divLine:{ flex:1, height:1, backgroundColor:C.border },
  divStar:{ color:C.gold, fontSize:12, marginHorizontal:16 },
  badge:{ position:"absolute", top:10, left:10, backgroundColor:C.charcoal, paddingHorizontal:8, paddingVertical:3, borderRadius:1, zIndex:1 },
  badgeTxt:{ color:C.gold, fontSize:8, letterSpacing:1.5, textTransform:"uppercase" },
  toast:{ position:"absolute", top:20, alignSelf:"center", backgroundColor:C.charcoal, paddingHorizontal:20, paddingVertical:10, borderRadius:2, zIndex:999 },
  toastTxt:{ color:C.white, fontSize:11, letterSpacing:1.5, textTransform:"uppercase" },
  notif:{ position:"absolute", bottom:80, left:12, right:12, backgroundColor:C.charcoal, borderRadius:3, padding:20, zIndex:500, flexDirection:"row", gap:14 },
  notifIcon:{ width:40, height:40, backgroundColor:C.gold, borderRadius:2, alignItems:"center", justifyContent:"center" },
  notifTitle:{ color:C.white, fontSize:15, fontWeight:"300", marginBottom:4 },
  notifBody:{ color:C.greyLight, fontSize:12, lineHeight:18, fontWeight:"300" },
  notifEnable:{ flex:1, backgroundColor:C.gold, padding:9, borderRadius:2, alignItems:"center" },
  notifEnableTxt:{ color:C.white, fontSize:10, letterSpacing:2, fontWeight:"600" },
  notifLater:{ flex:1, borderWidth:1, borderColor:"#ffffff33", padding:9, borderRadius:2, alignItems:"center" },
  notifLaterTxt:{ color:C.grey, fontSize:10, letterSpacing:1.5 },
  hero:{ padding:48, paddingBottom:44, alignItems:"center", borderBottomWidth:1, borderBottomColor:C.border },
  heroH1:{ fontSize:38, fontWeight:"300", color:C.charcoal, marginTop:16, marginBottom:14, lineHeight:46, textAlign:"center" },
  heroSub:{ color:C.grey, fontSize:14, lineHeight:22, marginBottom:32, textAlign:"center", fontWeight:"300" },
  section:{ padding:20 },
  pillarsGrid:{ flexDirection:"row", flexWrap:"wrap", gap:10, marginTop:14 },
  pillar:{ width:"48%", backgroundColor:C.creamDark, borderWidth:1, borderColor:C.border, borderRadius:3, padding:18 },
  pillarLabel:{ color:C.gold, fontSize:10, letterSpacing:2.5, marginBottom:6, fontWeight:"500" },
  pillarSub:{ color:C.grey, fontSize:12, lineHeight:17, fontWeight:"300" },
  rowBetween:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:14 },
  viewAll:{ color:C.gold, fontSize:11, textDecorationLine:"underline" },
  featCard:{ width:152, backgroundColor:C.white, borderWidth:1, borderColor:C.border, borderRadius:3, padding:16 },
  featName:{ fontSize:13, color:C.charcoal, fontWeight:"400", marginTop:6, marginBottom:4, lineHeight:18 },
  featPrice:{ color:C.gold, fontSize:14, marginBottom:12, fontWeight:"300" },
  card:{ backgroundColor:C.white, borderWidth:1, borderColor:C.border, borderRadius:3, overflow:"hidden", marginBottom:12, position:"relative" },
  heartBtn:{ position:"absolute", top:8, right:8, backgroundColor:C.white, borderWidth:1, borderColor:C.border, width:28, height:28, borderRadius:14, alignItems:"center", justifyContent:"center", zIndex:1 },
  cardBody:{ padding:14, paddingTop:44 },
  cardName:{ fontSize:12, color:C.charcoal, fontWeight:"400", marginTop:6, marginBottom:4, lineHeight:17 },
  cardDesc:{ color:C.grey, fontSize:10, lineHeight:15, marginBottom:10, fontWeight:"300" },
  cardFooter:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
  cardPrice:{ fontSize:14, color:C.charcoal, fontWeight:"400" },
  shopBtn:{ backgroundColor:C.gold, paddingHorizontal:10, paddingVertical:6, borderRadius:2 },
  shopBtnTxt:{ color:C.white, fontSize:9, letterSpacing:1.5, fontWeight:"600" },
  testimonialSection:{ backgroundColor:C.creamDark, padding:24, borderTopWidth:1, borderTopColor:C.border, borderBottomWidth:1, borderBottomColor:C.border },
  testimonialCard:{ backgroundColor:C.white, borderRadius:3, padding:20, marginTop:12, borderWidth:1, borderColor:C.border },
  testimonialQ:{ color:C.charcoal, fontSize:13, fontStyle:"italic", lineHeight:22, marginVertical:10, fontWeight:"300" },
  testimonialName:{ color:C.charcoal, fontSize:12, fontWeight:"500" },
  testimonialLoc:{ color:C.grey, fontSize:11, fontWeight:"300" },
  newsletter:{ padding:32, alignItems:"center", gap:10 },
  newsletterH:{ fontSize:22, fontWeight:"300", color:C.charcoal, marginTop:10, textAlign:"center" },
  newsletterSub:{ color:C.grey, fontSize:13, lineHeight:20, textAlign:"center", fontWeight:"300", marginBottom:6 },
  input:{ borderWidth:1, borderColor:C.border, backgroundColor:C.white, padding:13, fontSize:13, borderRadius:2, color:C.charcoal, width:"100%" },
  footer:{ backgroundColor:C.charcoal, padding:32, alignItems:"center" },
  footerLogo:{ fontSize:14, fontWeight:"700", letterSpacing:8, color:C.gold, marginBottom:6 },
  footerTagline:{ color:C.grey, fontSize:12, marginBottom:4, fontWeight:"300" },
  footerSub:{ color:C.gold, fontSize:10, letterSpacing:2.5, textTransform:"uppercase", marginBottom:20 },
  footerLinks:{ flexDirection:"row", gap:16, flexWrap:"wrap", justifyContent:"center" },
  footerLink:{ color:C.grey, fontSize:11, letterSpacing:1.5, fontWeight:"300" },
  pageHeader:{ padding:36, paddingBottom:22, alignItems:"center", borderBottomWidth:1, borderBottomColor:C.border },
  pageH2:{ fontSize:26, fontWeight:"300", color:C.charcoal, marginTop:12, marginBottom:8, textAlign:"center" },
  pageSub:{ color:C.grey, fontSize:13, lineHeight:20, textAlign:"center", fontWeight:"300" },
  catTab:{ paddingHorizontal:14, paddingVertical:12, marginBottom:-1, borderBottomWidth:2, borderBottomColor:"transparent" },
  catTabActive:{ borderBottomColor:C.gold },
  catTabTxt:{ fontSize:11, letterSpacing:2.5, color:C.grey, fontWeight:"400" },
  catTabTxtActive:{ color:C.gold },
  productsGrid:{ flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", padding:16 },
  journalCard:{ backgroundColor:C.white, borderWidth:1, borderColor:C.border, borderRadius:3, padding:20, marginBottom:10 },
  journalTag:{ backgroundColor:C.creamDark, borderWidth:1, borderColor:C.border, paddingHorizontal:8, paddingVertical:2, borderRadius:1 },
  journalTagTxt:{ color:C.gold, fontSize:9, letterSpacing:2 },
  journalRead:{ color:C.greyLight, fontSize:11, fontWeight:"300" },
  journalTitle:{ color:C.charcoal, fontSize:14, fontWeight:"400", marginBottom:6, lineHeight:20 },
  journalBody:{ color:C.grey, fontSize:12, lineHeight:19, fontWeight:"300" },
  journalLink:{ color:C.gold, fontSize:11, marginTop:12, textDecorationLine:"underline" },
  wealthBanner:{ margin:20, backgroundColor:C.charcoal, borderRadius:3, padding:28, gap:10 },
  wealthBannerH:{ color:C.white, fontSize:20, fontWeight:"300", marginTop:6 },
  wealthBannerSub:{ color:C.greyLight, fontSize:13, lineHeight:20, fontWeight:"300", marginBottom:6 },
  aboutH:{ fontSize:20, fontWeight:"400", color:C.charcoal, marginBottom:14 },
  aboutPara:{ color:C.grey, fontSize:14, lineHeight:24, marginBottom:14, fontWeight:"300" },
  pillarRow:{ paddingVertical:18 },
  pillarRowLabel:{ color:C.gold, fontSize:10, letterSpacing:2.5, marginBottom:6, fontWeight:"500" },
  pillarRowDesc:{ color:C.grey, fontSize:13, lineHeight:20, fontWeight:"300" },
  europeanTag:{ color:C.greyLight, fontSize:10, letterSpacing:2.5, textTransform:"uppercase", marginBottom:16, fontWeight:"300" },
  emptyState:{ alignItems:"center", paddingVertical:56, gap:10 },
  emptyH:{ fontSize:18, fontWeight:"300", color:C.charcoal },
  emptySub:{ color:C.grey, fontSize:13, marginBottom:14, fontWeight:"300", textAlign:"center" },
  nav:{ backgroundColor:C.cream, borderTopWidth:1, borderTopColor:C.border, flexDirection:"row", paddingBottom:20 },
  navItem:{ flex:1, alignItems:"center", paddingVertical:10 },
  navIcon:{ fontSize:16, color:C.greyLight },
  navLabel:{ fontSize:8, letterSpacing:1.5, textTransform:"uppercase", color:C.greyLight, fontWeight:"300", marginTop:2 },
  navDot:{ width:14, height:1, backgroundColor:C.gold, marginTop:2 },
  loves:{ borderTopWidth:1, borderTopColor:C.border, marginTop:10, paddingTop:10 },
  lovesToggle:{ flexDirection:"row", alignItems:"center", justifyContent:"space-between" },
  lovesToggleTxt:{ color:C.gold, fontSize:9, letterSpacing:1.5, fontWeight:"500", flex:1 },
  lovesArrow:{ color:C.gold, fontSize:14 },
  lovesText:{ color:C.grey, fontSize:10, lineHeight:16, marginTop:8, fontWeight:"300" },
  shopBtnSoon:{ backgroundColor:"transparent", borderWidth:1, borderColor:C.border },
});
