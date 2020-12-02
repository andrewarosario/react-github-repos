import React, { useState } from 'react';
import { FaGithubAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import { Container, Form, SearchButton } from './styles';
import api from '../../services/api';

export default function Main() {
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await api.get(`/search/repositories?q=${search}`);
    console.log(response);
    setLoading(false);
  }

  const handleInputChange = e => {
      setSearch(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios do Github
      </h1>

      <Form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Buscar repositórios" 
          value={search}
          onChange={handleInputChange}
        />

        <SearchButton>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaSearch color="#FFF" size={14} />
          )}
        </SearchButton>
      </Form>
    </Container>
  );
}