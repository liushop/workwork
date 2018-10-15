import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/main">Home1</Link>
                    </li>
                    <li>
                        <Link to="/about">About1</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics1</Link>
                    </li>
                </ul>
                <hr />
                {/* 将匹配的路由组件内容显示出来 */}
                {this.props.children}
            </div>
        )
    }
}
