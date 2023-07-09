import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai'; // Choose a theme
import 'ace-builds/src-noconflict/mode-typescript'; // Choose a mode
import 'ace-builds/src-noconflict/mode-json';

export const DynamicEditor = ({ mode, readOnly, code, setCode }) => {
  const editorStyle = {
    height: '80vh',
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  };

  return (
    <div className="p-4">
      <ReactAce
        mode={mode}
        className="mt-5 bg-transparent"
        style={editorStyle}
        fontSize={16}
        highlightActiveLine={false}
        theme="monokai"
        showPrintMargin={false}
        showLineNumbers={false}
        showGutter={false}
        value={code}
        readOnly={readOnly}
        onChange={(value) => {
          setCode(value);
        }}
        // setOptions={
        //     {
        //         enableBasicAutocompletion: false,
        //         enableLiveAutocompletion: false,
        //         enableSnippets: false,
        //         showLineNumbers: false,
        //         tabSize: 2
        //     }
        // }
      />
    </div>
  );
};
