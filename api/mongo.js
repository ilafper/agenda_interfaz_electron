// api/mongo.js
const axios = require('axios');

const mongo = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000
});

const ApiMongo = {
  clientesMongo: async () => {
    try {
      const response = await mongo.get('/clientes');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error' };
    }
  }
};

module.exports = ApiMongo;