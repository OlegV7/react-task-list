import React from 'react';
import { useParams } from 'react-router-dom';
import useAddTodoList from '../hooks/useAddTodoList';

import CssBaseline from '@material-ui/core/CssBaseline';
import Spinner from './Spinner';

import './SingleTodo.css'

function SingleTodo() {
    const [todoItems, error] = useAddTodoList();

    const params = useParams();

    const getFireBaseData = () => {
        if(error) {
            return error;
        } else {
            if(todoItems) {
                return todoItems.find(todo => todo.id === params.id);
            } else {
                return <Spinner />;
            }
        }
    };

    const todoInfo = getFireBaseData();

    if(!todoInfo) {
        return <h2 style={{textAlign: 'center', marginTop: '20px'}}>No todo found!</h2>;
    }

    return (
        <div className="single-todo-card">
            <CssBaseline />

            {
                !todoInfo.todo || !todoInfo.author ?
                    <Spinner />
                    : 
                    <>
                        <h2>Task: {todoInfo.todo}</h2>
                        <p>By: {todoInfo.author}</p>
                    </>
            }
        </div>
    )
}

export default SingleTodo
