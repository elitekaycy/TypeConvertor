import {useContext} from 'react';
import {DynamicEditor} from './components/DynamicEditor';
import {Navbar} from './components/Navbar';
import {InputContext} from './context/input';
import {outputContext} from './context/output';
import {Translator} from './core/Translator';

function App() {
    const {code, setCode} = useContext(InputContext);
    const {output, setOutput} = useContext(outputContext);

    const stripQuotation = (obj) => {
        var convertedStr = obj.replace(/"/g, '');
        let replaceBracket = convertedStr.replace(/{/g, '{ \n\t\t').replace(/}/g, ' \n\t }').replace(/:/g, ': ');
        let finalStr = replaceBracket.replace(/,/g, '; \n\t\t');
        return finalStr;
    };

    return (
        <>
            <div className="relative"
                style={
                    {
                        background: 'linear-gradient(#e66465, #9198e5)',
                        height: '70vh'
                    }
            }>
                <Navbar/>
                <div className="mt-24 flex text-center flex-col space-y-4">
                    <div className="text-center text-5xl font-bold text-white">
                        Convert Object To Types
                    </div>
                    <div className="text-center font-semibold tracking-wide text-white text-lg">
                        convert js objects to typescipt types
                    </div>
                    <div className="cursor-pointer hover:bg-gray-100 font-semibold bg-white p-3 rounded-full w-24 mx-auto text-xs">
                        Get Started
                    </div>
                </div>

                <div style={
                        {minHeight: '80vh'}
                    }
                    className="mx-auto mt-10  max-w-5xl rounded-3xl flex flex-row border-white border-4 bg-gray-800">
                    <div className="w-1/2 bg-gray-900 rounded-l-3xl relative">
                        <div className="p-2 mt-4 ml-4  bg-gray-800 text-white font-semibold text-xs w-28 text-center rounded-full">
                            output.json
                        </div>
                        <DynamicEditor mode={'json'}
                            readOnly={false}
                            code={code}
                            setCode={setCode}/>
                        <div style={
                                {top: '85%'}
                            }
                            onClick={
                                (e) => { // check code
                                    e.preventDefault();
                                    let validCode = code;
                                    console.log("vcode ", validCode)
                                    const types = new Translator(JSON.parse(validCode));

                                    const typesObject = types.translator();
                                    console.log("typesObj ", typesObject)
                                    types.refine(typesObject);
                                    setOutput(` ${
                                        stripQuotation(`type inputType = ${
                                            JSON.stringify(typesObject)
                                        }`)
                                    }`);
                                }
                            }
                            className="absolute left-44 md:left-96 p-4 pl-4 pr-4 text-xs font-semibold bg-white hover:bg-gray-100 cursor-pointer rounded-full">
                            generate
                        </div>
                    </div>
                    <div className="w-1/2 p-4 rounded-r-3xl">
                        <div className="p-2 bg-gray-700 text-white font-semibold text-xs w-28 text-center rounded-full">
                            types.ts
                        </div>
                        <DynamicEditor mode={'typescript'}
                            code={output}
                            setCode={setOutput}
                            readOnly={true}/>
                    </div>
                </div>

                <div className="text-center mt-10 pb-10 font-semibold text-xs footer">
                    Copyright: @ Dickson anyaele
                </div>
            </div>
        </>
    );
}

export default App;
