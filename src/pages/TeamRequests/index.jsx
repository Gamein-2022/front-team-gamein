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
      <div>درخواست‌های هم‌تیمی شدن</div>
      <div className="other-request">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <CheckIcon />
        </div>
        <div>
          <CloseIcon />
        </div>
      </div>
      <div>درخواست‌های دیگران</div>
      <div>درخواست‌های من (در انتظار تایید)</div>
    </div>
  );
}

export default TeamRequests;
