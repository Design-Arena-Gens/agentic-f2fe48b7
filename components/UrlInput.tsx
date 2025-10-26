"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Sparkles, Settings } from "lucide-react";

interface UrlInputProps {
  onGenerate: (url: string, options: { duration: number; transition: string }) => void;
}

export default function UrlInput({ onGenerate }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState(30);
  const [transition, setTransition] = useState("fade");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onGenerate(url, { duration, transition });
    }
  };

  const isValidUrl = (str: string) => {
    return str.includes("youtube.com") || str.includes("youtu.be");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-dark-card rounded-2xl p-8 border border-dark-border shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent/10 p-3 rounded-lg">
            <Youtube className="w-6 h-6 text-accent" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-semibold">Enter Video URL</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-300 mb-2">
              YouTube Video URL
            </label>
            <input
              id="youtube-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-4 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
              aria-label="YouTube video URL"
              aria-required="true"
              aria-describedby="url-hint"
            />
            <p id="url-hint" className="text-sm text-gray-500 mt-2">
              Paste a YouTube video link to get started
            </p>
          </div>

          <div className="border-t border-dark-border pt-6">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-accent hover:text-pink-400 transition-colors mb-4"
              aria-expanded={showAdvanced}
              aria-controls="advanced-options"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">Advanced Options</span>
            </button>

            {showAdvanced && (
              <motion.div
                id="advanced-options"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-6 overflow-hidden"
              >
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-3">
                    Short Duration: <span className="text-accent">{duration}s</span>
                  </label>
                  <div className="flex gap-3">
                    {[15, 30, 60].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setDuration(dur)}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                          duration === dur
                            ? "bg-accent text-white shadow-lg shadow-accent/30"
                            : "bg-dark-bg text-gray-400 hover:bg-dark-border"
                        }`}
                        aria-pressed={duration === dur}
                      >
                        {dur}s
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="transition" className="block text-sm font-medium text-gray-300 mb-3">
                    Transition Style
                  </label>
                  <select
                    id="transition"
                    value={transition}
                    onChange={(e) => setTransition(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-white"
                    aria-label="Transition style"
                  >
                    <option value="fade">Fade</option>
                    <option value="cross-dissolve">Cross Dissolve</option>
                    <option value="slide">Slide</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>

                <div className="bg-dark-bg rounded-lg p-4 border border-accent/20">
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium text-white mb-1">AI Highlight Detection</h3>
                      <p className="text-sm text-gray-400">
                        Our AI will automatically identify the most engaging moments in your video
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={!url.trim() || !isValidUrl(url)}
            className="w-full py-4 px-6 bg-accent hover:bg-pink-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 disabled:shadow-none flex items-center justify-center gap-2"
            aria-label="Generate shorts from YouTube video"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            Generate Shorts
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center space-y-4"
      >
        <p className="text-gray-500 text-sm">Example videos to try:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "https://youtube.com/watch?v=dQw4w9WgXcQ",
            "https://youtube.com/watch?v=jNQXAC9IVRw",
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setUrl(example)}
              className="text-xs px-3 py-2 bg-dark-card border border-dark-border rounded-lg hover:border-accent transition-colors text-gray-400 hover:text-accent"
              type="button"
            >
              Example {i + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
