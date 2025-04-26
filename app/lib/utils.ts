export function toPersianDigits(num: number){
    return new Intl.NumberFormat('fa-IR').format(num);
}

export function lockBodyScroll(){
    'use clinet';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}
export function unlockBodyScroll(){
    'use clinet';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}