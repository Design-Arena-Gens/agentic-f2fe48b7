"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Download,
  Share2,
  Scissors,
  Type,
  Volume2,
  Sparkles,
} from "lucide-react";
import { Short } from "@/types";
import ShareButtons from "./ShareButtons";
import EditPanel from "./EditPanel";

interface ShortCardProps {
  short: Short;
}

export default function ShortCard({ short }: ShortCardProps) {
  const [showShare, setShowShare] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="bg-dark-card rounded-2xl overflow-hidden border border-dark-border shadow-2xl">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Video Preview */}
        <div className="relative aspect-[9/16] md:aspect-auto bg-black">
          <img
            src={short.thumbnail}
            alt={short.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/50"
            aria-label="Preview short"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="white" aria-hidden="true" />
          </motion.button>

          {/* AI Score Badge */}
          <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="font-semibold text-sm">AI Score: {short.score}%</span>
          </div>

          {/* Time Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2">{short.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>
                {short.startTime} - {short.endTime}
              </span>
              <span>•</span>
              <span>{short.duration}s</span>
            </div>
          </div>
        </div>

        {/* Controls & Info */}
        <div className="p-6 flex flex-col">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg hover:border-accent transition-all"
                aria-label="Edit short"
                aria-expanded={showEdit}
              >
                <Scissors className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Trim</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg hover:border-accent transition-all"
                aria-label="Add text overlay"
              >
                <Type className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Text</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg hover:border-accent transition-all"
                aria-label="Adjust audio"
              >
                <Volume2 className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Audio</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg hover:border-accent transition-all"
                aria-label="Download short"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Download</span>
              </button>
            </div>
          </div>

          {showEdit && <EditPanel short={short} />}

          <div className="mt-auto pt-6 border-t border-dark-border">
            <button
              onClick={() => setShowShare(!showShare)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-pink-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50"
              aria-label="Share short"
              aria-expanded={showShare}
            >
              <Share2 className="w-5 h-5" aria-hidden="true" />
              Share to Social Media
            </button>

            {showShare && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 overflow-hidden"
              >
                <ShareButtons />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
