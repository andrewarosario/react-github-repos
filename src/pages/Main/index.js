import React from 'react';
import { FaGithubAlt, FaSearch } from 'react-icons/fa';
import { Container, Form, SearchButton } from './styles';

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios do Github
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Buscar repositórios" />

        <SearchButton>
          <FaSearch color="#FFF" size={14} />
        </SearchButton>
      </Form>
    </Container>
  );
}