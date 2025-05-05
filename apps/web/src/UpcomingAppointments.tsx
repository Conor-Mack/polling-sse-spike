import { useCallback, useState } from "react";
import { API } from "./requestHandler";
import { AppointmentCard } from "./AppointmentCard";
import { usePolling } from "./hooks/usePolling";

type Appointments = Record<string, string>;
const POLLING_INTERVAL = 25000; // 25 seconds

const fetchAppointments = async () => {
  const response: Appointments = await API.get("/appointments");
  return response;
};

export const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  const getAppointments = useCallback(async () => {
    const appointment = await fetchAppointments();
    setAppointments((appointments) => [appointment, ...appointments]);
  }, []);

  usePolling({
    pollFn: getAppointments,
    interval: POLLING_INTERVAL,
    maxIntervalIterations: 10,
    invokeImmediately: true,
  });

  return (
    <>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          id={appointment.id}
          reason_for_appointment={appointment.reason_for_appointment}
          appointment_date={new Date(appointment.appointment_date)}
        />
      ))}
    </>
  );
};
