$(function () {
  async function cargarClientessql() {
    try {
      const lista_clientes_sql = await window.ApiSql.clientes_sql();

      if (!lista_clientes_sql.success) {
        console.error(lista_clientes_sql.error);
        return;
      }


      let clientes = $(".listaClientesMongo");
      clientes.empty();

      let lista_cliente = lista_clientes_sql.data.lista_clientes;
      console.log(lista_cliente);

      for (let cada_cliente of lista_cliente) {
        let targetaCliente = `
                <tr class="cada_cliente">
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
                    <td class="bottones">
                        <div class="borrar btnnn">
                            <button class="borrarBtn" data-id="${cada_cliente.code_user}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </td>
                    </tr>`;

        clientes.append(targetaCliente);
      }

      console.log("Clientes Mongo:", lista_clientes_sql.data.lista_clientes);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function modal2() {
    console.log("hdfhdfhfhhf");
    // Delegar evento click en las cartas
    $(".addUser").on("click", function (e) {
      e.preventDefault();
      console.log("sisi crear");
      $(".modalCrear").fadeIn();

      $(".modalCrear form")[0].reset();
    });

    $(".modalCrear").click(function (e) {
      if ($(e.target).is(".modalCrear")) {
        $(".modalCrear").fadeOut();
      }
    });

    $(".cerrar").click(function (e) {
      $(".modalCrear").fadeOut();
    });
  }
  modal2();

  function modal3() {
    $(document).on("click", ".borrarBtn", function (e) {
      console.log("click borrar");

      e.preventDefault();
      $(".modalBorrar").fadeIn();

      $(".modalBorrar form")[0].reset();
    });
    $(document).on("click", ".modalBorrar", function (e) {
      if ($(e.target).is(".modalCrear")) {
        $(".modalCrear").fadeOut();
      }
    });

    $(document).on("click", ".cerrar", function (e) {
      $(".modalBorrar").fadeOut();
    });

    $(document).on("click", ".noBorrar", function (e) {
      $(".modalBorrar").fadeOut();
    });
  }


  modal3();

  function modal4() {
   
    $(document).on("click", ".siAceptar", function (e) {
      ocultarModalPerso();
    });
  }

  modal4();

  function mostrarModalPerso() {
    $('.modalPerso').css('display', 'flex');
  }
  function ocultarModalPerso() {
    $('.modalPerso').css('display', 'none');
  }
  cargarClientessql();

  async function creaCliente() {
    $(".enviarDatos").on("click", async function (e) {
      e.preventDefault(); // Evita que se recargue la página
      console.log("sisisi");
      let nombre = $("#nombre").val();
      let apellidos = $("#apellidos").val();
      let telefono = $("#telefono").val();
      let direccion = $("#direccion").val();
      let correo = $("#correo").val();
      console.log(nombre, apellidos, telefono, direccion, correo);
      
      try {
        const response = await fetch("http://localhost:3000/api/crearcliente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellidos,
            telefono,
            direccion,
            correo,
          }),
        });

        const data = await response.json();
        console.log(data.message);
        $(".modalCrear").fadeOut();
        $('.persomensaje').html(data.message);
        mostrarModalPerso();


        cargarClientessql();
      } catch (error) {
        console.error(error);
      }
    });
  }
  creaCliente();
  
  let id_eliminar = null;

function borrarCliente() {

  $(document).on("click", ".borrarBtn", function () {
    id_eliminar = $(this).data("id");

    console.log("ID a borrar:", id_eliminar);

    $(".modalBorrar").fadeIn();
  });
  

  $(document).on("click", ".siBorrar", async function () {

    if (!id_eliminar) {
      console.log("No hay ID seleccionado");
      return;
    }

    console.log("Borrando:", id_eliminar);

    try {
      const response = await fetch(
        `http://localhost:3000/api/eliminarcliente/${id_eliminar}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data.mensaje);

    } catch (error) {
      console.log("Error:", error);
    }

    $(".modalBorrar").fadeOut();
    id_eliminar = null;
  });

}
borrarCliente();










/*FILTROS  */
let filtroCampo;
let filtroValor;


let nombreBusqueda;
let filtroApe;
let tlfBusqueda;
let correoBusqueda;
let direcionBusqueda;

async function filtro() {
  $(document).on('input', ".valorFiltro", async function () {
    filtroCampo = $(".campoFiltro").val();
    filtroValor = $(".valorFiltro").val();
    console.log(filtroCampo, filtroValor);
    switch (filtroCampo) {
      case "nombre":
        await filtroNombre();
        //console.log(" nombre");
      
        break;
      case "apellidos":
        await filtroApellidos();
        //console.log(" apellidos");

        break;
      case "telefono":
        await filtroTelefono();
        console.log(" aaaaa");

        break;
      case "direccion":
        console.log(" direccion");

        await direccionFiltro();

        break;
      case "correo":

        await correoFiltro();
        console.log(" correo");

        break;
      default:
        break;
    }
  });
}
filtro();




async function filtroNombre() {
  nombreBusqueda= filtroValor;
  console.log("nombre busqueda",nombreBusqueda);
  if(nombreBusqueda=== ""){
    cargarClientessql();
  }
  try {
     const response = await fetch(`http://localhost:3000/api/filtronombre/${nombreBusqueda}`,{
      method:"GET"
     })
     const data = await response.json();
     
     console.log(data.mensaje);
     //console.log(data.datos);
      let clientes_sin_filtro = $(".listaClientesMongo");
      clientes_sin_filtro.empty();

      let lista_filtro_nombre = data.datos;
      console.log(lista_filtro_nombre);

      for (let cada_cliente of lista_filtro_nombre) {
        let targetaCliente = `
                <tr class="cada_cliente">
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
                    <td class="bottones">
                        <div class="borrar btnnn">
                            <button class="borrarBtn" data-id="${cada_cliente.code_user}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </td>
                    </tr>`;

        clientes_sin_filtro.append(targetaCliente);
      }
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}

async function filtroApellidos() {
  filtroApe = filtroValor;
  console.log("apellidos busqueda",filtroApe);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtroapellidos/${filtroApe}`,{
      method:"GET"
     })
     const data = await response.json();
     
     //console.log(data.mensaje);
     //console.log(data.datos);
      let clientes_sin_filtro = $(".listaClientesMongo");
      clientes_sin_filtro.empty();

      let lista_filtro_nombre = data.datos;
      console.log(lista_filtro_nombre);

      for (let cada_cliente of lista_filtro_nombre) {
        let targetaCliente = `
                <tr class="cada_cliente">
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
                    <td class="bottones">
                        <div class="borrar btnnn">
                            <button class="borrarBtn" data-id="${cada_cliente.code_user}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </td>
                    </tr>`;

        clientes_sin_filtro.append(targetaCliente);
      }
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}



async function filtroTelefono() {
  tlfBusqueda= filtroValor;
  console.log("apellidos busqueda",tlfBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtrotelefono/${tlfBusqueda}`,{
      method:"GET"
     })
     const data = await response.json();
     
     //console.log(data.mensaje);
     //console.log(data.datos);
      let clientes_sin_filtro = $(".listaClientesMongo");
      clientes_sin_filtro.empty();

      let lista_filtro_nombre = data.datos;
      console.log(lista_filtro_nombre);

      for (let cada_cliente of lista_filtro_nombre) {
        let targetaCliente = `
                <tr class="cada_cliente">
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
                    <td class="bottones">
                        <div class="borrar btnnn">
                            <button class="borrarBtn" data-id="${cada_cliente.code_user}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </td>
                    </tr>`;

        clientes_sin_filtro.append(targetaCliente);
      }
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}


async function correoFiltro() {
  correoBusqueda= filtroValor;
  console.log("correo busqueda",correoBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtrocorreo/${correoBusqueda}`,{
      method:"GET"
     })

     const data = await response.json();
     
     //console.log(data.mensaje);
     //console.log(data.datos);
      let clientes_sin_filtro = $(".listaClientesMongo");
      clientes_sin_filtro.empty();

      let lista_filtro_nombre = data.datos;
      console.log(lista_filtro_nombre);

      for (let cada_cliente of lista_filtro_nombre) {
        let targetaCliente = `
                <tr class="cada_cliente">
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
                    <td class="bottones">
                        <div class="borrar btnnn">
                            <button class="borrarBtn" data-id="${cada_cliente.code_user}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </td>
                    </tr>`;

        clientes_sin_filtro.append(targetaCliente);
      }
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}



async function direccionFiltro() {
  direcionBusqueda= filtroValor;
  console.log("direccion busqueda",direcionBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtrodireccion/${direcionBusqueda}`,{
      method:"GET"
     })

     const data = await response.json();
     
     //console.log(data.mensaje);
     //console.log(data.datos);
      let clientes_sin_filtro = $(".listaClientesMongo");
      clientes_sin_filtro.empty();

      let lista_filtro_nombre = data.datos;
      console.log(lista_filtro_nombre);

      for (let cada_cliente of lista_filtro_nombre) {
        let targetaCliente = `
                <tr class="cada_cliente">
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
                    <td class="bottones">
                        <div class="borrar btnnn">
                            <button class="borrarBtn" data-id="${cada_cliente.code_user}"><i class='bx bxs-trash'></i></button>
                        </div>
                    </td>
                    </tr>`;

        clientes_sin_filtro.append(targetaCliente);
      }
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}


});
