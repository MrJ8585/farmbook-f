import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FormattedGranja } from "./HomePage";

const EditFarm = () => {
  const navigate = useNavigate();

  const [farmInfo, setFarmInfo] = useState<FormattedGranja>({
    GranjaID: null,
    Nombre: "",
    Ubicacion: "",
    Descripcion: "",
    Rating: null,
    Imagen: "",
    UsuarioID: null,
    usuario: null,
    productos: [],
    practicas_sustentables: null,
    badges: null,
  });

  const { id } = useParams();
  const route = import.meta.env.VITE_APP_SERVER_URL || "/api";

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleGetInfo = async () => {
    try {
      const response = await fetch(`${route}/myFarm/${id}`);
      const data = await response.json();
      setFarmInfo(formatGranjaData(data));
    } catch (err) {
      console.log(err);
    }
  };

  const formatGranjaData = (data: any): FormattedGranja => {
    return {
      GranjaID: data.GranjaID || null,
      Nombre: data.Nombre || "",
      Ubicacion: data.Ubicacion || "",
      Descripcion: data.Descripcion || "",
      Rating: data.Rating || null,
      Imagen: data.Imagen || "",
      UsuarioID: data.UsuarioID || null,
      usuario: data.usuario ? JSON.parse(data.usuario) : null,
      productos: data.productos ? JSON.parse(data.productos) : [],
      practicas_sustentables: data.practicas_sustentables
        ? JSON.parse(data.practicas_sustentables)
        : null,
      badges: data.badges ? JSON.parse(data.badges) : null,
    };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleImage = async () => {
    if (!selectedFile) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        `${route}/updateImage/farm/${farmInfo.GranjaID}/image`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      console.log(response);

      if (response.ok) {
        console.log("Image uploaded successfully:", result.imageUrl);
        alert("Imagen actualizada exitosamente.");
      } else {
        console.error("Failed to upload image:", result.error);
        alert("Error al actualizar la imagen.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen.");
    }
  };

  useEffect(() => {
    handleGetInfo();
  }, []);

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
            <label htmlFor="fileUpload">Farm Image:</label>
            <input type="file" id="fileUpload" onChange={handleFileChange} />
          </span>

          <span className="w-full flex justify-end items-end">
            <button
              className="bg-green-800 text-white px-3 py-1 rounded-md hover:scale-105 tr"
              onClick={handleImage}
            >
              Subir Imagen
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditFarm;
