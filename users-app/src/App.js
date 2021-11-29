import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:9000/api/users/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async(id) => {
    try{
      const res = await axios.delete(`http://localhost:9000/api/users/${id}`)
      setUsers(users.filter(us => us.id !== res.data.id))
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      {users.map((us, idx) => (
        <div key={idx}>
          <h2>{us.name}</h2>
          <h3>{us.bio}</h3>
          <button onClick={() => {deleteUser(us.id)}}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
