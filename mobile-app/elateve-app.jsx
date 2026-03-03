import { useState, useEffect, useRef } from "react";

// ── Exact tokens from elateve.com CSS variables ──────────────────────────────
const C = {
  cream:     "#F7F5F0",   // --cream
  creamDark: "#EDE9E0",   // --cream-dark
  gold:      "#C5973E",   // --gold
  goldLight: "#E8C872",   // --gold-light
  goldDark:  "#8B6914",   // --gold-dark
  charcoal:  "#1A1A1A",   // --charcoal
  charcoalL: "#3A3A3A",   // --charcoal-light
  grey:      "#8A8A8A",   // --grey
  greyLight: "#C4C4C4",   // --grey-light
  white:     "#FFFFFF",
  border:    "#DDD9D0",
};

// Fonts exactly as on elateve.com
// --font-display: 'Sora'  → headings, logo, nav
// --font-body:    'Inter' → body copy, labels, buttons
const DISPLAY = "'Sora', -apple-system, sans-serif";
const BODY    = "'Inter', -apple-system, sans-serif";

const PRODUCTS = [
  { id:1,  cat:"Wellness",    name:"Majestic Pure Lavender Essential Oil",  desc:"100% natural premium grade. Aromatherapy & skin care.",   price:"$15",  tag:"Bestseller",   link:"https://www.amazon.com/s?k=Majestic+Pure+Lavender+Essential+Oil" },
  { id:2,  cat:"Wellness",    name:"Vital Proteins Collagen Peptides",       desc:"Grass-fed collagen for skin, hair & cell renewal.",        price:"$43",  tag:"Top Rated",    link:"https://www.amazon.com/s?k=Vital+Proteins+Collagen+Peptides" },
  { id:3,  cat:"Wellness",    name:"Tru Niagen NAD+ Supplement",             desc:"Boost cellular energy. Science-backed longevity.",         price:"$49",  tag:"Biohack",      link:"https://www.amazon.com/s?k=Tru+Niagen+NAD+Cell+Regeneration" },
  { id:4,  cat:"Wellness",    name:"Rose Quartz Gua Sha & Jade Roller Set",  desc:"Authentic stone facial ritual tools for daily self-care.", price:"$34",  tag:"Self-Care",    link:"https://www.amazon.com/s?k=rose+quartz+gua+sha+jade+roller+set" },
  { id:5,  cat:"Experience",  name:"Playlearn 6ft Sensory Bubble Lamp",      desc:"App-controlled LED bubble floor lamp. Spa-like ambiance.", price:"$189", tag:"Statement",    link:"https://www.amazon.com/dp/B00J24THFY" },
  { id:6,  cat:"Experience",  name:"NEST New York Bamboo Candle",             desc:"Luxury home fragrance. Iconic clean-burn scent.",         price:"$52",  tag:"Luxury",       link:"https://www.amazon.com/s?k=NEST+New+York+Bamboo+candle" },
  { id:7,  cat:"Experience",  name:"Voluspa Japonica Glass Jar Candle",       desc:"Artisan-crafted luxury candle. Beautiful gifting piece.",  price:"$38",  tag:"Gift Pick",    link:"https://www.amazon.com/s?k=Voluspa+Japonica+candle" },
  { id:8,  cat:"Experience",  name:"Mulberry Silk Pillowcase 22 Momme",       desc:"Sleep in luxury. Skin & hair beauty every night.",        price:"$55",  tag:"Sleep",        link:"https://www.amazon.com/s?k=mulberry+silk+pillowcase+22+momme" },
  { id:9,  cat:"Home",        name:"ELIZO Real Leather Desk Mat Set",         desc:"Premium leather mat, tray & coaster. USA-made luxury.",   price:"$79",  tag:"Editors Pick", link:"https://www.amazon.com/dp/B09HRCCNCD" },
  { id:10, cat:"Home",        name:"Gallaway Leather Desk Pad 36in",          desc:"Gift-boxed, stitched edges, felt base. Executive style.",  price:"$45",  tag:"Office",       link:"https://www.amazon.com/dp/B083JP5QY4" },
  { id:11, cat:"Home",        name:"Caraway Ceramic Cookware Set",            desc:"Non-toxic, beautiful cookware. Clean living essential.",  price:"$395", tag:"Premium",      link:"https://www.amazon.com/s?k=Caraway+Cookware+Set" },
  { id:12, cat:"Home",        name:"GreenPan Ceramic Non-Toxic Fry Pan Set",  desc:"Healthy cooking, toxin-free. European-quality feel.",     price:"$89",  tag:"Clean Living", link:"https://www.amazon.com/s?k=GreenPan+ceramic+frying+pan+set" },
  { id:13, cat:"Wealth",      name:"Red Phoenix Feng Shui Wealth Wallet",     desc:"Wealth mantras inside. Attract abundance every day.",     price:"$28",  tag:"Trending",     link:"https://www.amazon.com/dp/B0CP8WMDZP" },
  { id:14, cat:"Wealth",      name:"Money Magnet Feng Shui Wallet",           desc:"Crystals, coins & mirror. Handmade in USA.",              price:"$35",  tag:"Manifest",     link:"https://www.amazon.com/dp/B07CJYG3RD" },
  { id:15, cat:"Wealth",      name:"Citrine Crystal Cluster",                 desc:"Wealth stone. Amplifies prosperity & positive energy.",   price:"$22",  tag:"Crystal",      link:"https://www.amazon.com/s?k=citrine+crystal+cluster+large+abundance" },
  { id:16, cat:"Wealth",      name:"Golden Dragon Wealth Bracelet",           desc:"Wealth, strength & protection. Stunning craftsmanship.",  price:"$29",  tag:"Protection",   link:"https://www.amazon.com/s?k=Buddha+Karma+Golden+Dragon+Bracelet" },
];

const CATS = ["All","Wellness","Experience","Home","Wealth"];

const JOURNAL = [
  { id:1, tag:"Wellness",  read:"4 min", title:"5 European Morning Rituals That Actually Work",       body:"The continent's best-kept secrets for energy, skin, and mental clarity. None require a gym membership. From dry brushing to cold-finish showers and adaptogen teas, we break down the rituals that European women swear by." },
  { id:2, tag:"Home",      read:"6 min", title:"How to Create a Luxury Home on a Real Budget",        body:"Affordable luxury is not a contradiction. It is a skill. The Elateve guide to curating your space with intention. Start with leather desk accessories, ceramic cookware, and one statement lamp." },
  { id:3, tag:"Wealth",    read:"5 min", title:"The Feng Shui Principles Behind Our Wealth Picks",    body:"Why red wallets, citrine crystals, and intentional placement can shift the energy around money. We explore the ancient practice through a modern European lens." },
  { id:4, tag:"Wellness",  read:"7 min", title:"Collagen, NAD+ and Cell Renewal: What Science Says",  body:"We break down the supplements worth your money and why cellular health is the new frontier of anti-aging. Spoiler: collagen and NAD+ are the two you actually need." },
];

// ── Reusable tiny components ─────────────────────────────────────────────────

// Small uppercase label — Inter, wide tracking (matches site eyebrow text)
const Eyebrow = ({children, col}) => (
  <span style={{
    fontFamily: BODY,
    fontSize:"10px", letterSpacing:"3px",
    textTransform:"uppercase", color: col||C.grey,
    fontWeight:"400",
  }}>{children}</span>
);

// Gold CTA button — Inter, wide tracking (matches site buttons)
const GoldBtn = ({children, onClick, sm, out}) => (
  <button onClick={onClick} style={{
    fontFamily: BODY,
    background: out ? "transparent" : C.gold,
    color: out ? C.gold : C.white,
    border:`1px solid ${C.gold}`,
    borderRadius:"2px",
    padding: sm ? "9px 20px" : "13px 32px",
    fontSize: sm ? "11px" : "11px",
    letterSpacing:"2.5px", textTransform:"uppercase",
    cursor:"pointer", fontWeight:"500",
  }}>{children}</button>
);

const Stars = () => (
  <span style={{color:C.gold, fontSize:"11px", letterSpacing:"2px", fontFamily:BODY}}>★★★★★</span>
);

const Hr = () => (
  <div style={{display:"flex",alignItems:"center",gap:"16px",margin:"28px 0"}}>
    <div style={{flex:1,height:"1px",background:C.border}}/>
    <span style={{color:C.gold,fontSize:"12px",fontFamily:BODY}}>✦</span>
    <div style={{flex:1,height:"1px",background:C.border}}/>
  </div>
);

// ── Tag badge ────────────────────────────────────────────────────────────────
const Badge = ({label}) => (
  <div style={{
    position:"absolute", top:"10px", left:"10px",
    background:C.charcoal, padding:"3px 8px", borderRadius:"1px",
  }}>
    <span style={{color:C.gold, fontSize:"8px", letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:BODY}}>{label}</span>
  </div>
);

// ── Product card ─────────────────────────────────────────────────────────────
const ProductCard = ({p, saved, onSave}) => (
  <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"3px",overflow:"hidden",position:"relative"}}>
    <Badge label={p.tag}/>
    <button onClick={()=>onSave(p.id)} style={{
      position:"absolute",top:"8px",right:"8px",
      background:C.white,border:`1px solid ${C.border}`,
      width:"28px",height:"28px",borderRadius:"50%",
      display:"flex",alignItems:"center",justifyContent:"center",
      cursor:"pointer",fontSize:"13px",
      color:saved?"#c0392b":C.greyLight,
      fontFamily:BODY,
    }}>{saved?"♥":"♡"}</button>
    <div style={{padding:"46px 14px 16px"}}>
      <Eyebrow col={C.gold}>{p.cat}</Eyebrow>
      <p style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"13px",fontWeight:"400",margin:"7px 0 5px",lineHeight:"1.35"}}>{p.name}</p>
      <p style={{fontFamily:BODY,color:C.grey,fontSize:"11px",lineHeight:"1.55",margin:"0 0 14px",fontWeight:"300"}}>{p.desc}</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"15px",fontWeight:"400"}}>{p.price}</span>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
          fontFamily:BODY,background:C.gold,color:C.white,
          padding:"7px 14px",borderRadius:"2px",
          fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",
          textDecoration:"none",fontWeight:"500",
        }}>Shop</a>
      </div>
    </div>
  </div>
);

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]       = useState("home");
  const [cat,setCat]       = useState("All");
  const [saved,setSaved]   = useState([]);
  const [notifDone,setND]  = useState(false);
  const [showNotif,setSN]  = useState(false);
  const [jOpen,setJOpen]   = useState(null);
  const [toast,setToast]   = useState("");
  const [email,setEmail]   = useState("");
  const [subbed,setSubbed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(()=>{
    const t = setTimeout(()=>setSN(true), 3500);
    return ()=>clearTimeout(t);
  },[]);

  const fire = msg => { setToast(msg); setTimeout(()=>setToast(""),2600); };

  const toggleSave = id => {
    const isSaved = saved.includes(id);
    setSaved(p => isSaved ? p.filter(x=>x!==id) : [...p,id]);
    fire(isSaved ? "Removed from saved" : "Saved to your edit  ✦");
  };

  const go = (t, c) => {
    setTab(t);
    if (c) setCat(c);
    scrollRef.current?.scrollTo(0,0);
  };

  const filtered = cat==="All" ? PRODUCTS : PRODUCTS.filter(p=>p.cat===cat);

  const NAV = [
    {id:"home",    icon:"⌂", label:"Home"},
    {id:"shop",    icon:"◈", label:"Shop"},
    {id:"journal", icon:"✦", label:"Journal"},
    {id:"about",   icon:"◎", label:"About"},
    {id:"saved",   icon:"♡", label:"Saved"},
  ];

  return (
    <>
      {/* Load exact fonts from Google Fonts — same as elateve.com */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { display:none; }
        input::placeholder { font-family: ${BODY}; color:${C.grey}; }
        input:focus { outline:1px solid ${C.gold}; }
        a { -webkit-tap-highlight-color: transparent; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <div style={{
        fontFamily: BODY,
        background: C.cream,
        height:"100vh",
        maxWidth:"430px",
        margin:"0 auto",
        display:"flex",
        flexDirection:"column",
        overflow:"hidden",
        position:"relative",
      }}>

        {/* TOAST */}
        {toast && (
          <div style={{
            position:"absolute",top:"18px",left:"50%",transform:"translateX(-50%)",
            background:C.charcoal,color:C.white,
            padding:"10px 22px",borderRadius:"2px",
            fontFamily:BODY,fontSize:"11px",letterSpacing:"1.5px",textTransform:"uppercase",
            zIndex:9999,whiteSpace:"nowrap",
            boxShadow:"0 4px 24px rgba(0,0,0,0.2)",
          }}>{toast}</div>
        )}

        {/* PUSH NOTIFICATION BANNER */}
        {showNotif && !notifDone && (
          <div style={{
            position:"absolute",bottom:"74px",left:"12px",right:"12px",
            background:C.charcoal,borderRadius:"3px",padding:"20px",
            zIndex:500,boxShadow:"0 16px 48px rgba(0,0,0,0.4)",
            border:`1px solid ${C.gold}33`,
          }}>
            <div style={{display:"flex",gap:"14px",alignItems:"flex-start"}}>
              <div style={{
                width:"40px",height:"40px",background:C.gold,borderRadius:"2px",
                display:"flex",alignItems:"center",justifyContent:"center",
                flexShrink:0,color:C.white,fontSize:"16px",fontFamily:BODY,
              }}>✦</div>
              <div style={{flex:1}}>
                <p style={{fontFamily:DISPLAY,color:C.white,fontSize:"15px",fontWeight:"300",margin:"0 0 5px",letterSpacing:"-0.2px"}}>Stay Elevated</p>
                <p style={{fontFamily:BODY,color:C.greyLight,fontSize:"12px",margin:"0 0 16px",lineHeight:"1.6",fontWeight:"300"}}>New curated finds, rituals & exclusive drops delivered to you first.</p>
                <div style={{display:"flex",gap:"8px"}}>
                  <button onClick={()=>{setND(true);setSN(false);fire("Notifications enabled  ✦");}}
                    style={{flex:1,background:C.gold,color:C.white,border:"none",borderRadius:"2px",padding:"9px",fontFamily:BODY,fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontWeight:"500"}}>Enable</button>
                  <button onClick={()=>setSN(false)}
                    style={{flex:1,background:"transparent",color:C.grey,border:`1px solid ${C.grey}55`,borderRadius:"2px",padding:"9px",fontFamily:BODY,fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer"}}>Later</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HEADER — exact replica of elateve.com nav ── */}
        <div style={{
          background:C.cream,
          borderBottom:`1px solid ${C.border}`,
          padding:"15px 24px",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          flexShrink:0,
        }}>
          {/* Logo: Sora 600, letter-spacing 0.35em, gold gradient clipped to text — exact match to elateve.com */}
          <span style={{
            fontFamily: DISPLAY,
            fontSize:"15px",
            fontWeight:"600",
            letterSpacing:"0.35em",
            textTransform:"uppercase",
            userSelect:"none",
            backgroundImage:"linear-gradient(135deg, #8B6914, #C5973E, #E8C872)",
            WebkitBackgroundClip:"text",
            backgroundClip:"text",
            WebkitTextFillColor:"transparent",
            color:"transparent",
            display:"inline-block",
          }}>ELATEVE</span>
        </div>

        {/* ── SCROLL CONTENT ── */}
        <div ref={scrollRef} style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>

          {/* ════════ HOME ════════ */}
          {tab==="home" && (
            <div>
              {/* Hero */}
              <div style={{padding:"56px 28px 52px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
                <Eyebrow>Curated for the Elevated Life</Eyebrow>
                <h1 style={{
                  fontFamily:DISPLAY, fontSize:"40px", fontWeight:"300",
                  color:C.charcoal, margin:"18px 0 16px",
                  letterSpacing:"-0.01em", lineHeight:"1.15",
                }}>
                  Elevate Your<br/>Everyday
                </h1>
                <p style={{
                  fontFamily:BODY, color:C.grey, fontSize:"14px",
                  lineHeight:"1.75", margin:"0 auto 36px", maxWidth:"280px", fontWeight:"300",
                }}>
                  European-curated essentials for a life well-lived.<br/>Affordable luxury, intentionally chosen.
                </p>
                <GoldBtn onClick={()=>go("shop")}>Explore the Edit</GoldBtn>
              </div>

              {/* Four Pillars */}
              <div style={{padding:"36px 20px 0"}}>
                <div style={{textAlign:"center",marginBottom:"22px"}}>
                  <Eyebrow>Our Four Pillars</Eyebrow>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  {[
                    {l:"Wellness",   s:"Body & mind rituals",    c:"Wellness"},
                    {l:"Experience", s:"Sensory elevation",       c:"Experience"},
                    {l:"Home",       s:"Beautiful spaces",        c:"Home"},
                    {l:"Wealth",     s:"Abundance & prosperity",  c:"Wealth"},
                  ].map(p=>(
                    <button key={p.l} onClick={()=>go("shop",p.c)} style={{
                      background:C.creamDark,border:`1px solid ${C.border}`,
                      borderRadius:"3px",padding:"22px 16px",textAlign:"left",cursor:"pointer",
                    }}>
                      <p style={{fontFamily:BODY,color:C.gold,fontSize:"10px",letterSpacing:"2.5px",margin:"0 0 7px",textTransform:"uppercase",fontWeight:"500"}}>{p.l}</p>
                      <p style={{fontFamily:BODY,color:C.grey,fontSize:"12px",margin:0,lineHeight:"1.5",fontWeight:"300"}}>{p.s}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{padding:"0 20px"}}><Hr/></div>

              {/* Featured strip */}
              <div style={{padding:"0 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
                  <Eyebrow col={C.charcoal}>Featured Picks</Eyebrow>
                  <button onClick={()=>go("shop")} style={{fontFamily:BODY,background:"none",border:"none",color:C.gold,fontSize:"11px",letterSpacing:"1px",cursor:"pointer",textDecoration:"underline",fontWeight:"400"}}>View all →</button>
                </div>
                <div style={{display:"flex",gap:"12px",overflowX:"auto",paddingBottom:"8px"}}>
                  {PRODUCTS.slice(0,6).map(p=>(
                    <div key={p.id} style={{minWidth:"152px",background:C.white,border:`1px solid ${C.border}`,borderRadius:"3px",padding:"18px 14px",flexShrink:0}}>
                      <Eyebrow col={C.gold}>{p.cat}</Eyebrow>
                      <p style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"13px",fontWeight:"400",margin:"8px 0 5px",lineHeight:"1.3"}}>{p.name}</p>
                      <p style={{fontFamily:DISPLAY,color:C.gold,fontSize:"14px",margin:"0 0 12px",fontWeight:"300"}}>{p.price}</p>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                        display:"block",textAlign:"center",fontFamily:BODY,
                        background:C.gold,color:C.white,
                        padding:"8px",fontSize:"10px",letterSpacing:"2px",
                        textTransform:"uppercase",textDecoration:"none",
                        borderRadius:"2px",fontWeight:"500",
                      }}>Shop</a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div style={{margin:"36px 0 0",background:C.creamDark,padding:"32px 20px",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
                <div style={{textAlign:"center",marginBottom:"22px"}}>
                  <Eyebrow>What Our Community Says</Eyebrow>
                </div>
                {[
                  {q:"ELATEVE completely changed how I approach everyday purchases. Their wellness picks are spot-on — I discovered products I never knew I needed.",name:"Sarah M.",loc:"New York, NY"},
                  {q:"The curation is impeccable. Every product bought through their links has been worth it. Real luxury at accessible prices.",name:"Marcus L.",loc:"Los Angeles, CA"},
                ].map((t,i)=>(
                  <div key={i} style={{background:C.white,borderRadius:"3px",padding:"22px",marginBottom:i===0?"12px":0,border:`1px solid ${C.border}`}}>
                    <Stars/>
                    <p style={{fontFamily:BODY,color:C.charcoal,fontSize:"13px",fontStyle:"italic",lineHeight:"1.75",margin:"10px 0 12px",fontWeight:"300"}}>"{t.q}"</p>
                    <p style={{fontFamily:BODY,color:C.charcoal,fontSize:"12px",fontWeight:"500",margin:"0 0 2px"}}>{t.name}</p>
                    <p style={{fontFamily:BODY,color:C.grey,fontSize:"11px",margin:0,fontWeight:"300"}}>{t.loc}</p>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div style={{padding:"40px 24px",textAlign:"center"}}>
                <Eyebrow>Join the Elevation</Eyebrow>
                <h3 style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"24px",fontWeight:"300",margin:"14px 0 10px",letterSpacing:"-0.01em"}}>Join the Elevation</h3>
                <p style={{fontFamily:BODY,color:C.grey,fontSize:"13px",lineHeight:"1.7",margin:"0 0 24px",fontWeight:"300"}}>Curated finds, exclusive content, and rituals for elevated living. Delivered weekly.</p>
                {subbed ? (
                  <p style={{fontFamily:BODY,color:C.gold,fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase"}}>✦ You're in. Welcome to the edit.</p>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    <input value={email} onChange={e=>setEmail(e.target.value)}
                      placeholder="Your email"
                      style={{
                        fontFamily:BODY,border:`1px solid ${C.border}`,background:C.white,
                        padding:"13px 16px",fontSize:"13px",borderRadius:"2px",
                        color:C.charcoal,fontWeight:"300",
                      }}
                    />
                    <GoldBtn onClick={()=>{if(email){setSubbed(true);fire("Welcome to Elateve  ✦");}}}>Subscribe</GoldBtn>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{background:C.charcoal,padding:"36px 24px",textAlign:"center"}}>
                <p style={{fontFamily:DISPLAY,fontSize:"14px",fontWeight:"600",letterSpacing:"0.35em",textTransform:"uppercase",margin:"0 0 6px",backgroundImage:"linear-gradient(135deg, #8B6914, #C5973E, #E8C872)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent",display:"inline-block"}}>ELATEVE</p>
                <p style={{fontFamily:BODY,color:C.grey,fontSize:"12px",margin:"0 0 4px",fontWeight:"300"}}>Elevate Your Everyday</p>
                <p style={{fontFamily:BODY,color:C.gold,fontSize:"10px",letterSpacing:"2.5px",margin:"0 0 24px",textTransform:"uppercase"}}>A European Company</p>
                <div style={{display:"flex",justifyContent:"center",gap:"20px",flexWrap:"wrap"}}>
                  {["Wellness","Experience","Home","Wealth"].map(c=>(
                    <button key={c} onClick={()=>go("shop",c)} style={{
                      fontFamily:BODY,background:"none",border:"none",
                      color:C.grey,fontSize:"11px",letterSpacing:"1.5px",
                      cursor:"pointer",textTransform:"uppercase",fontWeight:"300",
                    }}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════ SHOP ════════ */}
          {tab==="shop" && (
            <div style={{paddingBottom:"16px"}}>
              <div style={{padding:"40px 24px 24px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
                <Eyebrow>The Edit</Eyebrow>
                <h2 style={{fontFamily:DISPLAY,fontSize:"30px",fontWeight:"300",color:C.charcoal,margin:"14px 0 10px",letterSpacing:"-0.01em"}}>Shop the Elevation</h2>
                <p style={{fontFamily:BODY,color:C.grey,fontSize:"13px",lineHeight:"1.65",margin:0,fontWeight:"300"}}>European bestsellers, intentionally chosen to upgrade your everyday.</p>
              </div>

              {/* Category tabs */}
              <div style={{overflowX:"auto"}}>
                <div style={{display:"flex",padding:"0 20px",width:"max-content",borderBottom:`1px solid ${C.border}`}}>
                  {CATS.map(c=>(
                    <button key={c} onClick={()=>setCat(c)} style={{
                      fontFamily:BODY,background:"none",border:"none",
                      borderBottom:cat===c?`2px solid ${C.gold}`:"2px solid transparent",
                      padding:"12px 16px",marginBottom:"-1px",
                      fontSize:"11px",letterSpacing:"2.5px",textTransform:"uppercase",
                      color:cat===c?C.gold:C.grey,
                      cursor:"pointer",whiteSpace:"nowrap",fontWeight:"400",
                    }}>{c}</button>
                  ))}
                </div>
              </div>

              <div style={{padding:"20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                {filtered.map(p=>(
                  <ProductCard key={p.id} p={p} saved={saved.includes(p.id)} onSave={toggleSave}/>
                ))}
              </div>
            </div>
          )}

          {/* ════════ JOURNAL ════════ */}
          {tab==="journal" && (
            <div style={{paddingBottom:"16px"}}>
              <div style={{padding:"40px 24px 24px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
                <Eyebrow>The Elateve Journal</Eyebrow>
                <h2 style={{fontFamily:DISPLAY,fontSize:"30px",fontWeight:"300",color:C.charcoal,margin:"14px 0 10px",letterSpacing:"-0.01em"}}>Wellness & Wealth Articles</h2>
                <p style={{fontFamily:BODY,color:C.grey,fontSize:"13px",lineHeight:"1.65",margin:0,fontWeight:"300"}}>Insights, rituals, and guidance for the elevated life.</p>
              </div>

              <div style={{padding:"20px"}}>
                {JOURNAL.map((a,i)=>(
                  <div key={a.id} onClick={()=>setJOpen(jOpen===i?null:i)}
                    style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"3px",padding:"22px",marginBottom:"12px",cursor:"pointer"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{flex:1,paddingRight:"12px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
                          <span style={{fontFamily:BODY,background:C.creamDark,border:`1px solid ${C.border}`,padding:"2px 8px",borderRadius:"1px",fontSize:"9px",letterSpacing:"2px",color:C.gold,textTransform:"uppercase"}}>{a.tag}</span>
                          <span style={{fontFamily:BODY,color:C.greyLight,fontSize:"11px",fontWeight:"300"}}>{a.read}</span>
                        </div>
                        <h3 style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"15px",fontWeight:"400",margin:"0 0 8px",lineHeight:"1.4"}}>{a.title}</h3>
                        <p style={{fontFamily:BODY,color:C.grey,fontSize:"12px",margin:0,lineHeight:"1.65",fontWeight:"300"}}>{jOpen===i?a.body:`${a.body.slice(0,85)}…`}</p>
                        {jOpen===i&&(
                          <button onClick={e=>{e.stopPropagation();go("shop");}} style={{
                            fontFamily:BODY,background:"none",border:"none",color:C.gold,
                            fontSize:"11px",letterSpacing:"1px",cursor:"pointer",
                            textDecoration:"underline",padding:"12px 0 0",display:"block",fontWeight:"400",
                          }}>Shop related products →</button>
                        )}
                      </div>
                      <span style={{fontFamily:BODY,color:C.greyLight,fontSize:"18px",flexShrink:0,fontWeight:"300"}}>{jOpen===i?"−":"+"}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{margin:"0 20px",background:C.charcoal,borderRadius:"3px",padding:"30px 22px"}}>
                <Eyebrow col={C.gold}>Wealth & Abundance</Eyebrow>
                <h3 style={{fontFamily:DISPLAY,color:C.white,fontSize:"22px",fontWeight:"300",margin:"12px 0 10px",letterSpacing:"-0.01em"}}>The Elateve Wealth Edit</h3>
                <p style={{fontFamily:BODY,color:C.greyLight,fontSize:"13px",lineHeight:"1.65",margin:"0 0 22px",fontWeight:"300"}}>Feng shui principles, prosperity crystals, and abundance rituals curated for the modern life.</p>
                <GoldBtn onClick={()=>go("shop","Wealth")} sm>Explore Wealth Picks</GoldBtn>
              </div>
            </div>
          )}

          {/* ════════ ABOUT ════════ */}
          {tab==="about" && (
            <div style={{paddingBottom:"16px"}}>
              <div style={{padding:"40px 24px 28px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
                <Eyebrow>Our Story</Eyebrow>
                <h2 style={{fontFamily:DISPLAY,fontSize:"30px",fontWeight:"300",color:C.charcoal,margin:"14px 0 0",letterSpacing:"-0.01em"}}>About ELATEVE</h2>
              </div>

              <div style={{padding:"28px 24px"}}>
                <h3 style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"20px",fontWeight:"400",margin:"0 0 16px",letterSpacing:"-0.01em"}}>The ELATEVE Story</h3>
                {[
                  "Born in Europe, ELATEVE was founded on a simple belief: you do not need a massive budget to live beautifully. You just need better taste and the right guidance.",
                  "As a European company, we bring a distinctly continental perspective to curation, blending timeless European taste with globally sourced products that resonate with modern life. We curate across four pillars of elevated living: Wellness, Experience, Home, and Wealth.",
                  "Our community spans the globe. Every product we recommend has been chosen with the same discerning eye that defines European craftsmanship and design sensibility.",
                ].map((para,i)=>(
                  <p key={i} style={{fontFamily:BODY,color:C.grey,fontSize:"14px",lineHeight:"1.8",margin:"0 0 18px",fontWeight:"300"}}>{para}</p>
                ))}

                <Hr/>

                {[
                  {t:"Wellness",   d:"Body and mind rituals. Supplements, skincare, and tools for cellular health and daily restoration."},
                  {t:"Experience", d:"Sensory elevation. Candles, lamps, and luxuries that transform how your space feels."},
                  {t:"Home",       d:"Beautiful, functional spaces. Leather desk mats, ceramic cookware, and curated essentials."},
                  {t:"Wealth",     d:"Abundance and prosperity. Feng shui tools, crystals, and intention-setting products."},
                ].map((p,i,arr)=>(
                  <div key={i} style={{borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",paddingBottom:"20px",marginBottom:"20px"}}>
                    <p style={{fontFamily:BODY,color:C.gold,fontSize:"10px",letterSpacing:"2.5px",textTransform:"uppercase",margin:"0 0 7px",fontWeight:"500"}}>{p.t}</p>
                    <p style={{fontFamily:BODY,color:C.grey,fontSize:"13px",lineHeight:"1.7",margin:0,fontWeight:"300"}}>{p.d}</p>
                  </div>
                ))}

                <div style={{textAlign:"center",marginTop:"16px"}}>
                  <p style={{fontFamily:BODY,color:C.greyLight,fontSize:"10px",letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:"18px",fontWeight:"300"}}>A European Company</p>
                  <GoldBtn onClick={()=>go("shop")} out>Shop the Edit</GoldBtn>
                </div>
              </div>
            </div>
          )}

          {/* ════════ SAVED ════════ */}
          {tab==="saved" && (
            <div style={{paddingBottom:"16px"}}>
              <div style={{padding:"40px 24px 24px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
                <Eyebrow>Your Collection</Eyebrow>
                <h2 style={{fontFamily:DISPLAY,fontSize:"28px",fontWeight:"300",color:C.charcoal,margin:"14px 0 0",letterSpacing:"-0.01em"}}>Saved Items</h2>
              </div>

              <div style={{padding:"20px"}}>
                {saved.length===0 ? (
                  <div style={{textAlign:"center",padding:"56px 20px"}}>
                    <div style={{fontSize:"28px",color:C.border,marginBottom:"18px",fontFamily:BODY}}>♡</div>
                    <h3 style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"18px",fontWeight:"300",marginBottom:"10px"}}>Your edit is empty</h3>
                    <p style={{fontFamily:BODY,color:C.grey,fontSize:"13px",marginBottom:"28px",fontWeight:"300"}}>Tap the heart on any product to save it here</p>
                    <GoldBtn onClick={()=>go("shop")} sm>Browse the Edit</GoldBtn>
                  </div>
                ) : (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                    {PRODUCTS.filter(p=>saved.includes(p.id)).map(p=>(
                      <div key={p.id} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:"3px",padding:"18px 14px",position:"relative"}}>
                        <button onClick={()=>toggleSave(p.id)} style={{position:"absolute",top:"8px",right:"8px",background:"none",border:"none",cursor:"pointer",color:"#c0392b",fontSize:"14px",fontFamily:BODY}}>♥</button>
                        <Eyebrow col={C.gold}>{p.cat}</Eyebrow>
                        <p style={{fontFamily:DISPLAY,color:C.charcoal,fontSize:"13px",fontWeight:"400",margin:"7px 0 5px",lineHeight:"1.3"}}>{p.name}</p>
                        <p style={{fontFamily:DISPLAY,color:C.gold,fontSize:"14px",margin:"0 0 14px",fontWeight:"300"}}>{p.price}</p>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                          display:"block",textAlign:"center",fontFamily:BODY,
                          background:C.charcoal,color:C.white,
                          padding:"9px",fontSize:"10px",letterSpacing:"2px",
                          textTransform:"uppercase",textDecoration:"none",
                          borderRadius:"2px",fontWeight:"500",
                        }}>Shop on Amazon</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>{/* end scroll */}

        {/* ── BOTTOM NAV ── */}
        <div style={{
          background:C.cream,
          borderTop:`1px solid ${C.border}`,
          display:"flex",
          flexShrink:0,
        }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>go(n.id)} style={{
              flex:1,background:"none",border:"none",
              padding:"11px 0 9px",cursor:"pointer",
              display:"flex",flexDirection:"column",
              alignItems:"center",gap:"3px",
            }}>
              <span style={{fontSize:"16px",color:tab===n.id?C.gold:C.greyLight}}>{n.icon}</span>
              <span style={{
                fontFamily:BODY,fontSize:"8px",letterSpacing:"1.5px",
                textTransform:"uppercase",color:tab===n.id?C.gold:C.greyLight,
                fontWeight:tab===n.id?"500":"300",
              }}>{n.label}</span>
              {tab===n.id && <div style={{width:"14px",height:"1px",background:C.gold,marginTop:"1px"}}/>}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
