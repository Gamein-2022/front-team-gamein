import { useEffect, useState } from "react";
import "./style.scss";
import { getUsers, sendOffer } from "../../apis/team-building";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Search() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="search">
      <div className="search__title">جستجوی بازیکن‌ها</div>
      <div style={{ maxWidth: 480 }}>
        <Input label="جستجوی بازیکن:" placeholder="جستجوی بازیکن" />
        <Button type={"blue"}>جستجو</Button>
      </div>
      <table className="search-table">
        <thead>
          <tr className="search-table__head">
            <th>نام کاربری</th>
            <th>نام و نام خانوادگی</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="search-table__row">
            <td>aliheidari</td>
            <td>علی حیدری</td>
            <td>
              <Button>دعوت به تیم</Button>
            </td>
          </tr>
          <tr className="search-table__row">
            <td>aliheidari</td>
            <td>علی حیدری</td>
            <td>
              <Button>دعوت به تیم</Button>
            </td>
          </tr>
          <tr className="search-table__row">
            <td>aliheidari</td>
            <td>علی حیدری</td>
            <td>
              <Button>دعوت به تیم</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Search;
