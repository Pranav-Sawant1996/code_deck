import React, { useContext } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
// import { Card } from '../Card';
import Card from "../Card";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import { useNavigate } from "react-router-dom";

const RightPannel = () => {
  const navigate = useNavigate();

  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <div className="border-black h-screen p-8">
      <div className="flex justify-between placeholder:mt-8 items-center">
        <h2>
          {" "}
          My <span className="font-semibold text-2xl"> PlayGround</span>
        </h2>
        <h4
          onClick={() =>
            openModal({
              show: true,
              modalType: 1,
              identifiers: {
                folderId: "",
                cardId: "",
              },
            })
          }
        >
          <span className="font-semibold text-2xl">+</span> New Folder
        </h4>
      </div>
      <hr class="mb-12 mt-4 bg-black" />
      {/* {console.log(folders)} */}
      {Object.entries(folders).map(([folderId, folder]) => (
        <div className="flex-col flex my-8">
          <div className="flex justify-between placeholder:mt-8 items-center">
            <div className="flex gap-4 items-center">
              <FcOpenedFolder size={"2em"} />
              <h5 className="semibold"> {folder.title}</h5>
            </div>
            <div className="flex gap-4 items-center">
              <BiEditAlt
                size={"1.2em"}
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 4,
                    identifiers: {
                      folderId: folderId,
                      cardId: "",
                    },
                  })
                }
              />
              <IoTrashOutline
                size={"1.2em"}
                onClick={() => deleteFolder(folderId)}
              />
              <h5
                className="semibold"
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 2,
                    identifiers: {
                      folderId: folderId,
                      cardId: "",
                    },
                  })
                }
              >
                <span className="font-semibold text-2xl">+</span> New Playground
              </h5>
            </div>
          </div>
          <hr class="mb-4 mt-4 bg-black" />
        </div>
      ))}
      {Object.entries(folders).map(([folderId, folder]) => 
        //   {console.log(folder['playground'])}
        <div class="">
          {/* {console.log(folder['d776b58e-4315-4f46-a971-e6f426f21043'])} */}
          {Object.entries(folder["playground"]).map(
            ([playgroundId, playground]) => (
             
                <Card key={playgroundId}>
                  {/* {console.log(playgroundId)} */}
                    <div onClick={(e) => {
                        e.stopPropagation(); //stop click propagation from child to parent
                        console.log(folderId, playgroundId)
                        // navigate(`/playground/${folderId}/${playgroundId}`)
                    }}
                        className='flex items-center justify-between'>
                        <div className='flex gap-4 items-center'>
                            <img src='https://code-deck.vercel.app/static/media/logo.cba940861dd8aabf4a90.png' alt='' style={{width:'2rem'}}/>
                            <div>
                                <h6>{playground.title}</h6>
                                <h6>Language: {playground.language}</h6>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center' onClick={(e) => {

                            e.stopPropagation(); //stop click propagation from child to parent
                        }}>
                            <BiEditAlt size={'1.2em'} onClick={() =>
                            {
                              openModal({
                                show: true,
                                modalType: 5,
                                identifiers: {
                                    folderId: folderId,
                                    cardId: playgroundId,
                                }
                            })}

                            } />
                            <IoTrashOutline size={'1.2em'} onClick={() => deleteCard(folderId, playgroundId)} />
                        </div>
                    </div>
                </Card>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default RightPannel;
