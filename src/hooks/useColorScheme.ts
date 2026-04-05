import { useState, useEffect } from "react";

const KEY = "cts-color-scheme";

export function useColorScheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored !== null) return stored === "dark";
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, isDark ? "dark" : "light");
    } catch {}
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return { isDark, toggle };
}
