"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const storeToken = (token) => {
    localStorage.setItem('token', token);
};
const getToken = () => {
    return localStorage.getItem('token');
};
const sendRequestWithToken = (url, method, body) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getToken();
    if (!token) {
        console.error('Token not found. User not logged in.');
        return null;
    }
    try {
        const response = yield fetch(url, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error('Error sending request:', error.message);
        return null;
    }
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = yield response.json();
        if (data.token) {
            storeToken(data.token);
            console.log('Login successful');
            return true;
        }
        else {
            console.error('Login failed:', data.error);
            return false;
        }
    }
    catch (error) {
        console.error('Error during login:', error.message);
        return false;
    }
});
// Ejemplo de cómo enviar una solicitud al servidor con el token adjunto
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield sendRequestWithToken('https://localhost:3000/api/users', 'GET', null);
    if (response) {
        console.log('Data received:', response);
    }
    else {
        console.error('Failed to fetch data.');
    }
});
fetchData();
