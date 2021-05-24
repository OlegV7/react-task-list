import React, { Fragment, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import './App.css';
import SingleTodo from './components/SingleTodo';

function App() {
  const [todos, setTodos] = useState([
    {
      todo: 'Walk the dog',
      author: 'Oleg',
      id: 1
    },
    {
      todo: 'Take out the trash',
      author: 'Daniel',
      id: 2
    },
    {
      todo: 'Dinner with wife',
      author: 'Viktor',
      id: 3
    }
  ]);

  const addTodoHandler = todo => setTodos(prevTodos => [todo, ...prevTodos]);

  const removeTodoHandler = id => {
    const newTodoArr = todos.filter(todo => todo.id !== id);

    setTodos(newTodoArr);
  }

  return (
    <Fragment>
      <Nav />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/todos"/>
          </Route>
          <Route path="/add-todo">
            <TodoForm addTodo={addTodoHandler} />
          </Route>
          <Route path="/todos" exact>
            <TodoList todos={todos} deleteTodo={removeTodoHandler} />
          </Route>
          <Route path="/todos/:id" exact>
            <SingleTodo todos={todos} />
          </Route>
          <Route path="*">
            <h2 style={{textAlign: 'center', marginTop: 50}}>Page not found. 404</h2>
          </Route>
        </Switch>
      </main>
    </Fragment>
  )
}

export default App;
