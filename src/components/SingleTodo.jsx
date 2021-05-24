import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

function SingleTodo({ todos }) {
    const params = useParams();
    
    const todoInfo = todos.filter(todo => todo.id === +params.id);

    return (
        <Fragment>
            {todoInfo[0].todo} - {todoInfo[0].author}
        </Fragment>
    )
}

export default SingleTodo
