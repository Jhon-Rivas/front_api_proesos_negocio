//funciones js para el modulo de usuarios
const urlApi_arti = "http://localhost:9000";//colocar la url con el puerto

function listarArticulos(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_arti+"/articulos",settings)
    .then(response => response.json())
    .then(function(data){
        
            var articulos = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de articulos</h1>
                </div>
                  
                <a href="#" onclick="registerForm_art('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Registration date</th>
                        <th scope="col">User name</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Selling price</th>
                        <th scope="col">Purchase price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
            for(const articulo of data){
                console.log(articulo.usuario.nombre)
                articulos += `
                
                        <tr>
                            <th scope="row">${articulo.id}</th>
                            <td>${articulo.codigo}</td>
                            <td>${articulo.nombre}</td>
                            <td>${articulo.descripcion}</td>
                            <td>${articulo.fechaRegistro}</td>
                            <td>${articulo.usuario.nombre}</td>
                            <td>${articulo.categoria.nombre}</td>
                            <td>${articulo.stock}</td>
                            <td>${articulo.precioVenta}</td>
                            <td>${articulo.precioCompra}</td>
                            <td>
                            <div>
                            <button type="button" class="btn btn-outline-danger" 
                            onclick="eliminaArticulo('${articulo.codigo}')">
                                <i class="fa-solid fa-user-minus"></i>
                            </button>
                            <a href="#" onclick="verModificarArticulo('${articulo.codigo}')" class="btn btn-outline-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a href="#" onclick="verArticulo('${articulo.codigo}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </div>
                            </td>
                        </tr>
                    `;
                
            }
            articulos += `
            </tbody>
                </table>
            `;
            document.getElementById("datos").innerHTML = articulos;
    })
}
/*
function eliminaArticulo(codigo){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_arti+"/articulo/eliminar/"+codigo,settings)
    .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        listarArticulos();
        alertas("Se ha eliminado el articulo exitosamente!",2)
      })
}

function verModificarArticulo(codigo){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_arti+"/articulo/ver/"+codigo,settings)
    .then(response => response.json())
    .then(function(data){
        fetch(urlApi_arti+"/categorias",settings)
        .then(response => response.json())
        .then(function(categoria){
            console.log(categoria);      
            cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Articulo</h1>
                </div>
              
                <form action="" method="post" id="myFormReg_art">
                <input type="hidden" name="id" id="id">
                <label for="codigo" class="form-label">codigo</label>
                <input type="text" class="form-control" name="codigo" id="codigo" required value="${data.codigo}"> <br>
                <label for="nombre"  class="form-label">nombre</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required value="${data.nombre}"> <br>
                <label for="descripcion"  class="form-label">descripcion</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required value="${data.descripcion}"> <br>
                <label for="fechaRegistro" class="form-label">fechaRegistro</label>
                <input type="date" class="form-control" name="fechaRegistro" id="fechaRegistro" required value="${data.fechaRegistro}"> <br>
                <label for="">Categoria:</label>
                <select class="form-select" name="categoria" id="categoria" required>

                `;for(const categorias of categoria){
                    cadena+=`
                    <option value="${categorias.id_ct}">${categorias.descripcion}</option>
                    
                    `;

                }
                cadena+=`
                </select>


                <label for="stock" class="form-label">stock</label>
                <input type="text" class="form-control" id="stock" name="stock" required value="${data.stock}"> <br>
                <label for="precioVenta" class="form-label">precioVenta</label>
                <input type="text" class="form-control" id="precioVenta" name="precioVenta" required value="${data.precioVenta}"> <br>
                <label for="precioCompra" class="form-label">precioCompra</label>
                <input type="precioCompra" class="form-control" id="precioCompra" name="precioCompra" required value="${data.precioCompra}"> <br>
                <div class="col-md-12 text-center">
                <button type="button" class="btn btn-warning float-right"  onclick="modificarArticulo('${data.codigo}')">
                    <i class="bi bi-cloud-upload">Modificar</i>
                </button>
                </div>
                </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
        })
    })
}

async function modificarArticulo(codigo){
    validaToken();
    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var fechaRegistro = document.getElementById('fechaRegistro').value;
    var stock = document.getElementById('stock').value;
    var precioVenta = document.getElementById('precioVenta').value;
    var precioCompra = document.getElementById('precioCompra').value;
    var categoria = document.getElementById('categoria').value;
    let usuario = localStorage.id;

    var json = {
        "codigo":codigo,
        "nombre":nombre,
        "descripcion":descripcion,
        "fechaRegistro":fechaRegistro,
        "categoria":{
            "id_ct":categoria,
        },
        "stock":stock,
        "precioVenta":precioVenta,
        "precioCompra":precioCompra,
        "usuario":{
            "id":usuario,
        }
    };
    
    console.log(json);
    const request = await fetch(urlApi_arti + "/articulo/" + codigo, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(json)
    });
    listarArticulos();
    alertas("Se ha modificado el Articulo exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verArticulo(codigo){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_arti+"/articulo/ver/"+codigo,settings)
    .then(response => response.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Articulo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Code: ${articulo.codigo}</li>
                    <li class="list-group-item">Name: ${articulo.nombre}</li>
                    <li class="list-group-item">Description: ${articulo.descripcion}</li>
                    <li class="list-group-item">Category name: ${articulo.usuario.nombre}</li>
                    <li class="list-group-item">Category name: ${articulo.categoria.nombre}</li>
                    <li class="list-group-item">Stock: ${articulo.stock}</li>
                    <li class="list-group-item">Selling price: ${articulo.precioVenta}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

function alertas(mensaje,tipo){
    var color ="warning";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("alerta").innerHTML = alerta;
}

function registerForm_art(auth=false){
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_arti+"/categorias/listado",settings)
    .then(response => response.json())
    .then(function(data){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Articulo</h1>
            </div>
              
            <form action="" method="post" id="myFormReg_art">
                <input type="hidden" name="id" id="id">
                <label for="codigo" class="form-label">Code</label>
                <input type="text" class="form-control" name="codigo" id="codigo" required> <br>
                <label for="nombre" class="form-label">Name</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="descripcion"  class="form-label">Description</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
                <label for="fechaRegistro"  class="form-label">Registration date</label>
                <input type="date" class="form-control" name="fechaRegistro" id="fechaRegistro" required> <br>
                <label for="">Categoria:</label>
                <select class="form-select" name="categoria" id="categoria" required>
                `;for(const Categoria of data){
                    cadena+=`
                    <option value="${Categoria.id_ct}">${Categoria.descripcion}</option>
                    
                    `;

                }
                cadena+=`
                </select>
                <label for="stock" class="form-label">Stock</label>
                <input type="text" class="form-control" name="stock" id="stock" required> <br>
                <label for="precioVenta" class="form-label">Selling price</label>
                <input type="text" class="form-control" id="precioVenta" name="precioVenta" required> <br>
                <label for="precioCompra" class="form-label">Purchase price</label>
                <input type="text" class="form-control" id="precioCompra" name="precioCompra" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarArticulo('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function registrarArticulo(auth=false){
    validaToken();
    console.log(localStorage.id);
    let codigo = document.querySelector('#myFormReg_art #codigo').value;
    let nombre = document.querySelector('#myFormReg_art #nombre').value;
    let descripcion = document.querySelector('#myFormReg_art #descripcion').value;
    let fechaRegistro = document.querySelector('#myFormReg_art #fechaRegistro').value;
    let usuario = localStorage.id;
    let categoria = document.querySelector('#myFormReg_art #categoria').value;
    let stock = document.querySelector('#myFormReg_art #stock').value;
    let precioVenta = document.querySelector('#myFormReg_art #precioVenta').value;
    let precioCompra = document.querySelector('#myFormReg_art #precioCompra').value;

    var jsonData={

        "codigo":codigo,
        "nombre":nombre,
        "descripcion":descripcion,
        "fechaRegistro":fechaRegistro,
        "usuario":{
            "id":usuario
        },
        "categoria":{
            "id_ct":categoria
        },
        "stock":stock,
        "precioVenta":precioVenta,
        "precioCompra":precioCompra
    }

    console.log("data article ",jsonData);
    const request = await fetch(urlApi_arti+"/articulo", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(function(respuesta){
        console.log("respuesta peticion", respuesta)
    });
    if(auth){
        listarArticulos();
    }
    alertas("Se ha registrado el articulo exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}*/

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}

function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}