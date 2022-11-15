const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLocaleLowerCase() === 'space') {
    setColor()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyColor(event.target.textContent)
  }
})

// function randomColors() {

//         const hex = "0123456789ABCDEF"
//         let color = ''
//         for (let i = 0; i < 6; i++) {
//             color += hex[Math.floor(Math.random() * hex.length)]
//         }
//         return '#' + color;
// }

function setColor(initial) {

  const colors = initial ? getColorsHash() : [];

  cols.forEach((col, index) => {
    const locked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2')
    const button = col.querySelector('button')
   

    if (locked) {
      colors.push(text.textContent)
      return
    }

    const color = initial 
    ? colors[index] ? colors[index] : chroma.random() : chroma.random()

    if (!initial) {
      colors.push(color)
    }


    text.textContent = color;
    col.style.background = color;

    textColor(text, color)
    textColor(button, color)
  })

  colorsHash(colors)
}

function copyColor(text) {
  return navigator.clipboard.writeText(text)
}

function textColor(text, color) {
  const lum = chroma(color).luminance()

  text.style.color = lum > 0.5 ? 'black' : 'white'

}

function colorsHash(colors = []) {
  document.location.hash = colors.map(col => {
    return col.toString().substring(1)
  }).join('-')
}

function getColorsHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map((color) => '#' + color)
  }
  return []
}
setColor(true)
