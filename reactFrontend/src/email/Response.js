
export default function Response({data}) {
  console.debug("RESPONSE COMPONENT")
  if (!data.valid) return <p>For best results, enter a valid email</p>
  return (
    <div className="Response">
      
    </div>
  );
}