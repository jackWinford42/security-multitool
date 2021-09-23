import React from "react";
import HomeItem from "../common/HomeItem";

export default function UserHistory({HistoryItems}) {
  HistoryItems = HistoryItems.map(row => {
    return (<HomeItem row={row}/>);
  })

  return (
    <div className="UserHistory">
      <ul>
        {HistoryItems}
      </ul>
    </div>
  );
}