/**
 * Created by fm on 2017/4/24.
 */
import React,{Component} from "react";
import "./UserDialog.css"
import {signUp,signIn} from "./leanCloud"
import jsonParse from "./jsonTrans"
export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:"signUp",
            formData:{
                username:"",
                password:""
            }
        }
    }
    switch(e){
        this.setState({
            selected:e.target.value
        })
    }
    signUp(e){
        e.preventDefault();
        if (!this.state.formData.username || !this.state.formData.password) {
            alert('请输入用户名或密码')
            return
        }
        let {username,password}=this.state.formData
        let success=(user)=>{
            this.props.onSignUp.call(null,user);
        }
        let error=(error)=>{
            switch (error.code){
                case 101:alert('网络故障')
                         break
                case 202:alert("用户名已经被占用")
                         break
                case 502:alert('服务器维护中')
                         break
                default: alert(error)
                         break
            }
        }
        signUp(username,password,success,error)
    }
    signIn(e){
        e.preventDefault();
        if (!this.state.formData.username || !this.state.formData.password) {
            alert('请输入用户名或密码')
            return
        }
        let {username,password}=this.state.formData;
        let success=(user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error=(error)=>{
            switch (error.code){
                case 101:alert('网络故障')
                    break
                case 210:alert("用户名与密码不匹配")
                    break
                case 211:alert("找不到用户")
                    break
                case 502:alert('服务器维护中')
                    break
                default: alert(error)
                    break
            }
        }
        signIn(username,password,success,error);
    }
    changeFormData(key,e){
        let stateCopy=jsonParse(this.state)
        stateCopy.formData[key]=e.target.value
        this.setState(stateCopy)
    }
    render(){
        let signUpForm=(
            <form className="signUp" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label htmlFor="username">用户名</label>
                    <input type="text" id="username" value={this.state.formData.username} onChange={this.changeFormData.bind(this,"username")}/>
                </div>
                <div className="row">
                    <label htmlFor="password">密码</label>
                    <input type="password" id="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this,"password")}/>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm=(
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label htmlFor="username">用户名</label>
                    <input type="text" id="username" value={this.state.formData.username} onChange={this.changeFormData.bind(this,"username")}/>
                </div>
                <div className="row">
                    <label htmlFor="password">密码</label>
                    <input type="password" id="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this,"password")}/>
                </div>
                <div className="row actions">
                    <button type="submit">登陆</button>
                </div>
            </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav onChange={this.switch.bind(this)}>
                        <input type="radio" value="signUp" id="signup"
                               checked={this.state.selected==="signUp"}
                               onChange={this.switch.bind(this)}
                        />
                        <label htmlFor="signup"> 注册</label>
                        <input type="radio" value="signIn" id="signin"
                               checked={this.state.selected==="signIn"}
                               onChange={this.switch.bind(this)}/>
                        <label htmlFor="signin">登陆</label>
                    </nav>
                    <div className="panels">
                        {this.state.selected==="signUp"?signUpForm:null}
                        {this.state.selected==="signIn"?signInForm:null}
                    </div>
                </div>
            </div>

        )
    }
}