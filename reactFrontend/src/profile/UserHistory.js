import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function UserHistory({HistoryItems}) {
  console.log(HistoryItems)
  HistoryItems = HistoryItems.map(row => {
    return (
    <li key={uuidv4()}>
      <h5>{row.item}</h5>
      <p>type: {row.type}</p>
      <p>safety score out of 100: {row.score}</p>
    </li>
    );
  })

  return (
    <div className="UserHistory">
      <ul>
        {HistoryItems}
      </ul>
    </div>
  );
}