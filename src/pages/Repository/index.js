import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Owner } from './styles';
import { Container } from '../../components/Container';
import { FaStar } from 'react-icons/fa';

export default function Repository(props) {

  const [ repository, setRepository ] = useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      const { match } = props;
      const response = await api.get(`/repos/${match.params.user}/${match.params.repository}`);
      setRepository(response.data);
    }

    makeRequest();
    
  }, [])

  if (!repository) {
    return <Container></Container>
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
        <div>
          <strong>Linguagem:</strong> <span>{repository.language}</span>
        </div>
        <div>
          <FaStar /> <span>{repository.stargazers_count}</span>
        </div>
      </Owner>
    </Container>
  );
}