// replace unnecessary from the string to display as types

export const stripQuotation = (obj) => {
    var convertedStr = obj.replace(/"/g, '');
    let replaceBracket = convertedStr.replace(/{/g, '{ \n\t\t').replace(/}/g, ' \n\t }').replace(/:/g, ': ');
    let finalStr = replaceBracket.replace(/,/g, '; \n\t\t');
    return finalStr;
};
