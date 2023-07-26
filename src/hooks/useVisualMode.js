import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      // If the replace flag is true, replace the last item in history with the newMode
      setHistory(prevHistory => [...prevHistory.slice(0, -1), newMode]);
    } else {
      // If the replace flag is false, add the newMode to the history array
      setHistory(prevHistory => [...prevHistory, newMode]);
    }
    setMode(newMode); // Always update the mode with the newMode
  };

  const back = () => {
    if (history.length > 1) {
      const updatedHistory = history.slice(0, -1);
      setMode(updatedHistory[updatedHistory.length - 1]);
      setHistory(updatedHistory);
    } else {
      setMode(initial);
    }
  };

  return { mode, transition, back };
}