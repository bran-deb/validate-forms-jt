//variables
const btnEnviar = document.querySelector('#enviar')
const formulario = document.querySelector('#enviar-mail')
// variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

eventListeners()
function eventListeners() {
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)
    // campos de formulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)
}



//functions
function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}
//validar ofrmulario
function validarFormulario(e) {
    if (e.target.value.length > 0) {
        console.log('si hay algo');
    } else {
        // e.target.style.borderColor = 'red'
        e.target.classList.add('border', 'border-red-500')
        mostrarError('todos los campos son obligatorios')
    }
    // e.target.value.length > 0 ? console.log(e.target.value):e.target.classList.add('border', 'border-red-500').mostrarError()
    if (e.target.type === 'email') {
        const resultado = e.target.value.indexOf('@')
        if (resultado < 0) {
            mostrarError('email no valido')
        }
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'text-center', 'background-red', 'text-red-500', 'p-3', 'mt-5', 'error')
    // .querySelectorAll() nos permite usar el .length y otras colecciones
    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        //agregar mensaje error a formulario
        formulario.appendChild(mensajeError)
    }
    // errores.length === 0 ? formulario.appendChild(mensajeError) : null
}