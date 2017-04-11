import React, { Component } from 'react';
import './App.css';
import "normalize.css"
import "./reset.css"
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

class App extends Component {
  constructor(props){
      super(props)
      this.state={
          newTodo:"",
          todoList:[
          ]
      }
  }
  render(){
      let todos=this.state.todoList.map((item,index)=>{
          return(
              <li key={index}>
                  <TodoItem todo={item}/>
              </li>
          )
      })
      console.log(todos)
      return (
          <div className="App">
             <h1>我的待办</h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}
                             onChage={this.changeTitle.bind(this)}
                             onSubmit={this.addTodo.bind(this)}/>
              </div>
                <ol>
                    {todos}
                </ol>
          </div>
      )
  }
  addTodo(){
      this.state.todoList.push({
          id:idMaker(),
          title:event.target.value,
          status:null,
          deleted:false
      })
      this.setState({
            newTodo:"",
            toloList:this.state.todoList
      })
  }
  changeTitle(){
      this.setState({
          newTodo:event.target.value,
          todoList:this.state.todoList

      })
  }


}
export default App;
let id=0;
function idMaker(){
    id+=1;
    return id;
}