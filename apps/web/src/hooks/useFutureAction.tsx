import React, { useEffect, useRef } from "react";
import { minsToMilliseconds } from "../helpers/minsToMillseconds";

interface UseTimeoutProps {
  action: () => void;
  actionDate: Date;
  invokeActionMinutesBefore?: number;
}

export const useFutureAction = ({
  actionDate,
  action,
  invokeActionMinutesBefore = 0,
}: UseTimeoutProps) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!timeoutRef.current) {
      const currentTimeInMilliseconds = new Date().getTime();
      const actionTimeInMilliseconds = actionDate.getTime();

      const millisecondsUntilAction =
        actionTimeInMilliseconds -
        currentTimeInMilliseconds -
        minsToMilliseconds(invokeActionMinutesBefore);

      if (millisecondsUntilAction <= 0) {
        console.warn("Action time is in the past and will not be scheduled.");
        return;
      }

      timeoutRef.current = setTimeout(action, millisecondsUntilAction);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);
};
