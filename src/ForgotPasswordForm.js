/**
 * Created by fm on 2017/5/23.
 */
import React, { Component } from 'react';
export default class ForgotPasswordForm extends Component{
    render(){
        return(
            <div className="forgotPassword">
                <p>重置密码</p>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <label htmlFor="email">邮箱</label>
                        <input type="email" id="email"
                               value={this.props.formData.email}
                               onChange={this.props.onChange.bind(null,"email")}/>
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
