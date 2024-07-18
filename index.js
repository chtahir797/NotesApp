document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.querySelector('#title');
    const commentInput = document.querySelector('#comment');
    let notesForm = document.querySelector('#notesForm'); // Define as let to ensure it's correctly assigned later
    const Notes = document.querySelector('.Notes');

    let allData = JSON.parse(localStorage.getItem("NotesApp")) || [];

    const addNote = (title, comment) => {
        if (title && comment) {
            const newNote = {
                title: title,
                comment: comment
            };
            allData.push(newNote);
            localStorage.setItem("NotesApp", JSON.stringify(allData));
            toastr.success('Note added successfully');
        } else {
            toastr.error('Both fields are required');
        }
    };

    // Check if notesForm is null (could happen if script runs before form is loaded)
    if (!notesForm) {
        document.addEventListener('DOMContentLoaded', () => {
            notesForm = document.querySelector('#notesForm');
            setupFormListeners();
        });
    } else {
        setupFormListeners();
    }

    function setupFormListeners() {
        notesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleValue = titleInput.value.trim();
            const commentValue = commentInput.value.trim();
            addNote(titleValue, commentValue);
            titleInput.value = '';
            commentInput.value = '';
        });
    }

    const removeNote = (button, title, comment) => {
        button.addEventListener('click', (e) => {
            allData = allData.filter((note) => {
                return !(note.title === title && note.comment === comment);
            });

            localStorage.setItem("NotesApp", JSON.stringify(allData));
            displayNotes(); // Update UI with new note
            toastr.success('Note removed successfully');
        });
    };

    const displayNotes = () => {
        Notes.innerHTML = ''; // Clear previous notes
        if (allData.length > 0) {
            allData.forEach((note) => {
                const newDiv = document.createElement('div');
                newDiv.classList.add('Note-card');
                newDiv.innerHTML = `
                    <div class="title">${note.title}</div>
                    <div class="description">${note.comment}</div>
                    <button class="remove">Remove</button>
                `;
                const removeButton = newDiv.querySelector('.remove');
                removeNote(removeButton, note.title, note.comment);
                Notes.appendChild(newDiv);
            });
        } else {
            const newDiv = document.createElement('div');
            newDiv.classList.add('Note-card');
            newDiv.innerHTML = '<p>No Notes Available</p>';
            Notes.appendChild(newDiv);
        }
    };

    // Display existing notes on page load
    displayNotes();

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});
