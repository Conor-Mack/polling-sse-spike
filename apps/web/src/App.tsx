import React from "react";
import { UpcomingAppointments } from "./UpcomingAppointments";

const App: React.FC = () => {
  return (
    <div>
      <main className="flex flex-col justify-start min-h-screen max-w-3xl mx-auto p-4  bg-gray-100 ">
        <header className="my-4">
          <h1 className="text-3xl">Appointment Hub</h1>
          <h2 className="text-xl">Upcoming appointments displayed below</h2>
        </header>
        <UpcomingAppointments />
      </main>
    </div>
  );
};

export default App;
