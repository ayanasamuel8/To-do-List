import { Save, Cancel, render_page, edit_note, delete_note, add_note, OutOfPad } from './dist/typescript.js'
document.addEventListener('DOMContentLoaded', renderPage('All'));

window.addNote = addNote
function addNote(){
    add_note();
}

window.save = save
function save(mode, id){
    Save(mode,id);
}

window.cancel = cancel
function cancel(){
    Cancel();
}

window.randerPage = renderPage
function renderPage(string){
    render_page(string);
}

window.editNote = editNote
function editNote(div){
    edit_note(div);
}
window.deleteNote = deleteNote
function deleteNote(){
    delete_note();
}
window.outofpad = outofpad;
function outofpad(event){
    OutOfPad(event);
}
