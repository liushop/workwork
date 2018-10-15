import React, { Component } from 'react'

export default class Child extends Component {
    constructor(props){
        super(props);
        this.state={
            count:0
        }
    }
    componentWillMount(){
        console.log("componentWillMount")
    }
    componentDidMount(){
        console.log("componentDidMount")
    }
    componentWillReceiveProps(newProps){
        console.log("componentWillReceiveProps,父组件传过来的name"+newProps.name)
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        return true;
    }
    componentWillUpdate(){
        console.log("componentWillUpdate")
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    render() {
        return (
            <div>
                <p>这是子组件{this.props.name}</p>
            </div>
        )
    }
}
