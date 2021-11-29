import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:9000/api/users/");
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      {users.map((us) => (
        <div>
          <h2>{us.name}</h2>
          <h3>{us.bio}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
