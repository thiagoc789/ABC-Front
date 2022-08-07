import { CreateEditUser } from "components/Users/CreateEditUser";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import userServices from "services/userServices";

function EditarUsuario({match}) {

  const history = useHistory();
  const [user, setUser] = useState({});

  const updateUser = async (values) => {
    try {
      await userServices.updateUser(match.params.id, values);
      toast.success("Usuario actualizado correctamente", {
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

  const getUser = async () => {
    const res = await userServices.getSingleUser(match.params.id);
    setUser(res);
    console.log(res, match.params.id);
  }

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <CreateEditUser
      title={'Editar usuario'}
      buttonText={'Editar'}
      action={updateUser}
      infoEdit={user}
    />
    <h1>{match.params.id}</h1>
    </>
  );
}

export default EditarUsuario;