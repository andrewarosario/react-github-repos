import styled from 'styled-components';

export const List = styled.ul`
  margin-top: 30px;
  list-style-type: none;
  font-size: 16px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    img {
      width: 32px;
      margin-right: 12px;
      border-radius: 50%;
      border: 2px solid #dbdbdb;
    }

    a {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #7159c1;
      }
    }
  }
`;