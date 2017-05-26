import React, { Component } from 'react';
import './App.css';
import "normalize.css"
import "./reset.css"
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import UserDialog from "./UserDialog"
import jsonParse from "./jsonTrans"

import AV,{getCurrentUser,signOut} from "./leanCloud"
class App extends Component {
  constructor(props){
      super(props)
      this.state={
          user:this.isLogin()||{},
          newTodo:"",
          todoList:[]
      }
  }
  render(){
      let todos=this.state.todoList
          .filter((item)=>!item.deleted)
          .map((item,index)=>{
          return (
              <li key={index}>
                  <TodoItem todo={item}
                            onToggle={this.toggle.bind(this)}
                            onDelete={this.delete.bind(this)}/>
              </li>
          )
      })
      if(this.state.user.id){
          return (
              <div className="App">
                  <h1>{this.state.user.username||"我"}的待办</h1>
                  <div className="inputWrapper">
                      <TodoInput content={this.state.newTodo}
                                 onChange={this.changeTitle.bind(this)}
                                 onSubmit={this.addTodo.bind(this)}/>
                  </div>
                  <ol className="todoList">
                      {todos}
                  </ol>
                  <div className="switchButton">
                      <span>所有任务</span>
                      <span>正在进行</span>
                      <span>已完成</span>
                  </div>
                  {this.state.user.id? <button className="loginOut"
                       onClick={this.onSignOut.bind(this)}>登出</button>:null }
              </div>
          )
      }else{
          return(
              <UserDialog
                  onSignUp={this.onSignUp.bind(this)}
                  onSignIn={this.onSignIn.bind(this)}
              />
          )
      }
  }
  isLogin(){
    if(getCurrentUser()){
        this.loadTodo();
        return getCurrentUser();
    }else{
        return {}
    }
}
  onSignUp(user){
    let stateCopy=jsonParse(this.state);
    stateCopy.user=user;
    this.setState(stateCopy)
    }
  onSignIn(user){
    let stateCopy=jsonParse(this.state);
    stateCopy.user=user;
    this.setState(stateCopy)
    this.loadTodo();
  }
  onSignOut(){
   signOut();
   let stateCopy=jsonParse(this.state);
   stateCopy.user={}
   stateCopy.todoList=[]
   this.setState(stateCopy)
}
loadTodo(){
    let currentUser=getCurrentUser();
    if(currentUser){
        var query=new AV.Query("TodoList")
        query.find().then((todos) =>{
                let todo=todos[0]
                let stateCopy=jsonParse(this.state)
                stateCopy.todoList=JSON.parse(todo.get("content"))
                stateCopy.todoList.id=todo.id
                this.setState(stateCopy)
                console.log(todo.get("content"))
            },function (error) {
                console.log(error)
            }
        )
    }
}
updateTodo(){
    let dataString = JSON.stringify(this.state.todoList)
    let todoList=AV.Object.createWithoutData("TodoList",this.state.todoList.id)
    todoList.set("content",dataString)
    todoList.save().then(()=>{
        console.log("更新成功")
    })
}
saveTodo(){
    let dataString = JSON.stringify(this.state.todoList)
    var TodoList = AV.Object.extend('TodoList');
    var todoList = new TodoList();
    var acl = new AV.ACL()
    acl.setReadAccess(AV.User.current(),true) // 只有这个 user 能读
    acl.setWriteAccess(AV.User.current(),true) // 只有这个 user 能写
    todoList.set('content', dataString);
    todoList.setACL(acl) // 设置访问控制
    todoList.save().then((todo)=> {
        let stateCopy=jsonParse(this.state);
        stateCopy.todoList.id=todo.id
        this.setState(stateCopy)
    }, function (error) {
        alert('保存失败');
    });
}
saveOrUpdateTodo(){
    console.log("id:",this.state.todoList.id)
    if(this.state.todoList.id){
        console.log("update");
        this.updateTodo();
    }else{
        console.log("save");
        this.saveTodo();
    }
}
addTodo(event){
  this.state.todoList.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false,
  })
  this.setState({
        newTodo:"",
        toloList:this.state.todoList
  })
  this.saveOrUpdateTodo()
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
      todo.status=(todo.status==="completed")?"":"completed"
      this.saveOrUpdateTodo()
      this.setState(this.state)
  }
 // TodoItem 点击删除按钮时调用这个函数
   delete(e,todo){
       let index = this.state.todoList.indexOf(todo)
       let stateCopy=this.state
       stateCopy.todoList.splice(index,1)
       this.setState(stateCopy)
       this.saveOrUpdateTodo()
       // this.get()
   }

}
export default App;
let id=0;
function idMaker(){
    id+=1;
    return id;
}