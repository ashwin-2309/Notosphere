import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Badge,
  Accordion,
  AccordionCollapse,
  AccordionButton,
} from "react-bootstrap";
import axios from "axios";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
// import notes from "../../data/notes";
// import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // delete notes
    }
  };
  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
    console.log(notes);
  }, []);

  return (
    <MainScreen title='Welcome Back Ash'>
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create New Note
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  fontSize: "18px",
                  alignSelf: "center",
                }}
              >
                <AccordionButton as={Card.Text}>{note.title}</AccordionButton>
              </span>
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  onClick={() => deleteHandler(note._id)}
                  variant='danger'
                  className='mx-2'
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <AccordionCollapse eventKey={note._id + "note"}>
              <Card.Body>
                <h4>
                  <Badge>Category - {note.category}</Badge>
                </h4>
                <blockquote className='blockquote mb-0'>
                  <p>{note.content}</p>
                  <footer className='blockquote-footer'>
                    Created on -{note.createdAt || Date.now()}
                  </footer>
                </blockquote>
              </Card.Body>
            </AccordionCollapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};
export default MyNotes;
