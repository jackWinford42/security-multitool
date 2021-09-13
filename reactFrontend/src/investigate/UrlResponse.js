import "./Response.css";

export default function UrlResponse({data}) {
    console.debug("RESPONSE COMPONENT")

    const percent = 100 - data.risk_score;
  
    if (data.page_size === 0) return <p>For best results, enter a valid url. Also, the url you entered may be unreachable.</p>
    return (
      <div className="UrlResponse">
        <h5>This url is {percent}% safe</h5>
        <div className="progress">
          <div id="progressBar" className="progress-bar" role="progressbar" style={{width: `${percent}%`}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p>The type of content on this site falls into the category: {data.category}</p>
        {data.spamming && <p>The domain of this URL is associated with email SPAM or abusive email addresses.</p>}
        {data.malware && <p>This url is associated with malware and viruses.</p>}
        {data.phishing && <p>This url has been found to be associated with malicious phishing behavior.</p>}
        {data.dns_valid && <p>The domain of this URL has valid dns records.</p>}
      </div>
    );
}