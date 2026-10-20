"use client";

import { LucideIcon } from "lucide-react";

interface Signal {
  label: string;
  value: string;
}

interface UseCaseCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  offlineStory: string;
  signals: Signal[];
  persona: string;
  confidence: number;
  result: string;
  accentColor: "blue" | "green" | "purple";
}

export function UseCaseCard({
  icon: Icon,
  category,
  title,
  offlineStory,
  signals,
  persona,
  confidence,
  result,
  accentColor,
}: UseCaseCardProps) {
  const colorMap = {
    blue: {
      bg: "bg-[var(--accent-primary)]/10",
      text: "text-[var(--accent-primary-light)]",
      border: "border-[var(--accent-primary)]/30",
      glow: "glow-blue",
    },
    green: {
      bg: "bg-[var(--accent-secondary)]/10",
      text: "text-[var(--accent-secondary-light)]",
      border: "border-[var(--accent-secondary)]/30",
      glow: "glow-green",
    },
    purple: {
      bg: "bg-[var(--accent-tertiary)]/10",
      text: "text-[var(--accent-tertiary-light)]",
      border: "border-[var(--accent-tertiary)]/30",
      glow: "glow-purple",
    },
  };

  const colors = colorMap[accentColor];

  return (
    <div className={`glass-card p-5 sm:p-8 hover:${colors.glow} transition-all duration-300 h-full flex flex-col`}>
      {/* Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <div className={`p-2 sm:p-3 rounded-xl ${colors.bg} flex-shrink-0`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">
            {category}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] truncate">{title}</h3>
        </div>
      </div>

      {/* Offline Story */}
      <div className="mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {offlineStory}
        </p>
      </div>

      {/* Signals Detected */}
      <div className={`rounded-lg ${colors.bg} p-3 sm:p-4 mb-3 sm:mb-4 flex-grow`}>
        <p className="text-[10px] sm:text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 sm:mb-3">
          Signals Detected
        </p>
        <div className="space-y-1.5 sm:space-y-2 font-mono text-[10px] sm:text-xs">
          {signals.map((signal, idx) => (
            <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
              <span className={`${colors.text} flex-shrink-0`}>├──</span>
              <span className="text-[var(--text-muted)] flex-shrink-0">{signal.label}:</span>
              <span className="text-[var(--text-primary)] break-words">{signal.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Persona Result */}
      <div className={`border ${colors.border} rounded-lg p-3 sm:p-4 mb-3 sm:mb-4`}>
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-xs text-[var(--text-muted)]">Persona Detected</span>
          <span className={`text-[10px] sm:text-xs font-semibold ${colors.text}`}>
            {confidence}% confidence
          </span>
        </div>
        <p className="font-semibold text-[var(--text-primary)] text-sm sm:text-base">{persona}</p>
      </div>

      {/* Result */}
      <div className="mb-3 sm:mb-4">
        <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mb-0.5 sm:mb-1">Result</p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{result}</p>
      </div>
    </div>
  );
}
