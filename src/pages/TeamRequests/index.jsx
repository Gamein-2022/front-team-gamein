import { useEffect, useState } from "react";
import "./style.scss";
import { getMyOffers, acceptOffer } from "../../apis/team-building";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { toast } from "react-toastify";

function TeamRequests() {
  const [offers, setOffers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    getMyOffers()
      .then((res) => {
        setOffers(res.data);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      });
  }, []);

  return (
    <div className="team-requests">
      {isComplete && (
        <>
          <div className="team-requests__title">درخواست‌های هم‌تیمی شدن</div>
          <div>درخواست‌های دیگران</div>
          {[0, 1, 2].map(() => (
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
          ))}

          <div>درخواست‌های من (در انتظار تایید)</div>
          {[0, 1, 2].map(() => (
            <div className="my-request">
              <div className="my-request__row">
                <div className="my-request__column">ali heidari</div>
                <div className="my-request__column">ali heidari</div>
                <div className="my-request__column">ali heidari</div>
                <div className="my-request__column">ali heidari</div>
                <div className="my-request__delete">
                  <DeleteForeverOutlinedIcon />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {!isComplete && (
        <div style={{ textAlign: "center", color: "#000" }}>
          برای ادامه‌ی کار ابتدا پروفایل خود را تکمیل کنید.
        </div>
      )}
    </div>
  );
}

export default TeamRequests;
