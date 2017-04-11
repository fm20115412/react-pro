/**
 * Created by fm on 2017/4/11.
 */
import React,{Component} from "react"

export default class TodoInput extends Component{
    render(){
        return <input type="text" value={this.props.content}/>
    }
}