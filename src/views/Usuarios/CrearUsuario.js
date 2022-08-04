import { CreateEditUser } from "components/Users/CreateEditUser";
import React from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import userServices from "services/userServices";

function CrearUsuario() {

  const history = useHistory();
  const postUser = async (values) => {
    try {
      await userServices.createUser(values);
      toast.success("Usuario creado", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push('/admin/usuarios')
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateEditUser
      title={'Registrar usuario'}
      buttonText={'Registrar'}
      action={postUser}
    />
  );
}

export default CrearUsuario;
