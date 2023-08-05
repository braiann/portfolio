const enText = {
    "language": "en",
    "projects-navbar-option": "Projects",
    "contact-navbar-option": "Contact",
    "hi": "Hi!",
    "hello1": "Hello.",
    "hello2": "Hello.",
    "hello3": "Hello.",
    "i-am-braian": "I'm <strong>Braian</strong>.",
    "im-from": "I'm from <strong>Argentina</strong>.",
    "i-am-a": "I'm a <strong id='developer'>developer</strong> <span style='display: none;' id='and'> and </span><strong id='designer'>designer</strong>",
    "modi-desc": "Manage your amenities and save money.",
    "allied-desc": "Website with easy access to the company's services.",
    "blog-desc": "Blog with login for editing capabilities.",
    "booktracker-desc": "Track the books you've read, and the progress in the ones you're reading.",
    "world-desc": "Landing page. Example of what I can make.",
    "password-desc": "Generate passwords with several parameters to choose from.",
    "interested-in-hiring": 'Interested in working with me? <a onclick="expandContactCard()" id="contact-me">Contact me</a>.',
    "change-language": "Change language"
}

const esText = {
    "language": "es",
    "projects-navbar-option": "Proyectos",
    "contact-navbar-option": "Contacto",
    "hi": "¡Hola!",
    "hello1": "Hola.",
    "hello2": "Hola.",
    "hello3": "Hola.",
    "i-am-braian": "Soy <strong>Braian</strong>.",
    "im-from": "Soy de <strong>Argentina</strong>.",
    "i-am-a": "Soy un <strong id='developer'>desarrollador</strong> <span style='display: none;' id='and'> y </span><strong id='designer'>diseñador</strong>",
    "modi-desc": "Gestiona tus comodidades y ahorra dinero.",
    "allied-desc": "Sitio web con acceso a los servicios de la empresa.",
    "blog-desc": "Blog con autenticación para editar.",
    "booktracker-desc": "Lleva rastro de los libros que lees y el progreso en los que estás leyendo.",
    "world-desc": "Página de inicio. Ejemplo de lo que puedo hacer.",
    "password-desc": "Genera contraseñas con varios parámetros para elegir.",
    "interested-in-hiring": '¿Te interesa trabajar conmigo? <a onclick="expandContactCard()" id="contact-me">Contactame</a>.',
    "change-language": "Cambiar idioma"
}

let selectedLanguage = enText

switch (navigator.language.substring(0, 2)) {
    case 'es':
        selectedLanguage = esText
        break
    default:
        selectedLanguage = enText
        break
}

setTextToLanguage()

function setTextToLanguage() {
    console.log(selectedLanguage)
    for (const [id, text] of Object.entries(selectedLanguage)) {
        if (id == "language") continue
        console.log(id, text)
        const currentElement = document.getElementById(id)
        if (currentElement) {
            currentElement.innerHTML = text
        }
    }
    console.log(`set to language ${selectedLanguage.language}`)
}

function changeLanguage() {
    selectedLanguage = selectedLanguage.language == "en" ? esText : enText
    setTextToLanguage()
}