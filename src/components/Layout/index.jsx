import classNames from "classnames";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import LayoutHeader from "../LayoutHeader";

import "./style.scss";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {loading && (
        <div className="layout-loader">
          <ScaleLoader color="#000" />
        </div>
      )}
      {!loading && hasError && (
        <div className="layout-error">
          <div> مشکلی در سامانه رخ داده!</div>
          لطفا دوباره تلاش کنید.
        </div>
      )}
      {!loading && !hasError && (
        <div className="layout">
          <LayoutHeader />
          <div className="layout__body">
            <div className="layout__right">
              <div className="layout__right-top">
                <NavLink
                  className={({ isActive }) =>
                    classNames("layout__right-item", {
                      " layout__right-item--active": isActive,
                    })
                  }
                  to="/my-profile"
                  style={{ zIndex: 5 }}
                >
                  پروفایل من
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    classNames("layout__right-item", {
                      "layout__right-item--active": isActive,
                    })
                  }
                  to="/my-team-info"
                  style={{ zIndex: 4 }}
                >
                  اطلاعات تیم من
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    classNames("layout__right-item", {
                      "layout__right-item--active": isActive,
                    })
                  }
                  to="/search"
                  style={{ zIndex: 3 }}
                >
                  جستجوی بازیکن‌ها
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    classNames("layout__right-item", {
                      "layout__right-item--active": isActive,
                    })
                  }
                  to="/team-requests"
                  style={{ zIndex: 2 }}
                >
                  درخواست‌های هم‌تیمی شدن
                </NavLink>
                <div
                  className={"layout__right-item"}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  style={{ zIndex: 1 }}
                >
                  خروج
                </div>
              </div>
            </div>
            <div className="layout__left">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
