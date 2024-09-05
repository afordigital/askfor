import {  useNavigate } from "react-router-dom";

export default function WelcomePage() {
      const navigate = useNavigate();

    return <div>
        <h1>Open channel</h1>
        <button onClick={() => {
            navigate('/afor_digital')
        }}>click aca</button>
    </div>
}