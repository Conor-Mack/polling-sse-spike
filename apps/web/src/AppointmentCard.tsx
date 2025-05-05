import React, { useEffect, useMemo } from "react";
import { ClockTime } from "./helpers/ClockTime";
import { useTimeout } from "./hooks/useTimeout";
import { minsToMilliseconds } from "./helpers/minsToMillseconds";
import { useFutureAction } from "./hooks/useFutureAction";

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

  useFutureAction({
    actionDate: appointment_date,
    invokeActionMinutesBefore: MINUTES_UNTIL_START_THRESHOLD,
    action: () => {
      setCancelDisabled(true);
    },
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold">{reason_for_appointment}</h2>
      <p className="text-lg">
        Appointment Date: {appointment_date.toLocaleString()}
      </p>
      <ClockTime milliseconds={appointment_date.getTime()} />

      <button
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-900 transition duration-30 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={cancelDisabled}
      >
        Cancel Appointment
      </button>
    </div>
  );
};
