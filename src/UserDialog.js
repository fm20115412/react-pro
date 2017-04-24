/**
 * Created by fm on 2017/4/24.
 */
import React,{Component} from "react";
import "./UserDialog.css"
export default class UserDialog extends Component{
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
        let signUpForm=(
            <form className="signUp">
                <div className="row">
                    <label>用户名</label>
                    <input type="text"/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="text"/>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm=(
            <form className="signIn">
                <div className="row">
                    <label>用户名</label>
                    <input type="text"/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="text"/>
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
                        <label>
                            <input type="radio" value="signUp" checked={this.state.selected==="signUp"}/>注册
                        </label>
                        <label>
                            <input type="radio" value="signIn" checked={this.state.selected==="signIn"}/>登陆
                        </label>
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