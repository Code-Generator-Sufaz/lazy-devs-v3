import styled from "styled-components";
import React from 'react'

export default function FormContainer({children}) {
  return (
    <Container>{children}</Container>
  )
}

const Container = styled.form`
margin-top: 1rem;
  h3 {
    color: tomato;
    font-size: 1rem;
    text-align: center;
  }
  div {
    width: 100%;
    .text-field {
      width: 100%;
      height: 5rem;
    }
  }
  p {
    text-align: center;
  }
`;
