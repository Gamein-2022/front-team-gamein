import gameinHeaderLogo from "../../assets/headerLogo.svg";

import "./style.scss";

function LayoutHeader() {
  return (
    <header className="layout-header">
      <img
        src={gameinHeaderLogo}
        alt="gamein logo"
        className="layout-header__logo"
      />
    </header>
  );
}

export default LayoutHeader;
