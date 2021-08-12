import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { actualizarUsuario, obtenerUsuarioActual } from '../../actions/UsuarioAction';
import style from '../Tool/Style';

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombreCompleto: '',
        email: '',
        password: '',
        confirmarPassword: '',
        username: ''
    })

    const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }
    
    useEffect(() => {
        obtenerUsuarioActual().then(response => {
            console.log('esta es la data del objeto response del usuario actual', response);
            setUsuario(response.data);
        });
    }, [])

    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario).then(response => {
            console.log('se actualizo el usuario', usuario);
            window.localStorage.setItem("token_seguridad", response.data.token);
        })
    }

    return (
       <Container component="main" maxWidth="md" justifycontent="center">
           <div style={style.paper}>
               <Typography component="h1" variant="h5">
                   Perfil de Usuario
               </Typography> 
           </div>
           <form style={style.form}>
               <Grid container spacing={2}>
                   <Grid item xs={12} md={12}>
                       <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese nombre y apellidos" />
                   </Grid>
                   <Grid item xs={12} md={6}>
                       <TextField name="username" value={usuario.username} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Username" />
                   </Grid>
                   <Grid item xs={12} md={6}>
                       <TextField name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese email" />
                   </Grid>
                   <Grid item xs={12} md={6}>
                       <TextField name="password" value={usuario.password} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Ingrese password" />
                   </Grid>
                   <Grid item xs={12} md={6}>
                       <TextField name="confirmarPassword" value={usuario.confirmarPassword} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Confirme password" />
                   </Grid>
               </Grid>
               <Grid container justifycontent="center">
                   <Grid item xs={12} md={12}>
                       <Button type="submit" onClick={guardarUsuario} fullWidth variant="contained" size="large" color="primary" style={style.submit} >
                           Guardar Datos
                       </Button>
                   </Grid>
               </Grid>
           </form>
       </Container>
    );
};

export default PerfilUsuario;