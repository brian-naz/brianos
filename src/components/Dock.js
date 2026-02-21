const Dock = ({ apps, openApp }) => {
  return (
    <div className="dock">
      {apps.map((app) => (
        <div key={app.name} className="dock-icon" onClick={() => openApp(app)}>
          <img src={app.icon} alt={app.name} />
        </div>
      ))}
    </div>
  );
};

export default Dock;
