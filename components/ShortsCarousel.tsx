"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Short } from "@/types";
import ShortCard from "./ShortCard";

interface ShortsCarouselProps {
  shorts: Short[];
  onReset: () => void;
}

export default function ShortsCarousel({ shorts, onReset }: ShortsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : shorts.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < shorts.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-3">Your Generated Shorts</h2>
        <p className="text-gray-400">
          {shorts.length} clips ready to share • Swipe or use arrow keys to navigate
        </p>
      </motion.div>

      <div
        className="relative mb-8"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Shorts carousel"
        aria-roledescription="carousel"
      >
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="p-3 bg-dark-card border border-dark-border rounded-full hover:bg-accent hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous short"
            tabIndex={0}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          <div className="flex-1 max-w-4xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ShortCard short={shorts[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            className="p-3 bg-dark-card border border-dark-border rounded-full hover:bg-accent hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next short"
            tabIndex={0}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div
          className="flex justify-center gap-2 mt-6"
          role="tablist"
          aria-label="Short selection"
        >
          {shorts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-accent" : "w-2 bg-dark-border hover:bg-accent/50"
              }`}
              aria-label={`Go to short ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
      >
        {shorts.map((short, index) => (
          <motion.button
            key={short.id}
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-[9/16] rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? "border-accent shadow-lg shadow-accent/30"
                : "border-dark-border hover:border-accent/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${short.title}`}
          >
            <img
              src={short.thumbnail}
              alt={short.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-medium text-white truncate">{short.title}</p>
              <p className="text-xs text-gray-300">{short.duration}s</p>
            </div>
            {index === currentIndex && (
              <div className="absolute inset-0 border-2 border-accent rounded-lg" />
            )}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border rounded-lg hover:border-accent hover:bg-dark-border transition-all"
          aria-label="Generate new shorts"
        >
          <RotateCcw className="w-5 h-5" aria-hidden="true" />
          Generate New Shorts
        </button>
      </motion.div>
    </div>
  );
}
