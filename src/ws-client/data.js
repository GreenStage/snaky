
const stringToArr = (s) =>{
    const data = [];
    for (var i = 0; i < s.length; i++){
        data.push(s.charCodeAt(i));
    }
    return data;
}

export {stringToArr}