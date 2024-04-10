import React from 'react'
import axios from 'axios'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    newTodoNameInput: ''
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data})
      })
      .catch(err => {
        this.axiosErrorGiven()
      })
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, newTodoNameInput: value})
  }

  axiosErrorGiven = err => {
    this.setState({...this.state, error: err.response.data.message})
  }

  resetForm = () => {
    this.setState({...this.state, newTodoNameInput: ''})
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.newTodoNameInput})
        .then(res =>{
          this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
          this.resetForm()
        })
        .catch(err => { 
          this.axiosErrorGiven()
        })
  }

  onSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }
  componentDidMount() {
    this.fetchAllTodos()

  }
  render() {
    return (
      <div>
        <div id="error">{this.state.error !== '' ? `Error: ${this.state.error}` : "" }</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.newTodoNameInput} type="text" placeholder='Type a todo'></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
