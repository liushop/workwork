import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
//这3个匹配下面3个路由
import Main from './main'
import About from './about'
import Topic from './topic'
import Info from './info'
import NoMatch from './nomatch'
//home是刚开始看到的即默认路由
import Home from './home'
export default class IRouter extends Component {
    render() {
        {/* Router可以嵌套标签组件 */ }
        return (
            < Router >
                <Home>
                    <Switch>
                        {/* 有了子路由就不这样写了 */}
                        {/* <Route exact path="/" component={Main} /> */}

                        {/* 这是main有子路由的写法 */}
                        <Route path="/main" render={() =>
                            <Main>
                                <Route path="/main/:value" component={Info} />
                            </Main>
                        }></Route>
                        <Route path="/about" component={About} />
                        <Route path="/topics" component={Topic} />
                        {/* 404，用了这个之后必须使用switch，否则每一个都会出现一个404 */}
                        <Route component={NoMatch} />
                    </Switch>
                </Home>
            </Router >

        )
    }
}
