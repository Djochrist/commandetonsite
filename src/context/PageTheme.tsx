import React, { createContext, useContext, ReactNode } from "react";

export interface PageTheme {
  accent: string;
  navBg: string;
  navIsDark: boolean;
  footerBg: string;
  footerIsDark?: boolean;
}

const defaultTheme: PageTheme = {
  accent: "#6366f1",
  navBg: "#0f172a",
  navIsDark: true,
  footerBg: "#030712",
};

const PageThemeContext = createContext<PageTheme>(defaultTheme);

export function PageThemeProvider({ theme, children }: { theme: PageTheme; children: ReactNode }) {
  return <PageThemeContext.Provider value={theme}>{children}</PageThemeContext.Provider>;
}

export function usePageTheme(): PageTheme {
  return useContext(PageThemeContext);
}

export const themes: Record<string, PageTheme> = {
  home:         { accent: "#6366f1", navBg: "#0f172a",  navIsDark: true,  footerBg: "#030712" },
  influenceur:  { accent: "#ec4899", navBg: "#0d0d1a",  navIsDark: true,  footerBg: "#06030d" },
  informatique: { accent: "#3b82f6", navBg: "#0a0a0f",  navIsDark: true,  footerBg: "#050508" },
  automobile:   { accent: "#2563eb", navBg: "#050810",  navIsDark: true,  footerBg: "#020510" },
  hopital:      { accent: "#111111", navBg: "#ffffff",  navIsDark: false, footerBg: "#111111" },
  mode:         { accent: "#d97706", navBg: "#faf6ed",  navIsDark: false, footerBg: "#1c1309" },
  restaurant:   { accent: "#ea580c", navBg: "#fff7ed",  navIsDark: false, footerBg: "#1a0800" },
  supermarche:  { accent: "#16a34a", navBg: "#f0fdf4",  navIsDark: false, footerBg: "#052e16" },
  ecole:        { accent: "#00509D", navBg: "#ffffff",  navIsDark: false, footerBg: "#0f172a" },
  salon:        { accent: "#c084fc", navBg: "#0a0a0a",  navIsDark: true,  footerBg: "#000000" },
  boutique:     { accent: "#111111", navBg: "#ffffff",  navIsDark: false, footerBg: "#111111", footerIsDark: true },
};
