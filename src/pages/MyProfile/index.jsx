import { MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getProfileInfo, updateProfileInfo } from "../../apis/team-building";
import "./style.scss";
import { toast } from "react-toastify";
import { majors, provinces, universities } from "./constants";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import GameinLoading from "../../components/GameinLoading";
import {
  convertJalaliDateToGeorgian,
  convertNumberToEnglish,
  isEnglish,
  isPersian,
} from "../../utils/formatters";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Helmet } from "react-helmet";

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
  const [pageLoading, setPageLoading] = useState(false);

  const [persianNameError, setPersianNameError] = useState(false);
  const [persianSurnameError, setPersianSurnameError] = useState(false);
  const [engilshNameError, setEngilshNameError] = useState(false);
  const [englishSurnameError, setEnglishSurnameError] = useState(false);

  useEffect(() => {
    setPageLoading(true);
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
        setPageLoading(false);
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
      <Helmet>
        <title>پروفایل من</title>
      </Helmet>
      {pageLoading && <GameinLoading size={32} />}
      {!pageLoading && (
        <>
          <div
            style={{
              textAlign: "center",
              color: "#A8262B",
              fontWeight: 600,
              padding: 16,
              borderRadius: 8,
            }}
          >
            زمان تیم‌کشی به پایان رسیده.
            <br />
            با هم‌تیمی‌های خود ارتباط بگیرید.
          </div>
          <div className="my-profile__title">مشاهده پروفایل</div>
          {!isComplete && (
            <div className="my-profile__not-complete">
              پروفایل شما کامل نیست!
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
              disabled
            />
            <Input
              label="نام فارسی:"
              placeholder="نام فارسی"
              value={persianName}
              onChange={(e) => {
                setPersianName(e.target.value);
                if (isPersian(persianName)) {
                  setPersianNameError(false);
                } else {
                  setPersianNameError(true);
                }
              }}
              error={isPersian(persianName) ? "" : "فقط حروف فارسی"}
              disabled
            />
            <Input
              label="نام خانوادگی فارسی:"
              placeholder="نام خانوادگی فارسی"
              value={persianSurname}
              onChange={(e) => {
                setPersianSurname(e.target.value);
                if (isPersian(persianSurname)) {
                  setPersianSurnameError(false);
                } else {
                  setPersianSurnameError(true);
                }
              }}
              error={isPersian(persianSurname) ? "" : "فقط حروف فارسی"}
              disabled
            />
            <Input
              label="نام انگلیسی:"
              placeholder="نام انگلیسی"
              value={englishName}
              onChange={(e) => {
                setEnglishName(e.target.value);
                if (isEnglish(englishName)) {
                  setEngilshNameError(false);
                } else {
                  setEngilshNameError(true);
                }
              }}
              error={isEnglish(englishName) ? "" : "فقط حروف انگلیسی"}
              disabled
            />
            <Input
              label="نام خانوادگی انگلیسی:"
              placeholder="نام خانوادگی انگلیسی"
              value={englishSurname}
              onChange={(e) => {
                setEnglishSurname(e.target.value);
                if (isEnglish(englishSurname)) {
                  setEnglishSurnameError(false);
                } else {
                  setEnglishSurnameError(true);
                }
              }}
              error={isEnglish(englishSurname) ? "" : "فقط حروف انگلیسی"}
              disabled
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
                disabled
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
                disabled
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
            <div style={{ margin: "16px 0" }}>
              <div>رشته تحصیلی: </div>
              <Select
                value={major}
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
                placeholder="رشته تحصیلی"
                style={{ margin: "4px 0", minWidth: "50%" }}
                displayEmpty
                disabled
              >
                <MenuItem value={""} disabled>
                  رشته تحصیلی
                </MenuItem>
                {majors.map((maj) => (
                  <MenuItem key={maj} value={maj}>
                    {maj}
                  </MenuItem>
                ))}
                <MenuItem value={"سایر"}>سایر </MenuItem>
              </Select>
            </div>
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
                disabled
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
              label="سال ورود به دانشگاه/مدرسه:"
              placeholder="سال ورود"
              value={yearOfEntrance}
              type="number"
              min={1350}
              max={1402}
              onChange={(e) => {
                setYearOfEntrance(e.target.value);
              }}
              disabled
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
                disabled
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
              disabled
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
              disabled
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
                disabled
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
            <Button
              // disabled={
              //   persianNameError ||
              //   persianSurnameError ||
              //   engilshNameError ||
              //   englishSurnameError ||
              //   loading
              // }
              onClick={submitInfo}
              disabled
            >
              ویرایش اطلاعات
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyProfile;
