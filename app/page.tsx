"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UrlInput from "@/components/UrlInput";
import ProcessingView from "@/components/ProcessingView";
import ShortsCarousel from "@/components/ShortsCarousel";
import { Short } from "@/types";

export default function Home() {
  const [step, setStep] = useState<"input" | "processing" | "results">("input");
  const [videoUrl, setVideoUrl] = useState("");
  const [generatedShorts, setGeneratedShorts] = useState<Short[]>([]);
  const [options, setOptions] = useState({
    duration: 30,
    transition: "fade",
  });

  const handleGenerate = async (url: string, opts: { duration: number; transition: string }) => {
    setVideoUrl(url);
    setOptions(opts);
    setStep("processing");

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Generate mock shorts
    const shorts: Short[] = [
      {
        id: "1",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop",
        duration: opts.duration,
        startTime: "0:15",
        endTime: `0:${15 + opts.duration}`,
        title: "Epic Moment #1",
        score: 95,
      },
      {
        id: "2",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=700&fit=crop",
        duration: opts.duration,
        startTime: "1:23",
        endTime: `1:${23 + opts.duration}`,
        title: "Highlight Clip #2",
        score: 88,
      },
      {
        id: "3",
        thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=700&fit=crop",
        duration: opts.duration,
        startTime: "2:45",
        endTime: `2:${45 + opts.duration}`,
        title: "Best Scene #3",
        score: 82,
      },
      {
        id: "4",
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=700&fit=crop",
        duration: opts.duration,
        startTime: "3:10",
        endTime: `3:${10 + opts.duration}`,
        title: "Action Peak #4",
        score: 79,
      },
    ];

    setGeneratedShorts(shorts);
    setStep("results");
  };

  const handleReset = () => {
    setStep("input");
    setVideoUrl("");
    setGeneratedShorts([]);
  };

  return (
    <main className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent"
          >
            YouTube Shorts Generator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Transform long videos into engaging short-form content
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <UrlInput onGenerate={handleGenerate} />
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProcessingView />
            </motion.div>
          )}

          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShortsCarousel shorts={generatedShorts} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
