export class Translator {
    constructor(object) {
        this.jsType = object;
        this.variableName = '';
    }

    translatePrimitiveType(object) {
        if (typeof object === 'object' || Array.isArray(object)) {
            return false;
        }

        return typeof object;
    }

    translator(object = this.jsType) {
        if (Array.isArray(object)) {
            for (let i = 0; i < object.length; i++) {
                let isPrimitive = this.translatePrimitiveType(object[i]);

                if (isPrimitive !== false) {
                    object[i] = isPrimitive;
                } else {
                    this.translator(object[i]);
                }
            }
        } else if (typeof object === 'object') {
            for (var key in object) {
                let isPrimitive = this.translatePrimitiveType(object[key]);

                if (isPrimitive !== false) {
                    object[key] = isPrimitive;
                } else {
                    this.translator(object[key]);
                }
            }
        }

        return object;
    }

    refine(obj) {
        if (typeof obj === 'object') {
            for (var key in obj) {
                if (Array.isArray(obj[key])) {
                    let arrSet = new Set(obj[key]);

                    if (arrSet.size === 1) {
                        obj[key] = `${
                            obj[key][0]
                        }[]`;
                        // } else if (arrSet.size === 2) {
                        //     const getArrSet = Array.from(arrSet);
                        //     let str = `${
                        //         getArrSet[0]
                        //     } | ${
                        //         getArrSet[1]
                        //     }[]`;
                        //     obj[key] = str;
                        // } else {
                        return obj[key];
                    }
                } else if (typeof obj[key] === 'object') {
                    this.refine(obj[key]);
                }
            }
        }
    }
}

// const translate = new Translator(`const bird = ["dickson", 1, 2,{ "key2": { "nestedKey1": "nestedValue1", "nestedKey2": { "deepKey1": "deepValue1","deepKey2": "deepValue2"}}},{ "key": "value", "key1": { "keySub1": 1 }}]`);
