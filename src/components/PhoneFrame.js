import StatusBar from "./StatusBar";

const PhoneFrame = ({ children }) => {
  return (
    <div className="viewport">
      <div className="phone">
        <div className="screen">
          <StatusBar />
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
