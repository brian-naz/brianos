import { useEffect, useState } from "react";

const StatusBar = () => {
  const [time, setTime] = useState("");
  const [battery, setBattery] = useState(100);
  const [charging, setCharging] = useState(false);

  const [online, setOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState(null);
  const [effectiveType, setEffectiveType] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let batteryManager;

    if (navigator.getBattery) {
      navigator.getBattery().then((bm) => {
        batteryManager = bm;

        const updateBattery = () => {
          setBattery(Math.round(bm.level * 100));
          setCharging(bm.charging);
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

  return (
    <div className="status-bar">
      <div className="time">{time}</div>

      <div className="right-icons">
        <NetworkIcon
          online={online}
          type={connectionType}
          effectiveType={effectiveType}
        />
        <BatteryIcon level={battery} charging={charging} />
      </div>
    </div>
  );
};


const BatteryIcon = ({ level, charging }) => {
  return (
    <div className="battery">
      <div className="battery-level" style={{ width: `${level}%` }} />
      {charging && <span className="bolt">⚡</span>}
    </div>
  );
};

const NetworkIcon = ({ online, type, effectiveType }) => {
  if (!online) {
    return <div className="signal offline">✖</div>;
  }

  if (type === "wifi") {
    return <div className="wifi">🛜</div>;
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

  return <div className="wifi">📶</div>;
};

export default StatusBar;
