/**
 * Created by fm on 2017/5/23.
 */
import React ,{Component} from 'react';
import classNames from "classnames"
export default class SignUpForm extends Component {
    handleFocus(){
        document.querySelector('#email').parentNode.classList.add('hello')
    }
    render(){
        return (
            <form className="signUp" onSubmit={this.props.onSubmit}>
                <div className="row">
                    <label htmlFor="email">邮箱</label>
                    <input type="email" id="email" value={this.props.formData.email}
                           onChange={this.props.onChange.bind(null,"email")}
                           onFocus={this.handleFocus.bind(this)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="username">用户名</label>
                    <input type="text" id="username" value={this.props.formData.username}
                           onChange={this.props.onChange.bind(null,"username")}
                    />
                    <span className="info">6-20个字符，包括字母、数字、下划线</span>
                </div>

                <div className="row">
                    <label htmlFor="password">密码</label>
                    <input type="password" id="password" value={this.props.formData.password}
                           onChange={this.props.onChange.bind(null,"password")}
                    />
                    <span className="info">6-20个字符，字母、数字、下划线至少两种</span>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
    }
}
