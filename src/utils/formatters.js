import moment from "jalali-moment";

export const convertNumberToEnglish = (input) => {
  input = `${input}`;
  const english = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": 3,
    "۴": 4,
    "۵": 5,
    "۶": 6,
    "۷": 7,
    "۸": 8,
    "۹": 9,
  };
  let res = "";
  for (let i = 0; i < input.length; i++) {
    let char = input.charAt(i);
    if (english[char]) {
      char = english[char];
    }
    res += char;
  }
  return res;
};

export const convertJalaliDateToGeorgian = (date) => {
  return moment
    .from(convertNumberToEnglish(date), "fa", "YYYY/MM/DD")
    .format("YYYY-MM-DD");
};
