import React, { useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Collapsible from "react-collapsible";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const editHandler = (id) => {
    navigate(`/note/${id}`);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // delete notes
      dispatch(deleteNoteAction(id));
    }
  };
  useEffect(() => {
    // call action in redux
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}`}>
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create New Note
        </Button>
      </Link>
      {/* if something inside of errorDelete render an error message */}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}
      {/* if loadingDelete is true loading sign should be there */}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter(
          (note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase()) ||
            note.category.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <div key={note._id} style={{ margin: "10px" }}>
            <Collapsible
              trigger={
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
                    {note.title}
                  </span>
                  <div>
                    <Button
                      onClick={() => editHandler(note._id)}
                      className='mx-2'
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteHandler(note._id)}
                      variant='danger'
                      className='mx-2'
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
              }
              transitionTime={200}
            >
              <Card.Body>
                <h4>
                  <Badge>Category - {note.category}</Badge>
                </h4>

                <blockquote className='blockquote mb-0'>
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                  <footer className='blockquote-footer'>
                    Created on - {note.createdAt.substring(0, 10) || Date.now()}
                  </footer>
                </blockquote>
              </Card.Body>
            </Collapsible>
          </div>
        ))}
    </MainScreen>
  );
};
export default MyNotes;
