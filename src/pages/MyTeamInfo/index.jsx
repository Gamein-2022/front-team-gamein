import { useEffect, useState } from "react";
import "./style.scss";
import {
  getSentOffers,
  getTeamInfo,
  leaveTeam,
} from "../../apis/team-building";

function MyTeamInfo() {
  const [teamInfo, setTeamInfo] = useState(null);
  const [sentOffers, setSentOffers] = useState([]);
  useEffect(() => {
    getTeamInfo().then((res) => {
      setTeamInfo(res.data);
    });
  }, []);
  useEffect(() => {
    getSentOffers().then((res) => {
      setSentOffers(res.data);
    });
  }, []);

  return (
    <div>
      {teamInfo && (
        <div>
          <div>{teamInfo.name}</div>
          <div>
            <button onClick={() => leaveTeam()}>leave</button>
          </div>
          <hr />
          <div>
            {[0, 1, 2].map((user) => {
              return <div>{teamInfo.users[user]?.name}</div>;
            })}
          </div>
        </div>
      )}
      <hr />
      <h4>sent offers</h4>
      <div>
        {sentOffers.map((offer) => {
          return <div>{offer.username}</div>;
        })}
      </div>
    </div>
  );
}

export default MyTeamInfo;
