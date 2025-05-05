import React, { useEffect, useState } from "react";

interface ClockTimeProps {
  milliseconds: number;
}

export const ClockTime = ({ milliseconds }: ClockTimeProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>();

  function getMsFromTimeNow() {
    const currentDate = new Date();
    const timeDifference = milliseconds - currentDate.getTime();
    return timeDifference;
  }

  function formatMsToClockTime(milliseconds: number) {
    if (milliseconds <= 0) return "0:00";

    // Calculate minutes and seconds
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Format seconds with leading zero if needed
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const msRemaining = getMsFromTimeNow();
      const formattedTime = formatMsToClockTime(msRemaining);
      setTimeRemaining(formattedTime);

      if (msRemaining <= 0) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <p className="h-[24px]">
      {timeRemaining ? `${timeRemaining} mins until start time` : null}
    </p>
  );
};
