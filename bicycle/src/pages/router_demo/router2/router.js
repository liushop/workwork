import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
//这3个匹配下面3个路由
import Main from './main'
import About from './about'
import Topic from './topic'
//home是刚开始看到的即默认路由
import Home from './home'
export default class IRouter extends Component {
    render() {
        {/* Router可以嵌套标签组件 */ }
        return (
            < Router >
                <Home>
                    {/* 有了子路由就不这样写了 */}
                    {/* <Route exact path="/" component={Main} /> */}

                    {/* 这是main有子路由的写法 */}
                    {/* render的作用是当到main时候再加载子页面 */}
                    {/* =>不带{}只是返回个组件 */}
                    {/* main这不能写绝对匹配 */}
                    <Route path="/main" render={()=>
                        <Main>
                            <Route path="/main/a" component={About} />
                        </Main>
                    }></Route>
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topic} />
                </Home>
            </Router >

        )
    }
}
