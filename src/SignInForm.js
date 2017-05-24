/**
 * Created by fm on 2017/5/23.
 */
import React from 'react';
export default function (props){
    return (
        <form className="signIn" onSubmit={props.onSubmit}>
            <div className="row">
                <label htmlFor="username">用户名</label>
                <input type="text" id="username" value={props.formData.username}
                       onChange={props.onChange.bind(null,"username")}/>
            </div>
            <div className="row">
                <label htmlFor="password">密码</label>
                <input type="password" id="password" value={props.formData.password}
                       onChange={props.onChange.bind(null,"password")}/>
            </div>
            <div className="row actions">
                <button type="submit">登录</button>
                <a href="#" onClick={props.onForgotPassword}>忘记密码</a>
            </div>
        </form>
    )
}