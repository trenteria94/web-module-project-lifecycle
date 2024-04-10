import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

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
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.axiosErrorGiven)
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, newTodoNameInput: value })
  }

  axiosErrorGiven = err => {
    this.setState({ ...this.state, error: err.response.data.message })
  }

  resetForm = () => {
    this.setState({ ...this.state, newTodoNameInput: '' })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.newTodoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.axiosErrorGiven)
  }

  onSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }

  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.axiosErrorGiven)
  }

  toggleDisplayedCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }
  componentDidMount() {
    this.fetchAllTodos()

  }
  render() {
    return (
      <div>
        <div id="error">{this.state.error !== '' ? `${this.state.error}!` : ""}</div>
        <TodoList 
        todos={this.state.todos}
        displayCompleted={this.state.displayCompleted}
        toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          newTodoNameInput={this.state.newTodoNameInput}
          toggleDisplayedCompleted={this.toggleDisplayedCompleted}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
