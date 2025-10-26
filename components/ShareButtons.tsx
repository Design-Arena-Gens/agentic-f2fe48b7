"use client";

import { motion } from "framer-motion";

const platforms = [
  {
    name: "TikTok",
    icon: "🎵",
    color: "from-black to-[#00f2ea]",
    url: "https://www.tiktok.com/upload",
  },
  {
    name: "Instagram Reels",
    icon: "📸",
    color: "from-purple-600 to-pink-600",
    url: "https://www.instagram.com/reels/create/",
  },
  {
    name: "YouTube Shorts",
    icon: "▶️",
    color: "from-red-600 to-red-700",
    url: "https://studio.youtube.com/channel/upload",
  },
];

export default function ShareButtons() {
  const handleShare = (platform: string, url: string) => {
    // In a real app, this would handle platform-specific sharing
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="space-y-3"
      role="group"
      aria-label="Share to social media platforms"
    >
      {platforms.map((platform, index) => (
        <motion.button
          key={platform.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleShare(platform.name, platform.url)}
          className={`w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${platform.color} rounded-lg hover:shadow-lg transition-all group`}
          aria-label={`Share to ${platform.name}`}
        >
          <span className="text-2xl" aria-hidden="true">{platform.icon}</span>
          <span className="font-semibold text-white text-left flex-1">
            Share to {platform.name}
          </span>
          <svg
            className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      ))}
    </div>
  );
}
