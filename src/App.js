import React, { Fragment } from 'react'; // , useContext, useState
import { Redirect, Route, Switch } from 'react-router-dom';
import { addItemFirestore } from './firestore/firestoreAdd';
import { deleteItemFirestore } from './firestore/firestoreDelete';

import Nav from './components/Nav';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Auth from './components/Auth';

import './App.css';
import SingleTodo from './components/SingleTodo';

function App() {
  // Regular State
  // const [todos, setTodos] = useState([]);

  const currentUser = localStorage.getItem('authUser');
  
  const addTodoHandler = async todo => {
    // Add to regular state
    // setTodos(prevTodos => [todo, ...prevTodos]);

    // Add to firestore
    await addItemFirestore(todo);
  };

  const removeTodoHandler = id => {
    // Remove from regular state
    // const newTodoArr = todos.filter(todo => todo.id !== id);
    // setTodos(newTodoArr);

    // Delete from firestore
    deleteItemFirestore(id);
  }

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
              currentUser ? <TodoList onDelete={removeTodoHandler} /> : <Redirect to="/auth" />
            }
          </Route>
          <Route path="/todos/:id" exact>
            {
              currentUser ? 
                <SingleTodo />    
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
