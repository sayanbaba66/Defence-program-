
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Language } from "../types";

// NOTE: API Key is managed via process.env.API_KEY as per instructions.

export const ensureApiKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            // @ts-ignore
            await window.aistudio.openSelectKey();
        }
    }
};

export const manageApiKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
    } else {
        console.warn("API Key management is handled by the hosting environment.");
    }
};

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLanguageName = (lang: Language) => {
    switch (lang) {
        case 'bn': return 'Bengali';
        case 'hi': return 'Hindi';
        case 'en': default: return 'English';
    }
}

// Robust text extraction helper
export const getResponseText = (response: any): string => {
    if (!response) return "";
    try {
        if (typeof response.text === 'string' && response.text.length > 0) {
            return response.text;
        }
    } catch (e) {}
    if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts) {
            return candidate.content.parts
                .filter((p: any) => p.text)
                .map((p: any) => p.text)
                .join("");
        }
    }
    return "";
};

// 1. General Search & Info (Search Grounding)
export const fetchTopicInfo = async (category: string, question: string, lang: Language) => {
  await ensureApiKey();
  const ai = getAI();
  const model = "gemini-2.5-flash";
  const languageName = getLanguageName(lang);
  
  const isDateQuery = question.toLowerCase().includes("date") || question.toLowerCase().includes("calendar") || question.toLowerCase().includes("notification");

  const prompt = `Act as the **Ultimate Defence Recruitment Authority (System V5.3)**.
  
  Topic: **${question}**
  Force/Category: **${category}**
  
  Provide a **highly detailed, expert-level, and accurate** guide.
  **Output Language**: ${languageName}

  ${isDateQuery ? `
  **SPECIAL FORMATTING FOR EXAM CALENDAR & NOTIFICATIONS**:
  - Provide a **Chronological List** of upcoming exams, application deadlines, and result dates for 2025.
  - **CRITICAL**: For each exam, you MUST include the **Official Website Link**.
  - **Link Format**: Use standard Markdown [Website Name](https://full-url).
  ` : ''}

  **Required Structure & Content Depth**:
  1.  **Executive Overview**: Brief, high-impact summary.
  2.  **Deep Dive Breakdown**:
      - **Scientific/Strategic Rationale**: Explain *WHY* this exists. (e.g., Why is 6/6 vision required? Why does this tank use this specific gun?).
      - **Step-by-Step Details**: Numbered walkthroughs for procedures.
      - **Technical Specifications**: Detailed stats for equipment.
  3.  **Real-World Scenario / Case Study**:
      - **Rich Example**: Describe a specific battle, a training drill, or a day in the life scenario. Be specific (e.g., "During the 20km route march in Belgaum...").
  4.  **Official Data & Verification**:
      - Use **2024-2025** data only.
      - Quote specific Regulations, Orders, or Pay Matrices.
  5.  **Myth Busters**: Identify and correct 2 common misconceptions.
  6.  **Pro Tips & Strategy**: Advice that gives the user an edge (e.g., "Focus on this chapter for the exam").
  7.  **Official Sources**: List relevant official websites using Markdown link format: [Name](URL).

  **Formatting Rules**:
  - Use **Bold** for emphasis.
  - **NO Markdown Tables** (Use structured lists).
  - Tone: Professional, Encouraging, Authoritative, and Highly Informative.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching topic info:", error);
    throw error;
  }
};

// 2. Maps Grounding (Locations)
export const fetchLocationInfo = async (query: string, lang: Language) => {
    await ensureApiKey();
    const ai = getAI();
    const model = "gemini-2.5-flash";
    const languageName = getLanguageName(lang);

    const prompt = `Find specific locations, centers, and details for: ${query}. 
    Use Google Maps to provide accurate location data. 
    **Output MUST be in ${languageName}.**
    **Output Format**:
    - List the locations clearly with State and City.
    - Provide address details where available.
    - Do not use markdown tables.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching location:", error);
        throw error;
    }
}

// 3. Thinking Mode (Exam Prep & Mock Tests)
export const fetchExamPrep = async (category: string, question: string, lang: Language) => {
  await ensureApiKey();
  const ai = getAI();
  const model = "gemini-3-pro-preview";
  const languageName = getLanguageName(lang);

  const qLower = question.toLowerCase();
  // Check for specific Q&A Bank keywords first
  const isOfficerQA = qLower.includes("officer exam master") || qLower.includes("officer exam questions");
  const isGDQA = qLower.includes("general duty (gd) complete") || qLower.includes("gd exam questions");

  const isMockTest = qLower.includes("mock test") || qLower.includes("questions");
  const isPYQ = qLower.includes("previous year") || qLower.includes("solved papers");
  const isMathQuiz = qLower.includes("mathematics") || qLower.includes("reasoning");
  const isGKQuiz = qLower.includes("gk") || qLower.includes("general knowledge");

  let prompt = "";

  if (isOfficerQA) {
      prompt = `Act as a **UPSC Defence Examination Expert**.
      Task: Generate a **Master Officer-Level Question Bank (Solved)** for ${category}.
      Target Exams: NDA, CDS, AFCAT, CAPF (AC).
      **Output Language**: ${languageName}

      **Content Requirements**:
      1.  **30 High-Quality Questions** mixed from:
          - General Awareness (History, Geography, Polity)
          - Defence Current Affairs 2024-25
          - English (Grammar/Vocab)
          - Reasoning & Military Aptitude
      2.  **Format**:
          - **Q[Number]**: [Question Text]
          - **Answer**: [Correct Option]
          - **Conceptual Explanation**: 
             - **Why is it correct?** Explain the concept.
             - **Why are others wrong?** Briefly explain why distractor options are incorrect.
      
      **Goal**: Provide a study resource equivalent to a chapter from a top-tier preparation book.
      **Strict Formatting**: Clean Markdown. No tables.
      `;
  } else if (isGDQA) {
      prompt = `Act as a **Senior Recruiting Officer (JCO)**.
      Task: Generate a **Complete General Duty (GD) Question Bank (Solved)** for ${category}.
      Target Exams: Army GD Agneepath, Constable GD, Tradesman.
      **Output Language**: ${languageName}

      **Content Requirements**:
      1.  **30 Important Questions** typically asked in Computer Based Tests (CBT).
      2.  **Focus Areas**:
          - General Science (Physics, Chem, Bio - 10th Level)
          - General Knowledge (India, Sports, Awards)
          - Basic Maths (Profit/Loss, Averages)
      3.  **Format**:
          - **Q[Number]**: [Question Text]
          - **Ans**: [Correct Answer]
          - **Simple Explanation**: Explain the answer simply so a 10th pass student understands.
      
      **Goal**: Help a student clear the written exam easily.
      **Strict Formatting**: Clean Markdown. No tables.
      `;
  } else if (isPYQ) {
      prompt = `Act as a **Senior Archive Specialist & Exam Analyst** for Indian Defence Exams.
      Task: Retrieve and Solve **Original Previous Year Questions** for ${category} (Years 2020-2024).
      **Output Language**: ${languageName}

      **Requirements**:
      1.  **Select 15-20 Most Repeated/Critical Questions** from past papers of this category.
      2.  **Format**:
          - **Question [Year]**: [Question Text]
          - **Correct Answer**: [Option/Value]
          - **Detailed Explanation**: Why is this correct? Explain the concept briefly.
      3.  Cover General Knowledge, English, and Technical subjects relevant to ${category}.
      4.  End with a **"Trend Analysis"**: What topics are appearing most frequently in recent years?

      **Strict Formatting**: Clean Markdown. No tables.
      `;
  } else if (isMathQuiz) {
      prompt = `Act as a **Senior Mathematics Instructor** for Defence Exams (NDA/CDS level).
      Task: Create a **Subject Mastery Quiz: Mathematics & Reasoning**.
      **Output Language**: ${languageName}

      **Requirements**:
      1.  Generate **20 Challenging Questions** covering Arithmetic, Algebra, Geometry, and Logical Reasoning.
      2.  Ensure questions match the difficulty level of ${category} recruitment exams.
      3.  **Structure**:
          - **Question**: [Problem Statement]
          - (a) [Opt 1] (b) [Opt 2] (c) [Opt 3] (d) [Opt 4]
          - **Solution**: **Step-by-step calculation** or logical deduction to reach the answer. Use shortcuts where applicable.
      
      **Strict Formatting**: Clean Markdown. Use clear spacing.
      `;
  } else if (isGKQuiz) {
       prompt = `Act as a **General Awareness Expert** for Defence Exams.
      Task: Create a **Subject Mastery Quiz: GK & Current Affairs**.
      **Output Language**: ${languageName}

      **Requirements**:
      1.  Generate **30 High-Yield Questions**.
      2.  **Topics**: Defence Technology, Indian History, Geography, Awards, Sports, and International Relations (2024-25 focus).
      3.  **Structure**:
          - **Question**: [Question Text]
          - **Answer**: [Correct Answer]
          - **Did You Know?**: A one-line extra fact related to the question.
      
      **Strict Formatting**: Clean Markdown. No tables.
      `;
  } else if (isMockTest) {
      prompt = `Act as a **Senior Examination Paper Setter** for the Indian Armed Forces (${category}).
      
      Task: Generate a **Full-Length Mock Test Paper** for 2025 recruitment.
      **Output Language**: ${languageName}

      **Structure of the Mock Test**:
      1.  **Instructions**: Brief rules (negative marking, time limit).
      2.  **Section A: General Knowledge & Current Affairs (2024-25)**
          - Generate 15 High-Quality Questions (History, Geography, Defence News).
      3.  **Section B: Mathematics / Quantitative Aptitude**
          - Generate 10 Challenging Questions (Arithmetic, Algebra, Geometry relevant to defence exams).
      4.  **Section C: English & Reasoning**
          - Generate 10 Questions (Grammar, Analogies, Blood Relations).
      
      **Answer Key & Explanations**:
      - At the very end, provide a section titled "**ANSWER KEY & DETAILED SOLUTIONS**".
      - List the correct option for every question.
      - **CRITICAL**: Provide a short reasoning/solution for Math and Logical questions.

      **Format**: 
      - Question 1. [Question Text]
        (a) Option 1  (b) Option 2  (c) Option 3  (d) Option 4
      
      - Do NOT use markdown tables. Use clear vertical spacing.
      `;
  } else {
      prompt = `Act as a **Chief Instructor at National Defence Academy (NDA)**.
      
      Subject: **${question}** (${category})
      Target Audience: Aspirants (Officers/Jawans).

      **Output Language**: ${languageName}

      **Content Requirements**:
      1.  **Deep Conceptual Clarity**: Explain the core concept with an analogy or real-world comparison.
      2.  **Detailed Syllabus Breakdown**: What specific sub-topics are critical for 2025?
      3.  **Solved Examples with Reasoning**: Provide 3 complex examples/questions. **Explain the step-by-step logic** to reach the solution.
      4.  **Strategic Mnemonics**: Share memory tricks to remember hard facts.
      5.  **Common Pitfalls**: What mistakes do students usually make in this topic?

      **Formatting**: Clean Markdown, bold key terms. No tables.
      `;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching exam prep:", error);
    throw error;
  }
};

// 4. Chat Bot
export const sendChatMessage = async (history: {role: string, parts: {text: string}[]}[], message: string, lang: Language) => {
    await ensureApiKey();
    const ai = getAI();
    const languageName = getLanguageName(lang);
    const chat = ai.chats.create({
        model: "gemini-3-pro-preview",
        history: history,
        config: {
            systemInstruction: `You are the **System V5.3 AI Commander** for the 'Defence Program' app. You are knowledgeable, patriotic, strict but helpful. Provide detailed, accurate answers about Indian Defence Services. **You MUST respond in ${languageName}.** Avoid using markdown tables. Give examples where possible.`,
            thinkingConfig: { thinkingBudget: 0 } // Speed optimization for chat
        }
    });

    const response = await chat.sendMessage({ message });
    return response;
}

// 5. Image Generation
export const generateDefenceImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
    // Ensure Key is present before any generation
    await ensureApiKey();

    // Switch models based on requirement
    const isHighRes = size === "2K" || size === "4K";
    const model = isHighRes ? "gemini-3-pro-image-preview" : "gemini-2.5-flash-image";

    // Always create a new instance to pick up the latest key from env
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const config: any = {
            imageConfig: {
                aspectRatio: "16:9"
            }
        };

        // imageSize is ONLY supported by gemini-3-pro-image-preview
        if (isHighRes) {
            config.imageConfig.imageSize = size;
        }

        const response = await ai.models.generateContent({
            model,
            contents: { parts: [{ text: prompt }] },
            config
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}

// Helper: Contextual Visuals for Topics
export const fetchTopicVisuals = async (category: string, topic: string) => {
    // This calls generateDefenceImage which handles ensureApiKey
    const prompt = `Photorealistic, high quality, educational image depicting: ${topic} related to ${category}. Accurate uniforms and Indian context. Cinematic lighting.`;
    // Use default (Flash Image) for speed and accessibility
    return generateDefenceImage(prompt, "1K");
}

// 6. Video Generation
export const generateDefenceVideo = async (prompt: string, aspectRatio: "16:9" | "9:16" = "16:9") => {
    await ensureApiKey();
    // Always fresh instance
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (videoUri) {
            const fetchUrl = `${videoUri}&key=${process.env.API_KEY}`;
            const res = await fetch(fetchUrl);
            const blob = await res.blob();
            return URL.createObjectURL(blob);
        }
        return null;
    } catch (error) {
        console.error("Veo Error:", error);
        throw error;
    }
}

// 7. TTS
export const speakText = async (text: string) => {
    await ensureApiKey();
    const ai = getAI();
    try {
        const cleanText = text.replace(/[*#_`]/g, '');
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: cleanText.substring(0, 500) }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContext();
            const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx);
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start();
        }
    } catch (e) {
        console.error("TTS Error", e);
    }
}

// 8. Live API Connection
export const connectLiveSession = async (
    lang: Language,
    onAudioData: (data: AudioBuffer) => void,
    onClose: () => void
) => {
    await ensureApiKey();
    const ai = getAI();
    const languageName = getLanguageName(lang);
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const inputAudioContext = new AudioContext({ sampleRate: 16000 });
    const outputAudioContext = new AudioContext({ sampleRate: 24000 });
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: `You are a senior officer in the Indian Defence Forces conducting a mock interview. Be professional, strict but encouraging. **Speak in ${languageName}.**`,
        },
        callbacks: {
            onopen: () => {
                const source = inputAudioContext.createMediaStreamSource(stream);
                const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                scriptProcessor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    const pcmBlob = createPcmBlob(inputData);
                    sessionPromise.then(session => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                };
                source.connect(scriptProcessor);
                scriptProcessor.connect(inputAudioContext.destination);
            },
            onmessage: async (msg: LiveServerMessage) => {
                const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (base64Audio) {
                   const buffer = await decodeAudioData(decode(base64Audio), outputAudioContext);
                   onAudioData(buffer);
                }
            },
            onclose: () => {
                 if (inputAudioContext.state !== 'closed') inputAudioContext.close();
                 if (outputAudioContext.state !== 'closed') outputAudioContext.close();
                 onClose();
            },
            onerror: (err) => {
                 if (inputAudioContext.state !== 'closed') inputAudioContext.close();
                 if (outputAudioContext.state !== 'closed') outputAudioContext.close();
                 onClose();
            }
        }
    });

    return {
        disconnect: () => {
            sessionPromise.then(s => s.close());
            stream.getTracks().forEach(t => t.stop());
            if (inputAudioContext.state !== 'closed') inputAudioContext.close();
            if (outputAudioContext.state !== 'closed') outputAudioContext.close();
        }
    };
};

// 9. AI Search Suggestions
export const fetchSearchSuggestions = async (query: string, lang: Language): Promise<string[]> => {
    if (query.length < 3) return [];

    await ensureApiKey();
    // Using flash for speed
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-2.5-flash";
    const languageName = getLanguageName(lang);

    const prompt = `Return a JSON array of 5 relevant, popular, short search queries related to Indian Defence Services, Recruitment, or Exams that start with or are related to: "${query}". 
    The suggestions MUST be in ${languageName}. 
    Return ONLY valid JSON array. No code blocks.
    Example: ["Indian Army Salary", "NDA 2025 Syllabus"]`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { 
                responseMimeType: "application/json" 
            }
        });
        const text = response.text;
        if (!text) return [];
        return JSON.parse(text);
    } catch (e) {
        console.error("Suggestion fetch failed", e);
        return [];
    }
}

function createPcmBlob(data: Float32Array) {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    const binary = encode(new Uint8Array(int16.buffer));
    return {
        data: binary,
        mimeType: 'audio/pcm;rate=16000',
    };
}

function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
}
