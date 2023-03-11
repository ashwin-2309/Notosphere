import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid } from "@chakra-ui/react";
import NoteCard from "../components/Notespage/Notecard/NoteCard";
import { getNotes } from "../Redux/notes/note.action";
import store from "../Redux/store";

const NotesPage = () => {
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    setNotes(data || []);
  }, [data]);

  return (
    <Box mt={24} padding={8}>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {notes?.map(({ id, content }) => (
          <NoteCard key={id} id={id} content={content} />
        ))}
      </Grid>
    </Box>
  );
};
export default NotesPage;
