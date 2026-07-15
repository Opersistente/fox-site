"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_URL } from "@/lib/site";

export function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={DEFAULT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={1.5} />
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-500" />
      </span>
    </motion.a>
  );
}
