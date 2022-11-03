import React from 'react'
import styled from "styled-components";


export default function AuthContainer({children}) {
  return (
    <Auth>{children}</Auth>
  )
}


const Auth = styled.div`
  width:30%;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 1rem;
`