import React, { Component } from 'react'
import { Card, Button, Spin, Icon, Alert } from 'antd'
import './ui.less'
export default class Loadings extends Component {
    render() {
        const icon = <Icon type="loading" style={{ fontSize: 26 }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{ margin: "0 10px" }} />
                    <Spin size="large" />
                    {/* 用icon代替原来的spin */}
                    <Spin indicator={icon} style={{ marginLeft: 10 }} />
                </Card>

                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="欢迎来到初心-个人博客"
                        type="info" />

                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到初心-个人博客"
                            type="info" />
                    </Spin>

                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎来到初心-个人博客"
                            type="info" />
                    </Spin>

                    <Spin tip="加载中..." indicator={icon}>
                        <Alert
                            message="React"
                            description="欢迎来到初心-个人博客"
                            type="info" />
                    </Spin>
                </Card>
            </div>
        )
    }
}
