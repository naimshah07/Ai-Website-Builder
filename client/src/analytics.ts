// src/analytics.ts

const GA_MEASUREMENT_ID = "G-JM1T3BWDP3"; // Replace with real ID

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const trackPageView = (path: string) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, params);
};
