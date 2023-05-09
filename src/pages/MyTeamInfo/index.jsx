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

  const updateTeamInfo = () => {
    setLoading(true);
    getTeamInfo()
      .then((res) => {
        setTeamInfo(res.data.result);
        setTeamName(res.data.result.name);
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
  };
  useEffect(() => {
    setLoading(true);
    getTeamInfo()
      .then((res) => {
        setTeamInfo(res.data.result);
        setTeamName(res.data.result.name);
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
              placeholder="اسم تیم"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            />
          </div>
          {!teamInfo?.name && (
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
                      e?.response?.data?.message ||
                        "مشکلی در سامانه رخ داده است!"
                    );
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              ساخت تیم
            </Button>
          )}
          {teamInfo?.name && (
            <Button
              type={"error"}
              onClick={() => {
                leaveTeam()
                  .then((res) => {
                    toast.success("با موفقیت از تیم خارج شدید.");
                    updateTeamInfo();
                  })
                  .catch((e) => {
                    toast.error(
                      e?.response?.data?.message ||
                        "مشکلی در سامانه رخ داده است!"
                    );
                  })
                  .finally(() => {});
              }}
            >
              خروج از تیم
            </Button>
          )}
          {teamInfo?.users?.map((user) => (
            <div className="my-team-info__person">
              <div>{user.username}</div>
              <div>{user.persianName + " " + user.persianSurName}</div>
            </div>
          ))}
          {Array(3 - (teamInfo?.users?.length || 0))
            .fill(null)
            .map((item, index) => (
              <div className="my-team-info__no-team">جای هم‌تیمیت خالیه!</div>
            ))}
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
