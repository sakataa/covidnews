export const formatNumber = (num = 0, digits = 3) => {
    if(Number(num) === NaN){
        return 0;
    }
    
    const pattern = new RegExp(`(\\d)(?=(\\d{${digits}})+(?!\\d))`, 'g');
    return Number(num).toString().replace(pattern, '$1,')
}