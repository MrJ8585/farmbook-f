import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    correo: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    edad: "",
    tipoCliente: "Agricultor",
  });

  const route = import.meta.env.VITE_APP_SERVER_URL || "/api";
  const handleRegister = async () => {
    let dummy = {
      correo: userInfo.correo,
      contrasena: userInfo.contrasena,
      nombre: userInfo.nombre,
      apellido: userInfo.apellido,
      edad: userInfo.edad,
      tipoCliente: userInfo.tipoCliente,
    };

    console.log(dummy);
    try {
      const response = await fetch(`${route}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dummy),
      });

      const data = await response.json();

      if (data.message == "Usuario registrado exitosamente") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="bg-secondary-blue h-screen w-full relative overflow-hidden flex">
      <div className="h-[200%] w-[500px] bg-white rotate-[30deg] -translate-x-[40%] -translate-y-[30%]"></div>

      <div className="flex w-full h-full absolute top-0 p-5 flex-col justify-start">
        <div className="w-full h-[10%] flex justify-between items-center px-6">
          <div
            className="rounded-full bg-main-blue flex justify-center items-center w-[200px] h-[50px] cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <span className="font-sulphurPoint font-bold text-4xl text-secondary-blue">
              farmbook
            </span>
          </div>

          <div
            className="flex flex-col justify-center items-center gap-3 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-[40px] h-[1px] bg-black"></span>
            <span className="w-[40px] h-[1px] bg-black"></span>
            <span className="w-[40px] h-[1px] bg-black"></span>
          </div>
        </div>

        <div className="flex w-full justify-center items-center">
          <span className="font-sulphurPoint text-4xl text-main-blue font-bold">
            Registrate
          </span>
        </div>

        <div className="w-full flex justify-center items-center mt-10">
          <div className="flex flex-col justify-start gap-4 w-[40%]">
            <span className="flex flex-col justify-start items-start">
              <span className="font-sulphurPoint text-xl">Correo</span>
              <input
                className="w-full p-3"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, correo: e.target.value })
                }
              ></input>
            </span>

            <span className="flex flex-col justify-start items-start">
              <span className="font-sulphurPoint text-xl">Nombre</span>
              <input
                className="w-full p-3"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, nombre: e.target.value })
                }
              ></input>
            </span>

            <span className="flex flex-col justify-start items-start">
              <span className="font-sulphurPoint text-xl">Apellido</span>
              <input
                className="w-full p-3"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, apellido: e.target.value })
                }
              ></input>
            </span>

            <span className="flex justify-start gap-5">
              <span className="flex flex-col justify-start items-start">
                <span className="font-sulphurPoint text-xl">Edad</span>
                <input
                  className="w-full p-3"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, edad: e.target.value })
                  }
                ></input>
              </span>
              <span className="flex flex-col justify-start items-start">
                <span className="font-sulphurPoint text-xl">Soy:</span>
                <span className="p-3 bg-white">
                  <select
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, tipoCliente: e.target.value })
                    }
                  >
                    <option>Agricultor</option>
                    <option>Cliente</option>
                  </select>
                </span>
              </span>
            </span>

            <span className="w-full flex justify-end items-end">
              <button
                className="py-3 px-10 bg-main-blue text-white hover:scale-105 tr"
                onClick={() => handleRegister()}
              >
                Enviar
              </button>
            </span>
          </div>
        </div>

        <div
          className={`h-screen w-[300px] text-white tr absolute right-0 top-0 bg-black bg-opacity-50 backdrop-blur-lg p-5 flex flex-col justify-between ${
            isOpen ? "" : "translate-x-[100%]"
          }`}
        >
          <div className="w-full flex flex-col items-start gap-6">
            <span className="w-full flex justify-end items-center text-3xl select-none">
              <span
                className="hover:scale-110 tr cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <IoMdClose />
              </span>
            </span>

            <div className="flex flex-col w-full justify-start items-start gap-14 font-inter font-extralight text-xl">
              <span
                className="hover:cursor-pointer hover:scale-110 tr"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </span>

              <span
                className="hover:cursor-pointer hover:scale-110 tr"
                onClick={() => {
                  navigate("/catalog");
                }}
              >
                Catalog
              </span>

              <span
                className="hover:cursor-pointer hover:scale-110 tr"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>

              <span className="hover:cursor-pointer hover:scale-110 tr">
                Help
              </span>
            </div>
          </div>

          <div className="w-full py-4 flex justify-center items-center">
            {/* <button className="border-[1px] border-white py-2 px-12 rounded-full font-light hover:bg-white hover:text-black tr">
              <span className="text-xl">Log out</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
