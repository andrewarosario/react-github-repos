import styled from 'styled-components';

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    margin-top: 5px;
    font-size: 14px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
    text-align: center;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  div {
    margin-top: 5px;
  }
`;