import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1300px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`

  div {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

      div {
        display: flex;
        flex-direction: column;
      }
  }

  .form-submit {
    display: flex;
    justify-content: flex-end;
  }

  input {
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }

  @media(max-width: 640px) {
    div {
      flex-grow: 1;
    }
  }
`;

export const SearchButton = styled.button.attrs({
  type: 'submit',
})`
  height: 40px;
  background: #3c3c4c;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0 0;
  margin-top: auto;

  button {
    border-radius: 3px;
    border: 0;
    padding: 12px 20px;
    margin: 0;

    &:hover {
      background: #7159c1;
      color: #fff;
    }

    &[disabled] {
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.3);
      cursor: auto;
    }

    svg {
      vertical-align: middle;
      font-size: 20px;
    }

    &:nth-child(1) svg {
      margin-right: 4px;
    }

    &:nth-child(2) svg {
      margin-left: 4px;
    }
  }
`;