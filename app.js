const cols = document.querySelectorAll('.col');


function randomColors() {
    
        const hex = "0123456789ABCDEF"
        let color = ''
        for (let i = 0; i < 6; i++) {
            color += hex[Math.floor(Math.random() * hex.length)]
        }
        return '#' + color;
}

function setColor() {
    cols.forEach((col) => {
        col.style.background = randomColors()
    })
}

setColor()
