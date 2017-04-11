/**
 * Created by fm on 2017/4/11.
 */
import React from "react"
class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state={
            date:new Date(),
            test:"1"
        }
    }
    componentWillMount(){
        setInterval(()=>{
            this.setState({
                date: new Date(), // 更新 date
                test: 'setInterval'
            })
        })
    }
    render(){
        return (
            <div>
                <h1>hello {this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
            </div>
        )
    }
}
export default Welcome