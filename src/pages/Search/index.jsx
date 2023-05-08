import { useEffect, useState } from "react";
import "./style.scss";
import { getUsers, sendOffer } from "../../apis/team-building";

function Search() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div>
          <div>{user.name}</div>
          <div>
            <button
              onClick={() => {
                sendOffer(user.id).then((res) => {
                  // debugger;
                });
              }}
            >
              Send Offer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Search;
