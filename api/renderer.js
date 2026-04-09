$(function () {
  async function cargarClientesMongo() {
    try {
      const lista_clientes_mongo = await window.apiMongo.clientes();

      if (!lista_clientes_mongo.success) {
        console.error(lista_clientes_mongo.error);
        return;
      }

      let clientes = $(".listaClientesMongo");
      clientes.empty();

      let lista_cliente = lista_clientes_mongo.data.lista_clientes;
      console.log(lista_cliente);

      for (let cada_cliente of lista_cliente) {
        let targetaCliente = `
                <tr>
                    <td>
                        <div class="nombre_email">
                            <div class="ladoIzq">
                                <div class="perfil">
                                    
                                </div>
                            </div>
                            <div class="ladoDer">
                                <p>${cada_cliente.nombre}</p>
                                <p>${cada_cliente.correo}</p>
                            </div>
                        </div>
                    </td>
                    <td>${cada_cliente.apellidos}</td>
                    <td>${cada_cliente.telefono}</td>
                    <td>${cada_cliente.direccion}</td>
                    <td>
                        <div class="borrar">
                            <i class='bx bxs-edit'>Editar</i>
                        </div>
                        <div>
                            <i class='bx bxs-trash'>Borrar</i>
                        </div>
                    </td>
                    </tr>`;

        clientes.append(targetaCliente);
      }

      console.log("Clientes Mongo:", lista_clientes_mongo.data.lista_clientes);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  cargarClientesMongo();
});
