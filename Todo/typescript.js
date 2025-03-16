import { 
    Save, Cancel, render_page, edit_note, 
    add_note, OutOfPad, Check, ChangeStatus, 
    Toggle, DeleteNote, Search 
} from './dist/typescript.js';

Object.assign(window, {
    Save,
    Cancel,
    renderPage: render_page,
    addNote: add_note,
    editNote: edit_note,
    deleteNote: DeleteNote,
    outofpad: OutOfPad,
    check: Check,
    changeStatus: ChangeStatus,
    toggle: Toggle,
    searchNote: Search
});

document.addEventListener('DOMContentLoaded', () => renderPage('All'));

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey && (event.key === 'N' || event.key === 'n')) {
        addNote();
    }
});

document.querySelector('#new-note').onkeydown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        Save('add', undefined);
    }
};