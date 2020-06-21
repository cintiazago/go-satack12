import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        try {
            api.get('projects').then(response => {
                setProjects(response.data);
            });
        } catch (error) {
            // Tratar o erro adequadamente
            console.log(error);
        }
    }, []);

    async function handleAddProject(){
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Cintia Zago'
        });

        const project = response.data;

        setProjects([ ...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />

                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* <View style={styles.container}>
                {projects.map(project => (
                    <Text key={project.id} style={styles.project}>{project.title}</Text>
                ))}
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    },
    project: {
        color: '#FFF',
        fontSize: 30,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});