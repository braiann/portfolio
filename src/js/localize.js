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
    "modi-desc": "A landing page for a startup that streamlines apartment cleanings for tenants, cleaners, and admins.",
    "allied-desc": "A detailed website showcasing a company specializing in home renovations. This landing page serves as a portal to a variety of services, each with its own dedicated page.",
    "digitalexecutive-desc": "A funnel page crafted for a startup, designed to effectively advertise and capture leads for their specialized services.",
    "chrisbussing-desc": "Enhanced the landing page for a personal transformation coach in the tech sales industry.",
    "stem-desc": "A comprehensive mentorship platform engineers to facilitate connections between women in STEM for career advancement and networking.",
    "definebeauty-desc": "Created a visually striking and elegant design mock-up for an emerging makeup brand.",
    "estimator-desc": "Project cost estimation tool for consulting firm with built-in currency conversion for international contracts.",
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
    "modi-desc": "Una landing page para una startup que agiliza la limpieza de apartamentos para inquilinos, limpiadores y administradores.",
    "allied-desc": "Una página web detallada que muestra una empresa especializada en renovaciones de hogar. Esta landing page sirve como portal a una variedad de servicios, cada uno con su propia página dedicada.",
    "digitalexecutive-desc": "Una página de conversión diseñada para una startup, creada para publicitar eficazmente y capturar clientes potenciales para sus servicios especializados.",
    "chrisbussing-desc": "Mejora de la landing page para un coach de transformación personal en el área de ventas de tecnología.",
    "world-desc": "Una plataforma integral de mentoría diseñada para facilitar conexiones entre mujeres en STEM para el avance profesional y la creación de redes.",
    "definebeauty-desc": "Creación de una maqueta de diseño visualmente impactante y elegante para una marca de maquillaje emergente.",
    "estimator-desc": "Herramienta de estimación de costes de proyectos para empresas de consultoría con conversión de divisas integrada para contratos internacionales.",
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