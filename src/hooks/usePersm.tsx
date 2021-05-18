const usePersm = () => {
  let rolToken = localStorage.getItem("userData");
  let rol = rolToken && JSON.parse(rolToken);
  let role = rol.role.name;
  let user = rol.username;

  let ad = !(role === "ADMIN");
  let av = !["ADMIN", "VENDEDOR"].includes(role);
  let ar = !["ADMIN", "ALMACEN"].includes(role);

  return {
    user,
    role,
    ad,
    av,
    ar,
  };
};

export default usePersm;
