const enText = {
    "projects-navbar-option": "Projects",
    "contact-navbar-option": "Contact",
    "hi": "Hi!",
    "i-am-braian": "I'm <strong>Braian</strong>.",
    "im-from": "I'm from <strong>Argentina</strong>.",
    "i-am-a": "I'm a <strong id='developer'>developer</strong> <span style='display: none;' id='and'> and </span><strong id='designer'>designer</strong>",
    "interested-in-hiring": 'Interested in working with me? <a onclick="expandContactCard()" id="contact-me">Contact me</a>.'
}

const esText = {
    "projects-navbar-option": "Projects",
    "contact-navbar-option": "Contact",
    "hi": "Hi!",
    "i-am-braian": "I'm <strong>Braian</strong>.",
    "im-from": "I'm from <strong>Argentina</strong>.",
    "i-am-a": "I'm a <strong id='developer'>developer</strong> <span style='display: none;' id='and'> and </span><strong id='designer'>designer</strong>",
    "interested-in-hiring": 'Interested in working with me? <a onclick="expandContactCard()" id="contact-me">Contact me</a>.'
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


for (const [id, text] of Object.entries(enText)) {
    const currentElement = document.getElementById(id)
    currentElement.innerHTML = text
}