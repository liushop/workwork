import React, { Component } from 'react'
import Child from './Child'
//import './style.less';
//已修改配置文件，所以不用引入
//import 'antd/dist/antd.css'
//使用button 必须结构出来
import {Button} from 'antd';
export default class Life extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    // state = {
    //     count:0
    // }与写在上面的等价
    add() {
        this.setState({
            count: this.state.count + 1
        })
    }
    add2 = () => {
        this.setState({
            count: this.state.count + 2
        })
    }
    render() {
        // let style = {
        //     padding: 50
        // }
        return (
            // <div style={style}>
            <div className="demo">
                <p>React生命周期介绍</p>
                <Button onClick={this.add.bind(this)}>antd点击+1</Button>
                <button onClick={this.add.bind(this)}>点击+1</button>
                <button onClick={this.add2}>点击+2</button>
                <p>{this.state.count}</p>
                <Child name={this.state.count}/>
            </div>
        )
    }
}
