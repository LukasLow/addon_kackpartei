function replaceText(node) {
    if (node.nodeType === 3) {
        let text = node.nodeValue;
        let replacedText = text.replace(/afd/gi, 'müllpartei');
        if (replacedText !== text) {
            node.nodeValue = replacedText;
        }
    }
}

function replaceTextOnPage() {
    const elements = document.getElementsByTagName('*');

    for (let element of elements) {
        for (let node of element.childNodes) {
            if (node.nodeType === 3) {
                let text = node.nodeValue;
                let replacedText = text.replace(/afd/gi, 'müllpartei');
                replacedText = replacedText.replace(/Alternative für Deutschland/gi, 'Nazis in Anzügen');

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

// Setzt das Intervall für die Funktion
setInterval(replaceTextOnPage, 1000); // 3000 Millisekunden = 3 Sekunden


// Beobachter-Initialisierung
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(replaceText);
    });
});

// Beobachtungskonfiguration
const config = { childList: true, subtree: true };

// Starten der Beobachtung
observer.observe(document.body, config);

// Ersetzen des Textes beim Laden der Seite
window.onload = replaceTextOnPage;
