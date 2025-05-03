import React, { useEffect } from "react";

interface AppointmentCardProps {
  id: string;
  reason_for_appointment: string;
  appointment_date: Date;
}

const MINUTES_UNTIL_START_THRESHOLD = 2;

export const AppointmentCard = ({
  reason_for_appointment,
  appointment_date,
}: AppointmentCardProps) => {
  const [cancelDisabled, setCancelDisabled] = React.useState(false);
  const [minsUntilApptStart, setMinsUntilApptStart] = React.useState<
    string | null
  >(null);

  function formatTimeRemaining(milliseconds: number) {
    if (milliseconds <= 0) return "0:00";

    // Calculate minutes and seconds
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Format seconds with leading zero if needed
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  }

  function getMinutesUntilAppointmentStart() {
    const currentDate = new Date();
    const timeDifference = appointment_date.getTime() - currentDate.getTime();
    return timeDifference;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaining = getMinutesUntilAppointmentStart();
      const formattedTime = formatTimeRemaining(timeRemaining);
      setMinsUntilApptStart(formattedTime);

      // Convert to minutes for the condition check
      const minsUntilStart = timeRemaining / (1000 * 60);
      if (minsUntilStart < MINUTES_UNTIL_START_THRESHOLD) {
        setCancelDisabled(true);
      }

      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold">{reason_for_appointment}</h2>
      <p className="text-lg">
        Appointment Date: {appointment_date.toLocaleString()}
      </p>
      <p className="basis-[24px]">
        {minsUntilApptStart !== null
          ? `${minsUntilApptStart} mins until start time`
          : null}
      </p>
      <button
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-900 transition duration-30 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={cancelDisabled}
      >
        Cancel Appointment
      </button>
    </div>
  );
};
