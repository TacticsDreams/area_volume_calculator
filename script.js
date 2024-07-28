// script.js
document.addEventListener('DOMContentLoaded', () => {
    showSection('perimeterSection'); // Show perimeter section by default
    fetch('introductions.json')
        .then(response => response.json())
        .then(data => {
            window.introductions = data;

            // Initialize the page with square perimeter inputs
            document.getElementById('shapePerimeter').value = 'carré';
            updateInputs('perimeter');
        })
        .catch(error => console.error('Error fetching introductions:', error));
});

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function toggleMenu() {
    document.querySelector('.navbar').classList.toggle('active');
}

function updateInputs(type) {
    let shape = document.getElementById('shape' + capitalizeFirstLetter(type)).value;
    let inputs = '';
    let introduction = '';
    if (introductions && introductions[type] && introductions[type][shape]) {
        introduction = introductions[type][shape];
    }

    const sideInput = '<label for="side">Côté:</label><input type="number" id="side" placeholder="Côté">';
    const lengthInput = '<label for="length">Longueur:</label><input type="number" id="length" placeholder="Longueur">';
    const widthInput = '<label for="width">Largeur:</label><input type="number" id="width" placeholder="Largeur">';
    const heightInput = '<label for="height">Hauteur:</label><input type="number" id="height" placeholder="Hauteur">';
    const base1Input = '<label for="base1">Base 1:</label><input type="number" id="base1" placeholder="Base 1">';
    const base2Input = '<label for="base2">Base 2:</label><input type="number" id="base2" placeholder="Base 2">';
    const radiusInput = '<label for="radius">Rayon:</label><input type="number" id="radius" placeholder="Rayon">';

    if (type === 'perimeter') {
        if (shape === 'carré') {
            inputs = sideInput;
        } else if (shape === 'rectangle') {
            inputs = lengthInput + widthInput;
        } else if (shape === 'triangle') {
            inputs = '<label for="side1">Côté 1:</label><input type="number" id="side1" placeholder="Côté 1">' +
                     '<label for="side2">Côté 2:</label><input type="number" id="side2" placeholder="Côté 2">' +
                     '<label for="side3">Côté 3:</label><input type="number" id="side3" placeholder="Côté 3">';
        } else if (shape === 'cercle') {
            inputs = radiusInput;
        } else if (shape === 'losange') {
            inputs = sideInput;
        } else if (shape === 'trapèze') {
            inputs = '<label for="side1">Côté 1:</label><input type="number" id="side1" placeholder="Côté 1">' +
                     '<label for="side2">Côté 2:</label><input type="number" id="side2" placeholder="Côté 2">' +
                     '<label for="side3">Côté 3:</label><input type="number" id="side3" placeholder="Côté 3">' +
                     '<label for="side4">Côté 4:</label><input type="number" id="side4" placeholder="Côté 4">';
        }
        document.getElementById('perimeterIntroduction').innerHTML = introduction;
        document.getElementById('perimeterInputs').innerHTML = inputs;
    } else if (type === 'area') {
        if (shape === 'carré') {
            inputs = sideInput;
        } else if (shape === 'rectangle') {
            inputs = lengthInput + widthInput;
        } else if (shape === 'triangle') {
            inputs = base1Input + heightInput;
        } else if (shape === 'cercle') {
            inputs = radiusInput;
        } else if (shape === 'losange') {
            inputs = base1Input + heightInput;
        } else if (shape === 'trapèze') {
            inputs = base1Input + base2Input + heightInput;
        }
        document.getElementById('areaIntroduction').innerHTML = introduction;
        document.getElementById('areaInputs').innerHTML = inputs;
    } else if (type === 'volume') {
        if (shape === 'cube') {
            inputs = sideInput;
        } else if (shape === 'sphère') {
            inputs = radiusInput;
        } else if (shape === 'prisme') {
            inputs = lengthInput + widthInput + heightInput;
        } else if (shape === 'cylindre') {
            inputs = radiusInput + heightInput;
        } else if (shape === 'cône') {
            inputs = radiusInput + heightInput;
        } else if (shape === 'pyramide') {
            inputs = base1Input + heightInput;
        } else if (shape === 'parallélépipède rectangle') {
            inputs = lengthInput + widthInput + heightInput;
        }
        document.getElementById('volumeIntroduction').innerHTML = introduction;
        document.getElementById('volumeInputs').innerHTML = inputs;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculatePerimeter() {
    let shape = document.getElementById('shapePerimeter').value;
    let perimeter;

    if (shape === 'carré') {
        const side = document.getElementById('side').value;
        perimeter = 4 * side;
    } else if (shape === 'rectangle') {
        const length = document.getElementById('length').value;
        const width = document.getElementById('width').value;
        perimeter = 2 * (Number(length) + Number(width));
    } else if (shape === 'triangle') {
        const side1 = document.getElementById('side1').value;
        const side2 = document.getElementById('side2').value;
        const side3 = document.getElementById('side3').value;
        perimeter = Number(side1) + Number(side2) + Number(side3);
    } else if (shape === 'cercle') {
        const radius = document.getElementById('radius').value;
        perimeter = 2 * Math.PI * radius;
    } else if (shape === 'losange') {
        const side = document.getElementById('side').value;
        perimeter = 4 * side;
    } else if (shape === 'trapèze') {
        const side1 = document.getElementById('side1').value;
        const side2 = document.getElementById('side2').value;
        const side3 = document.getElementById('side3').value;
        const side4 = document.getElementById('side4').value;
        perimeter = Number(side1) + Number(side2) + Number(side3) + Number(side4);
    }

    document.getElementById('perimeterResult').innerText = 'Périmètre: ' + perimeter;
}

function calculateArea() {
    let shape = document.getElementById('shapeArea').value;
    let area;

    if (shape === 'carré') {
        const side = document.getElementById('side').value;
        area = Math.pow(side, 2);
    } else if (shape === 'rectangle') {
        const length = document.getElementById('length').value;
        const width = document.getElementById('width').value;
        area = length * width;
    } else if (shape === 'triangle') {
        const base = document.getElementById('base1').value;
        const height = document.getElementById('height').value;
        area = (base * height) / 2;
    } else if (shape === 'cercle') {
        const radius = document.getElementById('radius').value;
        area = Math.PI * Math.pow(radius, 2);
    } else if (shape === 'losange') {
        const base = document.getElementById('base1').value;
        const height = document.getElementById('height').value;
        area = base * height;
    } else if (shape === 'trapèze') {
        const base1 = document.getElementById('base1').value;
        const base2 = document.getElementById('base2').value;
        const height = document.getElementById('height').value;
        area = ((Number(base1) + Number(base2)) * height) / 2;
    }

    document.getElementById('areaResult').innerText = 'Aire: ' + area;
}

function calculateVolume() {
    let shape = document.getElementById('shapeVolume').value;
    let volume;

    if (shape === 'cube') {
        const side = document.getElementById('side').value;
        volume = Math.pow(side, 3);
    } else if (shape === 'sphère') {
        const radius = document.getElementById('radius').value;
        volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    } else if (shape === 'prisme') {
        const length = document.getElementById('length').value;
        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;
        volume = length * width * height;
    } else if (shape === 'cylindre') {
        const radius = document.getElementById('radius').value;
        const height = document.getElementById('height').value;
        volume = Math.PI * Math.pow(radius, 2) * height;
    } else if (shape === 'cône') {
        const radius = document.getElementById('radius').value;
        const height = document.getElementById('height').value;
        volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    } else if (shape === 'pyramide') {
        const base = document.getElementById('base1').value;
        const height = document.getElementById('height').value;
        volume = (1 / 3) * base * height;
    } else if (shape === 'parallélépipède rectangle') {
        const length = document.getElementById('length').value;
        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;
        volume = length * width * height;
    }

    document.getElementById('volumeResult').innerText = 'Volume: ' + volume;
}
