import React, { Fragment, useState } from 'react'; // , useContext
import { Redirect, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Auth from './components/Auth';
// import { AuthContext } from './firebase/auth';

import './App.css';
import SingleTodo from './components/SingleTodo';

function App() {
  const [todos, setTodos] = useState([]);

  // const { currentUser } = useContext(AuthContext);
  const currentUser = localStorage.getItem('authUser')
  
  const addTodoHandler = todo => setTodos(prevTodos => [todo, ...prevTodos]);

  const removeTodoHandler = id => {
    const newTodoArr = todos.filter(todo => todo.id !== id);

    setTodos(newTodoArr);
  }

  // console.log(JSON.parse(currentUser));

  return (
    <Fragment>
      {currentUser && <Nav />}
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to={currentUser ? "/todos" : "/auth"} />
          </Route>
          <Route path="/auth" exact>
            {
              !currentUser ? <Auth user={currentUser} /> : <Redirect to="/todos" /> 
            }
          </Route>
          <Route path="/add-todo">
            {
              currentUser ? <TodoForm addTodo={addTodoHandler} /> : <Redirect to="/auth" />
            }
          </Route>
          <Route path="/todos" exact >
            {
              currentUser ? <TodoList todos={todos} deleteTodo={removeTodoHandler} /> : <Redirect to="/auth" />
            }
          </Route>
          <Route path="/todos/:id" exact>
            {
              currentUser ? 
                <SingleTodo todos={todos} />    
              :
                <Redirect to="/auth" />
            }
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
