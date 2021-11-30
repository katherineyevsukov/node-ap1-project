import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const initalFormValues = {
  name: "",
  bio: "",
};

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState(initalFormValues);

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

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/users/${id}`);
      setUsers(users.filter((us) => us.id !== res.data.id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChanges = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = await axios.post('http://localhost:9000/api/users/', formValues)
      setUsers([...users, newUser.data])
      setFormValues(initalFormValues)
    } catch (err) {
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
          <button
            onClick={() => {
              deleteUser(us.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <div>
        <form>
          <label>
            Name:
            <input 
            name="name"
            onChange={handleChanges}
            value={formValues.name}
            />
          </label>
          <label>
            Bio:
            <input 
            name="bio"
            onChange={handleChanges}
            value={formValues.bio}
            />
          </label>
          <button onSubmit={handleSubmit}>"Add User"</button>
        </form>
      </div>
    </div>
  );
}

export default App;
