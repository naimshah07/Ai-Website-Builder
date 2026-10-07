// src/analytics.ts

const GA_MEASUREMENT_ID = "G-JM1T3BWDP3"; // Replace with real ID

export const trackPageView = (path: string) => {
  if (typeof window === "undefined") return;
  if (!(window as any).gtag) return;

  (window as any).gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;
  if (!(window as any).gtag) return;

  (window as any).gtag("event", action, params);
};
