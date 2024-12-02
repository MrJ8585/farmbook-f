import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import FarmCard, { farmCard } from "./catalog/FarmCard";

//Icons
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Catalog() {
  const [practices] = useState([
    "Fertilizantes naturales",
    "Irrigación por goteo",
    "Cultivos de cobertura",
    "Rotación de cultivos",
    "Paneles solares",
    "Envases biodegradables",
    "Áreas forestales",
    "Tratamiento de aguas",
    "Agricultura vertical",
    "Uso de drones",
  ]);

  const [selectedPract, setSelectedPract] = useState<number[]>([]);

  const [page, setPage] = useState<number>(1);

  const [allFarms, setAllFarms] = useState<farmCard[]>([]);

  const [search, setSearch] = useState<string>("");

  const applyFilters = async () => {
    const allFilters: any[] = [];

    console.log(selectedPract);

    for (let i = 0; i < selectedPract.length; i++) {
      allFilters.push(practices[selectedPract[i]]);
    }

    const temp = {
      page: page,
      search: search,
      filters: allFilters,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/allfarms`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(temp),
        }
      );

      const data = await response.json();

      setAllFarms(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [page]);

  useEffect(() => {
    applyFilters();
  }, []);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-secondary-blue flex flex-col justify-start items-center relative overflow-x-hidden">
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
      <div className="h-[90%] w-full flex justify-between items-start px-10">
        <div className="w-full h-full p-3 flex flex-col justify-start items-center">
          <div className="w-full h-[10%] flex gap-5 items-center">
            <input
              className="w-[90%] bg-white rounded-[10px] shadow-md p-5"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <CiSearch
              className="text-3xl hover:scale-110 tr cursor-pointer"
              onClick={() => applyFilters()}
            />
          </div>
          <div className="h-[85%] py-3 w-full">
            <div className="w-full h-full overflow-y-auto">
              <div className="gap-4 flex flex-col">
                {allFarms.map((farm: farmCard, idx: number) => (
                  <FarmCard
                    key={idx}
                    id={farm.id}
                    nombre={farm.nombre}
                    ubicacion={farm.ubicacion}
                    descripcion={farm.descripcion}
                    rating={farm.rating}
                    imagen={farm.imagen}
                    productos={farm.productos}
                    granja_practicas={farm.granja_practicas}
                    badge_granja={farm.badge_granja}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end items-center">
            <div className="flex items-center gap-4">
              <IoIosArrowBack
                className="text-xl hover:scale-110 tr cursor-pointer"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              />
              <div className="font-light font-inter select-none">{page}</div>
              <IoIosArrowForward
                className="text-xl hover:scale-110 tr cursor-pointer"
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-[400px] h-full p-3">
          <div className="w-[90%] h-[80%] bg-white rounded-[10px] shadow-md p-5 flex flex-col justify-start gap-2">
            <div className="flex justify-end items-center">
              <button
                className="text-xs bg-secondary-blue rounded-full px-3 py-1 font-inter font-light hover:scale-105 tr"
                onClick={() => applyFilters()}
              >
                Apply
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {practices.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 font-inter font-light text-sm"
                >
                  <div
                    className={`w-[20px] h-[20px] border-[1px] border-black rounded-sm cursor-pointer tr ${
                      selectedPract.includes(idx)
                        ? "bg-main-blue"
                        : "hover:bg-black hover:bg-opacity-10"
                    }`}
                    onClick={() => {
                      if (selectedPract.includes(idx)) {
                        let tempArray = [...selectedPract];
                        setSelectedPract(
                          tempArray.filter((num) => num !== idx)
                        );
                      } else {
                        setSelectedPract([...selectedPract, idx]);
                      }
                    }}
                  ></div>
                  <span>{item}</span>
                </div>
              ))}
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
            <span
              className="hover:cursor-pointer hover:scale-110 tr"
              onClick={() => navigate("/")}
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
          {/* <button className="border-[1px] border-white py-2 px-12 rounded-full font-light hover:bg-white hover:text-black tr">
            <span className="text-xl">Log out</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
