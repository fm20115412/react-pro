/**
 * Created by fm on 2017/5/23.
 */
import React from 'react';
export default function(props) {
    return (
        <form className="signUp" onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                <label htmlFor="email">邮箱</label>
                <input type="email" id="email" value={props.formData.email}
                       onChange={props.onChange.bind(null,"email")}/>
            </div>
            <div className="row">
                <label htmlFor="username">用户名</label>
                <input type="text" id="username" value={props.formData.username}
                       onChange={props.onChange.bind(null,"username")}/>
                <span className="info">6-20个字符，包括字母、数字、下划线</span>
            </div>

            <div className="row">
                <label htmlFor="password">密码</label>
                <input type="password" id="password" value={props.formData.password}
                       onChange={props.onChange.bind(null,"password")}
                />
                <span className="info">6-20个字符，字母、数字、下划线至少两种</span>
            </div>
            <div className="row actions">
                <button type="submit">注册</button>
            </div>
        </form>
    )
}
