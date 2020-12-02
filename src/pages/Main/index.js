import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Container, Form, SearchButton, PageNav } from './styles';
import api from '../../services/api';
import useDebounce from '../../helpers/use-debounce'
import { List } from '../../components/List';

export default function Main() {
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState('');
  const [ page, setPage ] = useState(1);
  const [ repositories, setRepositories ] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {

    const getResponse = () => {
        return api.get('/search/repositories', {
            params: {
                q: debouncedSearch,
                per_page: 10,
                page
            }
        });
    }

    const listRepositories = async () =>  {
        if (!debouncedSearch) return;

        setLoading(true);
        const response = await getResponse();
        setRepositories(response.data.items);
        setLoading(false);
    }

    listRepositories();
  }, [debouncedSearch, page]);

  const handleSubmit = async e => {
    e.preventDefault();
    setPage(1);
  }

  const handleInputChange = e => {
    setPage(1);
    setSearch(e.target.value);
  }

  const handlePage = action => {
    const newPage = action === 'back' ? page - 1 : page + 1;
    setPage(newPage);
  };

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
                <span>{repo.full_name}</span>
            </Link>
            </div>
        </li>
        ))}
        {repositories.length > 0 &&
          <PageNav>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => handlePage('back')}
            >
              <GoArrowLeft />
              Página Anterior
            </button>
            <button type="button" onClick={() => handlePage('next')}>
              Próxima Página
              <GoArrowRight />
            </button>
          </PageNav>
        }
      </List>
      
    </Container>
  );
}