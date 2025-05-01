import React, { useEffect, useState } from "react";
import { API } from "./requestHandler";

const fetchServerTime = async (setTime: (time: string) => void) => {
  const response = await API.get<string>("/time");
  setTime(response);
};

const App: React.FC = () => {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString()
  );
  const intervalRef = React.useRef<number>(null);

  useEffect(() => {
    // This is where you can add any side effects or initialization logic

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => fetchServerTime(setTime), 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to My App mate</h1>
        <p>Current time is as: {time}</p>
      </header>
    </div>
  );
};

export default App;
