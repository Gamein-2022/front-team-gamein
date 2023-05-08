import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import gamein2022Img from "../../assets/gamein-2022.svg";
import dariaLogoImg from "../../assets/daria-logo.png";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { ScaleLoader } from "react-spinners";

import { login } from "../../apis/login";
import { toast } from "react-toastify";
// import { getInfo } from "../../apis/profile";
import "./style.scss";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        <title>ورود</title>
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
        <div className="login">
          <form className="login__form" onSubmit={handleSubmit} s>
            <img
              onClick={() => navigate("/login")}
              className="login__logo"
              src={gamein2022Img}
              alt="gamein 2022"
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login__input"
              placeholder="شماره موبایل یا ایمیل"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login__input"
              placeholder="کلمه عبور"
              type="password"
            />
            <div
              className="login__forget-password"
              onClick={() => navigate("/forget-password")}
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </div>
            <Button type={"white"} className="login__btn">
              ورود
            </Button>
            <a
              href="https://dariahamrah.ir/"
              target="_blank"
              rel="noreferrer"
              className="login__footer"
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

export default Login;
