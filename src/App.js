import React, { Component } from 'react';
import './App.css';
import "normalize.css"
import "./reset.css"
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import * as localStore from "./localStore"
import UserDialog from "./UserDialog"
import {getCurrentUser,signOut} from "./leanCloud"

class App extends Component {
  constructor(props){
      super(props)
      this.state={
          user:getCurrentUser()||{},
          newTodo:"",
          todoList:localStore.load("todoList")||[]
      }
  }
  render(){
      let todos=this.state.todoList
          .filter((item)=>!item.deleted)
          .map((item,index)=>{
          return (
              <li key={index}>
                  <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)}/>
              </li>
          )
      })
      console.log(todos);
      return (
          <div className="App">
             <h1>{this.state.user.username||"我"}的待办
                 {this.state.user.id? <button onClick={this.onSignOut.bind(this)}>登出</button>:null }
             </h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}
                             onChange={this.changeTitle.bind(this)}
                             onSubmit={this.addTodo.bind(this)}/>
              </div>
                <ol className="todoList">
                    {todos}
                </ol>
              {this.state.user.id ? null : <UserDialog
                      onSignUp={this.onSignUp.bind(this)}
                      onSignIn={this.onSignIn.bind(this)}
                  />}
          </div>
      )
  }
  onSignUp(user){
      let stateCopy=JSON.parse(JSON.stringify(this.state));
      stateCopy.user=user;
      this.setState(stateCopy)
  }
  onSignIn(user){
      let stateCopy=JSON.parse(JSON.stringify(this.state));
      stateCopy.user=user;
      this.setState(stateCopy);
  }
  onSignOut(){
      signOut();
      let stateCopy=JSON.parse(JSON.stringify(this.state));
      stateCopy.user={}
      this.setState(stateCopy)
  }
  componentDidUpdate(){
      localStore.save("todoList",this.state.todoList)
  }
  // TodoInput 按下回车执行这个函数
  addTodo(event){
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
  // TodoInput 值改变时执行这个函数
  changeTitle(event){
      this.setState({
          newTodo:event.target.value,
          todoList:this.state.todoList
      })
  }
  // TodoItme 完成状态更改时调用这个函数
  toggle(e,todo){
      todo.status=(todo.status==="completed"?"":"completed")
      this.setState(this.state);
  }
 // TodoItem 点击删除按钮时调用这个函数
   delete(e,todo){
      todo.deleted=true
       this.setState(this.state);
   }
}
export default App;
let id=0;
function idMaker(){
    id+=1;
    return id;
}