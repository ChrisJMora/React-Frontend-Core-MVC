import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequestModel } from './models/LoginRequestModel';

import axios from 'axios';

function LoginView() {
    const [loginRequest, setLoginRequest] = useState(loginRequestModel);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setLoginRequest({
            ...loginRequest,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginSuccess = await login(loginRequest);
        if (loginSuccess) {
            navigate("/crops");
        }
    }

    return (
        <>
            <label htmlFor="loginForm">Inicio de Sesión</label>
            <form 
                id="loginForm"
                onSubmit={handleSubmit}
            >
                <label htmlFor="usernameInput">Usuario:</label>
                <input 
                    type="text"
                    id="usernameInput"
                    name="username"
                    value={loginRequest.username}
                    onChange={handleChange}
                    placeholder="Usuario"
                />
                <label htmlFor="pswdInput">Contraseña:</label>
                <input 
                    type="password"
                    id="pswdInput"
                    name="password"
                    value={loginRequest.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </>
    )
}

async function login(loginRequest) {
    try {
        const response = await axios.post(
            'https://irrigation-suggester-mini-core-service.onrender.com/login', loginRequest
        );
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert("Se ha iniciado sesion con éxito!");
        return true;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Usuario o contraseña incorrectos.");
        } else {
            alert("Ocurrió un error al iniciar sesión.");
        }
        return false;
    }
}

export default LoginView;