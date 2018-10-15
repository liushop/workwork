import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from './components/header'
import Footer from './components/footer'
import Navleft from './components/navleft'
import './style/common.less'
import Home from './pages/home'
export default class Admin extends Component {
    render() {
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <Navleft />
                </Col>
                <Col span="20" className="main">
                    <Header />
                    <Row className="content">
                        {/* <Home /> */}
                        {/* 用来嵌套子组件 */}
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}
