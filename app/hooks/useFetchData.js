"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { getAccessToken } from "../api/apiContent/apiContent";
import { message } from "antd";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

/**
 * Custom hook for fetching data from API with retry logic
 * @param {Function} fetchFunction - The API function to call (e.g., fetchUsersData)
 * @param {Object} options - Additional options
 * @param {boolean} options.loadOnMount - Whether to load data when component mounts
 * @param {Function} options.onSuccess - Callback function when fetch is successful
 * @param {Function} options.onError - Callback function when fetch fails
 * @param {boolean} options.expectArray - Whether to expect an array response (default: true)
 * @param {boolean} options.silentErrors - Whether to suppress error messages (default: false)
 * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} options.retryDelay - Initial delay between retries in milliseconds (default: 1000)
 * @returns {Object} - { data, loading, error, refetch }
 */
const useFetchData = (fetchFunction, options = {}) => {
  const {
    loadOnMount = true,
    onSuccess,
    onError,
    expectArray = true,
    silentErrors = false,
    maxRetries = MAX_RETRIES,
    retryDelay = INITIAL_RETRY_DELAY,
  } = options;

  const { data: session, status } = useSession();
  const [data, setData] = useState(expectArray ? [] : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);
  const isFetching = useRef(false);
  const lastTokenRef = useRef(null);

  const delay = useCallback(
    (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );

  const fetchData = useCallback(async () => {
    if (isFetching.current) return;
    
    const currentToken = getAccessToken();
    if (!currentToken) {
      setLoading(false);
      return;
    }

    // If we already have data and the token hasn't changed, don't refetch
    if (data && lastTokenRef.current === currentToken) {
      return;
    }

    try {
      isFetching.current = true;
      setLoading(true);
      setError(null);
      lastTokenRef.current = currentToken;

      let retries = 0;
      let lastError = null;

      while (retries <= maxRetries) {
        try {
          const result = await fetchFunction(currentToken);
          
          if (isMounted.current) {
            setData(result);
            if (onSuccess) onSuccess(result);
          }
          return;
        } catch (error) {
          lastError = error;
          if (retries < maxRetries) {
            await delay(retryDelay * Math.pow(2, retries));
            retries++;
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setError(error);
        if (onError) onError(error);
        if (!silentErrors) {
          message.error(error.message || "Failed to fetch data");
        }
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
      isFetching.current = false;
    }
  }, [fetchFunction, onSuccess, onError, silentErrors, maxRetries, retryDelay, delay, data]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (loadOnMount && status === "authenticated") {
      fetchData();
    }
  }, [loadOnMount, status, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useFetchData;
