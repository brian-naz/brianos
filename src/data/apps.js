import Settings from "../settings/Settings";

export const apps = [
  {
    name: "Weather",
    icon: "/icons/weather.png",
    url: "https://weather-app-brian-naz.vercel.app/",
    supportsTheme: false,
  },
  {
    name: "Messages",
    icon: "/icons/chat.png",
    url: "https://messagesappdemo.vercel.app/",
    supportsTheme: false,
  },
  {
    name: "Notes",
    icon: "/icons/notes.png",
    url: "http://notes-app-azure-nine.vercel.app/",
    supportsTheme: false,
  },
  {
    name: "Settings",
    icon: "/icons/settings.png",
    type: "internal",
    component: Settings,
    supportsTheme: true
  },
];
