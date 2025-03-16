import renderPage from "./renderPage.js";
export default function ChangeStatus():void{
    const dropdown = document.querySelector('#status') as HTMLInputElement;
    renderPage(dropdown.value);
}
export function Toggle(){
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme == 'dark'){
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }else{
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark')
    }
}