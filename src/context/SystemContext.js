import { createContext, useState, useEffect } from "react";

export const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [coords, setCoords] = useState(null);
  const [dnd, setDnd] = useState(false);
  const [themeMode, setThemeMode] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    if (!locationEnabled) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location error:", error);
        },
      );
    }
  }, [locationEnabled]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === "d") {
        setDnd((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      if (themeMode === "system") {
        setResolvedTheme(systemPrefersDark.matches ? "dark" : "light");
      } else {
        setResolvedTheme(themeMode);
      }
    };

    updateTheme();

    systemPrefersDark.addEventListener("change", updateTheme);

    return () => {
      systemPrefersDark.removeEventListener("change", updateTheme);
    };
  }, [themeMode]);

  useEffect(() => {
    console.log("Resolved theme:", resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const finalTheme =
      themeMode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : themeMode;

    document.documentElement.setAttribute("data-theme", finalTheme);

    localStorage.setItem("reactos-theme", finalTheme);
    window.dispatchEvent(
      new CustomEvent("reactos-theme-change", { detail: finalTheme }),
    );
  }, [themeMode]);

  return (
    <SystemContext.Provider
      value={{
        locationEnabled,
        setLocationEnabled,
        coords,
        dnd,
        setDnd,
        themeMode,
        setThemeMode,
        resolvedTheme,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};
