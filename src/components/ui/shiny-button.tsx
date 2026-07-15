"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

const animationProps: Pick<
  HTMLMotionProps<"button">,
  "initial" | "animate" | "whileTap" | "transition"
> = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

const shinyBaseClasses =
  "relative isolate overflow-hidden rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-shadow duration-300 ease-in-out hover:shadow-amber-500/40";

function ShinySurface({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Alpha do gradiente é o que importa aqui — cria o efeito de "brilho"
          passando pelo texto, a cor em si é irrelevante para a máscara. */}
      <span
        className="relative z-[1] block size-full"
        style={{
          maskImage:
            "linear-gradient(-75deg, black calc(var(--x) + 20%), transparent calc(var(--x) + 30%), black calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg, black calc(var(--x) + 20%), transparent calc(var(--x) + 30%), black calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 block rounded-[inherit]"
        style={{
          background:
            "linear-gradient(-75deg, color-mix(in srgb, white 15%, transparent) calc(var(--x) + 20%), color-mix(in srgb, white 45%, transparent) calc(var(--x) + 25%), color-mix(in srgb, white 15%, transparent) calc(var(--x) + 100%))",
        }}
      />
    </>
  );
}

export interface ShinyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      {...animationProps}
      {...(props as HTMLMotionProps<"button">)}
      className={cn(shinyBaseClasses, className)}
    >
      <ShinySurface>{children}</ShinySurface>
    </motion.button>
  );
};

export interface ShinyLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children: React.ReactNode;
  className?: string;
}

/** Mesmo efeito do ShinyButton, mas como `<a>` — para CTAs que navegam ou abrem o WhatsApp. */
export const ShinyLink: React.FC<ShinyLinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.a
      {...animationProps}
      {...(props as HTMLMotionProps<"a">)}
      className={cn(shinyBaseClasses, "inline-block text-center", className)}
    >
      <ShinySurface>{children}</ShinySurface>
    </motion.a>
  );
};
