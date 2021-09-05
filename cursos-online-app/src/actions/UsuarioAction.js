import HttpCliente from "../servicios/HttpCliente";

export const registrarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post("/usuario/registrar", usuario).then((response) => {
      resolve(response);
    });
  });
};

export const obtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get("/usuario").then((response) => {
      console.log("response", response);
      if (response.data && response.data.imagenPerfil) {
        let fotoPerfil = response.data.imagenPerfil;
        const nuevoFile =
          "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
        response.data.imagenPerfil = nuevoFile;
      }

      dispatch({
        type: "INICIAR_SESION",
        sesion: response.data,
        autenticado: true,
      });
      resolve(response);
    });
  });
};

export const actualizarUsuario = (usuario, dispatch) => {
  console.log(usuario);
  return new Promise((resolve, eject) => {
    HttpCliente.put("/usuario", usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const loginUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.post("/usuario/login", usuario).then((response) => {
      resolve(response);
    }); /* .catch(err => {
      console.log(usuario);
      console.warn(err)
    }); */
  });
};
