import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import gamein2022Img from "../../assets/gamein-2022.svg";
import dariaLogoImg from "../../assets/daria-logo.png";
import { useNavigate } from "react-router-dom";
import { ClipLoader, ScaleLoader } from "react-spinners";
import Button from "../../components/Button";

import { login } from "../../apis/login";
import { toast } from "react-toastify";
// import { getInfo } from "../../apis/profile";
import "./style.scss";

function ForgetPassword() {
  const [username, setUsername] = useState();
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [step, setStep] = useState("forget-password");

  const navigate = useNavigate();

  //   useEffect(() => {
  //     getInfo()
  //       .then((res) => res.data)
  //       .then((data) => {
  //         navigate("/choose-region");
  //       })
  //       .catch((error) => {
  //         if (error?.response?.status !== 401) {
  //           setHasError(true);
  //         }
  //       })
  //       .finally(() => {
  //         setPageLoading(false);
  //       });
  //   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("نام کاربری یا ایمیل نمی‌تواند خالی باشد.");
      return;
    }

    if (!password) {
      toast.error("رمز عبور نمی‌تواند خالی باشد.");
      return;
    }

    setLoading(true);
    login({ username, password })
      .then((res) => {
        toast.success("با موفقیت وارد شدید.");
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          toast.error("شماره موبایل یا ایمیل به درستی وارد نشده است.");
        } else if (error.response?.status === 400) {
          toast.error("اطلاعات به درستی وارد نشده است.");
        } else {
          toast.error("مشکلی در سامانه رخ داده است.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>فراموشی رمز عبور</title>
      </Helmet>
      {pageLoading && (
        <div className="layout-loader">
          <ScaleLoader color="#000" />
        </div>
      )}
      {!pageLoading && hasError && (
        <div className="layout-error">
          <div> مشکلی در سامانه رخ داده!</div>
          لطفا دوباره تلاش کنید.
        </div>
      )}
      {!loading && !hasError && (
        <div className="forget-password">
          <form className="forget-password__form" onSubmit={handleSubmit} s>
            <img
              onClick={() => navigate("/login")}
              className="forget-password__logo"
              src={gamein2022Img}
              alt="gamein 2022"
            />
            {step === "forget-password" && (
              <>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="forget-password__input"
                  placeholder="ایمیل"
                />
                <div
                  className="forget-password__forget-password"
                  onClick={() => navigate("/login")}
                >
                  بازگشت به صفحه ورود
                </div>
                <Button
                  onClick={() => {
                    setStep("submit-code");
                  }}
                  type={"white"}
                  className="forget-password__btn"
                >
                  ارسال کد تایید
                </Button>
              </>
            )}
            {step === "submit-code" && (
              <>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="forget-password__input"
                  placeholder="کد ارسال شده"
                />
                <input
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="forget-password__input"
                  placeholder="رمز عبور جدید"
                />
                <input
                  type={"password"}
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  className="forget-password__input"
                  placeholder="تکرار رمز عبور جدید"
                />
                <div
                  className="forget-password__forget-password"
                  onClick={() => setStep("forget-password")}
                >
                  تغییر ایمیل
                </div>
                <Button
                  onClick={() => {}}
                  type={"white"}
                  className="forget-password__btn"
                >
                  ثبت رمز عبور جدید
                </Button>
              </>
            )}
            <a
              href="https://dariahamrah.ir/"
              target="_blank"
              rel="noreferrer"
              className="forget-password__footer"
            >
              <div>با حمایت </div>
              <img src={dariaLogoImg} alt="Daria logo" />
            </a>
          </form>
        </div>
      )}
    </>
  );
}

export default ForgetPassword;
