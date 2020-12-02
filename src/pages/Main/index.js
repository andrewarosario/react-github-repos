import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import { Container, Form, SearchButton, List } from './styles';
import api from '../../services/api';

export default function Main() {
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ repositories, setRepositories ] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await api.get(`/search/repositories?q=${search}`);
    setRepositories(response.data.items);
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

      <List>
        {repositories.map(repo => (
        <li key={repo.full_name}>
            <div>
            <Link to={`/repository/${encodeURIComponent(repo.full_name)}`}>
                <img src={repo.owner.avatar_url} alt={repo.owner.name} />
                <span>{repo.name}</span>
            </Link>
            </div>
        </li>
        ))}
      </List>
      
    </Container>
  );
}