import React, { createContext } from "react";
import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";


export const PlaygroundContext= createContext()

export const languageMap = {
    "cpp": {
        id: 54,
        defaultCode: 
        "#include <iostream>\n"
        + "using namespace std;\n\n"
        + "int main() {\n"
        + '\tcout << "Hello World!";\n'
        + "\treturn 0;\n"
        + "}",
    },
    "java": {
        id: 62,
        defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
    },
    "python": {
        id: 71,
        defaultCode: `print("Hello World!")`,
    },
    "javascript": {
        id: 63,
        defaultCode: `console.log("Hello World!");`,
    }
}
 function PlaygroundProvider({children}){
    const initialItems={
        [uuid()]:{
            title:'DSA',
            playground:{
                [uuid()]:{
                    title:'Stack Implementation',
                    language:'cpp',
                    code: languageMap['cpp'].defaultCode
                },
                [uuid()]:{
                    title:'Array',
                    language:'JavaScript',
                    code: languageMap['javascript'].defaultCode
                }
            }
        }
    }
    // const [folders,setFolders]=useState(initialItems)

    const [folders,setFolders]=useState(()=>{
        let localData=localStorage.getItem('playgrounds-data')
        if(localData===null || localData === undefined){
// console.log(initialItems)
            return initialItems
            
        }
        return JSON.parse(localData)
    })

    useEffect(()=>{
        localStorage.setItem('playgrounds-data',JSON.stringify(folders))
        // let localData=localStorage.getItem('playgrounds-data')
        // if(localData!==null && localData !== undefined){
        //     setFolders(JSON.parse(localData))
        // }
    },[folders])


    const deleteCard=(folderId,cardId)=>{
        setFolders((oldState)=>{
            const newFolders={...oldState}
            delete newFolders[folderId].playground[cardId]
            return newFolders
        })
        }

    const deleteFolder=(folderId)=>{
    setFolders((oldState)=>{
        const newFolders={...oldState}
        delete newFolders[folderId]
        return newFolders
    })
    }

    const addFolder=(folderName)=>{
        setFolders((oldState)=>{
            const newFolders={...oldState}
            newFolders[uuid()]={
                title:folderName,
                playground:{}
            }
            return newFolders
        })
        }
    
        const addPlayground=(folderId,playgroundName,language)=>{
            setFolders((oldState)=>{
                const newFolders={...oldState}
                newFolders[folderId].playground[uuid()]={
                    title:playgroundName,
                    language:language,
                    code:languageMap[language].defaultCode
                }
                return newFolders
            })
            }

            const addPlaygroundAndFolder=(folderName,playgroundName,cardLanguage)=>{
                setFolders((oldState)=>{
                    const newFolders={...oldState}
                    newFolders[uuid()]={
                        title:folderName,
                        playgroundName:{
                            [uuid()]:{
                                title:playgroundName,
                                language:cardLanguage,
                                code:languageMap[cardLanguage].defaultCode
                            }
                        }
                    }
                    return newFolders
                })
                }
        
        const editFolderTitle=(folderId,newTitle)=>{
            setFolders((oldState)=>{
                const newFolders={...oldState}
                newFolders[folderId].title=newTitle
                return newFolders
            })
        }


        const editPlaygroundTitle=(folderId,cardId,newTitle)=>{
            setFolders((oldState)=>{
                const newFolders={...oldState}
                newFolders[folderId].playground[cardId].title=newTitle
                return newFolders
            })
        }

        const savePlayground = (folderId, cardId, newCode, newLanguage) => {
            setFolders((oldState) => {
                const newFolders = { ...oldState };
                newFolders[folderId].playground[cardId].code = newCode;
                newFolders[folderId].playground[cardId].language = newLanguage;
                return newFolders;
            })
        }

        const PlaygroundFeatures={
            folders:folders,
            deleteCard:deleteCard,
            deleteFolder:deleteFolder,
            addFolder:addFolder,
            addPlayground:addPlayground,
            addPlaygroundAndFolder:addPlaygroundAndFolder,
            editFolderTitle:editFolderTitle,
            editPlaygroundTitle:editPlaygroundTitle,
            savePlayground:savePlayground
        }
    
        return(<PlaygroundContext.Provider value={PlaygroundFeatures}>
            {children}
        </PlaygroundContext.Provider>)


 }



 export default PlaygroundProvider
