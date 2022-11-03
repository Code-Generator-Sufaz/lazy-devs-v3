import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <AboutStyle>
      <div className='main-footer'>
        <div className='container'>
          <div className='row'>
            {/* Column1 */}
            <div className='col'>
              <h3>Lazy Dev's</h3>

              <ul className='list-unstyled'>
                <li>+49 17611112222</li>
                <li>Haupt Str. 4</li>
                <li>Berlin, Germany</li>
              </ul>
            </div>
            {/* Column2 */}
            <div className='col'>
              <h3>Resources</h3>

              <ul className='list-unstyled'>
                <li>Docs</li>
                <li>Learn</li>
                <li>About</li>
              </ul>
            </div>
            {/* Column3 */}
            <div className='col'>
              <h3>About Code Generator</h3>

              <ul className='list-unstyled'>
                <li>
                  <a href='https://github.com/Code-Generator-Sufaz'>Github</a>
                </li>
                <li>
                  {' '}
                  <a href='mailto:authentication-generator@outlook.com'>
                    Email
                  </a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/feed/'>Linkedin</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className='row'>
            <p className='copyright'>
              &copy;{new Date().getFullYear()} LAZY DEV'S / All right reserved /
              Terms of Service / Privacy
            </p>
          </div>
        </div>
      </div>
    </AboutStyle>
  );
}

// Styled components

const AboutStyle = styled.footer`
  .main-footer {
    color: #65d4d1;
  }

  a {
    color: #65d4d1;
    text-decoration: none;
  }
  hr {
    margin-top: 30px;
  }

  .main-footer div.container {
    display: block;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .list-unstyled {
    list-style: none;
  }
  h3 {
    font-family: 'Alfa Slab One', cursive;
  }
  /* @media (max-width: 1400px) {
    text-align: center;
    .main-footer {
      height: 55vh;
      padding-top: 10px;
    }
    .row {
      flex-direction: column;
      vertical-align: middle;
    } */

  @media (max-width: 780px) {
    text-align: center;
    .main-footer {
      padding-top: 10px;
    }
    .row {
      flex-direction: column;
      vertical-align: middle;
    }
  }
  @media screen and (max-width: 480px) {
    .main-footer {
      width: 100%;
      margin-bottom: 120px;
    }
    .list-unstyled {
      list-style: none;
      margin-bottom: 16px;
      margin-top: 6px;
      li {
        display: inline;
        margin: 0 10px;
      }
    }
  }
`;
