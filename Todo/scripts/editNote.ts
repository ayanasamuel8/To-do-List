import { Save } from "./save.js";
export default function editNote(div:HTMLElement):void{
    const firstParent = div.parentElement;
    const secondParent = firstParent?.parentElement;
    const thirdParent = secondParent?.parentElement;
    const textArea = document.querySelector('#new-note') as HTMLInputElement;
    let id = undefined;
    if (thirdParent)
        id = parseInt(thirdParent.id)
    const saveButton = document.querySelector('.buttons button[onclick ^= "save"]');
    saveButton?.setAttribute('onclick', `save('edit', ${id})`);
    const popUp = document.querySelector('.container');
    const li = document.getElementById(`${id}`);
    let span = li?.querySelector('.single-note span');
    if (span?.textContent)
        textArea.value = span.textContent;
    popUp?.classList.remove('hidden');
    const newNoteInput = document.querySelector('#new-note') as HTMLInputElement;
    newNoteInput.onkeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            Save('edit', id);
        }
    };

    newNoteInput?.focus();
}