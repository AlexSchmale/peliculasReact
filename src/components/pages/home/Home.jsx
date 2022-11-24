import axios from "axios"
import { useEffect, useState } from "react"
import CardMovie from "../../common/card/CardMovie"
import Header from "../../common/header/Header"
import styles from "./Home.module.css"
import confetti from "canvas-confetti"

const Home = () => {
    
    const [peliculas, setPeliculas] = useState([])
    const [dispatchLike, setDispatchLike] = useState(false)
    const [favoritos, setFavoritos] = useState(false)
    
    useEffect(()=>{
        axios.get("http://localhost:5000/movies") //El axios ya me parsea el json 
         .then(res => setPeliculas(res.data)) 
         .catch(err => console.log(err))
         setDispatchLike(false)
    },[dispatchLike]) //Ahora tambien se vuelve a cargar el componente si la propiedad dispatchLike cambia
    
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
    .then(res=>setDispatchLike(true))
    .catch(err => console.log(err))
       
    }


    const peliculasFiltradas= peliculas.filter(pelicula => pelicula.isLiked)


  return (
    <>
    <Header setFavoritos={setFavoritos}/>
    <div className={styles.containerCards}>
        {
            favoritos? peliculasFiltradas.map(pelicula =>{
                return(
                    <CardMovie pelicula= {pelicula} key={pelicula.id} handleLike={handleLike}/>
                )
            }): peliculas.map((pelicula)=>{
                return( 
                    <CardMovie pelicula= {pelicula} key={pelicula.id} handleLike={handleLike}/>
                )
            })
        }
    </div>
    </>
  )
}

export default Home