import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph';
import apiManager from '../../../api/Api';
import {getCookie} from '../../../api/Authentication';
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function DeleteFlashcardConfirmation({ visible, setVisible, view, setReload }) {
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [loadingIconVisible, setLoadingIconVisible] = useState("visible"); // If null, loading icon shows
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }

    function deleteFlashcard() {
      // visible stores flashcardData which contains the data for the flashcard
      // in the format flashcard_name: {flashcard data including ID}. This will only ever
      // store the data for one flashcard. Below gets the flashcard ID
      console.log(visible["flashcardData"]);
      const flashcardID = Object.values(visible["flashcardData"])[0].flashcardID;
      setLoadingIconVisible(null);
      // Delete the flashcard
      apiManager.deleteFlashcard(getCookie('jwtToken'), flashcardID, setVisible, setReload);
    }

    useEffect(() => {
      setLoadingIconVisible("visible");
    }, [visible]);

    useEffect(() => {
      setLoadingIconVisible("visible");
    }, [visible]);

      return (
        visible !== false ?
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <motion.div
              className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
              style={view == "desktop" ? {height: "fit-content"} : null}
            >
                <Heading3 text="Are you sure you want to delete this flashcard?" />
                <Paragraph text="This will permanently delete the entire flashcard - you can't access it again!" />
                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => setVisible(false)} style={buttonStyle} />
                    <Button text="Yes, delete it" onClick={deleteFlashcard} style={buttonStyle} />
                </div>
                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default DeleteFlashcardConfirmation;