import { useState } from "react";
import asset1 from "../../assets/home/asset1.png";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden h-screen w-full relative">
      <div className="h-full w-full bg-secondary-blue flex justify-between items-center relative">
        <div
          className="h-full w-[60%] bg-cover bg-center -translate-x-[110px]"
          style={{ backgroundImage: `url(${asset1})` }}
        ></div>

        <div className="w-[40%] bg-white h-full"></div>
        <div className="bg-white w-[60%] h-[200%] absolute right-0 rotate-[20deg]"></div>
      </div>

      <div className="flex w-full h-full absolute top-0 p-5 flex-col justify-start">
        <div className="flex justify-start items-center w-full h-[100px] px-5">
          <div className="w-full flex justify-between items-center">
            <div className="rounded-full bg-sec-2-blue flex justify-center items-center w-[200px] h-[50px]">
              <span className="font-sulphurPoint font-bold text-4xl">
                farmbook
              </span>
            </div>

            <div
              className="flex flex-col justify-start gap-3 hover:scale-110 tr cursor-pointer"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <span className="h-[1px] w-[40px] bg-black"></span>
              <span className="h-[1px] w-[40px] bg-black"></span>
              <span className="h-[1px] w-[40px] bg-black"></span>
            </div>
          </div>
        </div>

        <div className="flex w-full h-full justify-end">
          <div className="w-[50%] h-full flex justify-around items-center flex-col">
            <div className="">
              <span className="font-sulphurPoint text-4xl flex text-center">
                Bienvenido a farmbook
                <br />
                Impulsando la sostenibilidad
                <br />
                en cada cosecha.
              </span>
            </div>

            <div className="text-center px-6 font-sulphurPoint text-2xl font-light">
              <span className="">
                En farmbook, conectamos a{" "}
                <b>granjeros comprometidos con prácticas sostenibles</b> y
                empresas que valoran el impacto ambiental positivo. Nuestra
                plataforma permite a los productores locales mostrar sus
                productos, sus métodos de cultivo y su compromiso con el cuidado
                del planeta, brindando a los negocios locales la oportunidad de
                seleccionar los mejores productos sostenibles para sus clientes.
              </span>
            </div>

            <div>
              <button className="bg-main-blue text-white text-3xl py-3 px-20 rounded-full hover:scale-105 tr">
                <span
                  className="font-inter font-extralight"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Únete
                </span>
              </button>
            </div>
          </div>
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
            <span className="hover:cursor-pointer hover:scale-110 tr">
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
                navigate("login");
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
          <button className="border-[1px] border-white py-2 px-12 rounded-full font-light hover:bg-white hover:text-black tr">
            <span className="text-xl">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
