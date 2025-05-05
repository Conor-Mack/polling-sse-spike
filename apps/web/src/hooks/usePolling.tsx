import React, { useEffect, useRef } from "react";

const DEFAULT_POLLING_INTERVAL = 25000; // 25 seconds

interface UsePollingProps {
  pollFn: () => Promise<void>;
  interval: number;
  maxIntervalIterations?: number;
  cleanupFn?: () => Promise<void>;
  invokeImmediately?: boolean;
}

export const usePolling = ({
  pollFn,
  interval = DEFAULT_POLLING_INTERVAL,
  maxIntervalIterations,
  invokeImmediately,
  cleanupFn,
}: UsePollingProps) => {
  const pollingIntervalRef = useRef<number>(null);
  const iterationCountRef = useRef<number>(0);

  useEffect(() => {
    if (
      maxIntervalIterations &&
      pollingIntervalRef.current &&
      iterationCountRef.current >= maxIntervalIterations
    ) {
      clearInterval(pollingIntervalRef.current);
    }
  }, [iterationCountRef.current]);

  useEffect(() => {
    if (!pollingIntervalRef.current) {
      invokeImmediately && pollFn();

      pollingIntervalRef.current = setInterval(() => pollFn(), interval);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        cleanupFn && cleanupFn();
      }
    };
  }, []);
};
