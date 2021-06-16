import React from 'react';
import Todo from './Todo';
import useAddTodoList from '../hooks/useAddTodoList';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Spinner from './Spinner';

function TodoList({ onDelete }) {
    const [todoItems, error] = useAddTodoList();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
        
            {error
                ? error
                    : todoItems
                        ? todoItems.length !== 0 ? todoItems.map(item => <Todo key={item.id} id={item.id} todo={item.todo} author={item.author} onDelete={onDelete} />) : 
                            <h2 style={{textAlign: 'center', marginTop: '20px'}}>Please enter a todo!</h2>
                        : <Spinner />} 
        </Container>
    )
}

export default TodoList
