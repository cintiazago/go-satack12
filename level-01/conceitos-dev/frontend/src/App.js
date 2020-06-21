import React, { useState, useEffect } from 'react';

import './App.css';
import backgroundImage from './assets/background.jpeg';
import Header from './components/Header';
import api from './services/api';


function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);
    
    async function handleAddProject() {
        
        // setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Cintia Zago'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Homepage">
                <img widht={300} src={backgroundImage} alt=""/>
                
                <ul>
                    {projects.map(project => <li key={project.id}>{project.title}</li>)}                    
                </ul>

                <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
            </Header>
        </>
    );
}

export default App;