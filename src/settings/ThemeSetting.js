import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";

const ThemeSetting = () => {
  const { themeMode, setThemeMode } = useContext(SystemContext);
  return (
    <div className="settings-group">
      <div className="settings-item">
        <span>Appearance</span>

        <select
          value={themeMode}
          onChange={(e) => setThemeMode(e.target.value)}
          className="settings-select"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeSetting;
