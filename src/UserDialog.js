/**
 * Created by fm on 2017/4/24.
 */
import React,{Component} from "react";
import "./UserDialog.css"
import {signUp,signIn,sendPasswordResetEmail} from "./leanCloud"
import jsonParse from "./jsonTrans"
import SignInOrSignUp from "./SignInOrSignUp"
import ForgotPasswordForm from "./ForgotPasswordForm"
export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            seletedtab:"signInOrSignUp",    //"forgotPassword"
            formData:{
                email:"",
                username:"",
                password:""
            }
        }
    }
    isValidUsername(str) {
        return /^\w{3,20}$/.test(str);
    }
    isLegalPassword(str){
        if(str.length < 3|| str.length > 16){
            return false;
        }
        if(/[^A-Za-z_0-9]/.test(str)){
            return false;
        }
        if( /(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str) ){
            return false;
        }
        return true;
    }
    isValidEmail(str){
        return /\w+@\w+\.[A-Za-z]{2,5}/.test(str)
    }
    signUp(e){

        e.preventDefault();
        if (!this.state.formData.username || !this.state.formData.password) {
            alert('请输入用户名或密码')
            return
        }
        let {email,username,password}=this.state.formData
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
        if(!this.isValidEmail(email)){
            alert("请输入合法的邮箱")
            return
        }
        if(!this.isValidUsername(username)){
            alert("请输入合法的用户名")
            return
        }
        if(!this.isLegalPassword(password)){
            alert("请输入合法的密码")
            return
        }
        signUp(email,username,password,success,error)
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
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.seletedtab==="signInOrSignUp"?
                        <SignInOrSignUp formData={this.state.formData}
                            onSignIn={this.signIn.bind(this)}
                            onSignUp={this.signUp.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                        />
                        :
                        <ForgotPasswordForm formData={this.state.formData}
                                onSubmit={this.resetPassword.bind(this)}
                                onChange={this.changeFormData.bind(this)}
                                onSignIn={this.returnToSignIn.bind(this)}
                        />}
                </div>
            </div>

        )
    }
    showForgotPassword(){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.seletedtab="forgotPassword"
        this.setState(stateCopy)
    }
    returnToSignIn(){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.seletedtab="signInOrSignUp"
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
}