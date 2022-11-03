import React, { useContext, useState } from "react";
import { Context } from "../../../store/Context";
import Alert from "../../../components/UI/Alert";
import Editor from "./EditorForm";
import CodeTemplate from "./CodeTemplate";
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function MainDashBoard() {
  const { templates, darkTheme } = useContext(Context);

  const [spread, setSpread] = useState(true);
  const spreadSidebar = () => {
    console.log("hey");
    setSpread((pre) => !pre);
  };
  const styles = { width: 20 + "rem", opacity: 1 };
  const templatesStyle = { left: 20 + "rem" };
  return (
    <DashBoardContainer>
      <MainContentContainer>
        <SpreadButton
          onClick={spreadSidebar}
          style={spread ? { left: "18rem" } : {}}
          className={darkTheme ? "dark-theme" : "light-theme"}
        >
          {!spread ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </SpreadButton>
        <EditorDiv
          style={spread ? styles : {}}
          className={darkTheme ? "dark-theme" : "light-theme"}
        >
          <Editor id="editor" />
        </EditorDiv>
        <TemplatesDiv
          style={spread ? templatesStyle : {}}
          className={darkTheme ? "dark-theme" : "light-theme"}
        >
          {templates?.backend ? (
            <CodeTemplate id="codeTemplate" temp={templates} />
          ) : (
            <></>
          )}
        </TemplatesDiv>
      </MainContentContainer>
      <Alert>
        {templates ? "Template successfully saved!" : "Template already exists"}
      </Alert>
    </DashBoardContainer>
  );
}

// ## STYLED COMPONENTS ##

const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const EditorDiv = styled.div`
  flex-basis: 40%;
  min-height: 100vh;
  border-right: 1px solid white;
  overflow: hidden;
  &.light-theme {
    border-right: 1px solid var(--backgroundColor);
  }
  @media only screen and (max-width: 900px) {
    transition: all 0.5s;
    overflow-y: hidden;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
  }
`;

const TemplatesDiv = styled.div`
  flex-basis: 60%;
  &.dark-theme {
    background-color: var(--backgroundColor);
    color: var(--textColor);
  }
  &.light-theme {
    background-color: var(--textColor);
    color: var(--textColor);
  }
  @media only screen and (max-width: 900px) {
    position: absolute;
    left: 0%;
    right: 0%;
    top: 8%;
    transition: left 0.5s;
  }
`;

const SpreadButton = styled.button`
  z-index: 12222;
  position: fixed;
  left: 0;
  background: transparent;
  border: none;
  transition: left 0.5s;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  &.light-theme {
    color: var(--backgroundColor);
  }
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;
