class Translator {
    constructor(object) {
        this.jsStringObject = object
        this.jsType = null
        this.variableName = ''
    }

    preprocess() { // convert or single quote to double qoute
        var convertedStr = this.jsStringObject.replace(/'/g, '"');
        return convertedStr
    }

    define() {
        const getObject = this.preprocess().split("=")
        const getObjectName = getObject[0].split(' ')[1]
        const getObjType = getObject[1].trim()

        this.jsType = JSON.parse(getObjType)
        this.variableName = getObjectName + 'Type'
    }

    translatePrimitiveType(object) {
        if (typeof object === 'object' || Array.isArray(object)) {
            return false
        }

        return typeof object
    }

    translator(object = this.jsType) {

        if (Array.isArray(object)) {
            for (let i = 0; i < object.length; i++) {
                let isPrimitive = this.translatePrimitiveType(object[i])

                if (isPrimitive !== false) {
                    object[i] = isPrimitive
                } else {
                    this.translator(object[i])
                }
            }

        } else if (typeof object === 'object') {
            for (var key in object) {
                let isPrimitive = this.translatePrimitiveType(object[key])

                if (isPrimitive !== false) {
                    object[key] = isPrimitive
                } else {
                    this.translator(object[key])
                }
            }
        }

        return object

    }

    print() {
        console.log(`type ${
            this.variableName
        } = ${
            this.translator()
        }`)
    }

}


const translate = new Translator(`const bird = ["dickson", 1, 2,{ "key2": { "nestedKey1": "nestedValue1", "nestedKey2": { "deepKey1": "deepValue1","deepKey2": "deepValue2"}}},{ "key": "value", "key1": { "keySub1": 1 }}]`)
translate.define()
console.log(translate.translator())
translate.print()
