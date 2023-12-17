let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    apellido: ''
}

let editar = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const btnEnviar = document.querySelector('#btnEnviar');

formulario.addEventListener('submit', validarformulario);

function validarformulario(e) {
    //Funcion : event.preventDefault()
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '') {
        alert('Por favor rellena todos los campos');
        return;
    }

    if(editar) {
        editarPersona();
        editar = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.apellido = apellidoInput.value;
        agregandoPersona();
    }

}

function agregandoPersona() {
    //PUSH - Agregar valores
    listaEmpleados.push({...objEmpleado});
    //MOSTRAR
    mostrarPersona();
    formulario.reseat();
    limpiarObjetos();
}

function limpiarObjetos() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.apellido = '';
}

function limpiarHtml() {
    const divEmpleado = document.querySelector('.div-empleado');
    while (divEmpleado.firstChild) {
        divEmpleado.removeChild(divEmpleado.firstChild);
    }
}

function mostrarPersona() {
    //queryselector
    limpiarHtml();
    const divEmpleado = document.querySelector('.div-empleado');

    listaEmpleados.forEach(persona => {
        const {id, nombre, apellido} = persona;
        // 1 fiorella rodriguez boton de EDITAR / boton de ELIMINAR
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido}`;
        parrafo.dataset.id = id;
        
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(persona);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn','btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn','btn-eliminar');
        parrafo.append(eliminarBoton)

        const hr = document.createElement('hr');

        divEmpleado.appendChild(parrafo);
        divEmpleado.appendChild(hr);
    })
}

function cargarEmpleado(persona) {
    const{id, nombre, apellido} = persona;
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    objEmpleado.id = id;

    formulario.querySelector('button[type = "submit"]').textContent = 'Actualizar';
    editar = true;

}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    mostrarPersona();

}

function editarPersona(){
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.apellido = apellidoInput.value;

    listaEmpleados.map(persona => {
        if (persona.id === objEmpleado.id) {
            persona.id = objEmpleado.id;
            persona.nombre = objEmpleado.nombre;
            persona.apellido = objEmpleado.apellido;
        }
    });

    limpiarHtml;
}

