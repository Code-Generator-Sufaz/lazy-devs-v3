import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Context } from "../../store/Context";
import ProfileCodeCards from "./ProfileCodeCards";
import MainButton from "../../components/UI/MainButton";
import { BsUpload } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { baseUrl } from "../../assets/api/api";
export default function ProfileSidebar() {
  const { user, setUser, darkTheme } = useContext(Context);
  const [openFormUserUpdate, setOpenFormUserUpdate] = useState(false);
  const [openPasswordUpdate, setOpenPasswordUpdate] = useState(false);
  // const [formInputs, setFormInputs] = useState({});
  const [currentUser, setCurrentUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
  });
  const [submitButton, setSubmitButton] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  const [image, setImage] = useState();
  const [errorFirst, setErrorFirst] = useState("");
  const [errorLast, setErrorLast] = useState("");
  const [errorOld, setErrorOld] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [errorNewConf, setErrorNewConf] = useState("");
  const onChangeHandler = (e) => {
    const newUserInfo = e.target.value;
    setCurrentUser((pre) => {
      return { ...pre, [e.target.name]: newUserInfo };
    });
  };
  console.log(currentUser);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(currentUser);
    setErrorFirst("");
    setErrorLast("");
    setErrorOld("");
    setErrorNew("");
    setErrorNewConf("");
    try {
      const data = await axios.put(`${baseUrl}/user/update/${user._id}`, currentUser);
      console.log(data.data);
      setUser(data.data);
    } catch (err) {
      err.response.data.forEach((item) => {
        console.log(item);
        if (item.param === "firstName") setErrorFirst(item.msg);
        if (item.param === "lastName") setErrorLast(item.msg);
        if (item.param === "oldPassword") setErrorOld(item.msg);
        if (item.param === "newPassword") setErrorNew(item.msg);
        if (item.param === "newPasswordConfirm") setErrorNewConf(item.msg);
      });
      console.log(err.response.data);
    }
  };

  const fileOnChange = (e) => {
    setImage(e.target.files[0]);
    setSubmitButton(true);
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("photo", image);
      const data = await axios.post(`${baseUrl}/user/profilephoto`, formData);
      console.log(data.data.url);
      setAvatar(data.data.url);
      setSubmitButton(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProfileContainer className={darkTheme ? "dark-theme" : "light-theme"}>
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onChange={fileOnChange}
          src={
            !user.avatar
              ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              : `${avatar}`
          }
          alt=""
        />
        <LabelPhoto htmlFor="photo">
          <BsUpload />
        </LabelPhoto>
      </div>
      <form onSubmit={uploadImage}>
        <div>
          <input
            type="file"
            name="photo"
            id="photo"
            style={{ display: "none" }}
            onChange={fileOnChange}
            accept="image/png, image/jpeg"
          />
        </div>
        {submitButton && <input type="submit" value="Submit" />}
      </form>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <MainButton
        type="button"
        onClick={() => {
          setOpenFormUserUpdate(!openFormUserUpdate);
        }}
      >
        {" "}
        {!openFormUserUpdate ? "Update Account Settings" : "Close"}
      </MainButton>
      {openFormUserUpdate && (
        <Form onSubmit={submitHandler}>
          <StyledTextField
            size="small"
            id="filled-basic"
            label="First Name"
            variant="filled"
            type="text"
            name="firstName"
            value={currentUser.firstName}
            onChange={onChangeHandler}
          />

          {errorFirst.length > 0 && <Error>{errorFirst}</Error>}

          <StyledTextField
            size="small"
            required
            id="outlined-required"
            label="Last Name"
            variant="filled"
            value={currentUser.lastName}
            type="text"
            name="lastName"
            onChange={onChangeHandler}
          />

          {errorLast.length > 0 && <Error>{errorLast}</Error>}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Change Password
            </AccordionSummary>
            <AccordionDetails>
              <StyledTextField
                size="small"
                id="filled-basic"
                label="Enter old password"
                variant="filled"
                type="password"
                name="oldPassword"
                onChange={onChangeHandler}
              />

              {errorOld.length > 0 && <Error>{errorOld}</Error>}

              <StyledTextField
                size="small"
                id="filled-basic"
                label="New password"
                variant="filled"
                type="password"
                name="newPassword"
                onChange={onChangeHandler}
              />

              {errorNew.length > 0 && <Error>{errorNew}</Error>}

              <StyledTextField
                size="small"
                id="filled-basic"
                label="Confirm new pasword"
                variant="filled"
                type="password"
                name="newPasswordConfirm"
                onChange={onChangeHandler}
              />

              {errorNewConf.length > 0 && <Error>{errorNewConf}</Error>}
            </AccordionDetails>
          </Accordion>

          <MainButton type="submit">submit</MainButton>
        </Form>
      )}
      {!openFormUserUpdate ? <ProfileCodeCards /> : null}
    </ProfileContainer>
  );
}

// STYLED COMPONENTS

const ProfileContainer = styled.div`
  height: 100%;
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: white 1px solid;
  &.light-theme {
    border-right: var(--backgroundColor) 1px solid;
  }
  /* button {
    margin: 1rem auto;
    font-size: 1rem;
    font-weight: 100;
    background: transparent;
    border: 1px solid #65d4d1;
    border-radius: 0.5rem;
    padding: 0.2rem 1rem;
    color: #65d4d1;
    :focus {
      outline: none;
    }
  } */
  h1 {
    margin-top: 2rem;
  }
`;

const Form = styled.form`
  margin-top: 7rem;
  width: 80%;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  justify-content: space-evenly;
`;
const StyledTextField = styled(TextField)`
  width: 80%;
  margin-bottom: 20rem;
  input {
    background-color: white !important;
    border-bottom: 2px solid var(--warningColor);
    margin: 0 auto;
    ::after {
      border: none;
    }
  }
`;
const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const LabelPhoto = styled.label`
  position: absolute;
`;

const UpdateAccountBTN = styled.button``;
