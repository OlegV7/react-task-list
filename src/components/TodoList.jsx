import React from 'react';
import Todo from './Todo';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function TodoList({ todos, deleteTodo }) {
    const todoList = todos.length === 0 ?
        <h2 style={{textAlign: 'center'}}>Please enter a todo.</h2>
    : 
        todos.map(todo => (
            <Todo 
                key={todo.id} 
                id={todo.id}
                todo={todo.todo} 
                author={todo.author}
                onDelete={deleteTodo}
            />
        ));
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {todoList}
        </Container>
    )
}

export default TodoList
