import { useEffect, useState } from "react";
import "./style.scss";
import { getMyOffers, acceptOffer } from "../../apis/team-building";

function TeamRequests() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    getMyOffers().then((res) => {
      setOffers(res.data);
    });
  }, []);

  return (
    <div>
      {offers.map((offer) => {
        return (
          <div>
            <div>{offer.teamName}</div>
            <div>
              <button onClick={() => acceptOffer(offer.id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TeamRequests;
