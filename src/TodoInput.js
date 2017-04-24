/**
 * Created by fm on 2017/4/11.
 */
import React,{Component} from "react"
import "./TodoInput.css"
export default class TodoInput extends Component{
    render(){
        return <input type="text" className="TodoInput"
                      value={this.props.content}
                      onChange={this.changeTitle.bind(this)}
                      onKeyPress={this.submit.bind(this)}/>
    }
    // 调用父元素的函数
    submit(e){
        if (e.key==="Enter"){
            this.props.onSubmit(e);
        }
    }
    // 调用父元素的函数
    changeTitle(e){
        this.props.onChange(e);
    }
}