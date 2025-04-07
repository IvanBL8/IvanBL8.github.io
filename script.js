const loadCharacters = async () => {
    const response = await fetch('data.json');
    const characters = await response.json();

    const tableBody = document.querySelector('#characterTable tbody');
    
    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.book}</td>
            <td>${character.race}</td>
            <td>${character.abilities}</td>
        `;
        tableBody.appendChild(row);
    });
};

function searchTable() {
    const input = document.getElementById("searchBar");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("characterTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {  
        let td = tr[i].getElementsByTagName("td");
        let match = false;

        for (let j = 0; j < td.length; j++) {
            if (td[j] && td[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        
        if (match) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

window.onload = loadCharacters;
