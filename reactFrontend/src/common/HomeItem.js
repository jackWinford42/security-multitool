import { Card, CardBody} from 'reactstrap';
import { Doughnut } from 'react-chartjs-2'
import "./HomeItem.css"

export default function HomeItem({row}) {
  const state = {
    labels: ['Safety %', 'Danger %'],
    datasets: [
      {
        label: 'Safety',
        backgroundColor: [
          '#C9DE00',
          '#B21F00'
        ],
        hoverBackgroundColor: [
          '#4B5000',
          '#501800'
        ],
        data: [row.score, 100-row.score]
      }
    ]
  }

  const date = row.time_created.split("T")[0]
  return (
    <li>
      <Card>
        <CardBody className="homeItemBody">
          <h3>{row.item}</h3>
          <div className="Doughnut">
            <Doughnut
              data={state}
              options={{
                title:{
                  display:true,
                  text:'Safety',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                },
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
          <div className="itemRight">
            <strong className={row.type}>type: {row.type}</strong>
            <p>date analysed: {date}</p>
            {"popularity" in row && <p>popularity score: {row.popularity}</p>}
          </div>
        </CardBody>
      </Card>
    </li>
  );
}
