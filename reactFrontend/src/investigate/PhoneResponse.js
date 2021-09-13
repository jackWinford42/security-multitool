import "./Response.css";

export default function PhoneResponse({data}) {
  console.debug("PHONE RESPONSE COMPONENT")

  const percent = 100-data.fraud_score;

  if (!data.valid) return <p>For best results, enter a valid phone number.</p>
  return (
    <div className="PhoneResponse">
      <h5>This phone number is {percent}% safe</h5>
      <div className="progress">
        <div id="progressBar" class="progress-bar" role="progressbar" style={{width: `${percent}%`}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <p>The name associated with this phone number is {data.name}</p>
      <p>The carrier associated with this phone number is {data.carrier}</p>
      <p>The country code for this number is {data.country}</p>
      {data.active && <p>This phone number is a live usable phone number that is currently active.</p>}
      {data.recent_abuse && <p>This phone number has been associated with recent or ongoing fraud.</p>}
    </div>
  );
}