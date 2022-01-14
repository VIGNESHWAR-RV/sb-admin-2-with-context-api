import error404 from '../SVGs/404.svg';

export function Error() {
  return (<div style={{ display: "grid", gridTemplateRows: "0fr 1fr", gridTemplateColumns: "repeat(autoFit,1fr)", height: "100vh", justifyItems: "center" }}>
    <h1 style={{ fontSize: "6vmax", color: "red", textShadow: " 3px 3px white, -3px -3px white" }}>404 Error Buddy!!!</h1>
    <img style={{ width: "80%", height: "50%" }} src={error404} alt="404 Not Found"></img>
  </div>);
}
