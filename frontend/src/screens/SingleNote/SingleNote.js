import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useNavigate } from "react-router-dom";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const { id } = useParams();
  // id is the id of the note that we want to edit and update in the database and it is in the url
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  // const noteDelete = useSelector((state) => state.noteDelete);
  // const { loading: loadingDelete, error: errorDelete } = noteDelete;

  // const deleteHandler = async (id) => {
  //   if (window.confirm("Are you sure")) {
  //     dispatch(deleteNoteAction(id));
  //   }
  //   navigate("/mynotes");
  // };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category)
      return alert("Please fill in all fields");

    resetHandler();

    navigate("/mynotes");
    //
  };

  return (
    <MainScreen title='Edit Note'>
      <Card>
        <Card.Header>Edit Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {/* {loadingDelete && <Loading size={50} />}
            {errorDelete && (
              <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
            )} */}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <Link to='/mynotes' className='btn btn-light my-3'>
              All Notes Page
            </Link>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button
              type='submit'
              variant='primary'
              // on hover the button size increases
              className='my-2'
            >
              Update Note
            </Button>

            {/* <Button
              variant='danger'
              className='mx-2'
              // onClick={deleteHandler(id)}
            >
              Delete Note
            </Button> */}
          </Form>
        </Card.Body>
        <Card.Footer className='text-muted'>
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
