import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./style.scss";

function MyProfile() {
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  return (
    <div className="my-profile">
      <div className="my-profile__title">مشاهده پروفایل</div>
      <div className="my-profile__not-complete">
        پروفایل شما کامل نیست! برای تشکیل تیم یا هم‌تیمی شدن با بقیه پروفایلتون
        رو کامل کنین.
      </div>
      <div className="my-profile__complete">پروفایل شما کامل است :)</div>
      <Button type="blue">ویرایش اطلاعات</Button>
      <Button>ثبت اطلاعات</Button>
      <div className="my-profile__form">
        <Input label="نام فارسی" placeholder="نام فارسی" />
        <Input label="نام خانوادگی فارسی" placeholder="نام خانوادگی فارسی" />
        <Input label="نام انگلیسی" placeholder="نام انگلیسی" />
        <Input
          label="نام خانوادگی انگلیسی"
          placeholder="نام خانوادگی انگلیسی"
        />
        <div>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="جنسیت"
            displayEmpty
            style={{ margin: "16px 0" }}
          >
            <MenuItem value="">جنسیت</MenuItem>
            <MenuItem value={"MALE"}>مرد</MenuItem>
            <MenuItem value={"FEMALE"}>زن</MenuItem>
            <MenuItem value={"OTHER"}>سایر</MenuItem>
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
            <MenuItem value={"STUDENT"}>دانش آموز</MenuItem>
            <MenuItem value={"KARDANI"}>کاردانی</MenuItem>
            <MenuItem value={"BACHELOR"}>کارشناسی</MenuItem>
            <MenuItem value={"MASTER"}>کارشناسی ارشد</MenuItem>
            <MenuItem value={"PHD"}>دکتری</MenuItem>
          </Select>
        </div>
        <Input label="محل تحصیل" placeholder="محل تحصیل" />
        <Input label="سال ورود" placeholder="سال ورود" />
        <Input label="استان" placeholder="استان" />
        <Input label="شهر" placeholder="شهر" />
        <div>
          <div>از چه طریقی با گیمین آشنا شدی؟</div>
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="مقطع تحصیلی"
            displayEmpty
            style={{ margin: "16px 0" }}
          >
            <MenuItem value="">نحوه آشنایی با گیمین</MenuItem>
            <MenuItem value={"FRIENDS"}>دوستان و آشنایان</MenuItem>
            <MenuItem value={"INSTAGRAM"}>اینستاگرام</MenuItem>
            <MenuItem value={"TELEGRAM"}>تلگرام</MenuItem>
            <MenuItem value={"WEBSITE"}>وبسایت</MenuItem>
            <MenuItem value={"GOOGLE"}>سرچ گوگل</MenuItem>
            <MenuItem value={"APARAT"}>آپارات</MenuItem>
            <MenuItem value={"TWITTER"}>توییتر</MenuItem>
            <MenuItem value={"LINKEDIN"}>لینکدین</MenuItem>
            <MenuItem value={"OTHER"}>سایر</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
