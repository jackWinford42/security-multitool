import React, { useEffect, useState } from "react";
import RamtApi from "../common/Api";
import HomeItem from "../common/HomeItem";
import {v4 as uuidv4} from "uuid"

export default function History() {
  const [displayHistory, setDisplayHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      try {
        console.log("INSIDE HOME HOOK")
        const siteHistory = await RamtApi.getSiteHistory("all");
        setDisplayHistory(siteHistory.history.rows);
      } catch (err) {
        console.error("SiteHistory get: issue loading history", err);
      }
    }
    getHistory();
  }, [])

  const HistoryItems = displayHistory.map(row => {
    return (<HomeItem row={row} key={uuidv4()}/>)
  })

  return (
    <ul className="history">
      {HistoryItems}
    </ul>
  )
}