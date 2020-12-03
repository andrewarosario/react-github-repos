import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Form, PageNav, SearchButton } from './styles';
import api from '../../services/api';
import { List } from '../../components/List';
import { Container } from '../../components/Container';
import { Loading } from '../../components/Loading';
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
      makeRequest(values, 1, sort);
    },
  });

  const [ page, setPage ] = useState(1);
  const [ sort, setSort ] = useState('');
  const [ repositories, setRepositories ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const makeUrl = (values, page, sort) => {
    const endPoint = '/search/repositories';
    const searchTerm = `?q=${values.name}`
    const query = Object.keys(values)
      .filter(value => value !== 'name')
      .reduce((query, value) => `${query}${values[value] ? `+${value}:${values[value]}` : ''}`, '')

    const queryPage = `&per_page=10&page=${page}`
    const querySort = sort && `&sort=${sort}`

    return endPoint + searchTerm + query + queryPage + querySort;
  }

  const handlePage = action => {
    const newPage = action === 'back' ? page - 1 : page + 1;
    setPage(newPage);
    makeRequest(formik.values, newPage, sort);
  };

  const handleSort = e => {
    const newSort = e.target.value;
    setSort(newSort);
    makeRequest(formik.values, page, newSort);
  }

  const makeRequest = async (values, page, sort) => {
    setLoading(true);
    const urlApi = makeUrl(values, page, sort);
    const response = await api.get(urlApi);
    setRepositories(response.data.items);
    setLoading(false);
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
            <select value={sort} onChange={handleSort}>
              <option value="">Relevância</option>
              <option value="stars">Quantidade de Estrelas</option>
              <option value="forks">Quantidade de Forks</option>
              <option value="updated">Última Atualização</option>
            </select>
            <SearchButton>      
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaSearch color="#FFF" size={14} />
            )}
            </SearchButton>
        </div>
      </Form>

      {loading ? (
        <Loading>Buscando Repositórios...</Loading>
      ) : (
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
      )}
      
    </Container>
  );
}