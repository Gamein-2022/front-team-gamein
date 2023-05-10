import { useEffect, useState } from "react";
import "./style.scss";
import {
  getMyOffers,
  acceptOffer,
  getSentOffers,
  declineOthersOffer,
  cancelSentOffer,
} from "../../apis/team-building";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { toast } from "react-toastify";
import GameinLoading from "../../components/GameinLoading";

function TeamRequests() {
  const [otherOffers, setOtherOffers] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [pageLoading, setPageLoading] = useState([false, false]);

  useEffect(() => {
    setPageLoading([true, true]);
    getMyOffers()
      .then((res) => {
        setOtherOffers(res.data.result);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
      })
      .finally(() => {
        setPageLoading((old) => [false, old[1]]);
      });
    getSentOffers()
      .then((res) => {
        setMyOffers(res.data.result);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
      })
      .finally(() => {
        setPageLoading((old) => [old[0], false]);
      });
  }, []);

  const updateOffers = () => {
    getMyOffers()
      .then((res) => {
        setOtherOffers(res.data.result);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
      });
    getSentOffers()
      .then((res) => {
        setMyOffers(res.data.result);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
      });
  };

  const handleAcceptOffer = (id) => {
    acceptOffer(id)
      .then((res) => res.data)
      .then((data) => {
        toast.success("پیشنهاد با موفقیت پذیرفته شد.");
        updateOffers();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      });
  };

  const handleRejectOffer = (id) => {
    declineOthersOffer(id)
      .then((res) => res.data)
      .then((data) => {
        toast.success("پیشنهاد با موفقیت رد شد.");
        updateOffers();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      });
  };

  const handleCancelMyOffer = (id) => {
    cancelSentOffer(id)
      .then((res) => res.data)
      .then((data) => {
        toast.success("پیشنهاد با موفقیت حذف شد.");
        updateOffers();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      });
  };

  return (
    <div className="team-requests">
      {pageLoading[0] || pageLoading[1] ? (
        <GameinLoading size={32} />
      ) : (
        <>
          {isComplete && (
            <>
              <div className="team-requests__title">
                درخواست‌های هم‌تیمی شدن
              </div>
              <div className="request__section-title">درخواست‌های دیگران</div>
              {otherOffers?.length <= 0 && <div>شما هیچ درخواستی ندارید.</div>}
              {otherOffers?.map((offer) => (
                <div className="other-request">
                  <div className="other-request__row">
                    <div className="my-request__column">{`کاربر ${
                      (offer?.persianName || " ") +
                      " " +
                      (offer?.persianSurname || " ")
                    } از تیم ${offer?.teamName}`}</div>
                    <div
                      onClick={() => handleAcceptOffer(offer?.id)}
                      className="other-request__check"
                    >
                      <CheckIcon />
                    </div>
                    <div
                      onClick={() => handleRejectOffer(offer?.id)}
                      className="other-request__close"
                    >
                      <CloseIcon />
                    </div>
                  </div>
                </div>
              ))}

              <div className="request__section-title">
                درخواست‌های من (در انتظار تایید)
              </div>
              {myOffers?.length <= 0 && <div>شما هیچ درخواستی ندارید.</div>}
              {myOffers.map((offer) => (
                <div className="my-request">
                  <div className="my-request__row">
                    <div className="my-request__column">
                      به کاربر {offer?.persianName} {offer?.persianSurname}
                    </div>
                    <div className="my-request__column">
                      با نام کاربری {offer?.username}
                    </div>
                    <div
                      onClick={() => handleCancelMyOffer(offer.id)}
                      className="my-request__delete"
                    >
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
        </>
      )}
    </div>
  );
}

export default TeamRequests;
