
import { Button, Typography } from '@mui/material'
import React from 'react'

const Header = ({setFavoritos}) => {
  return (
    <div style={{
        backgroundColor:"black",
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        padding:'10px',
        alignItems:'center'
    }}>
        <Typography variant='h4' color='primary'>Peliculas</Typography>
        <div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
            <Button variant='contained' color='primary' onClick={()=>setFavoritos(false)} >Todas</Button>
            <Button variant='contained' color='primary' onClick={()=>setFavoritos(true)}>Favoritas</Button>
        </div>
    </div>
  )
}

export default Header