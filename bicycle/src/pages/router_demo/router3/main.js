import React, { Component } from 'react'
import {Link } from 'react-router-dom';
export default class Main extends Component {
    render() {
        return (
            <div>
                this is main page .
                <br/>
                <Link to="/main/test-id">嵌套的路由111</Link>
                <br/>
                <Link to="/main/456">嵌套的路由222</Link>
                <hr/>
                {/* main有一个子路由 */}
                {this.props.children}
                </div>
        )
    }
}
