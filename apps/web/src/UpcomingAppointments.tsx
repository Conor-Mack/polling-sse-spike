import React, { useEffect, useState } from "react";
import { API } from "./requestHandler";
import { AppointmentCard } from "./AppointmentCard";

type Appointments = Array<Record<string, string>>;
const POLLING_INTERVAL = 25000; // 25 seconds

const fetchAppointments = async (
  setAppointments: (appointment: Appointments) => void
) => {
  const response = await API.get("/appointments");
  return setAppointments(response as Appointments);
};

const clearAppointments = async () => {
  const response = await API.delete("/appointments");
  return response;
};

export const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointments>([]);

  const intervalRef = React.useRef<number>(null);

  useEffect(() => {
    if (appointments.length >= 10 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [appointments.length]);

  useEffect(() => {
    fetchAppointments(setAppointments);

    if (!intervalRef.current) {
      intervalRef.current = setInterval(
        () => fetchAppointments(setAppointments),
        POLLING_INTERVAL
      );
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearAppointments();
    };
  }, []);
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
