import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Input from "../../components/Input";
import "./style.scss";

function MyProfile() {
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  return (
    <div className="my-profile__form">
      <Input label="نام فارسی" placeholder="نام فارسی" />
      <Input label="نام خانوادگی فارسی" placeholder="نام خانوادگی فارسی" />
      <Input label="نام انگلیسی" placeholder="نام انگلیسی" />
      <Input label="نام خانوادگی انگلیسی" placeholder="نام خانوادگی انگلیسی" />
      <div>
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="جنسیت"
          displayEmpty
          style={{ margin: "16px 0" }}
        >
          <MenuItem value="">جنسیت</MenuItem>
          <MenuItem value={"male"}>مرد</MenuItem>
          <MenuItem value={"female"}>زن</MenuItem>
        </Select>
      </div>
      <div>
        <Select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="مقطع تحصیلی"
          displayEmpty
          style={{ margin: "16px 0" }}
        >
          <MenuItem value="">مقطع تحصیلی</MenuItem>
          <MenuItem value={"دانش آموز"}>دانش آموز</MenuItem>
          <MenuItem value={"کاردانی"}>کاردانی</MenuItem>
          <MenuItem value={"کارشناسی"}>کارشناسی</MenuItem>
          <MenuItem value={"کارشناسی ارشد"}>کارشناسی ارشد</MenuItem>
          <MenuItem value={"دکتری"}>دکتری</MenuItem>
        </Select>
      </div>
      <Input label="" placeholder="" />
    </div>
  );
}

export default MyProfile;
