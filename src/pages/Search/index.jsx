import { useEffect, useState } from "react";
import "./style.scss";
import { getUsers, sendOffer } from "../../apis/team-building";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import GameinLoading from "../../components/GameinLoading";
import { Helmet } from "react-helmet";

function Search() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    getUsers()
      .then((res) => {
        setUsers(res.data.result);
        setActiveUsers(res.data.result);
        setIsComplete(true);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          setIsComplete(false);
        }
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const handleSendInvitation = (id) => {
    sendOffer(id)
      .then((res) => res.data)
      .then((data) => {
        toast.success("دعوت با موفقیت فرستاده شد.");
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message || "مشکلی در سامانه رخ داده است!"
        );
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveUsers(
      users.filter(
        (item) =>
          String(item.persianName + " " + item.persianSurname)
            .toLowerCase()
            .includes(String(searchValue).toLowerCase()) ||
          String(item.username)
            .toLowerCase()
            .includes(String(searchValue).toLowerCase())
      )
    );
  };

  return (
    <div className="search">
      <Helmet>
        <title>جستجوی بازیکن‌ها</title>
      </Helmet>
      {pageLoading && <GameinLoading size={32} />}
      {!pageLoading && (
        <>
          {isComplete && (
            <>
              <div className="search__title">جستجوی بازیکن‌ها</div>
              <form onSubmit={handleSearch} style={{ maxWidth: 480 }}>
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  label="جستجوی بازیکن:"
                  placeholder="جستجوی بازیکن"
                />
                <Button type={"blue"}>جستجو</Button>
              </form>
              {activeUsers.length > 0 && (
                <div className="search-table__wrapper">
                  <table className="search-table">
                    <thead>
                      <tr className="search-table__head">
                        <th>نام کاربری</th>
                        <th>نام و نام خانوادگی</th>
                        <th>محل تحصیل</th>
                        <th>رشته</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeUsers.map((user) => (
                        <tr className="search-table__row">
                          <td>{user.username}</td>
                          <td>
                            {user.persianName + " " + user.persianSurname}
                          </td>
                          <td>{user.school || "-"}</td>
                          <td>{user.major || "-"}</td>
                          <td>
                            <Button
                              onClick={() => handleSendInvitation(user.id)}
                            >
                              دعوت به تیم
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeUsers.length <= 0 && <div>هیچ کاربری یافت نشد!</div>}
            </>
          )}
          {!isComplete && (
            <div style={{ textAlign: "center" }}>
              برای ادامه‌ی کار ابتدا پروفایل خود را تکمیل کنید.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
