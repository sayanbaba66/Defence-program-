
import React, { useState, useRef, useEffect } from 'react';
import { connectLiveSession } from '../services/geminiService';
import { Language } from '../types';

const LiveInterview: React.FC<{language: Language, t: any}> = ({ language, t }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [volume, setVolume] = useState(0);
  const disconnectRef = useRef<(() => void) | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
        if (disconnectRef.current) {
            disconnectRef.current();
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
    }
  }, []);

  const toggleConnection = async () => {
    if (isConnected) {
      if (disconnectRef.current) disconnectRef.current();
      setIsConnected(false);
      setVolume(0);
    } else {
      try {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
             const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
             audioContextRef.current = new AudioContext({sampleRate: 24000});
        }
        
        // Reset time tracking on new connection
        nextStartTimeRef.current = audioContextRef.current.currentTime;

        const session = await connectLiveSession(
            language,
            (audioBuffer) => {
                // Play audio
                if (audioContextRef.current && audioContextRef.current.state === 'running') {
                    const ctx = audioContextRef.current;
                    const source = ctx.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(ctx.destination);
                    
                    const currentTime = ctx.currentTime;
                    // Schedule next start
                    const startTime = Math.max(currentTime, nextStartTimeRef.current);
                    source.start(startTime);
                    nextStartTimeRef.current = startTime + audioBuffer.duration;
                    
                    // Simple visualizer simulation
                    setVolume(Math.random() * 100);
                    source.onended = () => setVolume(0);
                }
            },
            () => {
                setIsConnected(false);
                setVolume(0);
            }
        );
        disconnectRef.current = session.disconnect;
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect live", error);
        alert(t.micAccess);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="z-10 text-center space-y-8">
        <div className="relative">
             <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${isConnected ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]' : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-transparent'}`}>
                <i className={`fa-solid fa-microphone text-5xl ${isConnected ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}></i>
             </div>
             {isConnected && (
                 <div className="absolute -inset-2 rounded-full border-2 border-green-500 opacity-50 animate-ping"></div>
             )}
        </div>

        <div>
            <h2 className="text-3xl font-bold mb-2">{t.interviewMode}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {isConnected ? t.interviewActive : t.interviewDesc}
            </p>
        </div>

        <button
            onClick={toggleConnection}
            className={`px-8 py-4 rounded-full font-bold text-white text-lg tracking-wider transition-all transform hover:scale-105 shadow-lg ${
                isConnected 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
        >
            {isConnected ? t.endInterview : t.startInterview}
        </button>
      </div>

      {/* Visualizer Lines */}
      {isConnected && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1 h-12 items-end">
              {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-green-500 rounded-t-sm transition-all duration-75"
                    style={{ height: `${Math.random() * (volume > 0 ? 100 : 10)}%` }}
                  ></div>
              ))}
          </div>
      )}
    </div>
  );
};

export default LiveInterview;
