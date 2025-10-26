"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Short } from "@/types";

interface EditPanelProps {
  short: Short;
}

export default function EditPanel({ short }: EditPanelProps) {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(short.duration);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="mb-6 p-4 bg-dark-bg rounded-lg border border-dark-border"
    >
      <h5 className="font-semibold mb-4">Trim Video</h5>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <label htmlFor="start-time">Start: {formatTime(startTime)}</label>
            <label htmlFor="end-time">End: {formatTime(endTime)}</label>
          </div>

          {/* Timeline */}
          <div className="relative h-12 bg-dark-card rounded-lg overflow-hidden border border-dark-border">
            <div
              className="absolute h-full bg-accent/30"
              style={{
                left: `${(startTime / short.duration) * 100}%`,
                right: `${100 - (endTime / short.duration) * 100}%`,
              }}
            />

            {/* Start Handle */}
            <input
              id="start-time"
              type="range"
              min="0"
              max={short.duration}
              value={startTime}
              onChange={(e) => setStartTime(Math.min(parseInt(e.target.value), endTime - 1))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Trim start time"
              aria-valuemin={0}
              aria-valuemax={short.duration}
              aria-valuenow={startTime}
              aria-valuetext={`Start time: ${formatTime(startTime)}`}
            />

            {/* End Handle */}
            <input
              id="end-time"
              type="range"
              min="0"
              max={short.duration}
              value={endTime}
              onChange={(e) => setEndTime(Math.max(parseInt(e.target.value), startTime + 1))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Trim end time"
              aria-valuemin={0}
              aria-valuemax={short.duration}
              aria-valuenow={endTime}
              aria-valuetext={`End time: ${formatTime(endTime)}`}
            />

            {/* Visual Handles */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-accent"
              style={{ left: `${(startTime / short.duration) * 100}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-1 bg-accent"
              style={{ left: `${(endTime / short.duration) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Duration: {endTime - startTime}s</span>
          <button
            className="text-accent hover:text-pink-400 font-medium"
            onClick={() => {
              setStartTime(0);
              setEndTime(short.duration);
            }}
            aria-label="Reset trim"
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
