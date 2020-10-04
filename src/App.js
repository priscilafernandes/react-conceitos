import React, { useEffect, useState } from "react";
import "./styles.css";

import api from "./services/api";

function App() {
  const [ repositories, setRepositories ] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório (${Math.floor(Math.random() * 1000)})`,
      url: "https://github.com/",
      techs: ["React", "Angular", "Vue"]
    });
    
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const repositoryId = repositories.filter(repository => repository.id === id);

    await api.delete(`repositories/${id}`, {
      data: repositoryId
    });

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">

        { repositories.map(repository => {
          return (
            <li key={ repository.id }>
              { repository.title }
              
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          )
        }) }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
