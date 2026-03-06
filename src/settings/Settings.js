import ThemeSetting from "./ThemeSetting";
import PrivacySetting from "./PrivacySetting";

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">Settings</div>

      <ThemeSetting />
      <PrivacySetting />
    </div>
  );
};

export default Settings;
