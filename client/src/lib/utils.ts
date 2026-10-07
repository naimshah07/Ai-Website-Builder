// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --------------------
// Greeting utility
// --------------------
export const getTimeGreeting= () => {
  const hour = new Date().getHours();   // 0–23
  // const month = new Date().getMonth();  // 0 = Jan

  let timeGreeting = "";
  if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
  else if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon";
  else if (hour >= 17 && hour < 21) timeGreeting = "Good evening";
  else timeGreeting = "Good night";

  // let seasonGreeting = "";
  // if (month >= 2 && month <= 5) seasonGreeting = "☀️";      // Mar–Jun (Summer)
  // else if (month >= 6 && month <= 8) seasonGreeting = "🌧️"; // Jul–Sep (Monsoon)
  // else seasonGreeting = "❄️";                                // Oct–Feb (Winter)

  return `${timeGreeting}!`;
};


