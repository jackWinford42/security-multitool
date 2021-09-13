import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RamtApi from "./Api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [displayHistory, setDisplayHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      try {
        const siteHistory = await RamtApi.getSiteHistory();
        setDisplayHistory(siteHistory.history.rows);
        setEmpty(false);
      } catch (err) {
        console.error("SiteHistory get: issue loading history", err);
      }
    }
    setIsLoading(true);
    if (empty) getHistory();
    setIsLoading(false);
  }, [empty])
  console.log(displayHistory)
  const HistoryItems = displayHistory.map(row => {
    return (
    <li key={uuidv4()}>
      <h5>{row.item}</h5>
      <p>type: {row.type}</p>
      <p>safety score out of 100: {row.score}</p>
    </li>
    );
  })

  if (isLoading) return <p>Loading &hellip;</p>;
  return (
    <div className="Home">
      <ul>
        {HistoryItems}
      </ul>
    </div>
  );
}