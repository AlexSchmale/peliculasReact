import axios from "axios"
import React, { useEffect, useState } from "react"
import CardMovie from "../../common/card/CardMovie"
import Header from "../../common/header/Header"
import styles from "./Home.module.css"
import confetti from "canvas-confetti"
import { Button } from "@mui/material"
import CreateMovieModal from "../../common/createMovieModal/CreateMovieModal"

//CRUD Create(post), Read(get), Update(patch, put), Delete

const Home = () => {
    
    const [peliculas, setPeliculas] = useState([])
    const [dispatchLike, setDispatchLike] = useState(false)
    const [favoritos, setFavoritos] = useState(false)
    const [crearPelicula, setCrearPelicula] = useState(false)
    const [seEliminoPelicula, setSeEliminoPelicula] = useState(false)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(()=>{
        axios.get("http://localhost:5000/movies") //El axios ya me parsea el json 
         .then(res => setPeliculas(res.data)) 
         .catch(err => console.log(err))
         setDispatchLike(false)
         setCrearPelicula(false)
         setSeEliminoPelicula(false)
    },[dispatchLike, crearPelicula, seEliminoPelicula]) //Ahora tambien se vuelve a cargar el componente si la propiedad dispatchLike cambia
    
    //console.log(peliculas);

    const handleLike = (pelicula) =>{
        !pelicula.isLiked &&
        confetti({
            zIndex:999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x:0.5,
                y:0
            }
        })
    axios.patch(`http://localhost:5000/movies/${pelicula.id}`, {isLiked: !pelicula.isLiked})
    .then(()=>setDispatchLike(true))
    .catch(err => console.log(err))
       
    }


    const peliculasFiltradas= peliculas.filter(pelicula => pelicula.isLiked)

    const deleteMovieById = (id) =>{
        axios.delete(`http://localhost:5000/movies/${id}`)
        .then(()=>setSeEliminoPelicula(true))
    }

  return (
    <>
    <Header setFavoritos={setFavoritos}/>

    <Button variant='contained' onClick={handleOpen}>Agregar película</Button>

    <CreateMovieModal open={open} handleClose={handleClose} setCrearPelicula={setCrearPelicula}/>
    <div className={styles.containerCards}>
        {
            favoritos? peliculasFiltradas.map(pelicula =>{
                return(
                    <CardMovie pelicula= {pelicula} key={pelicula.id} handleLike={handleLike} deleteMovieById={deleteMovieById}/>
                )
            }): peliculas.map((pelicula)=>{
                return( 
                    <CardMovie pelicula= {pelicula} key={pelicula.id} handleLike={handleLike} deleteMovieById={deleteMovieById}/>
                )
            })
        }
    </div>
    </>
  )
}

export default Home