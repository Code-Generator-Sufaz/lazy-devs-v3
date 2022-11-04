import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../store/Context';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { BiShow } from 'react-icons/bi';
import { BsTrash, BsDownload } from 'react-icons/bs';
import MainButton from '../../components/UI/MainButton';
import { baseUrl } from '../../assets/api/api';
const ProfileCodeCards = () => {
  const [cards, setCards] = useState([]);
  const { profileTemplates } = useContext(Context);
  const { setProfileTemplates } = useContext(Context);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${baseUrl}/user/templates`);
        setCards(data.data.template);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const showTemplateHandler = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}/user/templates/${id}`);
      setProfileTemplates(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSavedTempHandler = async (id) => {
    try {
      const data = await axios.delete(`${baseUrl}/user/templates/${id}`);
      setCards((pre) => pre.filter((item) => item._id !== data.data._id));
    } catch (error) {}
  };
  const download = async (id) => {
    console.log(id);
    try {
      const data = await axios.get(`${baseUrl}/user/templates/download/${id}`);
      const zip = new JSZip();
      console.log(data.data);
      zip
        .folder(data.data.projectName)
        .folder('client')
        .file('app.js', data.data.frontend);
      zip
        .folder(data.data.projectName)
        .folder('server')
        .file('index.js', data.data.backend);

      zip
        .folder(data.data.projectName)
        .folder('client')
        .file('package.json', data.data.frontEndPackageJSON);

      zip
        .folder(data.data.projectName)
        .folder('server')
        .file('package.json', data.data.backendPackageJSON);

      zip
        .generateAsync({
          type: 'blob',
        })
        .then((content) => {
          saveAs(content, data.data.projectName);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProfileCodeCardsWindow>
      {cards.length > 0 && (
        <h3 style={{ margin: '2rem 0 1rem' }}>Your previous work:</h3>
      )}
      {cards.map((card, index) => {
        return (
          <>
            <CodeCardBox>
              <p>{card.projectName}</p>
              <div style={{ width: '50%' }}>
                <div>
                  <Download
                    onClick={() => download(card._id)}
                    style={{ fontSize: '30px', fontWeight: 'bold' }}
                  />
                </div>
                <div onClick={() => showTemplateHandler(card._id)}>
                  <Show style={{ fontSize: '30px', fontWeight: 'bold' }} />
                </div>
                <div onClick={() => deleteSavedTempHandler(card._id)}>
                  <Trash style={{ fontSize: '30px', fontWeight: 'bold' }} />
                </div>
              </div>
            </CodeCardBox>
            <CreatedAt>{moment(card.createdAt).fromNow()}</CreatedAt>
          </>
        );
      })}
    </ProfileCodeCardsWindow>
  );
};

export default ProfileCodeCards;

const ProfileCodeCardsWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 17rem;
  span {
    font-size: 14px;
    font-style: italic;
    color: white;
    align-self: flex-end;
    margin-bottom: 1rem;
  }
`;
const CodeCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
  background: #3cc6ad;
  border-radius: 0.5rem;
  flex-basis: 1;
  position: relative;
  cursor: pointer;
  p {
    font-size: 16px;
  }
  div {
    display: flex;
    width: 5rem;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
  }
`;
const Show = styled(BiShow)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;

const Trash = styled(BsTrash)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;
const Download = styled(BsDownload)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;

const CreatedAt = styled.span`
  margin-top: 0.3rem;
  font-size: 0.5rem;
`;
