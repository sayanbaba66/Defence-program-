
import { DefenceCategory, Language } from "./types";

export const SEARCH_SUGGESTIONS = [
  "How to join Indian Army as an Officer?",
  "Difference between NDA and CDS exam?",
  "What is the salary of an Air Force Pilot?",
  "Tell me about the Special Forces (Para SF)",
  "How to prepare for SSB Interview?",
  "Physical requirements for Navy Sailor?",
  "History of Kargil War 1999",
  "Details about Agneepath Scheme",
  "Role of NSG Commandos",
  "Which is better: BSF or CRPF?",
  "Latest defence current affairs",
  "Rank structure of Indian Army",
  "What are the gallantry awards?",
  "Women entry schemes in Indian Army",
  "Medical rejection criteria for eyesight",
  "Best books for AFCAT preparation",
  "Pension benefits for ex-servicemen",
  "How to join RAW or IB?",
  "NCC C Certificate benefits",
  "Indian Army regiments list"
];

export const UI_TRANSLATIONS = {
  en: {
    title: "DEFENCE PROGRAM",
    subtitle: "Your ultimate guide to the Indian Armed Forces",
    explore: "Explore Forces",
    home: "Home",
    chat: "AI Chat",
    interview: "Interview",
    media: "Media Lab",
    footer: "Defence Program India",
    searchPlaceholder: "Ask AI about exams, history, strategy...",
    backToTopics: "Back to Topics",
    mainMenu: "Main Menu",
    generating: "Generating response...",
    sources: "Sources & References:",
    readAloud: "Read Aloud",
    selectType: "Select Type",
    prompt: "Prompt",
    generate: "Generate",
    resolution: "Resolution",
    aspectRatio: "Aspect Ratio",
    startInterview: "START INTERVIEW",
    endInterview: "END INTERVIEW",
    micAccess: "Microphone access required for Live Interview.",
    interviewMode: "Mock Interview Mode",
    interviewDesc: "Connect to start a real-time voice interview with an AI Defence Officer to practice for your SSB.",
    interviewActive: "Live Session Active. The AI Officer is listening. Speak clearly.",
    chatPlaceholder: "Ask about recruitment, weapons, history...",
    chatWelcome: "Jai Hind! I am your AI Defence Assistant. Ask me anything about Indian Armed Forces, exams, or history."
  },
  bn: {
    title: "প্রতিরক্ষা প্রোগ্রাম",
    subtitle: "ভারতীয় সশস্ত্র বাহিনীর জন্য আপনার চূড়ান্ত গাইড",
    explore: "বাহিনী অন্বেষণ করুন",
    home: "হোম",
    chat: "এআই চ্যাট",
    interview: "ইন্টারভিউ",
    media: "মিডিয়া ল্যাব",
    footer: "প্রতিরক্ষা প্রোগ্রাম ভারত",
    searchPlaceholder: "পরীক্ষা, ইতিহাস, কৌশল সম্পর্কে এআইকে জিজ্ঞাসা করুন...",
    backToTopics: "টপিক্সে ফিরে যান",
    mainMenu: "প্রধান মেনু",
    generating: "প্রতিক্রিয়া তৈরি করা হচ্ছে...",
    sources: "উত্স এবং তথ্যসূত্র:",
    readAloud: "জোরে পড়ুন",
    selectType: "টাইপ নির্বাচন করুন",
    prompt: "প্রম্পট",
    generate: "তৈরি করুন",
    resolution: "রেজোলিউশন",
    aspectRatio: "অ্যাসপেক্ট রেশিও",
    startInterview: "ইন্টারভিউ শুরু করুন",
    endInterview: "ইন্টারভিউ শেষ করুন",
    micAccess: "লাইভ ইন্টারভিউয়ের জন্য মাইক্রোফোন অ্যাক্সেস প্রয়োজন।",
    interviewMode: "মক ইন্টারভিউ মোড",
    interviewDesc: "আপনার এসএসবি (SSB) অনুশীলনের জন্য একজন এআই প্রতিরক্ষা অফিসারের সাথে রিয়েল-টাইম ভয়েস ইন্টারভিউ শুরু করুন।",
    interviewActive: "লাইভ সেশন সক্রিয়। এআই অফিসার শুনছেন। স্পষ্টভাবে কথা বলুন।",
    chatPlaceholder: "নিয়োগ, অস্ত্র, ইতিহাস সম্পর্কে জিজ্ঞাসা করুন...",
    chatWelcome: "জয় হিন্দ! আমি আপনার প্রতিরক্ষা সহকারী। ভারতীয় সশস্ত্র বাহিনী, পরীক্ষা বা ইতিহাস সম্পর্কে আমাকে কিছু জিজ্ঞাসা করুন।"
  },
  hi: {
    title: "रक्षा कार्यक्रम",
    subtitle: "भारतीय सशस्त्र बलों के लिए आपका अंतिम गाइड",
    explore: "बलों का अन्वेषण करें",
    home: "होम",
    chat: "एआई चैट",
    interview: "साक्षात्कार",
    media: "मीडिया लैब",
    footer: "रक्षा कार्यक्रम भारत",
    searchPlaceholder: "परीक्षा, इतिहास, रणनीति के बारे में AI से पूछें...",
    backToTopics: "विषयों पर वापस जाएं",
    mainMenu: "मुख्य मेनू",
    generating: "प्रतिक्रिया उत्पन्न हो रही है...",
    sources: "स्रोत और संदर्भ:",
    readAloud: "जोर से पढ़ें",
    selectType: "प्रकार चुनें",
    prompt: "प्रॉम्प्ट",
    generate: "उत्पन्न करें",
    resolution: "रिजॉल्यूशन",
    aspectRatio: "पहलू अनुपात",
    startInterview: "साक्षात्कार शुरू करें",
    endInterview: "साक्षात्कार समाप्त करें",
    micAccess: "लाइव साक्षात्कार के लिए माइक्रोफ़ोन एक्सेस आवश्यक है।",
    interviewMode: "मॉक साक्षात्कार मोड",
    interviewDesc: "अपने एसएसबी (SSB) अभ्यास के लिए एआई रक्षा अधिकारी के साथ रीयल-टाइम वॉयस साक्षात्कार शुरू करने के लिए कनेक्ट करें।",
    interviewActive: "लाइव सत्र सक्रिय। एआई अधिकारी सुन रहे हैं। स्पष्ट रूप से बोलें।",
    chatPlaceholder: "भर्ती, हथियार, इतिहास के बारे में पूछें...",
    chatWelcome: "जय हिंद! मैं आपका रक्षा सहायक हूं। भारतीय सशस्त्र बलों, परीक्षाओं या इतिहास के बारे में मुझसे कुछ भी पूछें।"
  }
};

const COMMON_TOPICS_TRANSLATED = {
  dates: {
    en: "Official Exam Calendar 2025: Dates, Deadlines & Official Links",
    bn: "অফিসিয়াল পরীক্ষার ক্যালেন্ডার ২০২৫: তারিখ, সময়সীমা এবং অফিসিয়াল লিঙ্ক",
    hi: "आधिकारिक परीक्षा कैलेंडर 2025: तिथियां, समय सीमा और आधिकारिक लिंक"
  },
  mock_test: {
    en: "Full Mock Test 2025: 50 Most Expected Questions with Conceptual Answers",
    bn: "পূর্ণাঙ্গ মক টেস্ট ২০২৫: ধারণাগত উত্তর সহ ৫০টি সবচেয়ে প্রত্যাশিত প্রশ্ন",
    hi: "पूर्ण मॉक टेस्ट 2025: वैचारिक उत्तरों के साथ 50 सबसे संभावित प्रश्न"
  },
  pyq: {
    en: "Previous Year Papers (2020-2024): Analysis, Solved Keys & Trends",
    bn: "বিগত বছরের প্রশ্নপত্র (২০২০-২০২৪): বিশ্লেষণ, সমাধান এবং প্রবণতা",
    hi: "पिछले वर्ष के प्रश्न पत्र (2020-2024): विश्लेषण, हल और रुझान"
  },
  quiz_math: {
    en: "Subject Quiz: Mathematics & Reasoning (Solved with Shortcuts)",
    bn: "বিষয় কুইজ: গণিত এবং যুক্তি (শর্টকাট সহ সমাধান)",
    hi: "विषय प्रश्नोत्तरी: गणित और तर्क (शॉर्टकट के साथ हल)"
  },
  quiz_gk: {
    en: "Subject Quiz: GK, Science & Defence Tech (Detailed Explanations)",
    bn: "বিষয় কুইজ: জিকে, বিজ্ঞান এবং প্রতিরক্ষা প্রযুক্তি (বিস্তারিত ব্যাখ্যা)",
    hi: "विषय प्रश्नोत्तरी: जीके, विज्ञान और रक्षा तकनीक (विस्तृत विवरण)"
  },
  join: {
    en: "Master Joining Guide 2025: Eligibility, Entry Schemes, Strategy & Procedure",
    bn: "যোগদানের মাস্টার গাইড ২০২৫: যোগ্যতা, প্রবেশ স্কিম এবং কৌশল",
    hi: "शामिल होने के लिए मास्टर गाइड 2025: पात्रता, प्रवेश योजनाएं और रणनीति"
  },
  entry_fee: {
    en: "Recruitment Notification 2025: Vacancy Breakdown, Application Fees & Deadlines",
    bn: "নিয়োগ বিজ্ঞপ্তি ২০২৫: শূন্যপদ, আবেদন ফি এবং সময়সীমা",
    hi: "भर्ती अधिसूचना 2025: रिक्ति विवरण, आवेदन शुल्क और समय सीमा"
  },
  ranks: {
    en: "Rank Hierarchy & Insignia: Pay Levels, Equivalence & Promotion Structure",
    bn: "পদমর্যাদা এবং চিহ্ন: বেতন স্তর, সমতা এবং পদোন্নতি কাঠামো",
    hi: "रैंक पदानुक्रम और प्रतीक चिन्ह: वेतन स्तर, समकक्षता और पदोन्नति संरचना"
  },
  duties: {
    en: "Operational Roles & Life: Field Duties, Counter-Insurgency & Peace Postings",
    bn: "অপারেশনাল ভূমিকা এবং জীবন: ফিল্ড ডিউটি, কাউন্টার-ইনসারজেন্সি এবং পিস পোস্টিং",
    hi: "परिचालन भूमिकाएँ और जीवन: फील्ड ड्यूटी, काउंटर-इन्सर्जेंसी और शांति पोस्टिंग"
  },
  exam_officer: {
    en: "Officer Exams (NDA/CDS/AFCAT): Advanced Syllabus, Blueprints & Strategy",
    bn: "অফিসার পরীক্ষা (NDA/CDS/AFCAT): উন্নত সিলেবাস এবং কৌশল",
    hi: "अधिकारी परीक्षा (NDA/CDS/AFCAT): उन्नत पाठ्यक्रम और रणनीति"
  },
  qa_officer: {
    en: "Officer Exam Master Q&A Bank: 50+ High-Level Questions with Concepts",
    bn: "অফিসার পরীক্ষার মাস্টার প্রশ্নোত্তর ব্যাঙ্ক: ধারণা সহ ৫০+ উচ্চ-স্তরের প্রশ্ন",
    hi: "अधिकारी परीक्षा मास्टर प्रश्नोत्तर बैंक: अवधारणाओं के साथ 50+ उच्च-स्तरीय प्रश्न"
  },
  qa_gd: {
    en: "General Duty (GD) Complete Q&A Bank: Solved Papers & Concept Builders",
    bn: "জেনারেল ডিউটি (GD) সম্পূর্ণ প্রশ্নোত্তর ব্যাঙ্ক: সমাধানকৃত প্রশ্নপত্র",
    hi: "जनरल ड्यूटी (GD) पूर्ण प्रश्नोत्तर बैंक: हल किए गए प्रश्न पत्र"
  },
  salary: {
    en: "Salary & Perks 2025: 7th CPC Matrix, MSP, Risk Allowances & Benefits",
    bn: "বেতন এবং সুবিধা ২০২৫: সপ্তম বেতন কমিশন, MSP এবং ঝুঁকি ভাতা",
    hi: "वेतन और सुविधाएं 2025: 7वां CPC मैट्रिक्स, MSP और जोखिम भत्ते"
  },
  promotion: {
    en: "Career Progression Map: Departmental Exams, Timelines & Service Boards",
    bn: "ক্যারিয়ার অগ্রগতির মানচিত্র: বিভাগীয় পরীক্ষা এবং সময়রেখা",
    hi: "कैरियर प्रगति मानचित्र: विभागीय परीक्षाएं और समय सीमा"
  },
  selection_officer: {
    en: "SSB Interview Deep Dive: 5-Day Process, Psych Tests & Conference Tactics",
    bn: "SSB ইন্টারভিউ বিশদ: ৫ দিনের প্রক্রিয়া, মনস্তাত্ত্বিক পরীক্ষা এবং কৌশল",
    hi: "SSB साक्षात्कार गहन अध्ययन: 5-दिवसीय प्रक्रिया, मनोवैज्ञानिक परीक्षण और रणनीति"
  },
  selection_gd: {
    en: "Rally Recruitment Decoder: PFT Standards, Medicals & Merit List Rules",
    bn: "র‍্যালি নিয়োগ ডিকোডার: PFT মানদণ্ড এবং মেডিকেল নিয়ম",
    hi: "रैली भर्ती डिकोडर: PFT मानक, चिकित्सा और मेरिट सूची नियम"
  },
  medical: {
    en: "Medical Eligibility 2025: Vision Charts, BMI Limits, Surgery & Rejections",
    bn: "মেডিকেল যোগ্যতা ২০২৫: দৃষ্টিশক্তি, বিএমআই সীমা এবং সার্জারি নিয়ম",
    hi: "चिकित्सा पात्रता 2025: दृष्टि चार्ट, बीएमआई सीमा, सर्जरी और अस्वीकृतियां"
  },
  docs: {
    en: "Document Verification: Mandatory Formats, Certificates & Checklists",
    bn: "নথি যাচাইকরণ: বাধ্যতামূলক ফর্ম্যাট, সার্টিফিকেট এবং চেকলিস্ট",
    hi: "दस्तावेज़ सत्यापन: अनिवार्य प्रारूप, प्रमाण पत्र और चेकलिस्ट"
  },
  physical: {
    en: "Physical Efficiency Test (PET): 1.6km Run Timing, Beam & Standards",
    bn: "শারীরিক দক্ষতা পরীক্ষা (PET): ১.৬ কিমি দৌড়, বিম এবং মানদণ্ড",
    hi: "शारीरिक दक्षता परीक्षा (PET): 1.6 किमी दौड़ समय, बीम और मानक"
  },
  measurements: {
    en: "Physical Standards Chart: Height-Weight-Chest Ratio (Region Wise)",
    bn: "শারীরিক মানদণ্ড চার্ট: উচ্চতা-ওজন-বুকের অনুপাত (অঞ্চল ভিত্তিক)",
    hi: "शारीरिक मानक चार्ट: ऊंचाई-वजन-छाती अनुपात (क्षेत्र वार)"
  },
  centers: {
    en: "Training Academies: Infrastructure, History & Location Details",
    bn: "প্রশিক্ষণ একাডেমি: অবকাঠামো, ইতিহাস এবং অবস্থানের বিবরণ",
    hi: "प्रशिक्षण अकादमियां: बुनियादी ढांचा, इतिहास और स्थान विवरण"
  },
  facilities: {
    en: "Service Privileges: CSD, ECHS, Housing, Travel & Child Education",
    bn: "পরিষেবা সুবিধা: CSD, ECHS, আবাসন, ভ্রমণ এবং শিশু শিক্ষা",
    hi: "सेवा विशेषाधिकार: सीएसडी, ईसीएचएस, आवास, यात्रा और बाल शिक्षा"
  },
  training: {
    en: "Academy Training Regime: Daily Schedule, Drills, Weapons & Passing Out",
    bn: "একাডেমি প্রশিক্ষণ ব্যবস্থা: দৈনিক সময়সূচী, ড্রিল এবং অস্ত্র",
    hi: "अकादमी प्रशिक्षण व्यवस्था: दैनिक कार्यक्रम, अभ्यास और हथियार"
  },
  syllabus: {
    en: "Advanced Syllabus 2025: Chapter-wise Weightage, Critical Topics & Books",
    bn: "উন্নত সিলেবাস ২০২৫: অধ্যায়-ভিত্তিক গুরুত্ব, গুরুত্বপূর্ণ বিষয় এবং বই",
    hi: "उन्नत पाठ्यक्रम 2025: अध्याय-वार वेटेज, महत्वपूर्ण विषय और किताबें"
  },
  holidays: {
    en: "Leave Rules & Quotas: Annual, Casual, Sick & Study Leave Policies",
    bn: "ছুটির নিয়ম এবং কোটা: বার্ষিক, ক্যাজুয়াল এবং অধ্যয়নের ছুটি",
    hi: "अवकाश नियम और कोटा: वार्षिक, आकस्मिक, बीमारी और अध्ययन अवकाश नीतियां"
  },
  equipment: {
    en: "Arsenal & Technology: Technical Specs of Weapons, Vehicles & Aircraft",
    bn: "অস্ত্রাগার এবং প্রযুক্তি: অস্ত্র, যানবাহন এবং বিমানের প্রযুক্তিগত বিবরণ",
    hi: "शस्त्रागार और प्रौद्योगिकी: हथियार, वाहन और विमान की तकनीकी विशिष्टताओं"
  },
  battalions: {
    en: "Force Structure: Command HQs, Corps, Regiments & Special Forces",
    bn: "বাহিনীর কাঠামো: কমান্ড সদর দপ্তর, কর্পস, রেজিমেন্ট এবং বিশেষ বাহিনী",
    hi: "बल संरचना: कमान मुख्यालय, कोर, रेजिमेंट और विशेष बल"
  },
  wars: {
    en: "War History & Tactics: Major Operations, Strategy & Gallantry Stories",
    bn: "যুদ্ধের ইতিহাস এবং কৌশল: প্রধান অপারেশন, কৌশল এবং বীরত্বের গল্প",
    hi: "युद्ध इतिहास और रणनीति: प्रमुख अभियान, रणनीति और वीरता की कहानियां"
  },
  power: {
    en: "Legal Powers & Jurisdiction: AFSPA, Arrest Rights & Immunity Rules",
    bn: "আইনি ক্ষমতা এবং এখতিয়ার: AFSPA, গ্রেপ্তারের অধিকার এবং অনাক্রম্যতা",
    hi: "कानूनी शक्तियां और अधिकार क्षेत्र: AFSPA, गिरफ्तारी अधिकार और प्रतिरक्षा नियम"
  },
  vacancies: {
    en: "Vacancy Forecast 2025: Trade-wise, Zone-wise & Category-wise Data",
    bn: "শূন্যপদ পূর্বাভাস ২০২৫: ট্রেড, জোন এবং ক্যাটাগরি ভিত্তিক তথ্য",
    hi: "रिक्ति पूर्वानुमान 2025: ट्रेड, जोन और श्रेणी वार डेटा"
  },
  women: {
    en: "Women in Defence: Entry Schemes, Permanent Commission & Combat Roles",
    bn: "প্রতিরক্ষায় মহিলারা: প্রবেশ স্কিম, স্থায়ী কমিশন এবং কমব্যাট ভূমিকা",
    hi: "रक्षा में महिलाएं: प्रवेश योजनाएं, स्थायी आयोग और लड़ाकू भूमिकाएं"
  },
  awards: {
    en: "Gallantry Awards: Param Vir Chakra, PVC Winners & Citation Details",
    bn: "বীরত্বের পুরস্কার: পরম বীর চক্র, পিভিসি বিজয়ী এবং সাইটেশন",
    hi: "वीरता पुरस्कार: परम वीर चक्र, पीवीसी विजेता और प्रशस्ति पत्र"
  },
  pension: {
    en: "Pension & Retirement: OROP Tables, Commutation & Resettlement Jobs",
    bn: "পেনশন এবং অবসর: OROP টেবিল, কমুটেশন এবং পুনর্বাসন চাকরি",
    hi: "पेंशन और सेवानिवृत्ति: OROP टेबल, कम्यूटेशन और पुनर्वास नौकरियां"
  }
};

const CATEGORY_TRANSLATIONS = {
  army: { en: "Indian Army", bn: "ভারতীয় সেনাবাহিনী", hi: "भारतीय सेना" },
  navy: { en: "Indian Navy", bn: "ভারতীয় নৌবাহিনী", hi: "भारतीय नौसेना" },
  airforce: { en: "Indian Air Force", bn: "ভারতীয় বিমান বাহিনী", hi: "भारतीय वायु सेना" },
  police: { en: "Indian Police Force", bn: "ভারতীয় পুলিশ বাহিনী", hi: "भारतीय पुलिस बल" },
  state_police: { en: "State Police", bn: "রাজ্য পুলিশ", hi: "राज्य पुलिस" },
  bsf: { en: "BSF", bn: "বিএসএফ", hi: "बीएसएफ" },
  cisf: { en: "CISF", bn: "সিআইএসএফ", hi: "सीआईएसएफ" },
  itbp: { en: "ITBP", bn: "আইটিবিপি", hi: "आईटीबीपी" },
  ssb: { en: "SSB", bn: "এসএসবি", hi: "एसएसबी" },
  crpf: { en: "CRPF", bn: "সিআরপিএফ", hi: "सीआरपीएफ" },
  ssf: { en: "SSF", bn: "এসএসফ", hi: "एसएसएफ" },
  ncb: { en: "NCB", bn: "এনসিবি", hi: "एनसीबी" },
  ncc: { en: "NCC", bn: "এনসিসি", hi: "एनसीसी" },
  india: { en: "India Details", bn: "ভারত বিবরণ", hi: "भारत বিবরণ" },
  defence_details: { en: "Defence Details", bn: "প্রতিরক্ষা বিবরণ", hi: "रक्षा विवरण" }
};

const NCC_TOPICS_TRANSLATIONS = {
    ncc_what: { en: "What is NCC? History, Motto, Flag & Song", bn: "এনসিসি কী? ইতিহাস, নীতিবাক্য, পতাকা এবং গান", hi: "एनसीसी क्या है? इतिहास, आदर्श वाक्य, ध्वज और गीत" },
    ncc_ranks: { en: "NCC Rank Structure & Badges of Rank", bn: "এনসিসি র‍্যাঙ্ক কাঠামো এবং ব্যাজ", hi: "एनसीसी रैंक संरचना और रैंक के बैज" },
    ncc_benefits: { en: "Career Benefits: NCC Quota in Defence & State Exams", bn: "ক্যারিয়ার সুবিধা: প্রতিরক্ষা ও রাজ্য পরীক্ষায় এনসিসি কোটা", hi: "कैरियर लाभ: रक्षा और राज्य परीक्षाओं में एनसीसी कोटा" },
    ncc_certs: { en: "Certificates (A, B, C): Eligibility, Grading & Validity", bn: "সার্টিফিকেট (এ, বি, সি): যোগ্যতা, গ্রেডিং এবং বৈধতা", hi: "प्रमाण पत्र (ए, बी, सी): योग्यता, ग्रेडिंग और वैधता" },
    ncc_battalions: { en: "Organization: Directorates, Groups & Battalion Strength", bn: "সংগঠন: ডিরেক্টরেট, গ্রুপ এবং ব্যাটালিয়ন শক্তি", hi: "संगठन: निदेशालय, समूह और ব্যাটালিয়ন শক্তি" },
    ncc_why: { en: "Why Join NCC? Personality Development & Adventure Camps", bn: "কেন এনসিসিতে যোগ দেবেন? ব্যক্তিত্ব বিকাশ এবং অ্যাডভেঞ্চার ক্যাম্প", hi: "एनसीसी में क्यों शामिल हों? व्यक्तित्व विकास এবং साहसिक शिविर" },
    ncc_a: { en: "NCC 'A' Certificate Exam Guide & Syllabus", bn: "এনসিসি 'এ' সার্টিফিকেট পরীক্ষার গাইড এবং সিলেবাস", hi: "एनसीसी 'ए' प्रमाण पत्र परीक्षा गाइड और पाठ्यक्रम" },
    ncc_b: { en: "NCC 'B' Certificate Exam Guide & Syllabus", bn: "এনসিসি 'বি' সার্টিফিকেট পরীক্ষার গাইড এবং সিলেবাস", hi: "एनसीसी 'बी' प्रमाण पत्र परीक्षा गाइड और पाठ्यक्रम" },
    ncc_c: { en: "NCC 'C' Certificate Exam Guide & Syllabus", bn: "এনসিসি 'সি' সার্টিফিকেট পরীক্ষার গাইড এবং সিলেবাস", hi: "एनसीसी 'সি' प्रमाण पत्र परीक्षा गाइड और पाठ्यक्रम" },
    ncc_songs: { en: "NCC Song Lyrics (Hum Sab Bharatiya Hain) & Meaning", bn: "এনসিসি গানের কথা (হাম সব ভারতীয় হ্যায়) এবং অর্থ", hi: "एनसीसी गीत के बोल (हम सब भारतीय हैं) और अर्थ" },
    ncc_hq: { en: "NCC Headquarters: DG NCC & Organizational Chart", bn: "এনসিসি সদর দপ্তর: ডিজি এনসিসি এবং সাংগঠনিক চার্ট", hi: "एनसीसी मुख्यालय: डीजी एनसीसी और संगठनात्मक चार्ट" },
    ncc_defence: { en: "NCC Special Entry Scheme: Join Army/Navy/Air Force Directly", bn: "এনসিসি বিশেষ প্রবেশ স্কিম: সরাসরি সেনাবাহিনী/নৌবাহিনী/বিমান বাহিনীতে যোগ দিন", hi: "एनसीसी विशेष प्रवेश योजना: सीधे सेना/नौसेना/वायु सेना में शामिल हों" },
    ncc_entry: { en: "SSB Direct Entry Procedure for C Certificate Holders", bn: "সি সার্টিফিকেট হোল্ডারদের জন্য এসএসবি সরাসরি প্রবেশের পদ্ধতি", hi: "সি प्रमाण पत्र धारकों के लिए एसएसबी सीधा प्रवेश प्रक्रिया" },
    ncc_map: { en: "Locate NCC Units & Battalion Headquarters Near You", bn: "আপনার কাছাকাছি এনসিসি ইউনিট এবং ব্যাটালিয়ন সদর দপ্তর খুঁজুন", hi: "अपने निकट एनसीसी इकाइयाँ और बटालियन मुख्यालय खोजें" },
}

const INDIA_TOPICS_TRANSLATIONS = {
    const: { en: "Constitution of India: Preamble, Fundamental Rights & Duties", bn: "ভারতের সংবিধান: প্রস্তাবনা, মৌলিক অধিকার এবং কর্তব্য", hi: "भारत का संविधान: प्रस्तावना, मौलिक अधिकार और कर्तव्य" },
    members: { en: "Who's Who 2025: Cabinet Ministers, Service Chiefs & Heads", bn: "কে কে ২০২৫: ক্যাবিনেট মন্ত্রী, সার্ভিস চিফ এবং প্রধান", hi: "कौन क्या है 2025: कैबिनेट मंत्री, सेना प्रमुख और प्रमुख" },
    history: { en: "Indian History: Ancient, Medieval & Modern Timeline", bn: "ভারতীয় ইতিহাস: প্রাচীন, মধ্যযুগীয় এবং আধুনিক সময়রেখা", hi: "भारतीय इतिहास: प्राचीन, मध्ययुगीन और आधुनिक समयरेखा" },
    cars: { en: "Military Mobility: Logistics Vehicles, Tanks & APCs", bn: "সামরিক গতিশীলতা: লজিস্টিক যানবাহন, ট্যাঙ্ক এবং এপিসি", hi: "सैन्य गतिशीलता: रसद वाहन, टैंक और एपीसी" }
}

const getCommonTopic = (id: string, lang: Language) => {
    // @ts-ignore
    return COMMON_TOPICS_TRANSLATED[id]?.[lang] || COMMON_TOPICS_TRANSLATED[id]?.['en'];
};

const getCategoryName = (id: string, lang: Language) => {
    // @ts-ignore
    return CATEGORY_TRANSLATIONS[id]?.[lang] || CATEGORY_TRANSLATIONS[id]?.['en'];
}

export const getDefenceData = (lang: Language): DefenceCategory[] => {
    const commonTopics = [
        { id: "dates", question: getCommonTopic('dates', lang), isExamRelated: false },
        { id: "mock_test", question: getCommonTopic('mock_test', lang), isExamRelated: true }, 
        { id: "pyq", question: getCommonTopic('pyq', lang), isExamRelated: true }, // ADDED
        { id: "quiz_math", question: getCommonTopic('quiz_math', lang), isExamRelated: true }, // ADDED
        { id: "quiz_gk", question: getCommonTopic('quiz_gk', lang), isExamRelated: true }, // ADDED
        { id: "join", question: getCommonTopic('join', lang), isExamRelated: false },
        { id: "entry_fee", question: getCommonTopic('entry_fee', lang), isExamRelated: true },
        { id: "vacancies", question: getCommonTopic('vacancies', lang), isExamRelated: false },
        { id: "ranks", question: getCommonTopic('ranks', lang), isExamRelated: false },
        { id: "duties", question: getCommonTopic('duties', lang), isExamRelated: false },
        { id: "exam_officer", question: getCommonTopic('exam_officer', lang), isExamRelated: true },
        { id: "qa_officer", question: getCommonTopic('qa_officer', lang), isExamRelated: true },
        { id: "qa_gd", question: getCommonTopic('qa_gd', lang), isExamRelated: true },
        { id: "syllabus", question: getCommonTopic('syllabus', lang), isExamRelated: true },
        { id: "salary", question: getCommonTopic('salary', lang), isExamRelated: false },
        { id: "promotion", question: getCommonTopic('promotion', lang), isExamRelated: false },
        { id: "women", question: getCommonTopic('women', lang), isExamRelated: false },
        { id: "selection_officer", question: getCommonTopic('selection_officer', lang), isExamRelated: false },
        { id: "selection_gd", question: getCommonTopic('selection_gd', lang), isExamRelated: false },
        { id: "medical", question: getCommonTopic('medical', lang), isExamRelated: false },
        { id: "physical", question: getCommonTopic('physical', lang), isExamRelated: false },
        { id: "measurements", question: getCommonTopic('measurements', lang), isExamRelated: false },
        { id: "docs", question: getCommonTopic('docs', lang), isExamRelated: false },
        { id: "centers", question: getCommonTopic('centers', lang), isLocationRelated: true },
        { id: "facilities", question: getCommonTopic('facilities', lang), isExamRelated: false },
        { id: "pension", question: getCommonTopic('pension', lang), isExamRelated: false },
        { id: "training", question: getCommonTopic('training', lang), isExamRelated: false },
        { id: "holidays", question: getCommonTopic('holidays', lang), isExamRelated: false },
        { id: "equipment", question: getCommonTopic('equipment', lang), isExamRelated: false },
        { id: "battalions", question: getCommonTopic('battalions', lang), isExamRelated: false },
        { id: "wars", question: getCommonTopic('wars', lang), isExamRelated: false },
        { id: "awards", question: getCommonTopic('awards', lang), isExamRelated: false },
    ];

    const powerTopic = { id: "power", question: getCommonTopic('power', lang), isExamRelated: false };

    // Helper to get specialized topic or fallback to English
    const getSpecTopic = (dict: any, id: string) => dict[id]?.[lang] || dict[id]?.['en'];

    return [
        {
            id: "army",
            name: getCategoryName('army', lang),
            icon: "fa-person-rifle",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Indian_Army_Logo.svg/1024px-Indian_Army_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Indian_Army_Logo.svg/1024px-Indian_Army_Logo.svg.png",
            description: "The land-based branch and the largest component of the Indian Armed Forces.",
            color: "bg-green-700",
            topics: [...commonTopics]
        },
        {
            id: "navy",
            name: getCategoryName('navy', lang),
            icon: "fa-ship",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Emblem_of_the_Indian_Navy.svg/800px-Emblem_of_the_Indian_Navy.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Emblem_of_the_Indian_Navy.svg/800px-Emblem_of_the_Indian_Navy.svg.png",
            description: "The naval branch of the Indian Armed Forces.",
            color: "bg-blue-800",
            topics: commonTopics
        },
        {
            id: "airforce",
            name: getCategoryName('airforce', lang),
            icon: "fa-plane-fighter-jet",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Indian_Air_Force_Logo.svg/1024px-Indian_Air_Force_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Indian_Air_Force_Logo.svg/1024px-Indian_Air_Force_Logo.svg.png",
            description: "The air arm of the Indian Armed Forces.",
            color: "bg-sky-600",
            topics: commonTopics
        },
        {
            id: "police",
            name: getCategoryName('police', lang),
            icon: "fa-user-shield",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png",
            specificLogoUrl: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
            description: "Law enforcement agencies of India.",
            color: "bg-amber-700",
            topics: commonTopics
        },
        {
            id: "state_police",
            name: getCategoryName('state_police', lang),
            icon: "fa-building-shield",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/921/921079.png",
            specificLogoUrl: "https://cdn-icons-png.flaticon.com/512/921/921079.png",
            description: "Police forces under state jurisdiction.",
            color: "bg-amber-600",
            topics: [...commonTopics]
        },
        {
            id: "bsf",
            name: getCategoryName('bsf', lang),
            icon: "fa-border-all",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Border_Security_Force_Logo.svg/1200px-Border_Security_Force_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Border_Security_Force_Logo.svg/1200px-Border_Security_Force_Logo.svg.png",
            description: "Border Security Force.",
            color: "bg-stone-700",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "cisf",
            name: getCategoryName('cisf', lang),
            icon: "fa-industry",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Central_Industrial_Security_Force_Logo.svg/1200px-Central_Industrial_Security_Force_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Central_Industrial_Security_Force_Logo.svg/1200px-Central_Industrial_Security_Force_Logo.svg.png",
            description: "Central Industrial Security Force.",
            color: "bg-yellow-700",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "itbp",
            name: getCategoryName('itbp', lang),
            icon: "fa-mountain",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Indo-Tibetan_Border_Police_Logo.svg/1200px-Indo-Tibetan_Border_Police_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Indo-Tibetan_Border_Police_Logo.svg/1200px-Indo-Tibetan_Border_Police_Logo.svg.png",
            description: "Indo-Tibetan Border Police.",
            color: "bg-teal-700",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "ssb",
            name: getCategoryName('ssb', lang),
            icon: "fa-shield-halved",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sashastra_Seema_Bal_Logo.svg/1200px-Sashastra_Seema_Bal_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sashastra_Seema_Bal_Logo.svg/1200px-Sashastra_Seema_Bal_Logo.svg.png",
            description: "Sashastra Seema Bal.",
            color: "bg-indigo-700",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "crpf",
            name: getCategoryName('crpf', lang),
            icon: "fa-users-line",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Central_Reserve_Police_Force_Logo.svg",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Central_Reserve_Police_Force_Logo.svg",
            description: "Central Reserve Police Force.",
            color: "bg-red-800",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "ssf",
            name: getCategoryName('ssf', lang),
            icon: "fa-user-secret",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png",
            specificLogoUrl: "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
            description: "Secretariat Security Force.",
            color: "bg-gray-800",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "ncb",
            name: getCategoryName('ncb', lang),
            icon: "fa-capsules",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Narcotics_Control_Bureau_Logo.svg/1200px-Narcotics_Control_Bureau_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Narcotics_Control_Bureau_Logo.svg/1200px-Narcotics_Control_Bureau_Logo.svg.png",
            description: "Narcotics Control Bureau.",
            color: "bg-blue-900",
            topics: [...commonTopics, powerTopic]
        },
        {
            id: "ncc",
            name: getCategoryName('ncc', lang),
            icon: "fa-person-military-pointing",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/National_Cadet_Corps_Logo.svg/1200px-National_Cadet_Corps_Logo.svg.png",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/National_Cadet_Corps_Logo.svg/1200px-National_Cadet_Corps_Logo.svg.png",
            description: "National Cadet Corps.",
            color: "bg-orange-600",
            topics: [
                { id: "ncc_what", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_what'), isExamRelated: false },
                { id: "ncc_ranks", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_ranks'), isExamRelated: false },
                { id: "ncc_benefits", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_benefits'), isExamRelated: false },
                { id: "ncc_certs", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_certs'), isExamRelated: false },
                { id: "ncc_battalions", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_battalions'), isExamRelated: false },
                { id: "ncc_why", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_why'), isExamRelated: false },
                { id: "ncc_a", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_a'), isExamRelated: true },
                { id: "ncc_b", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_b'), isExamRelated: true },
                { id: "ncc_c", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_c'), isExamRelated: true },
                { id: "ncc_songs", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_songs'), isExamRelated: false },
                { id: "ncc_hq", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_hq'), isExamRelated: false },
                { id: "ncc_defence", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_defence'), isExamRelated: false },
                { id: "ncc_entry", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_entry'), isExamRelated: false },
                { id: "ncc_map", question: getSpecTopic(NCC_TOPICS_TRANSLATIONS, 'ncc_map'), isLocationRelated: true },
            ]
        },
        {
            id: "india",
            name: getCategoryName('india', lang),
            icon: "fa-flag",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            specificLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png",
            description: "Constitution, History, and General Knowledge.",
            color: "bg-orange-500",
            topics: [
                { id: "wars", question: getCommonTopic('wars', lang), isExamRelated: false },
                { id: "const", question: getSpecTopic(INDIA_TOPICS_TRANSLATIONS, 'const'), isExamRelated: true },
                { id: "members", question: getSpecTopic(INDIA_TOPICS_TRANSLATIONS, 'members'), isExamRelated: false },
                { id: "history", question: getSpecTopic(INDIA_TOPICS_TRANSLATIONS, 'history'), isExamRelated: false },
                { id: "cars", question: getSpecTopic(INDIA_TOPICS_TRANSLATIONS, 'cars'), isExamRelated: false },
                { id: "awards", question: getCommonTopic('awards', lang), isExamRelated: false },
            ]
        },
        {
            id: "defence_details",
            name: getCategoryName('defence_details', lang),
            icon: "fa-shield-heart",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ministry_of_Defence_India.svg/1200px-Ministry_of_Defence_India.svg.png",
            specificLogoUrl: "https://cdn-icons-png.flaticon.com/512/323/323301.png",
            description: "General Defence information and history.",
            color: "bg-green-800",
            topics: [
                { id: "dates", question: getCommonTopic('dates', lang), isExamRelated: false },
                { id: "mock_test", question: getCommonTopic('mock_test', lang), isExamRelated: true }, 
                { id: "pyq", question: getCommonTopic('pyq', lang), isExamRelated: true }, // ADDED
                { id: "quiz_math", question: getCommonTopic('quiz_math', lang), isExamRelated: true }, // ADDED
                { id: "quiz_gk", question: getCommonTopic('quiz_gk', lang), isExamRelated: true }, // ADDED
                { id: "history_wars", question: getCommonTopic('wars', lang), isExamRelated: false },
                { id: "posts_deaths", question: getCommonTopic('qa_officer', lang), isExamRelated: false },
                { id: "medals", question: getCommonTopic('awards', lang), isExamRelated: false },
                { id: "pension", question: getCommonTopic('pension', lang), isExamRelated: false },
            ]
        }
    ];
};
