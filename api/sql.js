// aqui lo de sql 

// api/mongo.js
const axios = require('axios');

const sql = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

const ApiSql = {
  clienteSql: async () => {
    try {
      const response = await sql.get('/clientesql');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error' };
    }
  },

  crearClienteSql: async (datos) => {
    try {
       const response = await sql.post("/crearclientsql", datos);
       return { success: true, data: response.data };
       
       
    } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Error' };
    }
  }
};

module.exports = ApiSql;