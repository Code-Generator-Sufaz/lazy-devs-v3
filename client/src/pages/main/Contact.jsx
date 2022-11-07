import React, { useState } from "react";
import axios from "axios";
import AuthContainer from "../../components/UI/UserRegistration/AuthContainer";
import FormContainer from "../../components/UI/UserRegistration/FormContainer";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import ButtonContainer from "../../components/UI/UserRegistration/ButtonContainer";

export default function Contact() {
  const [input, setInput] = useState();

  const [message, setMessage] = useState();

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/other/contact", input)
      .then((result) => {
        console.log(result)
        if (result.data.mailSent) {
          setMessage(
            "Thank you for sending your message. We will contact you soon"
          )
        } else {
            setMessage("Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
        {message && <h2>{message}</h2>}
        <AuthContainer>
          <FormContainer>
            <h2>Contact us</h2>
            <div>
              <StyledTextField
                className="text-field"
                name="name"
                id="filled-basic"
                label="Name"
                variant="filled"
                onChange={onChangeHandler}
              />
              <StyledTextField
                className="text-field"
                name="subject"
                id="filled-basic"
                label="Subject"
                variant="filled"
                onChange={onChangeHandler}
              />
              <StyledTextField
                className="text-field"
                name="email"
                id="filled-basic"
                label="Email"
                variant="filled"
                onChange={onChangeHandler}
              />
            </div>

            <div style={{ position: "relative" }}>
              <StyledTextField
                className="text-field"
                name="message"
                id="filled-basic"
                label="Send us a message"
                variant="filled"
                onChange={onChangeHandler}
              />
            </div>

            <ButtonContainer>
              <div>
                <button onClick={submitHandler} value="Login">
                  Send message
                </button>
              </div>
            </ButtonContainer>
          </FormContainer>
        </AuthContainer>
    </Container>
  );
}

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const Container = styled.div`
    height: 90vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
