import React, { useContext, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import styled from "styled-components";
import CodeTemplate from "../main/mainDashboard/CodeTemplate";
import { Context } from "../../store/Context";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  const { profileTemplates, darkTheme } = useContext(Context);
  const [spread, setSpread] = useState(false);
  const spreadSidebar = () => {
    console.log("hey");
    setSpread((pre) => !pre);
  };
  const styles = { width: 20 + "rem", opacity: 1 };
  const templatesStyle = { left: 20 + "rem" };

  return (
    <>
      <ProfilePage>
        <SpreadButton
          onClick={spreadSidebar}
          style={spread ? { left: "18rem" } : {}}
          className={darkTheme ? "dark-theme" : "light-theme"}
        >
          {!spread ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </SpreadButton>
        <Sidebar
          className={darkTheme ? "dark-theme" : "light-theme"}
          style={spread ? styles : {}}
        >
          <ProfileSidebar />
        </Sidebar>
        <TemplatesContainer style={spread ? templatesStyle : {}}>
          <CodeTemplate id="codeTemplate" temp={profileTemplates} />
        </TemplatesContainer>
      </ProfilePage>
    </>
  );
};
export default Profile;

const ProfilePage = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: 20rem 1fr;
  grid-template-areas: "sidebar code";
  position: relative;
`;

const Sidebar = styled.div`
  @media only screen and (max-width: 900px) {
    width: 0px;
    transition: all 0.5s;
    overflow: hidden;
    position: absolute;
    overflow-y: hidden;
    opacity: 0;
    height: auto;
  }
`;
const TemplatesContainer = styled.div`
  @media only screen and (max-width: 900px) {
    position: absolute;
    left: 20px;
    right: 0;
    top: 0;
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
  &.light-mode {
    color: black;
  }
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;
