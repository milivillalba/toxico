const text = document.getElementById('text');
const button = document.getElementById('analyze');
const predictions = document.getElementById('predictions');

const threshold = 0.9;

async function toxicidad(texto) {
    const model = await toxicity.load(threshold);
    const predictions = await model.classify(texto);
    
    return predictions;
}

button.addEventListener('click', async () => {
    const texto = text.value;
    const predicciones = await toxicidad(texto);
    

    let html = '';
    let mensajeToxico = false;

    predicciones.forEach((prediction) => {
        html += `<div>${prediction.label} : ${prediction.results[0].match}</div>`;
        if (prediction.results[0].match) {
            mensajeToxico = true;
        }
    });

    predictions.innerHTML = html;

    if (mensajeToxico) {
        // Mostrar la alerta de Bootstrap
        alertMessage.classList.remove('d-none'); // Remover la clase 'd-none' para mostrar la alerta
    } else {
        // Ocultar la alerta de Bootstrap
        alertMessage.classList.add('d-none'); // Agregar la clase 'd-none' para ocultar la alerta
    }
});
