export const SERVER_BASE_URL = "https://oralguard.onrender.com";

export const COLORS = {
  main: "#F1E7E7",
  primary: "#E69DB8",
  secondary: "#FFD0C7",
  tertiary: "#FFFECE",
  black: "#000000",
  white: "#ffffff",
  red: "#FB2576",
  gray: "#758694",
  transparent: "transparent",
  gray100: "#DDDDDD",
  gray200: "#7F8CAA",
};

export const PLOT_COLORS = ["#8F87F1", "#034C53"];

export const AUDIOS = {
  predicting: require("@/assets/sounds/diagnosing.wav"),
  results: require("@/assets/sounds/response.wav"),
};

export const Fonts = {
  "JosefinSans-Bold": require("@/assets/fonts/JosefinSans-Bold.ttf"),
  "JosefinSans-Regular": require("@/assets/fonts/JosefinSans-Regular.ttf"),
};
export const FONTS = {
  regular: "JosefinSans-Regular",
  bold: "JosefinSans-Bold",
};

export const STORAGE_NAME = {
  DAILY_TIP: "oralguard:tip",
  SETTINGS: "oralguard:settings",
  HISTORY: "oralguard:history",
  TIP_NOTIFICATION_FLAG_KEY: "oralguard:notification",
};

export const APP_NAME = "Oral Guard";

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};

export const LANDING_MESSAGES = [
  {
    id: 1,
    image: require("@/assets/images/0.png"),
    title: "Welcome to Oral Guard!",
    message:
      "Your pocket assistant for oral health — Oral Guard uses AI to help detect signs of oral cancer directly from mouth images. Let’s bring prevention and awareness closer to you.",
  },
  {
    id: 2,
    image: require("@/assets/images/1.png"),
    title: "Early Detection Matters",
    message:
      "Oral Guard helps you identify suspicious lesions early by analyzing images for possible risks. Detecting warning signs early improves treatment success and outcomes.",
  },
  {
    id: 3,
    image: require("@/assets/images/2.png"),
    title: "Smart & Reliable Insights",
    message:
      "Classify oral lesions as benign or potentially malignant with confidence. Oral Guard provides AI-powered support to guide better health decisions.",
  },
  {
    id: 4,
    image: require("@/assets/images/3.png"),
    title: "AI for Everyone",
    message:
      "Whether at home or in a clinic, Oral Guard puts powerful oral health screening tools in your hand — no specialized equipment required.",
  },
];
