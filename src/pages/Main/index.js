import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaSearch } from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Form, PageNav, SearchButton } from './styles';
import api from '../../services/api';
import { List } from '../../components/List';
import { Container } from '../../components/Container';
import { useFormik } from 'formik';

export default function Main() {

  const formik = useFormik({
    initialValues: {
      name: '',
      language: '',
      user: '',
      org: '',
    },
    onSubmit: values => {
      setPage(1);
      makeRequest(values, 1);
    },
  });

  const [ page, setPage ] = useState(1);
  const [ repositories, setRepositories ] = useState([]);

  const makeUrl = (values, page) => {
    const endPoint = '/search/repositories';
    const searchTerm = `?q=${values.name}`
    const query = Object.keys(values)
      .filter(value => value !== 'name')
      .reduce((query, value) => `${query}${values[value] ? `+${value}:${values[value]}` : ''}`, '')

    const queryPage = `&per_page=10&page=${page}`

    return endPoint + searchTerm + query + queryPage;
  }

  const handlePage = action => {
    const newPage = action === 'back' ? page - 1 : page + 1;
    setPage(newPage);
    makeRequest(formik.values, newPage);
  };

  const makeRequest = async (values, page) => {
    const urlApi = makeUrl(values, page);
    const response = await api.get(urlApi);
    setRepositories(response.data.items);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Busca de Repositórios do Github
      </h1>

      <Form onSubmit={formik.handleSubmit}>
        <div>
            <div>
            <label htmlFor="name">Nome do Repositório</label>
            <input 
                id="name"
                type="text" 
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            </div>

            <div>
            <label htmlFor="language">Linguagem</label>
            <input 
                id="language"
                type="text" 
                value={formik.values.language}
                onChange={formik.handleChange}
            />
            </div>

            <div>
            <label htmlFor="user">Usuário</label>
            <input 
                id="user"
                type="text" 
                value={formik.values.user}
                onChange={formik.handleChange}
            />
            </div>

            <div>
            <label htmlFor="org">Organização</label>
            <input 
                id="org"
                type="text" 
                value={formik.values.org}
                onChange={formik.handleChange}
            />
            </div>
        </div>
        <div className="form-submit">
            <SearchButton>      
                <FaSearch color="#FFF" size={14} />
            </SearchButton>
        </div>
      </Form>

      <List>
        {repositories.map(repo => (
        <li key={repo.full_name}>
            <div>
            <Link to={`/repository/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}`}>
                <img src={repo.owner.avatar_url} alt={repo.owner.login} />
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