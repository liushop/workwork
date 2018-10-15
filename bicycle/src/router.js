import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loading';
import Notice from './pages/ui/notice';
import NoMatch from './pages/nomatch'
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import User from './pages/user';
import bikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                {/* 加载根组件 */}
                <App>
                    {/* 定义路由 */}
                    <Route path="/login" component={Login} />
                    {/* 为什么访问每个页面都有admin，就是因为这里 */}

                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousel} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/register" component={FormRegister} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City} />
                                <Route path="/admin/order" component={Order} />
                                <Route path="/admin/user" component={User} />
                                <Route path="/admin/bikeMap" component={bikeMap} />
                                <Route path="/admin/echarts/bar" component={Bar} />
                                <Route path="/admin/echarts/pie" component={Pie} />
                                <Route path="/admin/echarts/line" component={Line} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />


                </App>
            </HashRouter>
        )
    }
}
