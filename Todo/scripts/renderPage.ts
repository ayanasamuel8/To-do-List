import createLi from "../dist/createLi.js";
export default function renderPage(type:string):void{
    let notes: Array<{content: string, status: string}> = JSON.parse(localStorage.getItem('notes') || '[]');
    if ( notes.length == 0){
        Initializer();
        notes = JSON.parse(localStorage.getItem('notes') || '[]');
    }
    const unordered_list: Element  = document.getElementsByClassName('note-list')[0]
    unordered_list.innerHTML = '';
    notes = notes.filter(note => note.content && note.content.trim() !== '');

    localStorage.setItem('notes', JSON.stringify(notes));

    for(let i = 0; i < notes.length; i++){

        if((notes[i].status === type || type === 'All') && notes[i].content != ''){

            unordered_list.appendChild(createLi(notes[i].content, notes[i].status, i))
        }

    }
}


function Initializer(){
    let notes: Array<Object> =[
        {
            content: 'NOTE #1',
            status: 'incomplete'
        },
        {
            content:'NOTE #2',
            status: 'complete'
        }
    ]
    localStorage.setItem('notes', JSON.stringify(notes));
}