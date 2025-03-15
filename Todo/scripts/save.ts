import createLi from "../dist/createLi.js";

export function Save(mode:string, id:number|undefined):void{
    const noteElement = document.querySelector('#new-note') as HTMLInputElement | null;
    const note = noteElement?.value.trim()
    let notes: Array<{content:string, status:string}> = JSON.parse(localStorage.getItem('notes') || '[]');
    if (mode === 'add' && note){
        const unordered_list = document.querySelector('.note-list');

        unordered_list?.appendChild(createLi(note, 'incomplete', notes.length));
        notes.push({content:note, status:'incompleted'});
        localStorage.setItem('notes', JSON.stringify(notes));

    }else if(note){
        const li = document.getElementById(`${id}`);
        let span = li?.querySelector('.single-note span');
        if(span){
            span.textContent = note;
        }
        if(id)
        notes[id].content = note;
        localStorage.setItem('notes', JSON.stringify(notes));
        const saveButton = document.querySelector('.buttons button[onclick ^= "save"]');
        saveButton?.setAttribute('onclick', 'save("add",undefined)');
    }
    Cancel()
}
export function Cancel(): void{
    const popUp: Element | null = document.querySelector('.container');
    const noteElement = document.querySelector('#new-note') as HTMLInputElement | null;
    if(noteElement){
        noteElement.value = ''
    }
    if (popUp)
        popUp.classList.add('hidden');
}
export function OutOfPad(event: MouseEvent):void{
    const popUp = document.querySelector('.container') as HTMLElement;
    if (event.target === popUp){
        Cancel()
    }
}