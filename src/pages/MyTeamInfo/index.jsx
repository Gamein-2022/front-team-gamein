import { useEffect, useState } from "react";
import "./style.scss";
import { getTeamInfo, leaveTeam, createTeam } from "../../apis/team-building";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";

function MyTeamInfo() {
  const [teamName, setTeamName] = useState("");
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTeamInfo()
      .then((res) => {
        setTeamInfo(res.data);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-team-info">
      {isComplete && (
        <>
          <div style={{ maxWidth: 480 }}>
            <div className="my-team-info__title">اطلاعات تیم من</div>
            <Input
              label="اسم تیم"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            />
          </div>
          <Button
            type={"blue"}
            onClick={() => {
              setLoading(true);
              createTeam(teamName)
                .then((res) => {
                  setTeamInfo(res.data);
                })
                .catch((e) => {
                  toast.error(
                    e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
                  );
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            ویرایش
          </Button>
          <div className="my-team-info__person">
            <div>aliheidarime</div>
            <div>علی حیدری</div>
            <div>صنایع شریف</div>
          </div>
          <div className="my-team-info__no-team">جای هم‌تیمیت خالیه!</div>
          <div className="my-team-info__no-team">جای هم‌تیمیت خالیه!</div>
        </>
      )}
      {!isComplete && (
        <div style={{ textAlign: "center" }}>
          برای ادامه‌ی کار ابتدا پروفایل خود را تکمیل کنید.
        </div>
      )}
    </div>
  );
}

export default MyTeamInfo;
