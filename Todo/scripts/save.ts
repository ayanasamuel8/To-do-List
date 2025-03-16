import createLi from "../dist/createLi.js";

let notes: Array<{content:string, status:string}> = JSON.parse(localStorage.getItem('notes') || '[]');
export function Save(mode:string, id:number|undefined):void{
    const noteElement = document.querySelector('#new-note') as HTMLInputElement | null;
    const note = noteElement?.value.trim()
    if (mode === 'add' && note){
        const unordered_list = document.querySelector('.note-list');

        unordered_list?.appendChild(createLi(note, 'incomplete', notes.length));
        notes.push({content:note, status:'incompleted'});
        localStorage.setItem('notes', JSON.stringify(notes));

    }else if(note){
        let li = document.getElementById(`${id}`);
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
export function Check(checkbox:HTMLInputElement):void{
    const firstParent = checkbox.parentElement;
    
    const secondParent = firstParent?.parentElement;
    
    let id = null
    if(secondParent)
        id = parseInt(secondParent.id);
    if (checkbox.checked == true){
        firstParent?.children[1].classList.add('checked');
        if(id != null)
            notes[id].status = 'completed';
        localStorage.setItem('notes', JSON.stringify(notes))
    }else{
        firstParent?.children[1].classList.remove('checked');
        if(id != null)
            notes[id].status = 'incompleted';
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

export function DeleteNote(div:Element): void{
    const firstParent = div.parentElement;
    const secondParent = firstParent.parentElement;
    const thirdParent = secondParent.parentElement;
    const id = parseInt(thirdParent.id)
    
    notes[id].content = '';
    localStorage.setItem('notes', JSON.stringify(notes));
    thirdParent.remove()
}
export function Search(){
    const searchForm = document.querySelectorAll('.note-list li');
    const searchInput = document.querySelector('#note-search') as HTMLInputElement;
    const searchNote = searchInput.value.toLowerCase();

    searchForm.forEach((li) =>{
        const span = li.querySelector('div span');
        if (span && span.textContent.toLowerCase().includes(searchNote)){
            li.classList.remove('hidden');
        }else{
            li.classList.add('hidden');
        }
    })
}