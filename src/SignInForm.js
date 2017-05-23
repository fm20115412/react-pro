/**
 * Created by fm on 2017/5/23.
 */
import React, { Component } from 'react';
export default class SignInForm extends Component{
    render(){
        return (
            <form className="signIn" onSubmit={this.props.onSubmit}>
                <div className="row">
                    <label htmlFor="username">用户名</label>
                    <input type="text" id="username" value={this.props.formData.username}
                           onChange={this.props.onChange.bind(null,"username")}/>
                </div>
                <div className="row">
                    <label htmlFor="password">密码</label>
                    <input type="password" id="password" value={this.props.formData.password}
                           onChange={this.props.onChange.bind(null,"password")}/>
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                    <a href="#" onClick={this.props.onForgotPassword}>忘记密码</a>
                </div>
            </form>
        )
    }
}