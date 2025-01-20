function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.togglepair');
    checkboxes.forEach(checkbox => {
        const targetInput = document.getElementById(checkbox.getAttribute('data-target'));
        if (targetInput) {
            targetInput.disabled = !checkbox.checked;
            checkbox.addEventListener('change', function() {
                targetInput.disabled = !checkbox.checked;
            });
        }
    });
});

let userOptions = document.getElementById("userOptions");
userOptions.addEventListener("submit", async (e) => {
    e.preventDefault();

    let lang = document.getElementById("lang").value;
    let style = document.getElementById("stylesheetPath").value;
    let charset = document.getElementById("charset").value;
    let jsdir = document.getElementById("jsPath").value;
    let title = document.getElementById("title").value;


    let jsline;
    
    if (jsdir === "") {
        jsline = ""; 
    } else {
        jsline = `<script src="${jsdir}"></script>`;
    }
    
    if (style === "") {
        style = "styles.css"; 
    }

    document.getElementById("explosion-fx").innerHTML = '<img src="boom.gif" class="bigboom" alt="explosion">';

    let preprocessedHtml = `
<!DOCTYPE html>
<html lang="${lang}">
    <meta charset="${charset}">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="${style}">
    <body>

    <h1>HTML5 Skeleton</h1>

    </body>
    ${jsline}
</html> `;
    
    let outputHtml = `<pre>${preprocessedHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
    outputHtml += `<button onclick="copyContent()">Copy Content</button>`; // Append the button

    document.getElementById("output").innerHTML = outputHtml;
    
    await sleep(800);

    document.getElementById("explosion-fx").innerHTML = '';
});

function copyContent() {
    const content = document.getElementById("output").innerText;

    const filteredContent = content.replace('Copy Content','');

    const textarea = document.createElement('textarea');
    textarea.value = filteredContent;
    document.body.appendChild(textarea);
    
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
