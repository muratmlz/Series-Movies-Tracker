let moviesList = [];

document.getElementById('add-button').addEventListener('click', function() {
    let title = prompt("Πληκτρολόγησε το όνομα της σειράς ή ταινίας:");
    let position = prompt("Πληκτρολόγησε πού σταμάτησες (Επεισόδιο/Λεπτό):");
    
    if (title && position) {
        let entry = {
            title: title,
            position: position
        };
        moviesList.push(entry);
        displayList();
        saveList();
    }
});

function displayList() {
    let listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '';
    
    moviesList.forEach((item, index) => {
        let entry = document.createElement('div');
        entry.className = 'list-item';
        entry.innerHTML = `
            <strong>${item.title}</strong>: ${item.position}
            <div class="actions">
                <button class="edit-button" onclick="editEntry(${index})">Επεξεργασία</button>
                <button class="delete-button" onclick="deleteEntry(${index})">Διαγραφή</button>
            </div>`;
        listContainer.appendChild(entry);
    });
}

function editEntry(index) {
    let newTitle = prompt("Επεξεργασία τίτλου:", moviesList[index].title);
    let newPosition = prompt("Επεξεργασία θέσης (Επεισόδιο/Λεπτό):", moviesList[index].position);
    
    if (newTitle && newPosition) {
        moviesList[index].title = newTitle;
        moviesList[index].position = newPosition;
        displayList();
        saveList();
    }
}

function deleteEntry(index) {
    if (confirm("Σίγουρα θέλεις να διαγράψεις αυτή την καταχώρηση;")) {
        moviesList.splice(index, 1);
        displayList();
        saveList();
    }
}

function saveList() {
    localStorage.setItem('moviesList', JSON.stringify(moviesList));
}

function loadList() {
    let savedList = localStorage.getItem('moviesList');
    if (savedList) {
        moviesList = JSON.parse(savedList);
        displayList();
    }
}

// Φόρτωσε τη λίστα από το localStorage κατά την εκκίνηση
window.onload = loadList;
