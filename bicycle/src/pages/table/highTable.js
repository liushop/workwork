import React, { Component } from 'react'
import { Card, Table, Modal, Button, message,Badge } from 'antd'
import axios from './../../axios/index'
import utils from '../../utils/utils';
//import axios from 'axios'
export default class HighTable extends Component {
    state = {
        dataSource: []
    }

    params = {
        page:1
    }

    componentDidMount(){
        this.request()
    }

    //自己封装后的axios
    request = () => {
        let _this = this;
        axios.ajax({
            url: "/table/high/list",
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        }).then((res) => {
            console.log(res);
            if (res.code == 1) {
                //添加key
                res.data.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    //更新数据
                    dataSource: res.data.list,
                })
            }
        })
    }

    goSort=(pagination,filters,sorter)=>{
        //console.log(sorter);
        //断点可以看出sorter是个object，order为升序降序的变量
        this.setState({
            sortOrder:sorter.order
        })
    }

    /*
    {
                title: "操作",
                render:(text,item)=>{
                    return <Button size="small" onClick={(item)=>{
                        this.goDel(item)
                    }}>删除</Button>
                }
            },
    */

    //操作按钮删除
    goDel=(item)=>{
        let id = item.id;
        Modal.confirm({
            title:"确认",
            content:"您确认要删除此条数据吗？",
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })

    }
    render() {
        //定义表头
        const columns = [
            {
                title: "id",
                //指定宽度
                width:80,
                dataIndex: "id"
            },
            {
                title: "用户名",
                width:80,
                dataIndex: "userName"
            },
            {
                title: "性别",
                width:80,
                dataIndex: "sex",
                render(sex) {
                    return sex == 1 ? "男" : "女"
                }
            },
            {
                title: "状态",
                width:80,
                dataIndex: "state",
                render(state) {
                    let config = {
                        "1": "react",
                        "2": "vue",
                        "3": "php",
                        "4": "electron",
                        "5": "echarts"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                width:80,
                dataIndex: "interest",
                //里面参数与return里面参数一样即可
                render(interest) {
                    let config = {
                        "1": "学习",
                        "2": "跑步",
                        "3": "爬山"
                    }
                    return config[interest]
                }
            },
            {
                title: "生日",
                width:80,
                dataIndex: "birthday",
            },
            {
                title: "地址",
                width:80,
                dataIndex: "address"
            },
            {
                title: "注册时间",
                width:80,
                dataIndex: "time"
            },
        ]

        //定义表头--水平滚动条使用
        const columns2 = [
            {
                title: "id",
                //指定宽度
                width:80,
                //此字段左侧固定
                fixed:"left",
                dataIndex: "id"
            },
            {
                title: "用户名",
                width:80,
                fixed:"left",
                dataIndex: "userName"
            },
            {
                title: "性别",
                width:80,
                dataIndex: "sex",
                render(sex) {
                    return sex == 1 ? "男" : "女"
                }
            },
            {
                title: "状态",
                width:80,
                dataIndex: "state",
                render(state) {
                    let config = {
                        "1": "react",
                        "2": "vue",
                        "3": "php",
                        "4": "electron",
                        "5": "echarts"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                width:80,
                dataIndex: "interest",
                //里面参数与return里面参数一样即可
                render(interest) {
                    let config = {
                        "1": "学习",
                        "2": "跑步",
                        "3": "爬山"
                    }
                    return config[interest]
                }
            },
            {
                title: "生日",
                width:80,
                dataIndex: "birthday",
            },
            {
                title: "地址",
                width:80,
                dataIndex: "address"
            },
            {
                title: "注册时间",
                width:80,
                dataIndex: "time"
            },
            {
                title: "生日",
                width:80,
                dataIndex: "birthday",
            },
            {
                title: "地址",
                width:80,
                dataIndex: "address"
            },
            {
                title: "注册时间",
                width:80,
                dataIndex: "time"
            },
            {
                title: "生日",
                width:80,
                dataIndex: "birthday",
            },
            {
                title: "地址",
                width:80,
                dataIndex: "address"
            },
            {
                title: "注册时间",
                width:80,
                dataIndex: "time"
            },
            {
                title: "生日",
                width:80,
                dataIndex: "birthday",
            },
            {
                title: "地址",
                width:80,
                dataIndex: "address"
            },
            {
                title: "注册时间",
                width:80,
                //固定到右侧
                fixed:"right",
                dataIndex: "time"
            },
        ]
        
        //排序表头
        const columns3 = [
            {
                title: "id",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
            },
            {
                title: "年龄",
                dataIndex: "age",
                sorter:(a,b)=>{
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
            },
            {
                title: "性别",
                dataIndex: "sex",
                render(sex) {
                    return sex == 1 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        "1": "react",
                        "2": "vue",
                        "3": "php",
                        "4": "electron",
                        "5": "echarts"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "interest",
                //里面参数与return里面参数一样即可
                render(interest) {
                    let config = {
                        "1": "学习",
                        "2": "跑步",
                        "3": "爬山"
                    }
                    return config[interest]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday",
            },
            {
                title: "地址",
                dataIndex: "address"
            },
            {
                title: "注册时间",
                dataIndex: "time"
            },
        ]
        
        //带操作按钮表头
        const columns4 = [
            {
                title: "id",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
            },
            {
                title: "年龄",
                dataIndex: "age",
            },
            {
                title: "性别",
                dataIndex: "sex",
                render(sex) {
                    return sex == 1 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        "1": "react",
                        "2": "vue",
                        "3": "php",
                        "4": "electron",
                        "5": "echarts"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "interest",
                //里面参数与return里面参数一样即可
                render(interest) {
                    let config = {
                        // "1": "学习",
                        // "2": "跑步",
                        // "3": "爬山"

                        //使用徽标
                        "1":<Badge status="success" text="成功"/>,
                        "2":<Badge status="error" text="报错"/>,
                        "3":<Badge status="default" text="正常"/>,
                        "4":<Badge status="processing" text="进行中"/>,
                        "5":<Badge status="warning" text="警告"/>,
                    }
                    return config[interest]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday",
            },
            {
                title: "地址",
                dataIndex: "address"
            },
            {
                title: "操作",
                render:(text,item)=>{
                    return <Button size="small" onClick={(item)=>{
                        this.goDel(item)
                    }}>删除</Button>
                }
            },
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        scroll={{y:199}}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                <Card title="左侧固定">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns2}
                        //宽度必须大于所有的宽度之和
                        scroll={{x:1369}}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                <Card title="表格排序">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        onChange={this.goSort}
                    />
                </Card>

                <Card title="操作按钮">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns4}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        )
    }
}
