import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{

    constructor(props){
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            description: '', 
            list: []
        }
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => {
                this.refresh()
            })
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value })
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    updateDone(todo,status){
        axios.put(`${URL}/${todo._id}`, { ...todo, done: status })
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        this.updateDone(todo, true)
    }

    handleMarkAsPending(todo){
         this.updateDone(todo, false)
    }

    handleReset(){
        if(this.state.description !== ''){
            this.setState({...this.state, description: ''})
            this.refresh()
        }
    }

    componentDidMount(){
        this.refresh()
    }

    render(){
        return(
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    description={this.state.description} 
                    handleSearch={this.handleSearch}
                    handleReset={this.handleReset}
                />
                <TodoList todos={this.state.list}
                 handleRemove={this.handleRemove}
                 handleMarkAsDone={this.handleMarkAsDone}
                 handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        )
    }
}