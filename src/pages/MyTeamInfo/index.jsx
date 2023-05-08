import { useEffect, useState } from "react";
import "./style.scss";
import {
  getSentOffers,
  getTeamInfo,
  leaveTeam,
} from "../../apis/team-building";
import Input from "../../components/Input";

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
    <div className="my-team-info">
      <div className="my-team-info__title">اطلاعات تیم من</div>
      <Input label="اسم تیم" />
      <div>
        <div>aliheidarime</div>
        <div>علی حیدری</div>
        <div>صنایع شریف</div>
      </div>
      <div>جای هم‌تیمیت خالیه!</div>
      <div>جای هم‌تیمیت خالیه!</div>
    </div>
  );
}

export default MyTeamInfo;
