/**
 * Created by fm on 2017/4/11.
 */
import React,{Component} from "react"
export default class TodoItem extends Component{
    render(){
        return <div>{this.props.todo.title}</div>
    }
}