import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getProfileInfo, updateProfileInfo } from "../../apis/team-building";
import "./style.scss";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function MyProfile() {
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [education, setEducation] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [englishSurname, setEnglishSurname] = useState("");
  const [gender, setGender] = useState("");
  const [introductionMethod, setIntroductionMethod] = useState("");
  const [major, setMajor] = useState("");
  const [persianName, setPersianName] = useState("");
  const [persianSurname, setPersianSurname] = useState("");
  const [province, setProvince] = useState("");
  const [school, setSchool] = useState("");
  const [username, setUsername] = useState("");
  const [yearOfEntrance, setYearOfEntrance] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProfileInfo()
      .then((res) => res.data.result)
      .then((res) => {
        setCity(res.city || "");
        setDob(res.dob ? dayjs(res.dob) : "");
        setEducation(res.education || "");
        setEnglishName(res.englishName || "");
        setEnglishSurname(res.englishSurname || "");
        setGender(res.gender || "");
        setIntroductionMethod(res.introductionMethod || "");
        setMajor(res.major || "");
        setPersianName(res.persianName || "");
        setPersianSurname(res.persianSurname || "");
        setProvince(res.province || "");
        setSchool(res.school || "");
        setUsername(res.username || "");
        setYearOfEntrance(res.yearOfEntrance || "");
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const submitInfo = () => {
    setLoading(true);
    updateProfileInfo({
      city: city || null,
      dob: dob
        ? `${dob.$y}-${String(dob.$M + 1).padStart(2, "0")}-${String(
            dob.$D
          ).padStart(2, "0")}T00:00:00.000Z`
        : null,
      education: education || null,
      englishName: englishName || null,
      englishSurname: englishSurname || null,
      gender: gender || null,
      introductionMethod: introductionMethod || null,
      major: major || null,
      persianName: persianName || null,
      persianSurname: persianSurname || null,
      province: province || null,
      school: school || null,
      username: username || null,
      yearOfEntrance: yearOfEntrance || null,
    })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="my-profile">
        <div className="my-profile__title">مشاهده پروفایل</div>
        {/* <div className="my-profile__not-complete">
        پروفایل شما کامل نیست! برای تشکیل تیم یا هم‌تیمی شدن با بقیه پروفایلتون
        رو کامل کنین.
      </div>
      <div className="my-profile__complete">پروفایل شما کامل است :)</div> */}
        {/* <Button type="blue">ویرایش اطلاعات</Button> */}
        <Button onClick={submitInfo} disabled={loading}>
          ثبت اطلاعات
        </Button>
        <div className="my-profile__form">
          <Input
            label="نام کاربری"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            label="نام فارسی"
            placeholder="نام فارسی"
            value={persianName}
            onChange={(e) => {
              setPersianName(e.target.value);
            }}
          />
          <Input
            label="نام خانوادگی فارسی"
            placeholder="نام خانوادگی فارسی"
            value={persianSurname}
            onChange={(e) => {
              setPersianSurname(e.target.value);
            }}
          />
          <Input
            label="نام انگلیسی"
            placeholder="نام انگلیسی"
            value={englishName}
            onChange={(e) => {
              setEnglishName(e.target.value);
            }}
          />
          <Input
            label="نام خانوادگی انگلیسی"
            placeholder="نام خانوادگی انگلیسی"
            value={englishSurname}
            onChange={(e) => {
              setEnglishSurname(e.target.value);
            }}
          />
          <div>
            <Select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              style={{ margin: "16px 0" }}
              displayEmpty
            >
              <MenuItem value={""} disabled>
                جنسیت
              </MenuItem>
              <MenuItem value={"MALE"}>مرد</MenuItem>
              <MenuItem value={"FEMALE"}>زن</MenuItem>
              <MenuItem value={"OTHER"}>سایر</MenuItem>
            </Select>
          </div>
          <div>
            <Select
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
              }}
              placeholder="مقطع تحصیلی"
              style={{ margin: "16px 0" }}
              displayEmpty
            >
              <MenuItem value={""} disabled>
                مقطع تحصیلی
              </MenuItem>
              <MenuItem value={"STUDENT"}>دانش آموز</MenuItem>
              <MenuItem value={"KARDANI"}>کاردانی</MenuItem>
              <MenuItem value={"BACHELOR"}>کارشناسی</MenuItem>
              <MenuItem value={"MASTER"}>کارشناسی ارشد</MenuItem>
              <MenuItem value={"PHD"}>دکتری</MenuItem>
            </Select>
          </div>
          <Input
            label="رشته تحصیلی"
            placeholder="رشته تحصیلی"
            value={major}
            onChange={(e) => {
              setMajor(e.target.value);
            }}
          />
          <Input
            label="محل تحصیل"
            placeholder="محل تحصیل"
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
            }}
          />
          <Input
            label="سال ورود"
            placeholder="سال ورود"
            value={yearOfEntrance}
            type="number"
            onChange={(e) => {
              setYearOfEntrance(e.target.value);
            }}
          />
          <Input
            label="استان"
            placeholder="استان"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
            }}
          />
          <Input
            label="شهر"
            placeholder="شهر"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <div dir="ltr">
            <DatePicker
              dir="ltr"
              value={dob}
              onChange={(newValue) => {
                setDob(newValue);
              }}
            />
          </div>
          <div>
            <Select
              value={introductionMethod}
              onChange={(e) => {
                setIntroductionMethod(e.target.value);
              }}
              placeholder="مقطع تحصیلی"
              displayEmpty
              style={{ margin: "16px 0" }}
            >
              <MenuItem value={""} disabled>
                نحوه آشنایی با گیمین
              </MenuItem>
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
    </LocalizationProvider>
  );
}

export default MyProfile;
