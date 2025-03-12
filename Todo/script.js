document.addEventListener('DOMContentLoaded', loadPage());
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

function createDeleteButton(){
    let delete_button = document.createElement('img');
    delete_button.src = 'delete-icon';
    delete_button.alt = 'Delete';

    delete_button.setAttribute('onclick', 'deleteNote(this)');
    return delete_button;
}

function createEditButton(){
    let edit_button = document.createElement('img');
    edit_button.src = 'edit-icon';
    edit_button.alt = 'edit'

    edit_button.setAttribute('onclick', 'editNote(this)')
    return edit_button;
}

function loadPage(){
    if(!notes){
        initialNote();
    }

    let unordered_list = document.getElementsByClassName('note-list')[0]

    for(let i = 0; i < notes.length; i++){

        unordered_list.appendChild(createLi(notes[i].note, notes[i].status, i))

    }
}
function createLi(new_note, status, id){
    let list_element = document.createElement('li')
    let notepad = document.createElement('div')
    let note = document.createElement('span')
    let checkbox = document.createElement('input')
    let delete_button = createDeleteButton()
    let edit_button = createEditButton();

    checkbox.setAttribute('type','checkbox')
    checkbox.setAttribute('onclick', 'check(this)')
    note.textContent = new_note;

    if(status == 'completed'){
        note.classList.add('checked');
        checkbox.checked = true
    }

    notepad.classList.add('single-note');
    notepad.appendChild(checkbox)
    notepad.appendChild(note)
    notepad.appendChild(edit_button)
    notepad.appendChild(delete_button)
    list_element.appendChild(notepad)
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
    const popUp = document.querySelector('.pop-up');
    popUp.classList.remove('hidden');
}

function cancel(){
    const popUp = document.querySelector('.pop-up');
    document.getElementById('new-note').value = '';x
    popUp.classList.add('hidden');
}
function save(){
    let new_note = document.getElementById('new-note').value;
    let unordered_list = document.getElementsByClassName('note-list')[0]

    if (new_note){

        unordered_list.appendChild(createLi(new_note, 'incomplete', notes.length))

        notes.push({note: new_note, status: 'incompleted'});
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    cancel()
}

function toggle(){
    current_theme = rootElement.getAttribute('data-theme')
    if (current_theme == 'dark'){
        rootElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }else{
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}