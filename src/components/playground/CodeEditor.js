import React, { useEffect, useState } from 'react'
//code Mirror  // npm i @uiw/react-codemirror   
import CodeMirror from '@uiw/react-codemirror'
//themes     npm i @uiw/codemirror-theme-bespin @uiw/codemirror-theme-duotone @uiw/codemirror-theme-dracula @uiw/codemirror-theme-github @uiw/codemirror-theme-xcode @uiw/codemirror-theme-vscode @uiw/codemirror-theme-okaidia
import { githubDark, githubLight } from '@uiw/codemirror-theme-github'
import { bespin } from '@uiw/codemirror-theme-bespin'
import { duotoneDark, duotoneLight } from '@uiw/codemirror-theme-duotone'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

// language   npm i @codemirror/lang-cpp @codemirror/lang-java @codemirror/lang-javascript @codemirror/lang-python
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

import { indentUnit } from '@codemirror/language'
import { EditorState } from '@codemirror/state'

function CodeEditor({
  currLanguage,
  currTheme,
  currCode,
  setCurrCode,
  isFullScreen
}) {
  const [theme, setTheme] = useState(githubDark)
  const [language, setLanguage] = useState(javascript);

  useEffect(() => {
      if (currLanguage === 'cpp') setLanguage(cpp);
      if (currLanguage === 'java') setLanguage(java);
      if (currLanguage === 'javascript') setLanguage(javascript);
      if (currLanguage === 'python') setLanguage(python);
  }, [currLanguage])


  useEffect(() => {
      if (currTheme === 'githubDark') setTheme(githubDark);
      if (currTheme === 'githubLight') setTheme(githubLight);
      if (currTheme === 'bespin') setTheme(bespin);
      if (currTheme === 'duotoneDark') setTheme(duotoneDark);
      if (currTheme === 'duotoneLight') setTheme(duotoneLight);
      if (currTheme === 'dracula') setTheme(dracula);
      if (currTheme === 'xcodeDark') setTheme(xcodeDark);
      if (currTheme === 'xcodeLight') setTheme(xcodeLight);
      if (currTheme === 'vscodeDark') setTheme(vscodeDark);
      if (currTheme === 'okaidia') setTheme(okaidia);
  }, [currTheme])

  return (
    <CodeMirror
            value={currCode}
            height={`${isFullScreen?"91vh":"76vh"}`}
            theme={theme}
            extensions={[
                language,
                indentUnit.of("        "),
                EditorState.tabSize.of(8),
                EditorState.changeFilter.of(() => true)
            ]}
            onChange={(value) => setCurrCode(value)}
            basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true,
            }}
        />
  )
}

export default CodeEditor