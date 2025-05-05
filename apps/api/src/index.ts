import express from "express";
import cors from "cors";
import { DateTime } from "luxon";
import crypto from "crypto";

const app = express();
const PORT = 5174;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const APPOINTMENT_REASONS = [
  "General Checkup",
  "Follow-up",
  "Consultation",
  "Emergency",
  "Routine Checkup",
] as const;

interface Appointment {
  id: `${string}-${string}-${string}-${string}-${string}`;
  reason_for_appointment: string;
  appointment_date: string;
}

const MINUTES_UNTIL_APPOINTMENT_START = 3;

function generateAppointment(timezone: string) {
  const appointment: Appointment = {
    id: crypto.randomUUID(),
    reason_for_appointment:
      APPOINTMENT_REASONS[
        Math.floor(Math.random() * APPOINTMENT_REASONS.length)
      ],
    appointment_date:
      DateTime.utc()
        .setZone(timezone)
        .plus({ minutes: MINUTES_UNTIL_APPOINTMENT_START })
        .toISO() ?? new Date().toISOString(),
  };
  return appointment;
}

app.get("/time", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(currentTime);
});

app.get("/appointments", (req, res) => {
  const timezone = req.headers["x-timezone"] as string;

  const appointment = generateAppointment(timezone);

  res.json(appointment);
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
