import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onSubmit}>
          <input
            onChange={this.props.onChange}
            value={this.props.newTodoNameInput}
            type="text"
            placeholder='Type a todo'>
          </input>
          <input type="submit"></input>
        </form>
        <button
          onClick={this.props.toggleDisplayedCompleted}
        >
          {this.props.displayCompleted ? 'Hide Completed Todos' : 'Show Completed Todos'}
        </button>

      </>
    )
  }
}
