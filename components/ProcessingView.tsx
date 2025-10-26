"use client";

import { motion } from "framer-motion";
import { Loader2, Sparkles, Video, Scissors, Wand2 } from "lucide-react";

export default function ProcessingView() {
  const steps = [
    { icon: Video, label: "Downloading video", delay: 0 },
    { icon: Sparkles, label: "Analyzing content", delay: 0.5 },
    { icon: Scissors, label: "Extracting highlights", delay: 1 },
    { icon: Wand2, label: "Generating shorts", delay: 1.5 },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-card rounded-2xl p-12 border border-dark-border text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Loader2 className="w-16 h-16 text-accent" aria-hidden="true" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-4">Processing Your Video</h2>
        <p className="text-gray-400 mb-12">
          Our AI is working its magic to create amazing shorts...
        </p>

        <div className="space-y-6" role="status" aria-live="polite" aria-label="Processing steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center gap-4 bg-dark-bg rounded-lg p-4"
            >
              <div className="bg-accent/10 p-3 rounded-lg">
                <step.icon className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <span className="text-lg text-gray-300">{step.label}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: step.delay, duration: 1 }}
                className="ml-auto h-2 bg-accent/20 rounded-full overflow-hidden flex-1 max-w-[200px]"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: step.delay, duration: 1 }}
                  className="h-full bg-accent rounded-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-sm text-gray-500"
        >
          This usually takes 10-30 seconds depending on video length
        </motion.div>
      </motion.div>
    </div>
  );
}
