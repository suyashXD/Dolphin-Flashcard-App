import {React, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer/GridContainer';
import GridItem from '../componments/GridItem/GridItem';
import SidePanel from '../containers/SidePanel/SidePanel';
import WhiteOverlay from '../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../containers/HamburgerBar/HamburgerBar';
import MoveFolderDialogue from '../containers/Modal/MoveFolderDialogue/MoveFolderDialogue';
import CreateFlashcardSetDialogue from '../containers/Modal/CreateFlashcardSetDialogue/CreateFlashcardSetDialogue';
import apiManager from '../api/Api';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import { getCookie } from '../api/Authentication';

function Flashcards({ flashcardData }) {
  // Set general variables
  const title = "Flashcards";
  const [mobileSidePanelVisible, setMobileSidePanelVisible] = useState(false);
  const [moveFolderDialogueVisible, setMoveFolderDialogueVisible] = useState(false);
  const [reload, setReload] = useState(true);
  const [createCardDialogueVisible, setCreateCardDialogueVisible] = useState(false);

  // Set variables for the size
  const mobileBreakpoint = 650;
  const tabletBreakpoint = 1090;
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop"
  );
  const [flashcardBoxHorizontalPadding, setFlashcardBoxHorizontalPadding] = useState(
    view == "mobile" ? "8px" : "16px"
  );

  // Manage resizing the window size when needed
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
  
    // Set the initial window size
    setWidth(window.innerWidth);
  
    // Set up the event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setView(
      width < mobileBreakpoint ? "mobile"
      : width < tabletBreakpoint ? "tablet" : "desktop");
    setFlashcardBoxHorizontalPadding(
      view == "mobile" ? "8px" : "16px"
    );
  }, [width]);

  return (
    <div style={{top: "0px"}}>
      <Helmet>
        <title>{ title }</title>
        <meta
            name="viewport" 
            content="width=device-width, initial-scale=1.0">
        </meta>
      </Helmet>
      <CreateFlashcardSetDialogue visible={createCardDialogueVisible} setVisible={setCreateCardDialogueVisible} view={view} setReload={setReload}/>
      <MoveFolderDialogue visible={moveFolderDialogueVisible} setVisible={setMoveFolderDialogueVisible} view={view} setReload={setReload}/>
      <GridContainer layout={
        view != "mobile" ? "240px auto"
        : "auto"
      } classType="two-column-grid">
        {view != "mobile" ? <SidePanel selectedItem="flashcards"/> : <></>}

        <GridItem style={{
          paddingLeft: flashcardBoxHorizontalPadding,
          paddingRight: flashcardBoxHorizontalPadding,
          paddingTop: "0px",
          width: view == "mobile" ? "100vw" : "",
          display: view == "mobile" ? "block" : "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        {view == "mobile" ? <HamburgerBar menuVisible={mobileSidePanelVisible} setMenuVisible={setMobileSidePanelVisible} selectedItem="flashcards"/> : <></>}
  
          <WhiteOverlay
            style={{
                height: "max-content",
                paddingBottom: view == "mobile" ? "80px" : "",
                width: view == "desktop" ? "100%" : "calc(100% - 16px)"
              }}
            >
            <div style={{maxWidth: "1200px", margin: "auto"}}>
              <p>Create a Flashcard</p>
            </div>
          </WhiteOverlay>

        </GridItem>
      </GridContainer>
    <BlobBackground />
    </div>
  );
}

export default Flashcards;
