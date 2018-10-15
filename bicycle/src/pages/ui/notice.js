import React, { Component } from 'react'
import { Card, Button, notification } from 'antd'
import './ui.less'
export default class Nitice extends Component {
    openNoticication=(type,direction)=>{

        //控制方向,官方文档有api
        if(direction){
            notification.config({
                placement:direction
            })
        }


        //一个按钮时候可以这样写
        // notification.success({
            notification[type]({
            message:"发工资了",
            description:"上个月全勤"
        });
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNoticication("success")}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNoticication("info")}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNoticication("warning")}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNoticication("error")}>Error</Button>
                </Card>

                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNoticication("success","topLeft")}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNoticication("info","topRight")}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNoticication("warning","bottomLeft")}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNoticication("error","bottomRight")}>Error</Button>
                </Card>
            </div>
        )
    }
}
