import { apps } from "../data/apps";

const HomeScreen = ({ openApp }) => {
  return (
    <div className="app-grid">
      {apps.map((app) => (
        <div key={app.name} className="app-icon" onClick={() => openApp(app)}>
          <img src={app.icon} alt={app.name} />
          <span>{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
