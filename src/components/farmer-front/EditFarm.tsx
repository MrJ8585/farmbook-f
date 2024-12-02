import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { farmCard } from "../client-front/catalog/FarmCard";
import { FaArrowLeft } from "react-icons/fa";

type pracs = {
  practicassustentables: {
    id: number;
    nombre: string;
    descripcion: string;
    icon: string;
  };
};

type prod = {
  desc: string;
  name: string;
  image: string;
};

const EditFarm = () => {
  const navigate = useNavigate();

  const [farmInfo, setFarmInfo] = useState<farmCard>({
    id: 0,
    nombre: "",
    ubicacion: "",
    descripcion: "",
    rating: 0,
    imagen: "",
    productos: [],
    granja_practicas: [],
    badge_granja: [],
  });

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

  const { id } = useParams();

  const handleGetInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/farminfo/${id}`
      );

      const data = await response.json();

      setFarmInfo(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetInfo();
  }, []);

  const [_, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  //   const handleSubmit = (event: React.FormEvent) => {
  //     event.preventDefault();
  //     if (files) {
  //       for (let i = 0; i < files.length; i++) {
  //         console.log(`File: ${files[i].name}`);
  //       }
  //     }
  //   };

  useEffect(() => {
    console.log(farmInfo);
  }, [farmInfo]);

  const [isAddignProd, setIsAddingProd] = useState(false);
  const [isAddignPrac, setIsAddingPrac] = useState(false);

  const handleDeleteProd = (indx: number) => {
    setFarmInfo((prevState) => ({
      ...prevState,
      productos: prevState.productos.filter((_, i) => i !== indx),
    }));
  };

  const handleDeletePrac = (indx: number) => {
    setFarmInfo((prevState) => ({
      ...prevState,
      granja_practicas: prevState.granja_practicas.filter((_, i) => i !== indx),
    }));
  };

  const [newPract, setNewPract] = useState<string>("");

  const handleNewPract = () => {
    const dummy: pracs = {
      practicassustentables: {
        id: 0,
        icon: "",
        nombre: newPract,
        descripcion: "",
      },
    };
    setFarmInfo({
      ...farmInfo,
      granja_practicas: [...farmInfo.granja_practicas, dummy],
    });
  };

  const [newProd, setNewProd] = useState<prod>({
    desc: "",
    image: "",
    name: "",
  });

  const handleNewProd = () => {
    setFarmInfo({
      ...farmInfo,
      productos: [...farmInfo.productos, newProd],
    });
  };

  return (
    <div className="w-full">
      <div className="w-full h-[100px] flex justify-between items-center px-6 bg-secondary-blue mb-5">
        <div
          className="rounded-full bg-main-blue flex justify-center items-center w-[200px] h-[50px] cursor-pointer select-none"
          onClick={() => navigate("/profile")}
        >
          <span className="font-sulphurPoint font-bold text-4xl text-secondary-blue">
            farmbook
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          {/* <span className="w-[40px] h-[1px] bg-black"></span>
          <span className="w-[40px] h-[1px] bg-black"></span>
          <span className="w-[40px] h-[1px] bg-black"></span> */}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mb-5 flex-col">
        <span className="w-full flex justify-start px-5">
          <FaArrowLeft
            className="hover:scale-105 tr cursor-pointer"
            onClick={() => navigate(`/profile/${id}`)}
          />
        </span>
        <div className="bg-main-blue w-[60%] flex flex-col p-5 gap-4 font-light">
          <span className="text-white w-full flex gap-2 flex-col">
            <span>Nombre:</span>
            <input
              className="w-full rounded-sm text-black p-1"
              value={farmInfo.nombre}
              onChange={(e) => {
                setFarmInfo({
                  ...farmInfo,
                  nombre: e.target.value,
                });
              }}
            />
          </span>

          <span className="text-white w-full flex gap-2 flex-col">
            <span>Ubicación:</span>
            <input
              className="w-full rounded-sm text-black p-1"
              value={farmInfo.ubicacion}
              onChange={(e) => {
                setFarmInfo({
                  ...farmInfo,
                  ubicacion: e.target.value,
                });
              }}
            />
          </span>

          <span className="text-white w-full flex gap-2 flex-col">
            <span>Descripción:</span>
            <input
              className="w-full rounded-sm text-black p-1"
              value={farmInfo.descripcion}
              onChange={(e) => {
                setFarmInfo({
                  ...farmInfo,
                  descripcion: e.target.value,
                });
              }}
            />
          </span>

          <div className="text-white w-full flex gap-2 flex-col">
            <label htmlFor="fileUpload">Farm Image:</label>
            <input type="file" id="fileUpload" onChange={handleFileChange} />
          </div>

          <div className="w-full text-white flex flex-col gap-3">
            <span>Productos:</span>

            <div className="w-full flex overflow-x-auto gap-3">
              {farmInfo.productos?.map((item, idx) => (
                <div
                  className="min-w-[200px] h-[300px] flex flex-col items-center justify-between p-5 bg-white shadow-md rounded-lg text-black text-sm"
                  key={idx}
                >
                  <div className="w-full h-[60%]">
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    ></div>
                  </div>
                  <div className="w-full h-[40%] flex flex-col gap-2 py-2">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-light">{item.desc}</span>
                  </div>
                  <button
                    className="bg-red-700 p-1 text-white rounded-md hover:scale-105 tr"
                    onClick={() => {
                      handleDeleteProd(idx);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <span className="w-full">
              <button
                className="p-1 hover:scale-105 tr bg-secondary-blue text-main-blue px-3 rounded-md w-full"
                onClick={() => {
                  setIsAddingProd(!isAddignProd);
                  setNewProd({
                    name: "",
                    desc: "",
                    image: "",
                  });
                }}
              >
                {isAddignProd ? "Cancelar" : "Agregar Producto"}
              </button>

              <div className="w-full mt-4 text-black">
                {isAddignProd ? (
                  <div className="w-full flex flex-col gap-3">
                    <span className="flex gap-3">
                      <span className="text-white">Nombre:</span>
                      <input
                        className="px-1"
                        onChange={(e) =>
                          setNewProd({
                            ...newProd,
                            name: e.target.value,
                          })
                        }
                      />
                    </span>

                    <span className="flex gap-3">
                      <span className="text-white">Descripción:</span>
                      <input
                        className="px-1"
                        onChange={(e) =>
                          setNewProd({
                            ...newProd,
                            desc: e.target.value,
                          })
                        }
                      />
                    </span>

                    <span className="flex gap-3">
                      <span className="text-white">Imagen:</span>
                      <input
                        className="px-1"
                        onChange={(e) =>
                          setNewProd({
                            ...newProd,
                            image: e.target.value,
                          })
                        }
                      />
                    </span>

                    <span>
                      <button
                        className="p-1 hover:scale-105 tr bg-secondary-blue text-main-blue px-3 rounded-md"
                        onClick={() => {
                          handleNewProd();
                          setIsAddingProd(false);
                          setNewProd({
                            name: "",
                            desc: "",
                            image: "",
                          });
                        }}
                      >
                        Agregar
                      </button>
                    </span>
                  </div>
                ) : null}
              </div>
            </span>

            <span className="flex flex-col gap-2">
              <span>Prácticas: </span>
              <div className="w-full pl-5 flex flex-col gap-2 font-light">
                {farmInfo.granja_practicas.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-secondary-blue text-main-blue rounded-md px-4 py-1 justify-between w-full flex items-center"
                  >
                    <span>{item.practicassustentables.nombre}</span>
                    <button
                      className="bg-red-700 p-1 text-white rounded-md hover:scale-105 tr"
                      onClick={() => {
                        handleDeletePrac(idx);
                      }}
                    >
                      Eliminar
                    </button>
                  </span>
                ))}
              </div>
            </span>

            <span className="w-full flex flex-col gap-2">
              <button
                className="p-1 hover:scale-105 tr bg-secondary-blue text-main-blue px-3 rounded-md"
                onClick={() => setIsAddingPrac(!isAddignPrac)}
              >
                {isAddignPrac ? "Cancelar" : "Agregar Práctica"}
              </button>
              <div className="">
                {isAddignPrac ? (
                  <div className="flex flex-col gap-2">
                    <select
                      className="text-black p-1"
                      onChange={(e) => setNewPract(e.target.value)}
                    >
                      {practices.map((item, idx) => (
                        <option key={idx}>{item}</option>
                      ))}
                    </select>

                    <span>
                      <button
                        className="p-1 hover:scale-105 tr bg-secondary-blue text-main-blue px-3 rounded-md"
                        onClick={() => {
                          handleNewPract();
                          setIsAddingPrac(false);
                          setNewPract("");
                        }}
                      >
                        Agregar
                      </button>
                    </span>
                  </div>
                ) : null}
              </div>
            </span>
          </div>

          <span className="w-full flex justify-end items-end">
            <button className="bg-green-800 text-white px-3 py-1 rounded-md hover:scale-105 tr">
              Actualizar
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditFarm;
