import { useState, useEffect, useRef } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, Linking, Animated, StatusBar,
} from "react-native";

const C = {
  cream:"#F7F5F0", dark:"#EDE9E0", gold:"#C5973E",
  charcoal:"#1A1A1A", grey:"#8A8A8A", light:"#C4C4C4",
  white:"#FFFFFF", border:"#DDD9D0",
};

const PRODUCTS = [
  { id:1,  cat:"Wellness",   name:"Majestic Pure Lavender Oil",       price:"$15",  tag:"Bestseller",   link:"https://www.amazon.com/s?k=Majestic+Pure+Lavender+Essential+Oil" },
  { id:2,  cat:"Wellness",   name:"Vital Proteins Collagen Peptides", price:"$43",  tag:"Top Rated",    link:"https://www.amazon.com/s?k=Vital+Proteins+Collagen+Peptides" },
  { id:3,  cat:"Wellness",   name:"Tru Niagen NAD+ Supplement",       price:"$49",  tag:"Biohack",      link:"https://www.amazon.com/s?k=Tru+Niagen+NAD+Cell+Regeneration" },
  { id:4,  cat:"Wellness",   name:"Rose Quartz Gua Sha Set",          price:"$34",  tag:"Self-Care",    link:"https://www.amazon.com/s?k=rose+quartz+gua+sha+jade+roller+set" },
  { id:5,  cat:"Experience", name:"Playlearn 6ft Bubble Lamp",        price:"$189", tag:"Statement",    link:"https://www.amazon.com/dp/B00J24THFY" },
  { id:6,  cat:"Experience", name:"NEST New York Bamboo Candle",       price:"$52",  tag:"Luxury",       link:"https://www.amazon.com/s?k=NEST+New+York+Bamboo+candle" },
  { id:7,  cat:"Experience", name:"Voluspa Japonica Glass Candle",     price:"$38",  tag:"Gift Pick",    link:"https://www.amazon.com/s?k=Voluspa+Japonica+candle" },
  { id:8,  cat:"Experience", name:"Mulberry Silk Pillowcase",          price:"$55",  tag:"Sleep",        link:"https://www.amazon.com/s?k=mulberry+silk+pillowcase+22+momme" },
  { id:9,  cat:"Home",       name:"ELIZO Leather Desk Mat Set",        price:"$79",  tag:"Editors Pick", link:"https://www.amazon.com/dp/B09HRCCNCD" },
  { id:10, cat:"Home",       name:"Gallaway Leather Desk Pad",         price:"$45",  tag:"Office",       link:"https://www.amazon.com/dp/B083JP5QY4" },
  { id:11, cat:"Home",       name:"Caraway Ceramic Cookware Set",      price:"$395", tag:"Premium",      link:"https://www.amazon.com/s?k=Caraway+Cookware+Set" },
  { id:12, cat:"Home",       name:"GreenPan Ceramic Fry Pan Set",      price:"$89",  tag:"Clean Living", link:"https://www.amazon.com/s?k=GreenPan+ceramic+frying+pan+set" },
  { id:13, cat:"Wealth",     name:"Red Phoenix Feng Shui Wallet",      price:"$28",  tag:"Trending",     link:"https://www.amazon.com/dp/B0CP8WMDZP" },
  { id:14, cat:"Wealth",     name:"Money Magnet Feng Shui Wallet",     price:"$35",  tag:"Manifest",     link:"https://www.amazon.com/dp/B07CJYG3RD" },
  { id:15, cat:"Wealth",     name:"Citrine Crystal Cluster",           price:"$22",  tag:"Crystal",      link:"https://www.amazon.com/s?k=citrine+crystal+cluster+large+abundance" },
  { id:16, cat:"Wealth",     name:"Golden Dragon Wealth Bracelet",     price:"$29",  tag:"Protection",   link:"https://www.amazon.com/s?k=Buddha+Karma+Golden+Dragon+Bracelet" },
];

const JOURNAL = [
  { id:1, tag:"Wellness",  read:"4 min", title:"5 European Morning Rituals That Actually Work",      body:"The continent's best-kept secrets for energy, skin, and mental clarity. From dry brushing to cold-finish showers and adaptogen teas — the rituals European women swear by." },
  { id:2, tag:"Home",      read:"6 min", title:"How to Create a Luxury Home on a Real Budget",       body:"Affordable luxury is not a contradiction. It is a skill. The Elateve guide to curating your space with intention — leather, ceramics, and one statement lamp." },
  { id:3, tag:"Wealth",    read:"5 min", title:"The Feng Shui Principles Behind Our Wealth Picks",   body:"Why red wallets, citrine crystals, and intentional placement can shift the energy around money. The ancient practice through a modern European lens." },
  { id:4, tag:"Wellness",  read:"7 min", title:"Collagen, NAD+ and Cell Renewal: What Science Says", body:"We break down the supplements worth your money and why cellular health is the new frontier of anti-aging. Collagen and NAD+ are the two you actually need." },
];

const CATS = ["All","Wellness","Experience","Home","Wealth"];
const NAV = [
  { id:"home",    icon:"⌂", label:"Home" },
  { id:"shop",    icon:"◈", label:"Shop" },
  { id:"journal", icon:"✦", label:"Journal" },
  { id:"about",   icon:"◎", label:"About" },
  { id:"saved",   icon:"♡", label:"Saved" },
];

const Label = ({ children, color }) => (
  <Text style={[s.label, color && { color }]}>{children}</Text>
);

const GoldBtn = ({ children, onPress, outline }) => (
  <TouchableOpacity onPress={onPress} style={[s.btn, outline && s.btnOut]}>
    <Text style={[s.btnTxt, outline && { color: C.gold }]}>{children}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [tab, setTab]           = useState("home");
  const [cat, setCat]           = useState("All");
  const [saved, setSaved]       = useState([]);
  const [jOpen, setJOpen]       = useState(null);
  const [email, setEmail]       = useState("");
  const [subbed, setSubbed]     = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [toast, setToast]       = useState("");
  const toastOp = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const fire = (msg) => {
    setToast(msg);
    Animated.sequence([
      Animated.timing(toastOp, { toValue:1, duration:250, useNativeDriver:true }),
      Animated.delay(1800),
      Animated.timing(toastOp, { toValue:0, duration:250, useNativeDriver:true }),
    ]).start(() => setToast(""));
  };

  const toggleSave = (id) => {
    const was = saved.includes(id);
    setSaved(p => was ? p.filter(x => x!==id) : [...p, id]);
    fire(was ? "Removed" : "Saved  ✦");
  };

  const go = (t, c) => {
    setTab(t);
    if (c) setCat(c);
    scrollRef.current?.scrollTo({ y:0, animated:false });
  };

  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.cream}/>

      {!!toast && (
        <Animated.View style={[s.toast, { opacity: toastOp }]}>
          <Text style={s.toastTxt}>{toast}</Text>
        </Animated.View>
      )}

      {showNotif && (
        <View style={s.notif}>
          <View style={{ flex:1 }}>
            <Text style={s.notifEyebrow}>ELATEVE</Text>
            <Text style={s.notifTitle}>Stay Elevated</Text>
            <Text style={s.notifBody}>New drops, rituals and curated finds delivered first.</Text>
          </View>
          <View style={s.notifActions}>
            <TouchableOpacity onPress={() => { setShowNotif(false); fire("Enabled  ✦"); }} style={s.notifYes}>
              <Text style={s.notifYesTxt}>Enable</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowNotif(false)}>
              <Text style={s.notifNo}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={s.header}>
        <Text style={s.logo}>ELATEVE</Text>
      </View>

      <ScrollView ref={scrollRef} style={{ flex:1 }} showsVerticalScrollIndicator={false}>

        {tab === "home" && (
          <View>
            <View style={s.hero}>
              <Label color={C.gold}>CURATED LUXURY</Label>
              <Text style={s.heroTitle}>{"Elevate\nYour\nEveryday."}</Text>
              <Text style={s.heroSub}>{"European essentials.\nIntentionally chosen."}</Text>
              <GoldBtn onPress={() => go("shop")}>SHOP THE EDIT</GoldBtn>
            </View>

            <View style={s.pillarsWrap}>
              <Label>THE FOUR PILLARS</Label>
              <View style={s.pillars}>
                {["Wellness","Experience","Home","Wealth"].map((p, i) => (
                  <TouchableOpacity key={p} onPress={() => go("shop", p)} style={[s.pillarTile, i%2===0 && { marginRight:8 }]}>
                    <Text style={s.pillarNum}>0{i+1}</Text>
                    <Text style={s.pillarName}>{p.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={s.featuredWrap}>
              <View style={s.rowBetween}>
                <Label>FEATURED</Label>
                <TouchableOpacity onPress={() => go("shop")}>
                  <Text style={s.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.featScroll}>
                {PRODUCTS.slice(0,5).map(p => (
                  <TouchableOpacity key={p.id} onPress={() => Linking.openURL(p.link)} style={s.featCard}>
                    <Text style={s.featCat}>{p.cat.toUpperCase()}</Text>
                    <Text style={s.featName}>{p.name}</Text>
                    <Text style={s.featPrice}>{p.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={s.quoteBlock}>
              <Text style={s.quoteMark}>"</Text>
              <Text style={s.quoteText}>You do not need a massive budget to live beautifully. You just need better taste.</Text>
              <Text style={s.quoteSource}>— The Elateve Philosophy</Text>
            </View>

            <View style={s.nlWrap}>
              <Label>JOIN THE EDIT</Label>
              <Text style={s.nlTitle}>{"Weekly drops.\nZero noise."}</Text>
              {subbed ? (
                <Text style={s.nlConfirm}>✦  You are in.</Text>
              ) : (
                <View style={s.nlForm}>
                  <TextInput value={email} onChangeText={setEmail} placeholder="your@email.com" placeholderTextColor={C.light} style={s.nlInput} keyboardType="email-address" autoCapitalize="none"/>
                  <TouchableOpacity onPress={() => { if(email){ setSubbed(true); fire("Welcome  ✦"); }}} style={s.nlBtn}>
                    <Text style={s.nlBtnTxt}>→</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={s.footer}>
              <Text style={s.footerLogo}>ELATEVE</Text>
              <Text style={s.footerSub}>A European Company</Text>
            </View>
          </View>
        )}

        {tab === "shop" && (
          <View style={{ paddingBottom:40 }}>
            <View style={s.pageTop}>
              <Label color={C.gold}>THE EDIT</Label>
              <Text style={s.pageTitle}>Shop</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.catScroll}>
              {CATS.map(c => (
                <TouchableOpacity key={c} onPress={() => setCat(c)} style={[s.catPill, cat===c && s.catPillActive]}>
                  <Text style={[s.catPillTxt, cat===c && s.catPillTxtActive]}>{c.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {filtered.map((p, i) => (
              <View key={p.id} style={[s.productRow, i===0 && { borderTopWidth:1, borderTopColor:C.border }]}>
                <View style={s.productLeft}>
                  <Text style={s.productCat}>{p.cat.toUpperCase()}</Text>
                  <Text style={s.productName}>{p.name}</Text>
                  <Text style={s.productPrice}>{p.price}</Text>
                </View>
                <View style={s.productRight}>
                  <TouchableOpacity onPress={() => toggleSave(p.id)} style={s.productHeart}>
                    <Text style={{ color: saved.includes(p.id) ? "#c0392b" : C.light, fontSize:18 }}>
                      {saved.includes(p.id) ? "♥" : "♡"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL(p.link)} style={s.productShop}>
                    <Text style={s.productShopTxt}>SHOP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {tab === "journal" && (
          <View style={{ paddingBottom:40 }}>
            <View style={s.pageTop}>
              <Label color={C.gold}>JOURNAL</Label>
              <Text style={s.pageTitle}>The Edit</Text>
            </View>
            {JOURNAL.map((a, i) => (
              <TouchableOpacity key={a.id} onPress={() => setJOpen(jOpen===i ? null : i)} style={[s.articleRow, i===0 && { borderTopWidth:1, borderTopColor:C.border }]}>
                <View style={s.articleMeta}>
                  <Text style={s.articleTag}>{a.tag.toUpperCase()}</Text>
                  <Text style={s.articleRead}>{a.read}</Text>
                </View>
                <Text style={s.articleTitle}>{a.title}</Text>
                {jOpen === i && <Text style={s.articleBody}>{a.body}</Text>}
                <Text style={s.articleToggle}>{jOpen===i ? "−" : "+"}</Text>
              </TouchableOpacity>
            ))}
            <View style={s.journalCta}>
              <Label color={C.gold}>WEALTH EDIT</Label>
              <Text style={s.journalCtaTitle}>{"Abundance.\nIntentionally curated."}</Text>
              <GoldBtn onPress={() => go("shop","Wealth")}>EXPLORE NOW</GoldBtn>
            </View>
          </View>
        )}

        {tab === "about" && (
          <View style={{ paddingBottom:40 }}>
            <View style={s.pageTop}>
              <Label color={C.gold}>OUR STORY</Label>
              <Text style={s.pageTitle}>About</Text>
            </View>
            <View style={s.aboutBlock}>
              <Text style={s.aboutBig}>Born in Europe.</Text>
              <Text style={s.aboutBody}>ELATEVE was founded on a simple belief — you do not need a massive budget to live beautifully. You just need better taste and the right guidance.</Text>
              <Text style={s.aboutBody}>We curate across four pillars of elevated living: Wellness, Experience, Home, and Wealth. Every product chosen with the discerning eye of European craftsmanship.</Text>
            </View>
            {[
              { t:"Wellness",   d:"Body and mind rituals." },
              { t:"Experience", d:"Sensory elevation." },
              { t:"Home",       d:"Beautiful, functional spaces." },
              { t:"Wealth",     d:"Abundance and prosperity." },
            ].map((p, i, arr) => (
              <TouchableOpacity key={p.t} onPress={() => go("shop", p.t)} style={[s.aboutPillarRow, i===0 && { borderTopWidth:1, borderTopColor:C.border }, i<arr.length-1 && { borderBottomWidth:1, borderBottomColor:C.border }]}>
                <View>
                  <Text style={s.aboutPillarName}>{p.t.toUpperCase()}</Text>
                  <Text style={s.aboutPillarDesc}>{p.d}</Text>
                </View>
                <Text style={{ color:C.gold, fontSize:18 }}>→</Text>
              </TouchableOpacity>
            ))}
            <View style={{ padding:40, alignItems:"center" }}>
              <Text style={s.europeanBadge}>A EUROPEAN COMPANY</Text>
            </View>
          </View>
        )}

        {tab === "saved" && (
          <View style={{ paddingBottom:40 }}>
            <View style={s.pageTop}>
              <Label color={C.gold}>YOUR COLLECTION</Label>
              <Text style={s.pageTitle}>Saved</Text>
            </View>
            {saved.length === 0 ? (
              <View style={s.emptyState}>
                <Text style={s.emptyIcon}>♡</Text>
                <Text style={s.emptyTitle}>Nothing saved yet.</Text>
                <Text style={s.emptySub}>Browse the edit and save your favourites.</Text>
                <GoldBtn onPress={() => go("shop")}>BROWSE THE EDIT</GoldBtn>
              </View>
            ) : (
              PRODUCTS.filter(p => saved.includes(p.id)).map((p, i) => (
                <View key={p.id} style={[s.productRow, i===0 && { borderTopWidth:1, borderTopColor:C.border }]}>
                  <View style={s.productLeft}>
                    <Text style={s.productCat}>{p.cat.toUpperCase()}</Text>
                    <Text style={s.productName}>{p.name}</Text>
                    <Text style={s.productPrice}>{p.price}</Text>
                  </View>
                  <View style={s.productRight}>
                    <TouchableOpacity onPress={() => toggleSave(p.id)} style={s.productHeart}>
                      <Text style={{ color:"#c0392b", fontSize:18 }}>♥</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(p.link)} style={s.productShop}>
                      <Text style={s.productShopTxt}>SHOP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

      </ScrollView>

      <View style={s.nav}>
        {NAV.map(n => (
          <TouchableOpacity key={n.id} onPress={() => go(n.id)} style={s.navItem}>
            <Text style={[s.navIcon, tab===n.id && { color:C.gold }]}>{n.icon}</Text>
            <Text style={[s.navLabel, tab===n.id && { color:C.gold }]}>{n.label.toUpperCase()}</Text>
            {tab===n.id && <View style={s.navLine}/>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root:{ flex:1, backgroundColor:C.cream },
  header:{ paddingTop:56, paddingBottom:18, alignItems:"center", borderBottomWidth:1, borderBottomColor:C.border, backgroundColor:C.cream },
  logo:{ fontSize:13, fontWeight:"800", letterSpacing:10, color:C.charcoal },
  toast:{ position:"absolute", top:24, alignSelf:"center", backgroundColor:C.charcoal, paddingHorizontal:24, paddingVertical:10, borderRadius:2, zIndex:999 },
  toastTxt:{ color:C.white, fontSize:11, letterSpacing:2 },
  notif:{ position:"absolute", bottom:90, left:16, right:16, backgroundColor:C.charcoal, borderRadius:4, padding:24, zIndex:500, flexDirection:"row", alignItems:"flex-start", gap:16 },
  notifEyebrow:{ color:C.gold, fontSize:9, letterSpacing:3, marginBottom:6 },
  notifTitle:{ color:C.white, fontSize:17, fontWeight:"300", marginBottom:4 },
  notifBody:{ color:C.light, fontSize:12, lineHeight:18, fontWeight:"300" },
  notifActions:{ alignItems:"flex-end", justifyContent:"space-between", gap:12 },
  notifYes:{ backgroundColor:C.gold, paddingHorizontal:16, paddingVertical:8, borderRadius:2 },
  notifYesTxt:{ color:C.white, fontSize:11, letterSpacing:1.5, fontWeight:"600" },
  notifNo:{ color:C.grey, fontSize:11, letterSpacing:1 },
  label:{ fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.grey, fontWeight:"500" },
  btn:{ backgroundColor:C.gold, paddingVertical:14, paddingHorizontal:32, borderRadius:2, alignSelf:"flex-start", borderWidth:1, borderColor:C.gold },
  btnOut:{ backgroundColor:"transparent" },
  btnTxt:{ color:C.white, fontSize:10, letterSpacing:3, textTransform:"uppercase", fontWeight:"700" },
  hero:{ paddingHorizontal:32, paddingTop:64, paddingBottom:64, borderBottomWidth:1, borderBottomColor:C.border },
  heroTitle:{ fontSize:52, fontWeight:"200", color:C.charcoal, marginTop:20, marginBottom:24, lineHeight:58, letterSpacing:-1 },
  heroSub:{ color:C.grey, fontSize:15, lineHeight:24, marginBottom:40, fontWeight:"300" },
  pillarsWrap:{ padding:32, paddingTop:40, paddingBottom:40 },
  pillars:{ flexDirection:"row", flexWrap:"wrap", marginTop:24 },
  pillarTile:{ width:"48%", aspectRatio:1, backgroundColor:C.dark, borderWidth:1, borderColor:C.border, justifyContent:"flex-end", padding:20, marginBottom:8 },
  pillarNum:{ color:C.gold, fontSize:11, letterSpacing:2, marginBottom:8 },
  pillarName:{ color:C.charcoal, fontSize:16, fontWeight:"300", letterSpacing:1 },
  featuredWrap:{ paddingHorizontal:32, paddingBottom:40 },
  rowBetween:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:20 },
  seeAll:{ color:C.gold, fontSize:11, letterSpacing:1 },
  featScroll:{ gap:12, paddingRight:32 },
  featCard:{ width:200, backgroundColor:C.white, borderWidth:1, borderColor:C.border, padding:24 },
  featCat:{ color:C.gold, fontSize:8, letterSpacing:3, marginBottom:12 },
  featName:{ color:C.charcoal, fontSize:14, fontWeight:"300", lineHeight:20, marginBottom:16 },
  featPrice:{ color:C.charcoal, fontSize:18, fontWeight:"200" },
  quoteBlock:{ backgroundColor:C.charcoal, padding:48 },
  quoteMark:{ color:C.gold, fontSize:48, lineHeight:48, marginBottom:8 },
  quoteText:{ color:C.white, fontSize:18, fontWeight:"200", lineHeight:28, marginBottom:20 },
  quoteSource:{ color:C.grey, fontSize:11, letterSpacing:2 },
  nlWrap:{ padding:48, borderTopWidth:1, borderTopColor:C.border },
  nlTitle:{ fontSize:32, fontWeight:"200", color:C.charcoal, marginTop:16, marginBottom:32, lineHeight:40, letterSpacing:-0.5 },
  nlForm:{ flexDirection:"row", borderWidth:1, borderColor:C.border, backgroundColor:C.white },
  nlInput:{ flex:1, padding:16, fontSize:14, color:C.charcoal },
  nlBtn:{ backgroundColor:C.gold, paddingHorizontal:20, alignItems:"center", justifyContent:"center" },
  nlBtnTxt:{ color:C.white, fontSize:18 },
  nlConfirm:{ color:C.gold, fontSize:13, letterSpacing:2 },
  footer:{ padding:48, alignItems:"center", borderTopWidth:1, borderTopColor:C.border },
  footerLogo:{ fontSize:12, fontWeight:"800", letterSpacing:10, color:C.charcoal, marginBottom:8 },
  footerSub:{ color:C.grey, fontSize:10, letterSpacing:3 },
  pageTop:{ paddingHorizontal:32, paddingTop:48, paddingBottom:40 },
  pageTitle:{ fontSize:44, fontWeight:"200", color:C.charcoal, marginTop:16, letterSpacing:-1 },
  catScroll:{ paddingHorizontal:32, paddingBottom:24, gap:8 },
  catPill:{ paddingHorizontal:16, paddingVertical:8, borderWidth:1, borderColor:C.border, borderRadius:100 },
  catPillActive:{ borderColor:C.gold, backgroundColor:C.gold },
  catPillTxt:{ color:C.grey, fontSize:9, letterSpacing:2.5 },
  catPillTxtActive:{ color:C.white },
  productRow:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:32, paddingVertical:24, borderBottomWidth:1, borderBottomColor:C.border },
  productLeft:{ flex:1, paddingRight:16 },
  productCat:{ color:C.gold, fontSize:8, letterSpacing:3, marginBottom:6 },
  productName:{ color:C.charcoal, fontSize:15, fontWeight:"300", lineHeight:21, marginBottom:6 },
  productPrice:{ color:C.charcoal, fontSize:18, fontWeight:"200" },
  productRight:{ alignItems:"center", gap:12 },
  productHeart:{ padding:4 },
  productShop:{ backgroundColor:C.charcoal, paddingHorizontal:14, paddingVertical:8, borderRadius:2 },
  productShopTxt:{ color:C.white, fontSize:9, letterSpacing:2, fontWeight:"600" },
  articleRow:{ paddingHorizontal:32, paddingVertical:32, borderBottomWidth:1, borderBottomColor:C.border },
  articleMeta:{ flexDirection:"row", justifyContent:"space-between", marginBottom:14 },
  articleTag:{ color:C.gold, fontSize:8, letterSpacing:3 },
  articleRead:{ color:C.light, fontSize:11 },
  articleTitle:{ color:C.charcoal, fontSize:20, fontWeight:"200", lineHeight:28, marginBottom:8, letterSpacing:-0.3 },
  articleBody:{ color:C.grey, fontSize:14, lineHeight:22, fontWeight:"300", marginTop:12, marginBottom:8 },
  articleToggle:{ color:C.gold, fontSize:20, marginTop:10, fontWeight:"200" },
  journalCta:{ margin:32, backgroundColor:C.charcoal, padding:40, gap:16 },
  journalCtaTitle:{ color:C.white, fontSize:28, fontWeight:"200", lineHeight:36, letterSpacing:-0.5 },
  aboutBlock:{ padding:32, paddingTop:0, gap:20 },
  aboutBig:{ fontSize:36, fontWeight:"200", color:C.charcoal, letterSpacing:-0.5, lineHeight:44 },
  aboutBody:{ color:C.grey, fontSize:15, lineHeight:24, fontWeight:"300" },
  aboutPillarRow:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:32, paddingVertical:24 },
  aboutPillarName:{ color:C.charcoal, fontSize:13, letterSpacing:2, fontWeight:"500", marginBottom:4 },
  aboutPillarDesc:{ color:C.grey, fontSize:12, fontWeight:"300" },
  europeanBadge:{ color:C.light, fontSize:9, letterSpacing:4 },
  emptyState:{ alignItems:"center", paddingVertical:80, paddingHorizontal:40, gap:12 },
  emptyIcon:{ fontSize:40, color:C.border, marginBottom:8 },
  emptyTitle:{ fontSize:22, fontWeight:"200", color:C.charcoal },
  emptySub:{ color:C.grey, fontSize:14, textAlign:"center", fontWeight:"300", marginBottom:12, lineHeight:22 },
  nav:{ backgroundColor:C.cream, borderTopWidth:1, borderTopColor:C.border, flexDirection:"row", paddingBottom:28, paddingTop:12 },
  navItem:{ flex:1, alignItems:"center", gap:4 },
  navIcon:{ fontSize:18, color:C.light },
  navLabel:{ fontSize:7, letterSpacing:1.5, color:C.light, fontWeight:"400" },
  navLine:{ width:16, height:1, backgroundColor:C.gold, marginTop:2 },
});
