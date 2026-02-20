import { useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import HomeScreen from "./components/HomeScreen";
import AppView from "./components/AppView";
import "./phone.css";

function App() {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <PhoneFrame>
      {!activeApp && (
        <HomeScreen openApp={setActiveApp} />
      )}

      {activeApp && (
        <AppView
          app={activeApp}
          closeApp={() => setActiveApp(null)}
        />
      )}
    </PhoneFrame>
  );
}

export default App;
