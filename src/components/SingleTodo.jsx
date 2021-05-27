import React from 'react';
import { useParams } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import './SingleTodo.css'

function SingleTodo({ todos }) {
    const params = useParams();
    
    const todoInfo = todos.find(todo => todo.id === +params.id);

    if(!todoInfo) {
        return <p>No todo found!</p>;
    }

    return (
        <div className="single-todo-card">
            <CssBaseline />

            <h2>Task: {todoInfo.todo}</h2>
            <p>By: {todoInfo.author}</p>
        </div>
    )
}

export default SingleTodo
