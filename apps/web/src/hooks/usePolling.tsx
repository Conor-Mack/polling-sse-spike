import React, { useCallback, useEffect, useRef } from "react";

interface UsePollingProps {
  pollFn: () => Promise<void>;
  interval: number;
  maxIntervalIterations?: number;
  invokeImmediately?: boolean;
  cleanupFn?: () => Promise<void>;
}

export const usePolling = ({
  pollFn,
  interval,
  maxIntervalIterations,
  invokeImmediately,
  cleanupFn,
}: UsePollingProps) => {
  const pollingIntervalRef = useRef<number>(null);
  const iterationCountRef = useRef<number>(0);

  const _pollingFn = useCallback(() => {
    iterationCountRef.current += 1;
    pollFn();
  }, [pollFn]);

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
      invokeImmediately && _pollingFn();

      pollingIntervalRef.current = setInterval(() => _pollingFn(), interval);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        cleanupFn && cleanupFn();
      }
    };
  }, [_pollingFn]);
};
