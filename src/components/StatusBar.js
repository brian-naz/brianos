import { useEffect, useState, useContext } from "react";
import { SystemContext } from "../context/SystemContext";

const StatusBar = ({ themeColor, forceDark = false }) => {
  const [time, setTime] = useState("");
  const [battery, setBattery] = useState(100);
  const [charging, setCharging] = useState(false);

  const [online, setOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState(null);
  const [effectiveType, setEffectiveType] = useState(null);

  const [lowPower, setLowPower] = useState(false);
  const { dnd, resolvedTheme } = useContext(SystemContext);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now
        .toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
        .replace(/\s?(AM|PM)/, "");

      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let batteryManager;

    if (navigator.getBattery) {
      navigator.getBattery().then((bm) => {
        batteryManager = bm;

        const updateBattery = () => {
          const level = Math.round(bm.level * 100);
          setBattery(level);
          setCharging(bm.charging);

          if (level <= 20 && !bm.charging) {
            setLowPower(true);
          } else {
            setLowPower(false);
          }
        };

        updateBattery();

        bm.addEventListener("levelchange", updateBattery);
        bm.addEventListener("chargingchange", updateBattery);
      });
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener("levelchange", () => {});
        batteryManager.removeEventListener("chargingchange", () => {});
      }
    };
  }, []);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);

    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    let connection;

    if (navigator.connection) {
      connection = navigator.connection;

      const updateConnection = () => {
        setConnectionType(connection.type || null);
        setEffectiveType(connection.effectiveType || null);
      };

      updateConnection();
      connection.addEventListener("change", updateConnection);

      return () => {
        window.removeEventListener("online", updateOnline);
        window.removeEventListener("offline", updateOnline);
        connection.removeEventListener("change", updateConnection);
      };
    }

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  const isLightColor = (hex) => {
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186;
  };

  const textColor = forceDark
    ? "white"
    : themeColor
      ? isLightColor(themeColor)
        ? "black"
        : "white"
      : undefined;

  const MoonIcon = () => (
    <svg viewBox="0 0 24 24" className="moon-icon">
      <path
        d="M21 12.79A9 9 0 0111.21 3
         7 7 0 1018 14.79
         9 9 0 0121 12.79z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div
      className="status-bar"
      style={{
        background: themeColor
          ? `linear-gradient(to bottom, ${themeColor}, transparent)`
          : "transparent",
        color: textColor,
      }}
    >
      <div className="left-icons">
        <div className="time">{time}</div>
        {dnd && <MoonIcon />}
      </div>

      <div className="right-icons">
        <NetworkIcon
          online={online}
          type={connectionType}
          effectiveType={effectiveType}
        />
        <BatteryIcon
          level={battery}
          charging={charging}
          lowPower={lowPower}
          resolvedTheme={resolvedTheme}
        />
      </div>
    </div>
  );
};

const BatteryIcon = ({ level, charging, lowPower, resolvedTheme }) => {
  const boltColor = lowPower
    ? "black"
    : resolvedTheme === "dark"
      ? "black"
      : "white";

  return (
    <div className="battery">
      <div
        className="battery-level"
        style={{
          width: `${level}%`,
          background: lowPower ? "#FFD60A" : "currentColor",
        }}
      />

      {charging && (
        <div className="bolt">
          <svg
            viewBox="0 0 24 24"
            width="8"
            height="10"
            style={{ display: "block", color: boltColor }}
          >
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
};

const NetworkIcon = ({ online, type, effectiveType }) => {
  if (!online) {
    return <div className="signal offline">✖</div>;
  }

  if (type === "cellular" || effectiveType) {
    return (
      <div className="signal-bars">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className="signal-bars">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default StatusBar;
