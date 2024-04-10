import React from 'react'
import axios from 'axios'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    newTodoNameInput: '',
    displayCompleted: true
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

  toggleCompleted= id => evt => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
      this.setState({...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      })}) 
      })
      .catch(this.axiosErrorGiven)
  }

  toggleDisplayedCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted})
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
            this.state.todos.reduce((acc, td) =>{
              if (this.state.displayCompleted || !td.completed) return acc.concat(
                <div onClick={this.toggleCompleted(td.id)}key={td.id}>{td.name} {td.completed ? ' ✅' : ''}</div>
              )
              return acc
            }, [])
          }
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.newTodoNameInput} type="text" placeholder='Type a todo'></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.toggleDisplayedCompleted}>{this.state.displayCompleted ? 'Hide Completed Todos' : 'Show Completed Todos'}</button>
      </div>
    )
  }
}
