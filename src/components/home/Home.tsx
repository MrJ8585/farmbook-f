import asset1 from "../../assets/home/asset1.png";

function Home() {
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
        <div className="flex justify-start items-start w-full h-[200px]">
          <div className="w-full flex justify-between items-center">
            <div className="rounded-full bg-sec-2-blue flex justify-center items-center w-[200px] h-[50px]">
              <span className="font-sulphurPoint font-bold text-4xl">
                farmbook
              </span>
            </div>

            <div className="flex flex-col justify-start gap-3">
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

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
