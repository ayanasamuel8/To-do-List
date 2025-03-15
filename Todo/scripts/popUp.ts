import { Save } from "../dist/save.js";
export default function openPopUp():void{
    const popUp: Element | null = document.querySelector('.container');
    popUp?.classList.remove('hidden');

    const newNoteInput: HTMLElement | null = document.querySelector('#new-note');
    newNoteInput?.addEventListener('keydown', (event: KeyboardEvent)=>{
        if (event.key === 'Enter' && !event?.shiftKey){
            Save('add',undefined);
        }
    })
    newNoteInput?.focus();
}