import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";

const PrivacySetting = () => {
  const { locationEnabled, setLocationEnabled } = useContext(SystemContext);

  return (
    <div className="settings-group">
      <div className="settings-item">
        <span>Location Services</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={locationEnabled}
            onChange={() => setLocationEnabled(!locationEnabled)}
          />
          <span className="slider" />
        </label>
      </div>

      <div className="settings-item">
        <span>Reduce Motion</span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
};

export default PrivacySetting;
