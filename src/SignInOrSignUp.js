/**
 * Created by fm on 2017/5/23.
 */
import React, { Component } from 'react';
import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"
export default class SignInOrSignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:"signUp"
        }
    }
    switch(e){
        this.setState({
            selected:e.target.value
        })
    }
    render(){
        return (
            <div className="signInOrSignUp">
                <nav>
                    <input type="radio" value="signUp" id="signup"
                           checked={this.state.selected==="signUp"}
                           onChange={this.switch.bind(this)}/>
                    <label htmlFor="signup"> 注册</label>
                    <input type="radio" value="signIn" id="signin"
                           checked={this.state.selected==="signIn"}
                           onChange={this.switch.bind(this)}/>
                    <label htmlFor="signin">登录</label>
                </nav>
                <div className="panels">
                    {this.state.selected==="signUp"?
                        <SignUpForm formData={this.props.formData}
                                    onSubmit={this.props.onSignUp}
                                    onChange={this.props.onChange}/>
                        : null}
                    {this.state.selected==="signIn"?
                        <SignInForm formData={this.props.formData}
                                    onSubmit={this.props.onSignIn}
                                    onChange={this.props.onChange}
                                    onForgotPassword={this.props.onForgotPassword}
                        />
                        :null}
                </div>
            </div>
        )
    }
}