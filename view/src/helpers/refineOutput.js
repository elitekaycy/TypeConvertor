export const jsonToTypeScript = (jsonString) => {
    const data = JSON.parse(jsonString);
    let typeScriptString = "type MyType = {\n";

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === "object") {
                const subType = jsonToTypeScript(JSON.stringify(value[0]));
                typeScriptString += `  ${key}: ${subType}[];\n`;
            } else {
                const elementType = typeof value[0];
                typeScriptString += `  ${key}: ${elementType}[];\n`;
            }
        } else if (typeof value === "object") {
            const subType = jsonToTypeScript(JSON.stringify(value));
            typeScriptString += `  ${key}: ${subType};\n`;
        } else {
            const valueType = typeof value;
            typeScriptString += `  ${key}: ${valueType};\n`;
        }
    }

    typeScriptString += "}\n";
    return typeScriptString;
}

export const objectStringToTypeScript = (objectString) => {
    const sanitizedObjectString = objectString.replace(/;/g, ""); // Remove semicolons if present
    const object = new Function(`return ${sanitizedObjectString}`)(); // Evaluate the object string

    let typeScriptString = "type MyType = {\n";

    for (const [key, value] of Object.entries(object)) {
        if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === "object") {
                const subType = objectStringToTypeScript(JSON.stringify(value[0]));
                typeScriptString += `  ${key}: ${subType}[];\n`;
            } else {
                const elementType = typeof value[0];
                typeScriptString += `  ${key}: ${elementType}[];\n`;
            }
        } else if (typeof value === "object") {
            const subType = objectStringToTypeScript(JSON.stringify(value));
            typeScriptString += `  ${key}: ${subType};\n`;
        } else {
            const valueType = typeof value;
            typeScriptString += `  ${key}: ${valueType};\n`;
        }
    }

    typeScriptString += "}\n";
    return typeScriptString;
}

export const isObjectType = (input) => {
    try {
        const object = eval(`(${input})`);
        return typeof object === 'object' && object !== null;
    } catch (error) {
        return false;
    }
}

export const isJsonType = (input) => {
    try {
        const parsed = JSON.parse(input);
        return typeof parsed === 'object' && parsed !== null;
    } catch (error) {
        return false;
    }
}
