export function toPersianDigits(num: number){
    return new Intl.NumberFormat('fa-IR').format(num);
}