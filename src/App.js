import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import api from "./api";

const App = () => {
  const [clients, setClients] = useState([]);
  const [apiIp, setApiIp] = useState("");
  const [apiPort, setApiPort] = useState("");
  useEffect(() => {
    const interval = setInterval(() => api.getClients(apiIp, apiPort).then(response => {
      if(response.data.clients) {
        setClients(response.data.clients);
      } else {
        setClients([]);
      }
    }).catch(err => {
      setClients([]);
    }), 1000);
    return () => {
      clearInterval(interval);
      setClients([]);
    }
  },[apiIp, apiPort]);

  const handleChangeIp = (e) => setApiIp(e.target.value);
  const handleChangePort = (e) => setApiPort(e.target.value);
  
  return (
    <>
      <nav className="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">SRS Monitor</span>
        </div>
      </nav>
      <main className="mx-5 mt-3">
        <div>
          <Form.Group className="mb-3">
            <Form.Label>IP Address</Form.Label>
            <Form.Control type="text" placeholder="127.0.0.1" value={apiIp} onChange={handleChangeIp}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Port</Form.Label>
            <Form.Control type="text" placeholder="1985" value={apiPort} onChange={handleChangePort}/>
          </Form.Group>
        </div>
        <div className="table-responsive mt-5">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {
                  ["ID", "VHost", "Stream", "IP", "Page Url", "SWF Url", "TC Url", "Url", "Type", "Publish", "Alive"].map((ckey, i) => (
                    <th scope="col" className="text-center align-middle" rowSpan="2" key={i + "k"}>{ckey}</th>
                  ))
                  
                }
                 <th scope="col" className="text-center" colSpan="2">Kbps</th>
              </tr>
              <tr>
                <th scope="col" className="text-center" colSpan="1">Rec</th>
                <th scope="col" className="text-center" colSpan="1">Send</th>
              </tr>
            </thead>
            <tbody>
                {
                  clients.map((client, j) =>  (
                    <tr key={j}>
                      {
                        ["id", "vhost", "stream", "ip", "pageUrl", "swfUrl", "tcUrl", "url", "type", "publish", "alive"].map((ckey, i) => (
                          <td key={i + "-" + client.id}>{client[ckey] + ""}</td>
                        ))
                      }
                      <td>{client["kbps"]["recv_30s"] + ""}</td>
                      <td>{client["kbps"]["send_30s"] + ""}</td>
                    </tr>
                  ))
                }   
            </tbody>
          </table>
        </div>    
      </main>
    </>
  );
}

export default App;
