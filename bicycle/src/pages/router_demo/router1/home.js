import React, { Component } from 'react'
import { HashRouter , Route , Link,Switch } from 'react-router-dom';
import Main from './main'
import About from './about'
import Topic from './topic'
export default class Home extends Component {
    render() {
        return (
            //之前使用router标签，然后使用  history属性来指定hasrouter
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    <hr/>
                    {/* exact精确匹配 */}
                    {/* switch只允许匹配第一个，如果不加精确的话，只匹配/ */}
                    {/* <Switch> */}
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                    {/* </Switch> */}
                </div>
            </HashRouter>
        )
    }
}
