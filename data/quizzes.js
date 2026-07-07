/* ========================================
   ELATEVE — Stage Assessments
   4 targeted quizzes, one per life stage.
   Mirrors "The Elateve [Stage] Assessment" format:
   Body -> Mind -> Environment, scored A/B/C,
   mapped to a tailored result + product picks.
   ======================================== */

const quizzes = {

  ripple: {
    key: "ripple",
    stageLabel: "The Ripple",
    stageName: "Teen Hormones",
    cardDesc: "Mood swings, confusion, skin changes.",
    intro: "A note from the ELATEVE team: the first hormonal shifts can feel like a guessing game — for her, and for you. This quick check-in looks at her body, mind, and home environment to help you know what to prioritize right now.",
    questions: [
      {
        id: 1, part: "Body", prompt: "Sleep & Energy",
        options: [
          { key: "A", text: "She sleeps well most nights and wakes up with energy." },
          { key: "B", text: "Restless some nights, with the occasional afternoon crash." },
          { key: "C", text: "Frequent sleep disruption — she's exhausted and irritable most days." }
        ]
      },
      {
        id: 2, part: "Body", prompt: "Skin & Physical Changes",
        options: [
          { key: "A", text: "Skin is clear, no major changes to speak of." },
          { key: "B", text: "New breakouts and oilier skin, a bit of self-consciousness." },
          { key: "C", text: "Noticeable acne or skin distress that's affecting her confidence." }
        ]
      },
      {
        id: 3, part: "Body", prompt: "Cycle Understanding",
        options: [
          { key: "A", text: "Cycles are settling into a predictable rhythm." },
          { key: "B", text: "Still unpredictable — some months light, some heavy." },
          { key: "C", text: "Irregular and accompanied by real discomfort or worry." }
        ]
      },
      {
        id: 4, part: "Mind", prompt: "Mood Resilience",
        options: [
          { key: "A", text: "Generally even-tempered, occasional moodiness." },
          { key: "B", text: "Noticeable mood swings — more sensitive than before." },
          { key: "C", text: "Intense swings, tearful or frustrated with little warning." }
        ]
      },
      {
        id: 5, part: "Mind", prompt: "Confidence & Self-Talk",
        options: [
          { key: "A", text: "She seems comfortable in her changing body." },
          { key: "B", text: "Some self-consciousness, comparing herself to others." },
          { key: "C", text: "Visibly anxious or upset about how her body is changing." }
        ]
      },
      {
        id: 6, part: "Environment", prompt: "Her Home Sanctuary",
        options: [
          { key: "A", text: "Her room and routine already support calm and rest." },
          { key: "B", text: "A few easy upgrades could help — lighting, products, a wind-down ritual." },
          { key: "C", text: "Feels chaotic — harsh lighting, synthetic bedding, no wind-down routine at all." }
        ]
      },
      {
        id: 7, part: "Environment", prompt: "Support & Conversation",
        options: [
          { key: "A", text: "You have open, comfortable conversations about what's changing." },
          { key: "B", text: "Some conversation happens, but it still feels a little awkward." },
          { key: "C", text: "There's a big silence around the topic — neither of you knows quite how to start." }
        ]
      }
    ],
    results: {
      A: {
        title: "The Steady Start",
        summary: "She's adjusting well. This is the perfect window to build light-touch, lifelong habits before things get more turbulent.",
        picks: [
          { name: "CeraVe Daily Moisturizing Lotion", note: "A gentle, fragrance-free foundation for a developing skin barrier." },
          { name: "Yogi Organic Tea Energy Sampler", note: "An easy ritual to build around, together." }
        ]
      },
      B: {
        title: "The Awakening",
        summary: "This is normal turbulence — but a little proactive support goes a long way right now.",
        picks: [
          { name: "CeraVe Hydrating Mineral Sunscreen SPF 30", note: "Gentle, dermatologist-formulated protection for changing skin." },
          { name: "NEST New York Reed Diffuser", note: "A calming scent cue for her room during the wobbly weeks." },
          { name: "Hatch Restore 3 — Smart Sleep Assistant", note: "Helps steady the sleep disruption that amplifies everything else." }
        ]
      },
      C: {
        title: "The Storm",
        summary: "She (and you) deserve real support here — not just products, but tools for the conversation itself.",
        picks: [
          { name: "ELATEVE Wellness Journal", note: "A shared, low-pressure way to open the conversation and track how she's feeling." },
          { name: "Nodpod Gentle Pressure Sleep Mask", note: "Weighted, calming pressure to help settle a dysregulated nervous system." },
          { name: "Yogi Relaxation Sampler Box", note: "A caffeine-free wind-down ritual for the hardest nights." }
        ]
      }
    }
  },

  creation: {
    key: "creation",
    stageLabel: "The Creation Era",
    stageName: "Fertility & Postpartum",
    cardDesc: "Depletion, identity shifts, physical recovery.",
    intro: "A note from the ELATEVE team: fertility, pregnancy, and postpartum ask everything of you — body, identity, and nervous system. This check-in helps you see where you actually need support right now, not where you think you 'should' be.",
    questions: [
      {
        id: 1, part: "Body", prompt: "Physical Recovery & Energy",
        options: [
          { key: "A", text: "Recovering well, energy is steadily returning." },
          { key: "B", text: "Better some days than others — recovery feels slower than expected." },
          { key: "C", text: "Running on empty. My body feels like it's still asking for help." }
        ]
      },
      {
        id: 2, part: "Body", prompt: "Sleep",
        options: [
          { key: "A", text: "Getting reasonable stretches of rest." },
          { key: "B", text: "Fragmented and light — I wake at the smallest sound." },
          { key: "C", text: "Genuinely depleted. Sleep debt is affecting everything else." }
        ]
      },
      {
        id: 3, part: "Body", prompt: "Nutrition & Body Changes",
        options: [
          { key: "A", text: "Eating reasonably well, body feels like it's finding its rhythm." },
          { key: "B", text: "Nutrition is inconsistent — meals happen when they happen." },
          { key: "C", text: "Barely eating properly. My body feels unfamiliar and depleted." }
        ]
      },
      {
        id: 4, part: "Mind", prompt: "Identity & Emotional Load",
        options: [
          { key: "A", text: "I still feel like myself, just in a new chapter." },
          { key: "B", text: "Some days I don't recognise who I've become." },
          { key: "C", text: "I feel like I've lost myself entirely in this role." }
        ]
      },
      {
        id: 5, part: "Mind", prompt: "Mental Clarity & Overwhelm",
        options: [
          { key: "A", text: "Managing the mental load reasonably well." },
          { key: "B", text: "Foggy, forgetful, and often overwhelmed by small decisions." },
          { key: "C", text: "Completely overwhelmed — I can't think past the next hour." }
        ]
      },
      {
        id: 6, part: "Environment", prompt: "Home Support",
        options: [
          { key: "A", text: "My home supports rest and recovery." },
          { key: "B", text: "A few changes (lighting, a recovery corner, better sleep setup) would help a lot." },
          { key: "C", text: "My environment feels chaotic — there's nowhere set up for me to actually recover." }
        ]
      },
      {
        id: 7, part: "Environment", prompt: "Support Network",
        options: [
          { key: "A", text: "I have real support and feel comfortable asking for help." },
          { key: "B", text: "Some support, but I'm mostly guessing my way through this." },
          { key: "C", text: "I feel isolated, and I'm not sure who to ask for what I actually need." }
        ]
      }
    ],
    results: {
      A: {
        title: "The Foundation Builder",
        summary: "You're recovering well — this is the moment to build sustainable habits, not just survive the season.",
        picks: [
          { name: "Seed DS-01 Daily Synbiotic", note: "Science-backed gut support for the long recovery arc." },
          { name: "Hatch Restore 3", note: "Protects whatever sleep you do get." }
        ]
      },
      B: {
        title: "The Depletion Signal",
        summary: "Your body is sending clear signals. A few targeted supports now prevent this from becoming a deeper crash.",
        picks: [
          { name: "Nodpod Gentle Pressure Sleep Mask", note: "Calming, weighted pressure for whatever sleep window you get." },
          { name: "Unisex Hooded Waffle Robe", note: "A small, tactile permission slip to rest." },
          { name: "NEST New York Reed Diffuser", note: "A calming scent anchor in a chaotic season." }
        ]
      },
      C: {
        title: "The Deep Reset Needed",
        summary: "This isn't something to push through alone. Prioritize radical rest and real support — starting today.",
        picks: [
          { name: "Seed DS-01 Daily Synbiotic", note: "Gut health is deeply tied to mood and energy in postpartum recovery." },
          { name: "Yogi Relaxation Sampler Box", note: "A caffeine-free ritual for whatever quiet moments you can find." },
          { name: "ELATEVE Wellness Journal", note: "A low-pressure way to track how you're actually doing, day to day." }
        ]
      }
    }
  },

  shift: {
    key: "shift",
    stageLabel: "The Shift",
    stageName: "Peri & Menopause",
    cardDesc: "Brain fog, hot flashes, sleep disruption.",
    intro: "A note from the ELATEVE team: perimenopause is not a single moment — it is a dynamic landscape. Your hormones are recalibrating, and your symptoms will shift. This assessment looks at your body, mind, and environment to give you a clear picture of what you need right now.",
    questions: [
      {
        id: 1, part: "Body", prompt: "Sleep & Nighttime Patterns",
        options: [
          { key: "A", text: "I sleep like a log most nights and wake up feeling rested." },
          { key: "B", text: "I'm waking up around 3–4am out of nowhere, sometimes feeling warm, and it's hard to drop back off." },
          { key: "C", text: "I dread going to sleep. I wake up drenched in night sweats and feel exhausted before my feet hit the floor." }
        ]
      },
      {
        id: 2, part: "Body", prompt: "Cycle Predictability & Flow",
        options: [
          { key: "A", text: "My period arrives like clockwork every 28–30 days, just like it always has." },
          { key: "B", text: "My cycle is playing tricks on me — 21 days or 45 days, sometimes heavy, sometimes barely there." },
          { key: "C", text: "Completely erratic or missing for months, often with intense pelvic heaviness or bloating." }
        ]
      },
      {
        id: 3, part: "Body", prompt: "Energy & Metabolism",
        options: [
          { key: "A", text: "My energy is steady, and my body responds normally to my usual diet and exercise." },
          { key: "B", text: "A mid-afternoon crash I never used to have, and a soft cushion around my midsection that resists my usual habits." },
          { key: "C", text: "Running on empty. My joints feel stiff in the morning and my body feels entirely unfamiliar." }
        ]
      },
      {
        id: 4, part: "Mind", prompt: "Mood Resilience",
        options: [
          { key: "A", text: "I feel generally grounded and able to roll with life's daily stresses." },
          { key: "B", text: "My fuse is shorter than it used to be — snapping at minor irritations or crying at commercials." },
          { key: "C", text: "An emotional roller coaster — high anxiety out of nowhere, and a feeling of being completely overwhelmed." }
        ]
      },
      {
        id: 5, part: "Mind", prompt: "Mental Clarity & Focus",
        options: [
          { key: "A", text: "My memory is sharp; I can multitask and focus without a problem." },
          { key: "B", text: "I walk into rooms and forget why I'm there. I'm misplacing my keys more than I'd care to admit." },
          { key: "C", text: "The 'brain fog' feels heavy — I feel disconnected and unable to concentrate at work." }
        ]
      },
      {
        id: 6, part: "Environment", prompt: "Your Home Sanctuary",
        options: [
          { key: "A", text: "My home is a restful oasis — cool, quiet, and optimized for relaxation." },
          { key: "B", text: "A bit chaotic — synthetics in my bedding or harsh lighting might be making my restlessness worse." },
          { key: "C", text: "My environment feels like an adversary — too hot, and I don't know how to fix it." }
        ]
      },
      {
        id: 7, part: "Environment", prompt: "Support Network & Space",
        options: [
          { key: "A", text: "I have a great doctor, supportive family, and feel totally comfortable talking about what my body is doing." },
          { key: "B", text: "I have people to talk to, but I'm guessing my way through supplements, nutrition, and what actually works." },
          { key: "C", text: "I feel isolated — my doctor dismissed my symptoms as 'just aging,' and I'm craving real support." }
        ]
      }
    ],
    results: {
      A: {
        title: "The Baseline Navigator",
        summary: "You're likely in the very early, subtle stages of perimenopause, or your hormones are currently well-balanced. Now is the perfect time to build your longevity foundation before major shifts begin.",
        picks: [
          { name: "Oura Ring 4", note: "Start tracking sleep and recovery trends now, before symptoms shift." },
          { name: "Pure Bamboo King Sheet Set", note: "Temperature-regulating sleep, built in as a habit early." }
        ]
      },
      B: {
        title: "The Shift Awakeness",
        summary: "Your hormones are actively fluctuating. Your body is sending you signals — it's time to adapt your routines and support your nervous system.",
        picks: [
          { name: "Nodpod Gentle Pressure Sleep Mask", note: "Calming pressure to help soften that 3am wake-up." },
          { name: "Pure Bamboo King Sheet Set", note: "Naturally regulates temperature dips and spikes overnight." },
          { name: "Sun Light Therapy Lamp 10000 Lux", note: "Supports mood and energy through the fluctuation." }
        ]
      },
      C: {
        title: "The Deep Realignment",
        summary: "You're in the thick of the hormonal crucible. Your system is asking for relief, deep rest, and targeted support to help you regain your footing.",
        picks: [
          { name: "Red Light Therapy Device", note: "Clinical-grade support for inflammation and recovery, at home." },
          { name: "JNH Lifestyles FAR Infrared Sauna", note: "Low-EMF heat therapy for deep, radical rest." },
          { name: "Seed DS-01 Daily Synbiotic", note: "Gut health support as part of an anti-inflammatory foundation." }
        ]
      }
    }
  },

  wisdom: {
    key: "wisdom",
    stageLabel: "The Wisdom Years",
    stageName: "Post-Menopause & Beyond",
    cardDesc: "Bone density, cellular aging, vitality.",
    intro: "A note from the ELATEVE team: this stage isn't a plateau — it's a launchpad. This check-in looks at your body, mind, and environment to help you optimize vitality, not just maintain it.",
    questions: [
      {
        id: 1, part: "Body", prompt: "Bone & Strength",
        options: [
          { key: "A", text: "I strength train regularly and feel physically capable." },
          { key: "B", text: "I move often but haven't prioritized strength training." },
          { key: "C", text: "I've noticed real strength or balance changes I haven't addressed." }
        ]
      },
      {
        id: 2, part: "Body", prompt: "Energy & Vitality",
        options: [
          { key: "A", text: "My energy feels stable and I feel vibrant most days." },
          { key: "B", text: "Good days and flat days, without an obvious pattern." },
          { key: "C", text: "Consistently low energy that I've started to accept as 'just how it is now.'" }
        ]
      },
      {
        id: 3, part: "Body", prompt: "Sleep & Recovery",
        options: [
          { key: "A", text: "I sleep well and recover quickly from activity." },
          { key: "B", text: "Sleep is decent but recovery feels slower than it used to." },
          { key: "C", text: "Sleep is disrupted and I feel like I'm not fully recovering, ever." }
        ]
      },
      {
        id: 4, part: "Mind", prompt: "Cognitive Clarity",
        options: [
          { key: "A", text: "Sharp, focused, and mentally engaged." },
          { key: "B", text: "Occasional fog or word-finding trouble, nothing alarming." },
          { key: "C", text: "Noticeably foggy — it's affecting my confidence day to day." }
        ]
      },
      {
        id: 5, part: "Mind", prompt: "Sense of Purpose & Mood",
        options: [
          { key: "A", text: "I feel like I'm in a launchpad chapter, curious and engaged." },
          { key: "B", text: "I have good moments, but I'm searching for more direction." },
          { key: "C", text: "I feel flat or unmotivated more often than I'd like to admit." }
        ]
      },
      {
        id: 6, part: "Environment", prompt: "Home Environment",
        options: [
          { key: "A", text: "My home actively supports movement, calm, and clean air." },
          { key: "B", text: "Some easy upgrades (air quality, sleep setup) would help." },
          { key: "C", text: "My home isn't set up to support how I want to feel right now." }
        ]
      },
      {
        id: 7, part: "Environment", prompt: "Support & Community",
        options: [
          { key: "A", text: "I have a strong community and good medical support." },
          { key: "B", text: "Some support, but I'm often figuring things out solo." },
          { key: "C", text: "I feel fairly isolated in navigating this stage." }
        ]
      }
    ],
    results: {
      A: {
        title: "The Vibrant Foundation",
        summary: "You're already building the launchpad. Focus now on precision — refining what's working rather than starting over.",
        picks: [
          { name: "Oura Ring 4", note: "Precision tracking to keep optimizing what's already working." },
          { name: "Oak Wood Pilates Reformer Machine", note: "Studio-grade strength training, at home." }
        ]
      },
      B: {
        title: "The Recalibration Phase",
        summary: "Good instincts, inconsistent follow-through. A few structural changes will compound quickly here.",
        picks: [
          { name: "BLUEAIR Blue Pure 311i Max Air Purifier", note: "An easy, high-impact home upgrade for daily vitality." },
          { name: "Seed DS-01 Daily Synbiotic", note: "Gut health as a foundation for energy and mood." },
          { name: "Ottolenghi Simple: A Cookbook", note: "Mediterranean-style eating — the most researched longevity diet there is." }
        ]
      },
      C: {
        title: "The Deep Rebuild",
        summary: "It's time to treat this as a real investment, not an afterthought. Start with recovery, then build back up.",
        picks: [
          { name: "JNH Lifestyles FAR Infrared Sauna", note: "Low-EMF heat therapy to support recovery and circulation." },
          { name: "Red Light Therapy Device", note: "Supports cellular repair and inflammation at home." },
          { name: "Sun Light Therapy Lamp 10000 Lux", note: "Full-spectrum light to help rebuild energy and mood." }
        ]
      }
    }
  }

};

module.exports = quizzes;
