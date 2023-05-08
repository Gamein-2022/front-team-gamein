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
      <div>جستجوی بازیکن‌ها</div>
      <Input label="جستجوی بازیکن" placeholder="جستجوی بازیکن" />
      <Button>جستجو</Button>
    </div>
  );
}

export default Search;
