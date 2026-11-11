import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../api/axiosClient';

export const useQueuePolling = (endpoint, intervalMs = 6000, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSynced, setLastSynced] = useState(new Date());

  const refetch = useCallback(async () => {
    if (!endpoint || !enabled) return;
    try {
      const res = await api.get(endpoint);
      if (res.data.success) {
        setData(res.data);
        setError(null);
        setLastSynced(new Date());
      }
    } catch (err) {
      console.error(`Polling error at ${endpoint}:`, err);
      setError(err.response?.data?.message || 'Failed to sync queue data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, enabled]);

  useEffect(() => {
    if (!enabled) return;

    refetch();

    const intervalId = setInterval(refetch, intervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [refetch, intervalMs, enabled]);

  return { data, loading, error, lastSynced, refetch };
};

export default useQueuePolling;
