//funciones js para el modulo de categorias
const urlApi_ct = "http://localhost:9000";//colocar la url con el puerto

function listarCategorias(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_ct+"/categorias/listado",settings)
    .then(response => response.json())
    .then(function(data){
        
            var categorias = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de categorias</h1>
                </div>
                  
                <a href="#" onclick="registerForm_ct('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
            for(const categoria of data){
                //console.log(categoria.id_ct)
                categorias += `
                
                        <tr>
                            <th scope="row">${categoria.id_ct}</th>
                            <td>${categoria.nombre}</td>
                            <td>${categoria.descripcion}</td>
                            <td>
                            <a href="#" onclick="verCategoria('${categoria.id_ct}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>
                    `;
                
            }
            categorias += `
            </tbody>
                </table>
            `;
            document.getElementById("datos").innerHTML = categorias;
    })
}

function verCategoria(id_ct){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_ct+"/categoria/"+id_ct,settings)
    .then(response => response.json())
    .then(function(categoria){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Categoria</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre: ${categoria.nombre}</li>
                    <li class="list-group-item">Descripción: ${categoria.descripcion}</li>
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

function registerForm_ct(auth=false){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Categoría</h1>
            </div>
              
            <form action="" method="post" id="myForm_ct">
                <input type="hidden" name="id_ct" id="id_ct">
                <label for="nombre" class="form-label">Category name</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="descripcion"  class="form-label">Description</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarCategoria('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

async function registrarCategoria(auth=false){
    validaToken();
    var myForm = document.getElementById("myForm_ct");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data category ",jsonData);
    const request = await fetch(urlApi_ct+"/categoria", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(function(respuesta){
        console.log("respuesta peticion", respuesta)
    });
    if(auth){
        listarCategorias();
    }
    alertas("Se ha registrado la categoria exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

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