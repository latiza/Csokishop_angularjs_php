function renderCsokik() {
    let csokiHTML = "";
    let csokiLista = document.getElementById("csoki-lista");
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost/csokishop/read.php'; 
    xhr.open('GET', url, true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            let csokik = JSON.parse(xhr.responseText);
            console.log("Csokik tömb:" , csokik);
            csokik.forEach(function(csoki) {
                csokiHTML += `
                    <div class="col">
                        <div class="${csoki.raktaron == 1 ? "bg-success" : "bg-danger"} m-2 p-2">
                            <h2>${csoki.nev}</h2>
                            <p>A termék ára: ${csoki.ara} Ft</p>
                            <p>A termék cikkszáma: ${csoki.id} </p>
                            <button class="btn btn-danger" onclick="torles(${csoki.id})">Törlés</button>
                            <button class="btn btn-primary" onclick="modositas(${csoki.id})">Módosítás</button>
                        </div>
                    </div>
                `;
            });

            csokiLista.innerHTML = csokiHTML;
        } else {
            console.error('Hiba történt az adatok betöltésekor:', xhr.status, xhr.statusText);
        }
    };

    xhr.send();
}

//Új termék felvitele
document.getElementById('ujtermek').onclick = function () {
    let newFormHTML = `
        <h4>Áru hozzáadása:</h4>
        <form id="uj-csoki" class="p-5">
            <label class="w-100">
                <h5>Termék neve:</h5>
                <input class="form-control" type="text" name="nev">
            </label>
            <label class="w-100">
                <h5>Termék ára:</h5>
                <input class="form-control" type="number" name="ara">
            </label>
            <label class="w-100">
                <h5>Van raktáron?</h5> 
                <input class="form-control" type="checkbox" name="raktaron">
            </label>
            <button class="btn btn-success" type="submit">Küldés</button>
        </form>
    `;

    let ujElem = document.getElementById('uj');
    ujElem.innerHTML = newFormHTML;
    document.getElementById('ujtermek').style.display = 'none';

    let ujCsokiForm = document.getElementById("uj-csoki");
    ujCsokiForm.onsubmit = function (event) {
        event.preventDefault();
        let nev = event.target.elements.nev.value;
        let ara = event.target.elements.ara.value;
        let raktaron = event.target.elements.raktaron.checked;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/csokishop/create.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = function() {
            if (xhr.status === 201) {
                renderCsokik();
                ujElem.innerHTML = '';
                document.getElementById('ujtermek').style.display = 'block';
            } else {
                console.error('Hiba történt az adatok létrehozása során:', xhr.status, xhr.statusText);
            }
        };

        xhr.send(JSON.stringify({
            nev: nev,
            ara: ara,
            raktaron: raktaron
        }));
    };
};
//Törlés
function torles(id) {
    console.log('Törlendő elem ID-je:', id);

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost/csokishop/delete.php?id=' + id, true);

    xhr.onload = function() {
        console.log('Server response:', xhr.status, xhr.statusText);

        if (xhr.status === 200 || xhr.status === 204) {
            renderCsokik();
        } else {
            console.error('Hiba történt a törlés során:', xhr.status, xhr.statusText);
        }
    };

    xhr.send();
    renderCsokik();
}

// módosítás
function modositas(id) {
    console.log("Módosítandó elem ID-je: ", id)
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/csokishop/read.php?id=' + id, true);
    console.log("http://localhost/csokishop/read.php?id=" + id);

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                let csokik = JSON.parse(xhr.responseText);
                let csoki = csokik[0]; // Mivel egyetlen csokit vársz vissza

                let modositasFormHTML = `
                    <h4>Termék módosítása:</h4>
                    <form id="modositas-csoki" class="p-5">
                        <label class="w-100">
                            <h5>Termék neve:</h5>
                            <input class="form-control" type="text" name="nev" value="${csoki.nev}">
                        </label>
                        <label class="w-100">
                            <h5>Termék ára:</h5>
                            <input class="form-control" type="number" name="ara" value="${csoki.ara}">
                        </label>
                        <label class="w-100">
                            <h5>Van raktáron?</h5> 
                            <input class="form-control" type="checkbox" name="raktaron" ${csoki.raktaron == '1' ? 'checked' : ''}>
                        </label>
                        <button class="btn btn-primary" type="button" onclick="mentes(${id})">Mentés</button>
                    </form>
                `;

                let szerkesztesElem = document.getElementById('szerkesztes');
                szerkesztesElem.innerHTML = modositasFormHTML;
                document.getElementById('ujtermek').style.display = 'none';
            } catch (error) {
                console.error('Hiba történt a JSON parse során:', error);
            }
        } else {
            console.error('Hiba történt a módosítás során:', xhr.status, xhr.statusText);
        }
    };

    xhr.send();
}
//mentés
function mentes(id) {
    let nev = document.getElementById("modositas-csoki").elements.nev.value;
    let ara = document.getElementById("modositas-csoki").elements.ara.value;
    let raktaron = document.getElementById("modositas-csoki").elements.raktaron.checked;

    // Check if the form elements are accessible
    console.log("Nev:", nev, "Ara:", ara, "Raktaron:", raktaron);

    let szerkesztesElem = document.getElementById('szerkesztes'); // Új definiálás itt

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost/csokishop/update.php?id=' + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status === 200) {
            renderCsokik();
            szerkesztesElem.innerHTML = '';
            document.getElementById('ujtermek').style.display = 'block';
        } else {
            console.error('Hiba történt az adatok módosítása során:', xhr.status, xhr.statusText);
        }
    };

    xhr.send(JSON.stringify({
        nev: nev,
        ara: ara,
        raktaron: raktaron
    }));
}


window.onload = renderCsokik;