import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="text-primary-600"
      >
        <path
          d="M20 4L4 12V28L20 36L36 28V12L20 4Z"
          className="fill-primary-600"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 14V26M14 18L20 14L26 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight leading-none text-slate-900">
          TAMIR<span className="text-primary-600">ADAM</span>
        </span>
        <span className="text-[0.65rem] font-medium tracking-widest text-slate-500 uppercase">
          Profesyonel Çözümler
        </span>
      </div>
    </div>
  );
};