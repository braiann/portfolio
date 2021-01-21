window.addEventListener("load", function(event) {
    const elementsToBold = document.getElementsByTagName('b');
    const commentsToColor = document.getElementsByClassName('code-comment');
    const keywordsToColor = document.getElementsByClassName('code-keyword');
    const functionsToColor = document.getElementsByClassName('code-function');
    const cTypesToColor = document.getElementsByClassName('code-ctype');
    const variablesToColor = document.getElementsByClassName('code-variable');
    const cStructuresToColor = document.getElementsByClassName('code-cstructure');

    for (let i = 0; i < elementsToBold.length; i++) {
        setTimeout(() => elementsToBold.item(i).classList.add('bold'), 1000 + i * 300);
    }

    for (let i = 0; i < commentsToColor.length; i++) {
        commentsToColor.item(i).classList.add('code-comment-colored');
    }

    for (let i = 0; i < keywordsToColor.length; i++) {
        setTimeout(() => keywordsToColor.item(i).classList.add('code-keyword-colored'), 1100 + i * 150);
    }

    for (let i = 0; i < functionsToColor.length; i++) {
        setTimeout(() => functionsToColor.item(i).classList.add('code-function-colored'), 1100 + i * 150);
    }

    for (let i = 0; i < cTypesToColor.length; i++) {
        setTimeout(() => cTypesToColor.item(i).classList.add('code-ctype-colored'), 1100 + i * 150);
    }

    for (let i = 0; i < variablesToColor.length; i++) {
        setTimeout(() => variablesToColor.item(i).classList.add('code-variable-colored'), 1100 + i * 150);
    }

    for (let i = 0; i < cStructuresToColor.length; i++) {
        setTimeout(() => cStructuresToColor.item(i).classList.add('code-cstructure-colored'), 1100 + i * 150);
    }
});
