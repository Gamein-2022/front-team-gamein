import { MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getProfileInfo, updateProfileInfo } from "../../apis/team-building";
import "./style.scss";
import { toast } from "react-toastify";
import { provinces, universities } from "./constants";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import {
  convertJalaliDateToGeorgian,
  convertNumberToEnglish,
} from "../../utils/formatters";

function MyProfile() {
  const [isComplete, setIsComplete] = useState(false);
  const [city, setCity] = useState("");
  const [dob, setDob] = useState(null);
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
  const startDatePickerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getProfileInfo()
      .then((res) => res.data.result)
      .then((res) => {
        setIsComplete(res.isComplete || "");
        setCity(res.city || "");
        const initialDob = convertNumberToEnglish(
          new Date(res.dob).toLocaleString("fa-IR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        );
        setDob(initialDob);
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
      dob: convertJalaliDateToGeorgian(dob.toString()) + `T00:00`,
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
      .then((res) => {
        toast.success("اطلاعات با موفقیت ویرایش شد.");
        setIsComplete(res.data.result.isComplete);
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
    <div className="my-profile">
      <div className="my-profile__title">مشاهده پروفایل</div>
      {!isComplete && (
        <div className="my-profile__not-complete">
          پروفایل شما کامل نیست! برای تشکیل تیم یا هم‌تیمی شدن با بقیه
          پروفایلتون رو کامل کنین.
        </div>
      )}
      {isComplete && (
        <div className="my-profile__complete">پروفایل شما کامل است :)</div>
      )}
      <div className="my-profile__form">
        <Input
          label="نام کاربری:"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          label="نام فارسی:"
          placeholder="نام فارسی"
          value={persianName}
          onChange={(e) => {
            setPersianName(e.target.value);
          }}
        />
        <Input
          label="نام خانوادگی فارسی:"
          placeholder="نام خانوادگی فارسی"
          value={persianSurname}
          onChange={(e) => {
            setPersianSurname(e.target.value);
          }}
        />
        <Input
          label="نام انگلیسی:"
          placeholder="نام انگلیسی"
          value={englishName}
          onChange={(e) => {
            setEnglishName(e.target.value);
          }}
        />
        <Input
          label="نام خانوادگی انگلیسی:"
          placeholder="نام خانوادگی انگلیسی"
          value={englishSurname}
          onChange={(e) => {
            setEnglishSurname(e.target.value);
          }}
        />
        <div style={{ margin: "16px 0" }}>
          <div>جنسیت:</div>
          <Select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            style={{ margin: "4px 0", minWidth: "50%" }}
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
        <div style={{ margin: "16px 0" }}>
          <div>مقطع تحصیلی: </div>
          <Select
            value={education}
            onChange={(e) => {
              setEducation(e.target.value);
            }}
            placeholder="مقطع تحصیلی"
            style={{ margin: "4px 0", minWidth: "50%" }}
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
          label="رشته تحصیلی:"
          placeholder="رشته تحصیلی"
          value={major}
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        />
        <div style={{ margin: "16px 0" }}>
          <div>محل تحصیل: </div>
          <Select
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
            }}
            placeholder="محل تحصیل"
            style={{ margin: "4px 0", minWidth: "50%" }}
            displayEmpty
          >
            <MenuItem value={""} disabled>
              محل تحصیل
            </MenuItem>
            {universities.map((uni) => (
              <MenuItem key={uni} value={uni}>
                {uni}
              </MenuItem>
            ))}
            <MenuItem value={"سایر"}>سایر </MenuItem>
          </Select>
        </div>
        <Input
          label="سال ورود:"
          placeholder="سال ورود"
          value={yearOfEntrance}
          type="number"
          onChange={(e) => {
            setYearOfEntrance(e.target.value);
          }}
        />
        <div style={{ margin: "16px 0" }}>
          <div>استان: </div>
          <Select
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
            }}
            placeholder="استان"
            style={{ margin: "4px 0", minWidth: "50%" }}
            displayEmpty
          >
            <MenuItem value={""} disabled>
              استان
            </MenuItem>
            {provinces.map((prov) => (
              <MenuItem key={prov.en} value={prov.en}>
                {prov.fa}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Input
          label="شهر"
          placeholder="شهر"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Input
          label="تاریخ تولد:"
          autoComplete="off"
          onFocus={() => startDatePickerRef.current.openCalendar()}
          onClick={() => startDatePickerRef.current.openCalendar()}
          placeholder="انتخاب تاریخ تولد"
          type="text"
          id="start-date"
          value={dob ? dob.toString() : ""}
        />
        <DatePicker
          ref={startDatePickerRef}
          inputClass="date-input"
          className="rmdp-mobile"
          onChange={(date) => {
            setDob(date);
          }}
          calendar={persian}
          locale={persian_fa}
        />
        <div style={{ margin: "16px 0" }}>
          <div>نحوه آشنایی با گیمین</div>
          <Select
            value={introductionMethod}
            onChange={(e) => {
              setIntroductionMethod(e.target.value);
            }}
            placeholder="مقطع تحصیلی"
            displayEmpty
            style={{ margin: "4px 0", minWidth: "50%" }}
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
        <Button type="blue" onClick={submitInfo} disabled={loading}>
          ویرایش اطلاعات
        </Button>
      </div>
    </div>
  );
}

export default MyProfile;
