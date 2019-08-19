import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateNote = (props) => {

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [editing, setEditing] = useState(false);
  const [_id, setId] = useState('');
  const editNoteId = props.match.params.id;


  useEffect(() => {
    console.log(editNoteId);

    const getUsers = async () => {
      const res = await axios.get('http://localhost:4000/api/users');
      setUsers(res.data.map(user => user.username));
      if (res.data[0]) {
        setUserSelected(res.data[0].username);
      }

      if (editNoteId) {
        const { data } = await axios.get(`http://localhost:4000/api/notes/${editNoteId}`);
        //console.log(data.date);
        setTitle(data.title);
        setContent(data.content);
        setDate(new Date(data.date));
        setUserSelected(data.author);
        setEditing(true);
        setId(editNoteId);
      }
    }
    getUsers();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: title,
      content: content,
      date: date,
      author: userSelected
    };
    if (editing) {
      console.log(newNote)
      await axios.put(`http://localhost:4000/api/notes/${_id}`, newNote);
    } else {
      console.log(newNote)

      await axios.post('http://localhost:4000/api/notes', newNote);
    }
    //window.location.href = '/';
  }

  const onInputChange = e => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
  }

  const onChangeDate = date => {
    // this.setState({ date });
  }

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create a note</h4>

        {/* SELECT USER */}
        <div className="form-group">
          <select
            className="form-control"
            name="userSelected"
            onChange={onInputChange}
            value={userSelected}
          >
            {
              users.map(user =>
                <option key={user} value={user}>
                  {user}
                </option>)
            }

          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            onChange={onInputChange}
            value={title}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            onChange={onInputChange}
            value={content}
            required
          >

          </textarea>
        </div>

        <div className="form-group">
          <DatePicker
            className="form-control"
            selected={date}
            onChange={onChangeDate}
          />
        </div>

        <form onSubmit={onSubmit}>

          <button type="submit" className="btn btn-primary">
            Save
            </button>
        </form>

      </div>
    </div>
  )
}

export default CreateNote;
