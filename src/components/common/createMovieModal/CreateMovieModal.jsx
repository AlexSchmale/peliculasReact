import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const CreateMovieModal = ({open, handleClose, setCrearPelicula}) => {
  const{handleChange, handleSubmit } = useFormik({
    initialValues:{
      name: "",
      description:"",
      img:"",
      createdAt:""
    },
    onSubmit: (data)=>{
      let arg = {
        name: data.name,
        description:data.description,
        img:data.img,
        createdAt: data.createdAt,
        isLiked: false
      } 
      axios.post('http://localhost:5000/movies',arg )
      .then(res=>{
        handleClose()
        setCrearPelicula(true)
        } )
      .catch(error => console.log(error))
    }
  })
  return (

     <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-evenly',
            alignItems:'center',
            height:'400px'
          }}
          onSubmit={handleSubmit}>
            <Typography variant='h5'color='primary'>Agregar Película</Typography>
            <TextField id="outlined-basic"
             label="Título de la pelicula"
             variant="outlined" 
             name='name' 
             onChange={handleChange}
             fullWidth />

            <TextField id="outlined-basic"
             label="Descripción"
             variant="outlined"
             name='description'
             onChange={handleChange}
             fullWidth />

            <TextField id="outlined-basic"
            label="Adjuntar URL de la imagen"
            variant="outlined"
            name='img'
            onChange={handleChange}
            fullWidth />
            <TextField id="outlined-basic"
            label="Fecha de creación"
            variant="outlined"
            name='createdAt'
            onChange={handleChange}
            fullWidth />
            <Button type='submit' variant="contained">Agregar</Button>
          </form>
        </Box>
      </Modal>
    </div>


  )
}

export default CreateMovieModal