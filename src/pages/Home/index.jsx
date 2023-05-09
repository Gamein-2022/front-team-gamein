import { Navigate, useNavigate } from "react-router-dom";
import "./style.scss";

function Home() {
  if (localStorage.getItem("token")) {
    return <Navigate to={"/my-profile"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default Home;
