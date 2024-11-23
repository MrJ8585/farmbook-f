import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import FarmCard, { farmCard } from "./catalog/FarmCard";

//Icons
import { FaArrowUpFromWaterPump, FaEarthAmericas } from "react-icons/fa6";
import { FaAngleDoubleUp, FaHandHoldingWater } from "react-icons/fa";
import { PiPlantBold } from "react-icons/pi";
import { MdForest, MdOutlineScreenRotationAlt } from "react-icons/md";
import { MdWbSunny } from "react-icons/md";
import { GiDeliveryDrone, GiEcology } from "react-icons/gi";

function Catalog() {
  const [allFarms, setAllFarms] = useState<farmCard[]>([
    {
      name: "Granja Verde Vida",
      description:
        "Pequeña granja familiar dedicada a la agricultura orgánica.",
      location: "Valle de Guadalupe, Baja California",
      mainProducts: ["Uvas orgánicas", "Miel artesanal", "Aceite de oliva"],
      sustainablePractices: [
        {
          name: "Uso de fertilizantes naturales como composta y estiércol",
          icon: FaEarthAmericas,
        },
        {
          name: "Irrigación por goteo para ahorro de agua",
          icon: FaHandHoldingWater,
        },
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/63064607eb816a4d50027fd1/18e6d4b7-bcda-48f7-b34f-80b8ca9c3661/traditional-farm.jpg?format=2500w",
    },
    {
      name: "EcoFinca del Sol",
      description: "Granja especializada en cultivos tropicales sostenibles.",
      location: "Tapachula, Chiapas",
      mainProducts: ["Cacao", "Plátanos", "Café"],
      sustainablePractices: [
        {
          name: "Conservación del suelo mediante cultivos de cobertura",
          icon: PiPlantBold,
        },
        {
          name: "Rotación de cultivos para evitar agotamiento del terreno",
          icon: MdOutlineScreenRotationAlt,
        },
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/63064607eb816a4d50027fd1/18e6d4b7-bcda-48f7-b34f-80b8ca9c3661/traditional-farm.jpg?format=2500w",
    },
    {
      name: "Huerta Tierra Viva",
      description:
        "Granja ecológica enfocada en el comercio justo y productos locales.",
      location: "San Miguel de Allende, Guanajuato",
      mainProducts: ["Hortalizas", "Frutales", "Especias"],
      sustainablePractices: [
        {
          name: "Uso de paneles solares para energía",
          icon: MdWbSunny,
        },
        {
          name: "Eliminación de plásticos mediante envases biodegradables",
          icon: GiEcology,
        },
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/63064607eb816a4d50027fd1/18e6d4b7-bcda-48f7-b34f-80b8ca9c3661/traditional-farm.jpg?format=2500w",
    },
    {
      name: "Rancho Los Robles",
      description: "Granja ganadera comprometida con la biodiversidad.",
      location: "Monterrey, Nuevo León",
      mainProducts: ["Carne de res", "Leche orgánica", "Queso artesanal"],
      sustainablePractices: [
        {
          name: "Integración de áreas forestales para balance ecológico",
          icon: MdForest,
        },
        {
          name: "Tratamiento de aguas residuales para riego",
          icon: FaArrowUpFromWaterPump,
        },
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/63064607eb816a4d50027fd1/18e6d4b7-bcda-48f7-b34f-80b8ca9c3661/traditional-farm.jpg?format=2500w",
    },
    {
      name: "AgroEco Laguna",
      description: "Granja innovadora que combina tecnología y sostenibilidad.",
      location: "Torreón, Coahuila",
      mainProducts: ["Alfalfa", "Tomate", "Pimientos"],
      sustainablePractices: [
        {
          name: "Implementación de agricultura vertical",
          icon: FaAngleDoubleUp,
        },
        {
          name: "Uso de drones para monitorear el estado de los cultivos",
          icon: GiDeliveryDrone,
        },
      ],
      image:
        "https://images.squarespace-cdn.com/content/v1/63064607eb816a4d50027fd1/18e6d4b7-bcda-48f7-b34f-80b8ca9c3661/traditional-farm.jpg?format=2500w",
    },
  ]);

  const [search, setSearch] = useState<string>("");

  const [allFarmsBU, _] = useState(allFarms);

  useEffect(() => {
    if (search == "") {
      setAllFarms(allFarmsBU);
    } else {
      setAllFarms(
        allFarmsBU.filter((name) =>
          name.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <div className="h-screen w-full bg-secondary-blue flex flex-col justify-start items-center">
      <div className="h-[12%] w-full flex justify-between items-center px-10">
        <div className="rounded-full bg-main-blue flex justify-center items-center w-[200px] h-[50px]">
          <span className="font-sulphurPoint font-bold text-4xl text-secondary-blue">
            farmbook
          </span>
        </div>

        <span className="flex flex-col gap-3 justify-center">
          <span className="bg-black w-[40px] h-[1px]"></span>
          <span className="bg-black w-[40px] h-[1px]"></span>
          <span className="bg-black w-[40px] h-[1px]"></span>
        </span>
      </div>
      <div className="h-[88%] w-full flex justify-between items-start px-10">
        <div className="w-full h-full p-3 flex flex-col justify-start items-center">
          <div className="w-full h-[10%] flex gap-5 items-center">
            <input
              className="w-[90%] bg-white rounded-[10px] shadow-md p-5"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <CiSearch className="text-3xl" />
          </div>
          <div className="h-[85%] py-3 w-full relative">
            <div className="absolute bottom-0 w-full -mb-3 h-[40px] bg-gradient-to-b from-transparent to-secondary-blue"></div>
            <div className="w-full h-full overflow-y-auto">
              <div className="gap-4 flex flex-col">
                {allFarms.map((farm: farmCard, idx: number) => (
                  <FarmCard
                    key={idx}
                    image={farm.image}
                    description={farm.description}
                    location={farm.location}
                    mainProducts={farm.mainProducts}
                    name={farm.name}
                    sustainablePractices={farm.sustainablePractices}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[400px] h-full p-3">
          <div className="w-[90%] h-[80%] bg-white rounded-[10px] shadow-md"></div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
