import { useEffect, useState } from "react";
import "./style.scss";
import { getMyOffers, acceptOffer } from "../../apis/team-building";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function TeamRequests() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    getMyOffers().then((res) => {
      setOffers(res.data);
    });
  }, []);

  return (
    <div className="team-requests">
      <div className="team-requests__title">درخواست‌های هم‌تیمی شدن</div>
      <div>درخواست‌های دیگران</div>
      <div className="other-request">
        <div className="other-request__row">
          <div className="other-request__column">ali heidari</div>
          <div className="other-request__column">ali heidari</div>
          <div className="other-request__column">ali heidari</div>
          <div className="other-request__column">ali heidari</div>
          <div className="other-request__check">
            <CheckIcon />
          </div>
          <div className="other-request__close">
            <CloseIcon />
          </div>
        </div>
      </div>
      <div>درخواست‌های من (در انتظار تایید)</div>
    </div>
  );
}

export default TeamRequests;
