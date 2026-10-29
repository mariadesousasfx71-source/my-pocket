import { useState, useEffect } from "react";

const API_URL = "https://api.frankfurter.dev/v1/latest?base=INR&symbols=USD,EUR";

// Custom hook: fetches today's rates for 1 rupee in US dollars and euros
// from the free Frankfurter API (no key needed).
//
// - enabled:   only fetch once this is true (so we fetch "on demand")
// - returns:   { rates, date, loading, error, retry }
function useExchangeRates(enabled) {
  const [rates, setRates] = useState(null); // e.g. { USD: 0.012, EUR: 0.011 }
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0); // goes up when "Try again" is clicked

  useEffect(() => {
    if (!enabled) return;

    // Lets us cancel the request if the component goes away mid-fetch
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Server replied ${response.status}`);
        const data = await response.json();
        setRates(data.rates);
        setDate(data.date);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Couldn't load exchange rates. Check your internet connection.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    // Cleanup: runs if enabled/attempt change or the component unmounts
    return () => controller.abort();
  }, [enabled, attempt]);

  function retry() {
    setAttempt((n) => n + 1);
  }

  return { rates, date, loading, error, retry };
}

export default useExchangeRates;
