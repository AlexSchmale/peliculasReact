import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';



const CardMovie = ({pelicula, handleLike}) => {

  //const {name} = pelicula
  
  return (
    <Card sx={{ maxWidth: 340, height:470, maxHeight:470}}>
    <CardHeader
      title={pelicula.name}
      subheader={pelicula.createdAt}
    />
    <CardMedia
      component="img"
      height="194"
      image={pelicula.img}
      alt="image peliculas"
    />
    <CardContent sx={{height:120}}>
      <Typography variant="body2" color="text.secondary">
        {pelicula.description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing >
      <IconButton aria-label="add to favorites" onClick={()=>handleLike(pelicula)}>
        <FavoriteIcon color={pelicula.isLiked? "error":"disabled"} />
      </IconButton>
    </CardActions>
  </Card>
  )
}

export default CardMovie