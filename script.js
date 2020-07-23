
const api = 'https://api.nasa.gov/insight_weather/?api_key=c0lFBFqAoU0dDeIFBXl1MYkcUZ3kWmDlDcnEJQDL&feedtype=json&ver=1.0';

function getInfo() {
    return fetch(api).then(response => response.json())
        .then(data => {
            const {
                sol_keys,
                validity_checks,
                ...info
            } = data

            console.log(data);

            const infoDia = Object.entries(info).map(([sol, apiData]) => {
                return {
                    sol: sol,
                    tempMedia: apiData.AT.av,
                    estacao: apiData.Season,
                    pressaoMedia: apiData.PRE.av,
                    ventoMedio: apiData.HWS.av,
                }
            })
            return infoDia;
        })
}

const solElement = document.querySelector('[sol-atual]');
const tempElement = document.querySelector('[temp-atual]');
const seasonElement = document.querySelector('[estacao-atual]');
const presElement = document.querySelector('[pressao-atual]');
const windElement = document.querySelector('[vento-atual]');

function mostrarClima(sols) {
    const solAtual = sols[6];
    solElement.innerText = solAtual.sol;
    tempElement.innerText = solAtual.tempMedia;
    seasonElement.innerText = solAtual.estacao;
    presElement.innerText = solAtual.pressaoMedia;
    windElement.innerText = Math.floor(solAtual.ventoMedio * 3.6);

}

getInfo().then(sols => {
    mostrarClima(sols)
});
