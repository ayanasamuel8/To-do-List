export default function createLi(content: string, status: string, id: number):Element{
    let li:Element = document.createElement('li');
    let notepad:Element = document.createElement('div');
    let note:Element = document.createElement('span');
    let checkbox = document.createElement('input');
    let customization_buttons = document.createElement('div')
    let delete_button: Element = createDeleteButton();
    let edit_button: Element = createEditButton();

    //adding class name to elements
    note.classList.add('note-element');
    notepad.classList.add('single-note');
    li.classList.add('lst');
    li.id = String(id);
    customization_buttons.classList.add('customization-button');

    //checking checked note
    if (status == 'completed'){
        note.classList.add('checked');
        checkbox.checked = true;
    }

    //updating the relationship
    customization_buttons.appendChild(edit_button);
    customization_buttons.appendChild(delete_button);
    notepad.appendChild(checkbox);
    notepad.appendChild(note)
    notepad.appendChild(customization_buttons)
    li.appendChild(notepad)


    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('onclick', 'check(this)');
    note.textContent = content;

    return li
}
function createDeleteButton(): Element{
    const delete_button: Element = document.createElement('div');
    delete_button.setAttribute('onclick', 'deleteNote(this)');
    delete_button.classList.add('delete-button')
    return delete_button
}
function createEditButton(): Element{
    const edit_button: Element = document.createElement('div');
    edit_button.setAttribute('onclick', 'editNote(this)');
    edit_button.classList.add('edit-button')
    return edit_button
}