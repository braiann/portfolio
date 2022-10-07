const enText = {
    "language": "en",
    "projects-navbar-option": "Projects",
    "contact-navbar-option": "Contact",
    "hi": "Hi!",
    "i-am-braian": "I'm <strong>Braian</strong>.",
    "im-from": "I'm from <strong>Argentina</strong>.",
    "i-am-a": "I'm a <strong id='developer'>developer</strong> <span style='display: none;' id='and'> and </span><strong id='designer'>designer</strong>",
    "interested-in-hiring": 'Interested in working with me? <a onclick="expandContactCard()" id="contact-me">Contact me</a>.',
    "change-language": "Change language"
}

const esText = {
    "language": "es",
    "projects-navbar-option": "Proyectos",
    "contact-navbar-option": "Contacto",
    "hi": "¡Hola!",
    "i-am-braian": "Soy <strong>Braian</strong>.",
    "im-from": "Soy de <strong>Argentina</strong>.",
    "i-am-a": "Soy un <strong id='developer'>desarrollador</strong> <span style='display: none;' id='and'> y </span><strong id='designer'>diseñador</strong>",
    "interested-in-hiring": '¿Te interesa trabajar conmigo? <a onclick="expandContactCard()" id="contact-me">Contactame.</a>.',
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
        const currentElement = document.getElementById(id)
        console.log(text)
        currentElement.innerHTML = text
    }
    console.log(`set to language ${selectedLanguage.language}`)
}

function changeLanguage() {
    selectedLanguage = selectedLanguage.language == "en" ? esText : enText
    setTextToLanguage()
}