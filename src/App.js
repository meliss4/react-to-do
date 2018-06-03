import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
     this.state = {
       todos: [
         { description: 'Walk the cat', isCompleted: true },
         { description: 'Throw the dishes away', isCompleted: false },
         { description: 'Buy new dishes', isCompleted: false }
        ],
        newTodoDescription: ''
     };    
  }

  deleteTodo(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    this.setState({ todos: todos.filter( (item) => item !== todo) });
  }

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos }); //ternary operator
  } // accepts the index as a parameter. it should switch the isCompleted property from T to F in this state. .slice() array method modifies the array without altering the actual array by making a copy of it, then we can modify it with this.setState() to update the components

  render() {
    return (
      <div className="App">
        <ul>
          { this.state.todos.map( (todo, index) => 
             <ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } deleteTodo={ () => this.deleteTodo(index) } /> //togglecomplete function passed as a prop

          )}
        </ul>
         <form onSubmit={ (e) => this.handleSubmit(e) }>  
         <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
           <input type="submit" />
         </form>
      </div>
    );
  }
}

export default App;
