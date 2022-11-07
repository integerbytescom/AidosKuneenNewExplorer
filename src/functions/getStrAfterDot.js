export const getStrAfterDot = str => {
    if (String(str).indexOf('.') !== -1){
        return String(str).slice(0,String(str).indexOf('.') + 3);
    }else {
        return str
    }
}