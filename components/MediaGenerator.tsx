
import React, { useState } from 'react';
import { generateDefenceImage, generateDefenceVideo } from '../services/geminiService';

const MediaGenerator: React.FC<{t: any}> = ({ t }) => {
  const [prompt, setPrompt] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [videoRatio, setVideoRatio] = useState<'16:9' | '9:16'>('16:9');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResultUrl(null);

    try {
      let url: string | null = null;
      if (mediaType === 'image') {
        url = await generateDefenceImage(prompt, imageSize);
      } else {
        url = await generateDefenceVideo(prompt, videoRatio);
      }
      setResultUrl(url);
    } catch (e) {
      alert("Error generating media. Ensure you have a valid paid API key selected for Veo/Imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-4xl mx-auto transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <i className="fa-solid fa-photo-film text-orange-600"></i> {t.media}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.selectType}</label>
            <div className="flex gap-4">
              <button
                onClick={() => setMediaType('image')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${mediaType === 'image' ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-500 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
              >
                <i className="fa-solid fa-image mr-2"></i> Image
              </button>
              <button
                onClick={() => setMediaType('video')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${mediaType === 'video' ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-500 text-blue-700 dark:text-blue-300' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
              >
                <i className="fa-solid fa-video mr-2"></i> Video (Veo)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.prompt}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mediaType === 'image' ? "e.g., Indian Army tank in desert terrain" : "e.g., Drone view of navy ship sailing"}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg h-32 focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
            />
          </div>

          {mediaType === 'image' ? (
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.resolution}</label>
                <select 
                    value={imageSize} 
                    onChange={(e) => setImageSize(e.target.value as any)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md transition-colors"
                >
                    <option value="1K">1K (Standard)</option>
                    <option value="2K">2K (High)</option>
                    <option value="4K">4K (Ultra)</option>
                </select>
             </div>
          ) : (
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.aspectRatio}</label>
                <select 
                    value={videoRatio} 
                    onChange={(e) => setVideoRatio(e.target.value as any)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md transition-colors"
                >
                    <option value="16:9">Landscape (16:9)</option>
                    <option value="9:16">Portrait (9:16)</option>
                </select>
             </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>} {t.generate}
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden transition-colors">
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
               <i className="fa-solid fa-gear fa-spin text-3xl mb-2"></i>
               <p>{t.generating}</p>
               {mediaType === 'video' && <p className="text-xs mt-2">Veo video generation takes a moment.</p>}
            </div>
          ) : resultUrl ? (
            mediaType === 'image' ? (
                <img src={resultUrl} alt="Generated" className="w-full h-full object-contain" />
            ) : (
                <video src={resultUrl} controls className="w-full h-full object-contain" autoPlay loop />
            )
          ) : (
            <div className="text-gray-400 dark:text-gray-500 text-center">
                <i className="fa-solid fa-photo-film text-4xl mb-2"></i>
                <p>Preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaGenerator;
