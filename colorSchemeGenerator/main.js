// DOCUMENT ELEMENTS
const form = document.getElementById('inputs-form');
const seedInput = document.getElementById('seed-col-input');
const modeSelect = document.getElementById('mode-select');

// API CALL 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const seed = seedInput.value.substring(1);
    const mode = modeSelect.value;

    console.log(seed);

    fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${mode}`, 
        {method: 'GET'}
    )
        .then(res => res.json())
        .then(data => {
            for (let i = 1; i <= 5; i++) {
                document.getElementById(`display-${i}`).style.backgroundColor = data.colors[i - 1].hex.value;
                document.getElementById(`txt-${i}`).textContent = data.colors[i - 1].hex.value;
            }
        });
});
