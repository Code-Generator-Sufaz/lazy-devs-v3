import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../store/Context';
import Alert from '../../../components/UI/Alert';
import Editor from './EditorForm';
import CodeTemplate from './CodeTemplate';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

export default function MainDashBoard() {
  const { templates, darkTheme } = useContext(Context);

  const [spread, setSpread] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const spreadSidebar = () => {
    setSpread((pre) => !pre);
  };
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      console.log('updating width');
    };

    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);
  return (
    <DashBoardContainer>
      <MainContentContainer>
        {!spread && (
          <EditorDiv
            className={darkTheme ? 'dark-theme' : 'light-theme'}
            style={{ position: 'relative' }}
          >
            <Editor id='editor' />
            {!spread && screenWidth < 768 && (
              <SpreadButton
                onClick={spreadSidebar}
                className={darkTheme ? 'dark-theme' : 'light-theme'}
              >
                <IoIosArrowForward />
              </SpreadButton>
            )}
          </EditorDiv>
        )}
        {spread || screenWidth > 768 ? (
          <TemplatesDiv
            className={darkTheme ? 'dark-theme' : 'light-theme'}
            style={!spread ? { display: 'block', width: '100%' } : {}}
          >
            {spread && (
              <CloseButton
                onClick={spreadSidebar}
                className={darkTheme ? 'dark-theme' : 'light-theme'}
              >
                <IoIosArrowBack />
              </CloseButton>
            )}
            {templates?.backend ? (
              <CodeTemplate id='codeTemplate' temp={templates} />
            ) : (
              <></>
            )}
          </TemplatesDiv>
        ) : (
          <></>
        )}
      </MainContentContainer>
      <Alert>
        {templates ? 'Template successfully saved!' : 'Template already exists'}
      </Alert>
    </DashBoardContainer>
  );
}

// ## STYLED COMPONENTS ##

const DashBoardContainer = styled.div``;

const MainContentContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  position: relative;
`;

const EditorDiv = styled.div`
  align-self: flex-start;
  flex-basis: 320px;
  transition: width 1s;
  border-right: 1px solid white;
  @media screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    & input,
    & select {
      width: 100%;
    }
  }
`;

const TemplatesDiv = styled.div`
  flex: 1;
  &.dark-theme {
    background-color: var(--backgroundColor);
    color: var(--textColor);
  }
  &.light-theme {
    background-color: var(--textColor);
    color: var(--textColor);
  }
`;

const SpreadButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  animation: pulse 1s infinite;
  border: none;
  font-size: 3rem;
  @keyframes pulse {
    from {
      transform: translateX(-10px);
    }
    to {
      transform: translateX(10px);
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  font-size: 3rem;
`;
