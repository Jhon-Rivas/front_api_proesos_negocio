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
                        <th scope="col">Last Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
            for(const categoria of data){
                //console.log(categoria.id)
                categorias += `
                
                        <tr>
                            <th scope="row">${categoria.id}</th>
                            <td>${categoria.nombre}</td>
                            <td>${categoria.descripcion}</td>
                            <td>
                            <a href="#" onclick="verCategoria('${categoria.id}')" class="btn btn-outline-info">
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

/*onclick="eliminaCategoria('${categoria.id}')">
    <i class="fa-solid fa-user-minus"></i>

function eliminaCategoria(id){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_ct+"/categoria/"+id,settings)
    .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        listarCategorias();
        alertas("Se ha eliminado el usuario exitosamente!",2)
      })
}

<a href="#" onclick="verModificarcategoria('${categoria.id}')" class="btn btn-outline-warning">
    <i class="fa-solid fa-user-pen"></i>
</a>

function verModificarCategoria(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_ct+"/categoria/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Categoria</h1>
                </div>
              
                <form action="" method="post" id="myForm">
                    <input type="hidden" name="id" id="id" value="${usuario.id}">
                    <label for="nombre" class="form-label">First Name</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" required value="${usuario.nombre}"> <br>
                    <label for="apellidos"  class="form-label">Last Name</label>
                    <input type="text" class="form-control" name="apellidos" id="apellidos" required value="${usuario.apellidos}"> <br>
                    <label for="documento"  class="form-label">document</label>
                    <input type="text" class="form-control" name="documento" id="documento" required value="${usuario.documento}"> <br>
                    <label for="correo" class="form-label">correo</label>
                    <input type="correo" class="form-control" name="correo" id="correo" required value="${usuario.correo}"> <br>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarUsuario('${usuario.id}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function modificarUsuario(id){
    validaToken();
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi_ct+"/usuario/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listarUsuarios();
    alertas("Se ha modificado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}*/

function verCategoria(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi_ct+"/categoria/"+id,settings)
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
                <input type="hidden" name="id" id="id">
                <label for="nombre" class="form-label">Nombre de la categoría</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="descripcion"  class="form-label">Descripción</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarCategoria('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

async function registrarCategoria(auth=false){
    var myForm = document.getElementById("myForm_ct");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data categorie ",jsonData);
    const request = await fetch(urlApi_ct+"/categoria", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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