import React, { useEffect, useState } from "react";
import RamtApi from "../common/Api";
import {Bar} from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import LabeledSwitchMaterialUi from 'labeled-switch-material-ui';

export default React.memo(function Hot() {
  const [labels, setLabels] = useState([]);
  const [popData, setPopData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [off, setOff] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getHot() {
      try {
        const siteHistory = await RamtApi.getSiteHistory("Hot");
        console.log(siteHistory.history.rows)
        return siteHistory.history.rows;
      } catch (err) {
        console.error("SiteHistory get: issue loading history", err);
      }
    }
    setLoading(true);
    if (!labels.length) getHot()
    .then(history => {
      history.forEach(row => {
        setLabels(items => [...items, row.item])
        setPopData(popular => [...popular, row.popularity])
        setScoreData(scores => [...scores, row.score])
      })
    })
    
    setLoading(false); // eslint-disable-next-line
  }, [])

  const popState = {
    labels: labels,
    datasets: [
      {
        label: 'Times This Item Has Been Investigated',
        backgroundColor: 'rgba(222, 243, 253)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: popData
      }
    ]
  }

  const scoreState = {
    labels: labels,
    datasets: [
      {
        label: 'Safety Score (100 is completely safe)',
        backgroundColor: 'rgba(253, 223, 223)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: scoreData
      }
    ]
  }

  return (
    <div className="historyGraph">
      {loading && <CircularProgress color="secondary" />}
      {!loading && 
      <>
        <h1>Most Popular Items Over The Past Seven Days</h1>
        <Bar
          className="BarGraph"
          data={(off) ? scoreState : popState}
          options={{
            title:{
              display:true,
              text:'Top Ten Must Popular Items',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        <LabeledSwitchMaterialUi labelLeft="popularity" labelRight="score"
        styleLabelLeft={{color: "rgb(0,0,153)"}}
        styleLabelRight={{color: "rgb(153,0,0)"}}
        onChange={() => setOff(!off)}/>
        <p>The popularity score is determined by how many times each item has been investigated.</p>
      </>}
    </div>
  )
})
