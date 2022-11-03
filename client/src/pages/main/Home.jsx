import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MainButton from "../../components/UI/MainButton";
import { Context } from "../../store/Context";
export default function Home() {
  const { darkTheme } = useContext(Context);
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <BannerContainer className={darkTheme ? "dark-theme" : "light-theme"}>
        <h1>
          Authentication <span>tool</span> for Developers
        </h1>
        <h5>Get your plug-and-play template for starting your new project</h5>

        <MainButton onClick={() => navigate("/dashboard")}>
          get started
        </MainButton>
      </BannerContainer>
      <AnimationContainer>
        <h1>Animation</h1>
      </AnimationContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 78vh;
  width: 90%;
  margin: 0 auto;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BannerContainer = styled.div`
  width: 50%;
  @media (max-width: 900px) {
    text-align: center;
  }
  h1 {
    text-transform: uppercase;
    font-size: 3.5rem;
    @media (max-width: 900px) {
      font-size: 3rem;
    }
    letter-spacing: 2px;
    word-spacing: 1px;
    line-height: 55px;
    span {
      color: var(--warningColor);
    }
  }
  h5 {
    font-weight: 200;
    font-size: 1.2rem;
    letter-spacing: 2px;
    word-spacing: 1px;
  }
`;

const AnimationContainer = styled.div``;
