import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Repository(props) {

  const [ repository, setRepository ] = useState({});

  useEffect(() => {
    const makeRequest = async () => {
      const { match } = props;
      const response = await api.get(`/repos/${match.params.user}/${match.params.repository}`);
      setRepository(response.data);
    }

    makeRequest();
    
  }, [])

  return <h1>Repositório</h1>;
}