import { useContext } from "react";
import { SystemContext } from "../context/SystemContext";
import StatusBar from "./StatusBar";

const PhoneFrame = ({ children, forceDarkStatusBar = false }) => {
  const { resolvedTheme } = useContext(SystemContext);

  return (
    <div className="viewport">
      <div className="phone">
        <div className={`screen ${resolvedTheme}`}>
          <StatusBar forceDark={forceDarkStatusBar} />
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
