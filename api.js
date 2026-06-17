const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2dHUyNjc0NUB2ZWx0ZWNoLmVkdS5pbiIsImV4cCI6MTc4MTY3ODg1MiwiaWF0IjoxNzgxNjc3OTUyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTVlYzcwYzUtMzM0MC00OTgwLTljYzUtYTZhY2NjMjJjZWMyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFkaHVtaXRoYSBjIiwic3ViIjoiMWM5YjVkOWUtODEzYS00YjMyLWFmYTgtYTJmZTYwNTBkOTY5In0sImVtYWlsIjoidnR1MjY3NDVAdmVsdGVjaC5lZHUuaW4iLCJuYW1lIjoibWFkaHVtaXRoYSBjIiwicm9sbE5vIjoiMjY3NDUiLCJhY2Nlc3NDb2RlIjoianVGcGh2IiwiY2xpZW50SUQiOiIxYzliNWQ5ZS04MTNhLTRiMzItYWZhOC1hMmZlNjA1MGQ5NjkiLCJjbGllbnRTZWNyZXQiOiJzcU1WREhZdGtaRURtZ1VTIn0.FkbS7sMDXSwFpfgERItA4zL0tk6ou_TMIJi_NomvYTI";

const headers = {
  Authorization: `Bearer ${TOKEN}`
};

async function getDepots() {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/depots",
    { headers }
  );

  return response.data;
}

async function getVehicles() {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/vehicles",
    { headers }
  );

  return response.data;
}

module.exports = {
  getDepots,
  getVehicles
};