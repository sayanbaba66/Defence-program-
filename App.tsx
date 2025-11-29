import React, { useState, useEffect } from 'react';
import { getDefenceData, SEARCH_SUGGESTIONS, UI_TRANSLATIONS } from './constants';
import { AppMode, DefenceCategory, SubTopic, Language } from './types';
import ForceCard from './components/ForceCard';
import ChatBot from './components/ChatBot';
import MediaGenerator from './components/MediaGenerator';
import LiveInterview from './components/LiveInterview';
import SearchBar from './components/SearchBar';
import { fetchTopicInfo, fetchExamPrep, fetchLocationInfo, speakText, getResponseText, fetchTopicVisuals, generateDefenceVideo, manageApiKey, ensureApiKey } from './services/geminiService';

// Updated to Official Indian Flag
const LOGO_URL = "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"; 

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);
  const [language, setLanguage] = useState<Language>('en');
  const [activeCategory, setActiveCategory] = useState<DefenceCategory | null>(null);
  const [activeTopic, setActiveTopic] = useState<SubTopic | null>(null);
  const [topicContent, setTopicContent] = useState<string>("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);
  const [initialChatQuery, setInitialChatQuery] = useState<string>('');
  
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);
  
  // Media States
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loadingVisuals, setLoadingVisuals] = useState(false);
  const [generatingVideo, setGeneratingVideo] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const t = UI_TRANSLATIONS[language];
  const defenceData = getDefenceData(language);

  // Auto-trigger API Key Check on Load
  useEffect(() => {
    ensureApiKey().catch(console.error);
  }, []);

  // Toggle Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle PWA Install Prompt
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Update active category name when language changes
  useEffect(() => {
    if (activeCategory) {
        const updatedCategory = defenceData.find(c => c.id === activeCategory.id);
        if (updatedCategory) {
            setActiveCategory(updatedCategory);
        }
    }
  }, [language, defenceData]);

  // Scroll to top when topic changes
  useEffect(() => {
    if (activeTopic) {
        window.scrollTo(0, 0);
    }
  }, [activeTopic]);

  const handleCategoryClick = (category: DefenceCategory) => {
    setActiveCategory(category);
    setMode(AppMode.CATEGORY_DETAIL);
    setActiveTopic(null);
    setTopicContent("");
    setGroundingLinks([]);
    setActiveImage(null);
    setActiveVideo(null);
  };

  const handleSearch = (query: string) => {
    setInitialChatQuery(query);
    setMode(AppMode.CHAT);
  };

  const handleExamCalendarClick = () => {
      const detailsCategory = defenceData.find(c => c.id === 'defence_details');
      if (detailsCategory) {
          setActiveCategory(detailsCategory);
          setMode(AppMode.CATEGORY_DETAIL);
          // Auto-select the 'dates' topic which is usually first
          const dateTopic = detailsCategory.topics.find(t => t.id === 'dates');
          if (dateTopic) {
              handleTopicClick(dateTopic, detailsCategory);
          }
      }
  };

  const handleTopicClick = async (topic: SubTopic, categoryOverride?: DefenceCategory) => {
    const category = categoryOverride || activeCategory;
    if (!category) return;
    
    // If we are overriding (e.g. from Home), set active category
    if (categoryOverride) {
        setActiveCategory(categoryOverride);
    }

    setActiveTopic(topic);
    setLoadingContent(true);
    setLoadingVisuals(true);
    setTopicContent("");
    setGroundingLinks([]);
    setActiveImage(null);
    setActiveVideo(null);
    setGeneratingVideo(false);

    // 1. Trigger Visual Generation in Parallel
    fetchTopicVisuals(category.name, topic.question)
        .then(url => {
            setActiveImage(url);
            setLoadingVisuals(false);
        })
        .catch(err => {
            console.error("Visual generation failed", err);
            setLoadingVisuals(false);
        });

    // 2. Fetch Text Content
    try {
        let response;
        const fullQuery = `${category.name} - ${topic.question}`;
        
        if (topic.isLocationRelated) {
            response = await fetchLocationInfo(fullQuery, language);
        } else if (topic.isExamRelated) {
            response = await fetchExamPrep(category.name, topic.question, language);
        } else {
            response = await fetchTopicInfo(category.name, topic.question, language);
        }

        const text = getResponseText(response);
        setTopicContent(text || "No specific details found for this topic. Please try again.");
        
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
            setGroundingLinks(chunks);
        }

    } catch (error) {
        console.error(error);
        setTopicContent("Failed to fetch information. Please check your internet connection and try again.");
    } finally {
        setLoadingContent(false);
    }
  };

  const handleGenerateVideo = async () => {
      if (!activeCategory || !activeTopic) return;
      setGeneratingVideo(true);
      try {
          // Refined prompt for compelling video generation
          const prompt = `A cinematic, photorealistic educational video clip illustrating the concept of "${activeTopic.question}" in the context of the ${activeCategory.name} (Indian Defence Services). High quality, documentary style footage suitable for training.`;
          const url = await generateDefenceVideo(prompt, "16:9");
          setActiveVideo(url);
      } catch(e) {
          console.error("Video generation error:", e);
          alert("Video generation failed. Please ensure you have selected a valid paid API key.");
      } finally {
          setGeneratingVideo(false);
      }
  };

  const handleBackToTopics = () => {
    setActiveTopic(null);
  };

  const renderContent = () => {
    switch (mode) {
      case AppMode.HOME:
        return (
          <div className="pb-12 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            {/* New Hero Section V6.0 */}
            <div className="relative mx-4 mt-6 mb-12 rounded-3xl overflow-hidden shadow-2xl bg-blue-950 text-white min-h-[500px] flex items-center border border-blue-900/50">
               
               {/* Hero Background with Overlay */}
               <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1595166675003-8d264560b411?q=80&w=2000&auto=format&fit=crop" 
                    alt="Indian Defence" 
                    className="w-full h-full object-cover opacity-40 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-950 to-transparent"></div>
               </div>

               {/* Live Updates Ticker (V6.0 Feature) */}
               <div className="absolute top-0 w-full bg-orange-600/90 backdrop-blur-sm z-20 overflow-hidden">
                   <div className="flex items-center gap-2 whitespace-nowrap animate-marquee py-1.5 px-4 text-xs font-bold tracking-wider">
                       <span className="text-white flex items-center gap-1"><i className="fa-solid fa-circle text-[8px] animate-pulse"></i> LIVE UPDATES:</span>
                       <span className="text-white/90 mx-4">• NDA 2 2025 Notification Expected Soon • Indian Army Agneepath Rally Schedule Updated • AFCAT 2 Results Declared • New SSB Dates Released • Join Indian Navy: 10+2 B.Tech Entry Open</span>
                   </div>
               </div>

               {/* Hero Content */}
               <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 mt-8">
                  <div className="flex-1 text-center md:text-left pt-10 md:pt-0">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-orange-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        System V6.0: Command Centre Ready
                      </div>
                      
                      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none drop-shadow-lg">
                        <span className="text-white">{t.title.split(" ")[0]}</span> <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">{t.title.split(" ").slice(1).join(" ")}</span>
                      </h1>
                      
                      <p className="text-lg md:text-xl text-gray-300 mb-8 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                        {t.subtitle}
                      </p>

                      <div className="w-full max-w-xl mx-auto md:mx-0 transform transition-all hover:-translate-y-1 duration-300">
                        <SearchBar 
                          onSearch={handleSearch} 
                          suggestions={SEARCH_SUGGESTIONS} 
                          placeholder={t.searchPlaceholder}
                          language={language}
                        />
                      </div>
                      
                      {/* Quick Stats/Badges */}
                      <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                         <button 
                            onClick={handleExamCalendarClick}
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl text-white font-bold text-sm shadow-xl hover:from-green-500 hover:to-emerald-600 hover:shadow-2xl transition-all transform hover:scale-105 border border-green-400/30 ring-4 ring-green-900/20"
                         >
                            <i className="fa-solid fa-calendar-days text-lg"></i> 
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase opacity-80">Official Schedule</span>
                                <span className="text-base">Exam Calendar 2025</span>
                            </div>
                         </button>
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider opacity-80 py-2">
                            <i className="fa-solid fa-satellite-dish text-yellow-400"></i> Live Intel
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider opacity-80 py-2">
                            <i className="fa-solid fa-users text-blue-500"></i> SSB Interview
                         </div>
                      </div>
                  </div>

                  {/* 3D Floating Logo Element */}
                  <div className="hidden md:flex flex-1 justify-center relative">
                     <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full animate-pulse"></div>
                     <img 
                        src={LOGO_URL} 
                        alt="Emblem" 
                        className="w-80 h-80 object-contain drop-shadow-2xl relative z-10 animate-[float_6s_ease-in-out_infinite]" 
                        style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
                     />
                  </div>
               </div>
            </div>
            
            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                            <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
                            {t.explore}
                        </h3>
                    </div>
                    <span className="text-gray-400 text-sm font-medium hidden sm:block">20+ Categories</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                {defenceData.map((cat) => (
                    <ForceCard key={cat.id} category={cat} onClick={() => handleCategoryClick(cat)} logoUrl={LOGO_URL} />
                ))}
                </div>
            </div>
          </div>
        );

      case AppMode.CHAT:
        return (
            <div className="p-4 max-w-5xl mx-auto h-full">
                <ChatBot 
                    initialMessage={initialChatQuery} 
                    onClearInitialMessage={() => setInitialChatQuery('')} 
                    language={language}
                    t={t}
                />
            </div>
        );

      case AppMode.MEDIA_LAB:
        return <div className="p-4 max-w-5xl mx-auto"><MediaGenerator t={t} /></div>;

      case AppMode.LIVE_INTERVIEW:
        return <div className="p-4 max-w-5xl mx-auto h-full"><LiveInterview language={language} t={t} /></div>;

      case AppMode.CATEGORY_DETAIL:
        return activeCategory ? (
            <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-80px)]">
                {/* Sidebar List - Hidden on mobile if topic is active */}
                <div className={`w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-900 border-r dark:border-gray-800 overflow-y-auto ${activeTopic ? 'hidden md:block' : 'block'}`}>
                    <div 
                        className="relative p-6 text-white sticky top-0 z-10 shadow-md"
                        style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${activeCategory.imageUrl})`, backgroundSize: 'cover' }}
                    >
                        <button onClick={() => setMode(AppMode.HOME)} className="mb-4 text-sm hover:underline flex items-center gap-2 font-semibold text-gray-200 bg-black/20 p-2 rounded-lg backdrop-blur-sm w-fit">
                            <i className="fa-solid fa-arrow-left"></i> {t.mainMenu}
                        </button>
                        <h2 className="text-2xl font-bold flex items-center gap-3 drop-shadow-md">
                            {/* Force specific logo in sidebar header */}
                            {activeCategory.specificLogoUrl && <img src={activeCategory.specificLogoUrl} className="w-8 h-8 object-contain bg-white/10 rounded p-0.5" alt="logo"/>}
                            {activeCategory.name}
                        </h2>
                    </div>
                    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                        {activeCategory.topics.map(topic => (
                            <li 
                                key={topic.id} 
                                onClick={() => handleTopicClick(topic)}
                                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all ${activeTopic?.id === topic.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}
                            >
                                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{topic.question}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Area - Hidden on mobile if no topic is active */}
                <div className={`flex-1 bg-gray-50 dark:bg-gray-950 p-4 md:p-6 overflow-y-auto ${!activeTopic ? 'hidden md:block' : 'block'}`}>
                    {activeTopic ? (
                        <div className="h-full flex flex-col">
                            {/* Mobile Back Button */}
                            <button 
                                onClick={handleBackToTopics}
                                className="md:hidden mb-4 text-gray-600 dark:text-gray-300 font-bold flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-fit"
                            >
                                <i className="fa-solid fa-chevron-left text-orange-600"></i> {t.backToTopics}
                            </button>

                            {/* VISUALS SECTION */}
                            <div className="mb-6">
                                {loadingVisuals ? (
                                    <div className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
                                        <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center">
                                            <i className="fa-regular fa-image text-3xl mb-2"></i>
                                            <span className="text-sm">Generating visual aid...</span>
                                        </div>
                                    </div>
                                ) : activeImage ? (
                                    <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group">
                                        <img src={activeImage} alt="Visual Aid" className="w-full h-48 md:h-80 object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                            <p className="text-white text-sm font-medium"><i className="fa-solid fa-wand-magic-sparkles text-yellow-400 mr-2"></i> AI Generated Visual</p>
                                        </div>
                                    </div>
                                ) : null}

                                {/* Video Generation Option */}
                                <div className="mt-4 flex gap-4">
                                     {activeVideo ? (
                                         <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black">
                                             <video src={activeVideo} controls autoPlay className="w-full max-h-[400px]" />
                                         </div>
                                     ) : (
                                        <button 
                                            onClick={handleGenerateVideo}
                                            disabled={generatingVideo || loadingContent}
                                            className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black dark:hover:bg-gray-600 disabled:opacity-50 transition-all"
                                        >
                                            {generatingVideo ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-video"></i>}
                                            Generate Video Explanation (Veo)
                                        </button>
                                     )}
                                </div>
                            </div>

                            {loadingContent ? (
                                <div className="flex flex-col items-center justify-center flex-1 text-gray-500 dark:text-gray-400 min-h-[20vh]">
                                    <div className="relative">
                                        <div className="w-12 h-12 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
                                    </div>
                                    <p className="text-sm font-medium mt-4 animate-pulse text-blue-800 dark:text-blue-400">
                                        {t.generating}
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-xl shadow-md min-h-full md:min-h-0 relative animate-fade-in border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                                    <div className="flex justify-between items-start mb-6 border-b dark:border-gray-800 pb-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 pr-4 leading-tight">{activeTopic.question}</h3>
                                        <div className="flex gap-2 shrink-0">
                                            <button 
                                                onClick={() => speakText(topicContent)}
                                                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                                                title={t.readAloud}
                                            >
                                                <i className="fa-solid fa-volume-high text-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                                         <div dangerouslySetInnerHTML={{ __html: formatMarkdown(topicContent) }} />
                                    </div>

                                    {/* Grounding Sources */}
                                    {groundingLinks.length > 0 && (
                                        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                                            <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                <i className="fa-solid fa-link"></i> {t.sources}
                                            </h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {groundingLinks.map((chunk, idx) => {
                                                    if (chunk.web?.uri) {
                                                        return <li key={idx} className="truncate"><a href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"><i className="fa-solid fa-earth-americas text-xs"></i> {chunk.web.title || chunk.web.uri}</a></li>
                                                    }
                                                    if (chunk.maps?.uri) {
                                                        return <li key={idx} className="truncate"><a href={chunk.maps.uri} target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-2"><i className="fa-solid fa-map-pin text-xs"></i> {chunk.maps.title || "View on Maps"}</a></li>
                                                    }
                                                    return null;
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 m-4">
                            <i className="fa-solid fa-book-open text-4xl mb-4 text-gray-300 dark:text-gray-600"></i>
                            <p className="text-lg">Select a topic from the left to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        ) : null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 sticky top-0 border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 h-1"></div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
            <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => { setMode(AppMode.HOME); setActiveCategory(null); }}
            >
                <img 
                    src={LOGO_URL} 
                    alt="Logo" 
                    className="w-10 h-7 object-cover rounded shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col">
                    <h1 className="text-xl font-black tracking-tighter text-blue-900 dark:text-blue-400 leading-none">{t.title}</h1>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Developer Name - Top Corner Area */}
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Developed By</span>
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 leading-none">Sayan Sikdar</span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full text-gray-500 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Toggle Dark Mode"
                >
                    <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>

                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                    <LanguageBtn lang="en" current={language} onClick={setLanguage} label="ENG" flag="🇺🇸" />
                    <LanguageBtn lang="bn" current={language} onClick={setLanguage} label="বাংলা" flag="🇮🇳" />
                    <LanguageBtn lang="hi" current={language} onClick={setLanguage} label="हिंदी" flag="🇮🇳" />
                </div>
            </div>
        </div>
        
        {/* Navigation Bar */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-2 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 flex justify-center md:justify-start overflow-x-auto no-scrollbar">
                <nav className="flex gap-2">
                    <NavButton 
                        active={mode === AppMode.HOME} 
                        onClick={() => { setMode(AppMode.HOME); setActiveCategory(null); }} 
                        icon="fa-house" 
                        label={t.home} 
                    />
                    <NavButton 
                        active={mode === AppMode.CHAT} 
                        onClick={() => setMode(AppMode.CHAT)} 
                        icon="fa-comments" 
                        label={t.chat} 
                    />
                    <NavButton 
                        active={mode === AppMode.LIVE_INTERVIEW} 
                        onClick={() => setMode(AppMode.LIVE_INTERVIEW)} 
                        icon="fa-headset" 
                        label={t.interview} 
                    />
                    <NavButton 
                        active={mode === AppMode.MEDIA_LAB} 
                        onClick={() => setMode(AppMode.MEDIA_LAB)} 
                        icon="fa-photo-film" 
                        label={t.media} 
                    />
                </nav>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12 text-center text-sm border-t-4 border-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
            <img src={LOGO_URL} alt="Footer Logo" className="w-16 h-12 object-contain mx-auto mb-6 opacity-80" />
            <div className="mb-6 flex justify-center gap-6 text-xl opacity-75">
                <i className="fa-brands fa-facebook hover:text-orange-500 cursor-pointer transition-colors transform hover:scale-110"></i>
                <i className="fa-brands fa-twitter hover:text-blue-400 cursor-pointer transition-colors transform hover:scale-110"></i>
                <i className="fa-brands fa-instagram hover:text-pink-500 cursor-pointer transition-colors transform hover:scale-110"></i>
                <i className="fa-brands fa-youtube hover:text-red-600 cursor-pointer transition-colors transform hover:scale-110"></i>
            </div>
            <p className="font-bold text-lg mb-2 tracking-wide">{t.footer}</p>
            <p className="opacity-60 mb-6 font-light">Version 6.0 Command Centre • Jai Hind</p>
            
            <div className="flex flex-col items-center gap-3">
                <div className="inline-block px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                    <p className="text-xs opacity-50 font-mono">Developed by Sayan Sikdar</p>
                </div>

                {/* Added Admin Emails */}
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 opacity-70">Admin Contact</p>
                    <div className="flex flex-col gap-1">
                        <a href="mailto:sayanbaba66@gmail.com" className="text-xs text-gray-300 hover:text-white transition-colors">sayanbaba66@gmail.com</a>
                        <a href="mailto:sayanncc33@gmail.com" className="text-xs text-gray-300 hover:text-white transition-colors">sayanncc33@gmail.com</a>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <button 
                        onClick={manageApiKey}
                        className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest border border-gray-700 px-3 py-1 rounded"
                    >
                        <i className="fa-brands fa-google"></i> Manage API Key
                    </button>
                    
                    {deferredPrompt && (
                         <button 
                            onClick={handleInstallClick}
                            className="text-[10px] text-white hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest border border-blue-500 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded shadow-lg animate-pulse"
                        >
                            <i className="fa-solid fa-download"></i> Install App
                        </button>
                    )}

                    <a 
                        href="mailto:sayanbaba66@gmail.com,sayanncc33@gmail.com?subject=Requesting Android APK&body=Jai Hind, I would like to request the Android APK for Defence Program India."
                        className="text-[10px] text-green-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest border border-green-700/50 px-3 py-1 rounded hover:bg-green-900/30"
                    >
                        <i className="fa-brands fa-android"></i> Request Android APK
                    </a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

const LanguageBtn = ({ lang, current, onClick, label, flag }: { lang: Language, current: Language, onClick: (l: Language) => void, label: string, flag: string }) => (
    <button
        onClick={() => onClick(lang)}
        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${current === lang ? 'bg-white shadow-sm text-blue-800 ring-1 ring-black/5 dark:bg-gray-700 dark:text-blue-200 dark:ring-white/10' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
    >
        <span className="text-sm">{flag}</span> <span className="hidden sm:inline">{label}</span>
    </button>
);

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all text-sm font-medium whitespace-nowrap ${active ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}`}
    >
        <i className={`fa-solid ${icon}`}></i>
        <span>{label}</span>
    </button>
);

function formatMarkdown(text: string) {
    if (!text) return "";
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
        .replace(/^### (.*$)/gm, '<h4 class="text-lg font-bold mt-6 mb-2 text-blue-800 dark:text-blue-300 border-b dark:border-gray-700 pb-1">$1</h4>')
        .replace(/^## (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-3 text-blue-900 dark:text-blue-200">$1</h3>')
        .replace(/^# (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-orange-700 dark:text-orange-400">$1</h2>')
        // Markdown Link parsing: [Text](URL)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> $1</a>')
        // Raw URL parsing: http... or https... that is NOT preceded by ]( (to avoid double linking)
        .replace(/(?<!\]\()(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1 break-all"><i class="fa-solid fa-link text-[10px]"></i> $1</a>')
        .replace(/^[\*\-] (.*$)/gm, '<li class="ml-6 list-disc mb-2 pl-1 text-gray-700 dark:text-gray-300">$1</li>')
        .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal mb-2 pl-1 text-gray-700 dark:text-gray-300">$1</li>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
    return formatted;
}

export default App;