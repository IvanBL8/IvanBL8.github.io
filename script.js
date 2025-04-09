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
        
        row.addEventListener('click', () => {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const modalName = document.getElementById('modalName');
            const modalBook = document.getElementById('modalBook');
            const modalRace = document.getElementById('modalRace');
            const modalAbilities = document.getElementById('modalAbilities');
            
            modalImage.src = character.image;
            modalName.textContent = character.name;
            modalBook.textContent = character.book;
            modalRace.textContent = character.race;
            modalAbilities.textContent = character.abilities;
            
            modal.style.display = "block"; 
        });

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

const closeModal = () => {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none"; // Ocultar el modal
};

document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

window.onload = loadCharacters;
