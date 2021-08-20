//variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')
// variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners()
function eventListeners() {
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)
    // campos de formulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)
    //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario)
    //enviar email
    formulario.addEventListener('submit', enviarEmail)
}



//functions
function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//validar ofrmulario
function validarFormulario(e) {

    if (e.target.value.length > 0) {
        // elimina los errores...
        const error = document.querySelector('p.error')
        if (error) {
            error.remove()
        }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    } else {
        // e.target.style.borderColor = 'red'
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('todos los campos son obligatorios')
    }
    // e.target.value.length > 0 ? console.log(e.target.value):e.target.classList.add('border', 'border-red-500').mostrarError()
    if (e.target.type === 'email') {
        // const resultado = e.target.value.indexOf('@')
        // if (resultado < 0) {
        if (re.test(e.target.value)) {
            const error = document.querySelector('p.error')
            if (error) {
                error.remove()
            }

            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        } else {
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('Email no valido')
        }
    }
    //habilitar boton enviar
    if (re.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
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

//envia el email
function enviarEmail(e) {
    e.preventDefault()
    //mostrar el spinner
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'
    //despues de 3 seg ocultar spinner y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none'
        // mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p')
        parrafo.textContent = 'se envio correctamente'
        parrafo.classList.add('text-center', 'my-10', 'bg-green-500', 'text-white', 'font-bold', 'p-5', 'mt-5', 'uppercase')
        // inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)
        setTimeout(() => {
            parrafo.remove()//elimina mensaje eniviado
            resetearFormulario()//resetea formulario
        }, 5000)
    }, 3000)
}

//resetea el formulario
function resetearFormulario() {
    formulario.reset()
    iniciarApp()
}