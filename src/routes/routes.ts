const BASE_URL = "/api";

// Helper para manejar las respuestas de las API
const handleResponse = async (response: Response) => {
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Error en la solicitud");
	}
	return response.json();
};

// Registro de usuario
export const registerUser = async (userData: {
	correo: string;
	contrasena: string;
	nombre: string;
	apellido: string;
	edad: number;
	tipoCliente: string;
}) => {
	const response = await fetch(`${BASE_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	return handleResponse(response);
};

// Login de usuario
export const loginUser = async (credentials: {
	correo: string;
	contrasena: string;
}) => {
	const response = await fetch(`${BASE_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	return handleResponse(response);
};

// Obtener todas las granjas
export const getFarms = async () => {
	const response = await fetch(`${BASE_URL}/farms`, {
		method: "GET",
	});
	return handleResponse(response);
};

// Obtener una granja por ID
export const getFarmById = async (farmId: number) => {
	const response = await fetch(`${BASE_URL}/farm/${farmId}`, {
		method: "GET",
	});
	return handleResponse(response);
};

// Obtener la granja asociada a un usuario
export const getMyFarm = async (userId: number) => {
	const response = await fetch(`${BASE_URL}/myfarm/${userId}`, {
		method: "GET",
	});
	return handleResponse(response);
};

// Actualizar información de una granja
export const updateFarmInfo = async (
	farmId: number,
	farmData: { nombre: string; ubicacion: string; descripcion: string }
) => {
	const response = await fetch(`${BASE_URL}/farm/${farmId}/info`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(farmData),
	});
	return handleResponse(response);
};

// Actualizar imagen de una granja
export const updateFarmImage = async (farmId: number, imageFile: File) => {
	const formData = new FormData();
	formData.append("image", imageFile);

	const response = await fetch(`${BASE_URL}/farm/${farmId}/image`, {
		method: "PUT",
		body: formData,
	});
	return handleResponse(response);
};
