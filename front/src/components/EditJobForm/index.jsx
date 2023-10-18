import  { useState } from 'react';
import { updateJob } from '../../utils/api';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from '@mui/material';
import RButton from '../Button';

const EditJobForm = ({ open, job, onCancel }) => {
  const [editedJob, setEditedJob] = useState({ ...job });
  const { _id, titulo, descripcion } = editedJob;

  const handleTitleChange = (event) => {
    setEditedJob({ ...editedJob, titulo: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setEditedJob({ ...editedJob, descripcion: event.target.value });
  };

  const handleSaveClick = async () => {
    try {
      const data = await updateJob(_id, editedJob.titulo, editedJob.descripcion);
      console.log(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs">
      <DialogTitle>Editar Trabajo</DialogTitle>
      <br />
      <DialogContent>
        <TextField
          type="text"
          value={editedJob.titulo}
          onChange={handleTitleChange}
          label="Título"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextareaAutosize
          type="text"
          value={editedJob.descripcion}
          onChange={handleDescriptionChange}
          placeholder="Descripción"
          minRows={3}
          sx={{ width: '100%', marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <RButton text="Cancelar" action={onCancel} sx={{ marginRight: 1 }} />
        <RButton text="Guardar" action={handleSaveClick} sx={{ marginLeft: 1 }} />
      </DialogActions>
    </Dialog>
  );
};

export default EditJobForm;
