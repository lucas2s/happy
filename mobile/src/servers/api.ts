import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

// Dispositivo físico: Colocar IP da rede do server backend
// Emulador Android: Executar comando adb reverse tcp:3333 tcp:3333 e usar localhost
// Emulador IOS: Colocar IP localhost