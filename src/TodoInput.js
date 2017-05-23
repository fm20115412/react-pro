/**
 * Created by fm on 2017/4/11.
 */
import React from "react"
import "./TodoInput.css"
function submit(props,e) {
    if (e.key==="Enter"){
        props.onSubmit(e);
    }
}
function changeTitle(props,e){
    props.onChange(e);
}
export default function (props) {
    return <input type="text" className="TodoInput"
          value={props.content}
          onChange={changeTitle.bind(null,props)}
          onKeyPress={submit.bind(null,props)}/>
}