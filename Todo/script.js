document.addEventListener('DOMContentLoaded', loadPage('All'));
const rootElement = document.documentElement;
savedTheme = localStorage.getItem('theme');

if(savedTheme){
    rootElement.setAttribute('data-theme', savedTheme)
}

var notes = JSON.parse(localStorage.getItem('notes'))

if(!notes){
    initialNote();
}

function initialNote(){
    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'))
        return
    }
    initialNote = [
        {
            note: 'NOTE #1',
            status: 'incompleted',
        },
        {
            note: 'NOTE #2',
            status: 'completed',
        },
        {
            note:'NOTE #3',
            status: 'incompleted'
        }
    ];
    localStorage.setItem('notes', JSON.stringify(initialNote));
    notes = initialNote;
}

function createDeleteButton() {
    let delete_button = document.createElement('div');
    delete_button.alt = 'Delete';
    delete_button.setAttribute('onclick', 'deleteNote(this)');
    delete_button.classList.add('delete-button');

    return delete_button;
}


function createEditButton(){
    let edit_button = document.createElement('div');
    edit_button.src = 'edit-icon';
    edit_button.alt = 'edit'
    edit_button.setAttribute('onclick', 'editNote(this)')
    edit_button.classList.add('edit-button');

    return edit_button;
}

function loadPage(type){
    if(!notes){
        initialNote();
    }

    let unordered_list = document.getElementsByClassName('note-list')[0]
    unordered_list.innerHTML = '';
    notes = notes.filter(note => note.note && note.note.trim() !== '');

    localStorage.setItem('notes', JSON.stringify(notes));

    for(let i = 0; i < notes.length; i++){

        if((notes[i].status === type || type === 'All') && notes[i].note != ''){

            unordered_list.appendChild(createLi(notes[i].note, notes[i].status, i))
        }

    }
}
function createLi(new_note, status, id){
    let list_element = document.createElement('li')
    let notepad = document.createElement('div')
    let note = document.createElement('span')
    let checkbox = document.createElement('input')
    let delete_button = createDeleteButton()
    let edit_button = createEditButton();
    let customization_buttons = document.createElement('div')

    checkbox.setAttribute('type','checkbox')
    checkbox.setAttribute('onclick', 'check(this)')
    note.textContent = new_note;
    note.classList.add('note-element')

    if(status == 'completed'){
        note.classList.add('checked');
        checkbox.checked = true
    }

    notepad.classList.add('single-note');
    notepad.appendChild(checkbox)
    notepad.appendChild(note)

    customization_buttons.classList.add('customization-button');
    customization_buttons.appendChild(edit_button)
    customization_buttons.appendChild(delete_button)
    notepad.appendChild(customization_buttons)
    list_element.appendChild(notepad)
    list_element.classList.add('lst')
    list_element.id = id

    return list_element

}

function check(checkbox){
    if(checkbox.checked == true){
        const firstParent = checkbox.parentElement;
        firstParent.children[1].classList.add('checked');

        const secondParent = firstParent.parentElement;

        let id = parseInt(secondParent.id)
        notes[id].status = 'completed'
        localStorage.setItem('notes', JSON.stringify(notes))
    }else{
        const firstParent = checkbox.parentElement;
        firstParent.children[1].classList.remove('checked');

        const secondParent = firstParent.parentElement;

        let id = parseInt(secondParent.id)
        notes[id].status = 'incompleted'
        localStorage.setItem('notes', JSON.stringify(notes))
    }

}

function addNote() {
    const popUp = document.querySelector('.container');
    popUp.classList.remove('hidden');

    const newNoteInput = document.querySelector('#new-note');
    newNoteInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            save('add');
        }
    });
    newNoteInput.focus();
}
function cancel(){
    const popUp = document.querySelector('.container');
    document.getElementById('new-note').value = '';
    popUp.classList.add('hidden');
}
function outofpad(event){
    let popUp = document.getElementsByClassName('container')[0]
    if(event.target === popUp){
        cancel()
    }
}
function save(mode, id){
    let new_note = document.getElementById('new-note').value.trim();
    let unordered_list = document.getElementsByClassName('note-list')[0]

    if (new_note && mode == 'add'){

        unordered_list.appendChild(createLi(new_note, 'incomplete', notes.length))

        notes.push({note: new_note, status: 'incompleted'});
        localStorage.setItem('notes', JSON.stringify(notes));
    }else if (new_note){
        let li = document.getElementById(`${id}`);
        let span = li.querySelector('.single-note span');
        span.textContent = new_note
        notes[id].note = new_note;
        localStorage.setItem('notes', JSON.stringify(notes))
        const saveButton = document.querySelector('.buttons button[onclick^="save"]');
        saveButton.setAttribute('onclick', 'save("add")');
    }

    cancel()
}

function toggle(){
    console.log('toggled')
    current_theme = rootElement.getAttribute('data-theme')
    if (current_theme == 'dark'){
        rootElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }else{
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}
async function searchNote(){
    let searchFrom = document.querySelectorAll('.note-list li')
    let searchedNote = document.getElementById('note-search').value
    searchFrom.forEach((li)=>{
        let span = li.querySelector('div span');
        if(span && span.textContent.toLowerCase().includes(searchedNote.toLowerCase())){
            li.classList.remove('hidden');
        }else{
            li.classList.add('hidden');
        }
    })
}
function changeStatus(){
    let dropdown = document.getElementById('status');
    loadPage(dropdown.value)
}
function deleteNote(div){
    let firstParent = div.parentElement;
    let secondParent = firstParent.parentElement
    let thirdParent = secondParent.parentElement
    let id = parseInt(thirdParent.id)
    console.log(id)
    console.log(notes)
    notes[id].note = '';
    localStorage.setItem('notes', JSON.stringify(notes));
    thirdParent.remove();
}
function editNote(div){
    let firstParent = div.parentElement;
    let secondParent = firstParent.parentElement
    let thirdParent = secondParent.parentElement
    let textArea = document.querySelector('#new-note');
    let id = parseInt(thirdParent.id)
    
    const saveButton = document.querySelector('.buttons button[onclick^="save"]');
    saveButton.setAttribute('onclick', `save('edit', ${id})`);
    const popUp = document.querySelector('.container');

    let li = document.getElementById(`${id}`);
    let span = li.querySelector('.single-note span');

    textArea.value = span.textContent;
    popUp.classList.remove('hidden');
    const newNoteInput = document.querySelector('#new-note');
    newNoteInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            save('edit', id);
        }
    });
    newNoteInput.focus();
}