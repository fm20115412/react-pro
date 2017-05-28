/**
 * Created by fm on 2017/5/23.
 */
import React, { Component } from 'react';
export default class ForgotPasswordForm extends Component{
    render(){
        return(
            <div className="forgotPassword">
                <p>重置密码</p>
                <form onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <input required type="text" id="email"
                               value={this.props.formData.email}
                               onChange={this.props.onChange.bind(null,"email")}/>
                        <span className="bar"></span>
                        <label htmlFor="email">邮箱</label>
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.props.onSignIn}>返回登录</a>
                    </div>
                </form>
            </div>
        )
    }
}
