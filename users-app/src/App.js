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
  const [id, setId] = useState("");

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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axios.post(
        "http://localhost:9000/api/users/",
        formValues
      );
      setUsers([...users, newUser.data]);
      setFormValues(initalFormValues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenEdit = (id, name, bio) => {
    setEditing(true);
    setId(id);
    setFormValues({ name, bio });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:9000/api/users/${id}`,
        formValues
      );
      setUsers(
        users.map((us) => {
          return us.id === res.data.id ? res.data : us;
        })
      );
      setEditing(false);
      setFormValues(initalFormValues);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      {users.map((us, idx) => (
        <div key={idx}>
          <h2>{us.name}</h2>
          <h3>{us.bio}</h3>
          <button
            onClick={() => {
              handleOpenEdit(us.id, us.name, us.bio);
            }}
          >
            Edit User
          </button>
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
            <input name="bio" onChange={handleChanges} value={formValues.bio} />
          </label>
          {!editing ? (
            <button onClick={handleSubmit}>Add User</button>
          ) : (
            <button onClick={handleSubmitEdit}>Edit User</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
