import { apps } from "../data/apps";
import Dock from "./Dock";

const HomeScreen = ({ openApp }) => {
  return (
    <>
      <div className="app-grid">
        {apps.map((app) => (
          <div key={app.name} className="app-icon" onClick={() => openApp(app)}>
            <img src={app.icon} />
            <span>{app.name}</span>
          </div>
        ))}
      </div>

      <Dock apps={apps.slice(0, 4)} openApp={openApp} />
    </>
  );
};

export default HomeScreen;
