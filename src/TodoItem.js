/**
 * Created by fm on 2017/4/11.
 */
import React,{Component} from "react"
import "./TodoItem.css"
export default class TodoItem extends Component{
    render(){
        return (
            <div className="TodoItem">
                <input type="checkbox"  className="checkbox1" checked={this.props.todo.status==="completed"}
                       onChange={this.toggle.bind(this)} />
                <span contentEditable="true" spellCheck="false" disableContentEditableWarning className="title">{this.props.todo.title}</span>
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    toggle(){
        // this.props.onToggle(e,this.props.todo)
        this.props.onToggle(this.props.todo)
    }
    delete(){
        this.props.onDelete(this.props.todo)
    }
}