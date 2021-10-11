import "./Response.css";
import { Alert, Card, CardBody} from 'reactstrap';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Response({data, open}) {
  //console.debug("RESPONSE COMPONENT")

  const percent = 100-data.fraud_score;

  function smtp(score) {
    switch (score) {
      case -1:
        return <p>invalid email address</p>
      case 0:
        return <p>the mail server for this email exists, but it is rejecting all mail</p>
      case 1:
        return <p>the mail server for this email exists, but it is showing a temporary error which is suspicious</p>
      case 2:
        return <p>the mail server exists and accepts all mail</p>
      case 3:
        return <p>there is nothing suspicious about the mail server</p>
      default:
        return <p>invalid email address or server error</p>
    }
  }

  function overall(score) {
    switch (score) {
      case 0:
        return <p>invalid email address</p>
      case 1:
        return <p>the dns for this email is valid, but the mail server is unreachable</p>
      case 2:
        return <p>the dns for this email is valid, but there is a temporary mail rejection error</p>
      case 3:
        return <p>the dns for this email is valid, and accepts all mail</p>
      case 4:
        return <p>there is nothing suspicious about the dns for this email</p>
      default:
        return <p>invalid email address or server error</p>
    }
  }

  if (!data.success || data.overall_score === 0) return <Alert className="redAlert" color="danger">For best results, enter a valid email</Alert>
  return (
    <Card className="Response responseCard">
      <CardBody>
        <h5>This email is {percent}% safe <InfoOutlinedIcon id="infoIcon" onClick={() => open()}/></h5>
        <div className="progress">
          <div id="progressBar" className="progress-bar" role="progressbar" style={{width: `${percent}%`}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        {overall(data.overall_score)}
        {smtp(data.smtp_score)}
        {data.disposable && <p>This email is suspected of belonging to a temporary or disposable mail service.
          Usually associated with fraudsters and scammers.</p>}
        {data.leaked && <p>This email address is associated with a recent database leak from a third party.
          Leaked accounts pose a risk as they may have become compromised during a database breach.</p>}
        {data.recent_abuse && <p>There has been recent verified abuse with this email address. Abuse could 
          be a confirmed chargeback, fake signup, compromised device, fake app install, or similar malicious 
          behavior within the past few days.</p>}
        {data.honeypot && <p>This email is believed to be a SPAM trap, AKA a honeypot. Bulk mail 
          sent to these emails increases your risk of being blacklisted by large ISPs and ending up in the spam folder.</p>}
      </CardBody>
    </Card>
  );
}
