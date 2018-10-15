import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from './../../axios/index'
import utils from '../../utils/utils';
//import axios from 'axios'
export default class BasicTable extends Component {
    state = {
        dataSource: "",
        dataSource2: [],
    }

    //设置默认页码
    params = {
        page:1
    }
    componentDidMount() {
        //数据源
        const dataSource = [
            {
                id: "1",
                userName: "Tom",
                sex: "18",
                state: "1",
                interest: "1",
                birthday: "1999-09-09",
                address: "河北省邯郸市",
                time: "08:08"
            },
            {
                id: "2",
                userName: "Tom",
                sex: "18",
                state: "1",
                interest: "1",
                birthday: "1999-09-09",
                address: "河北省邯郸市",
                time: "08:08"
            },
            {
                id: "3",
                userName: "Tom",
                sex: "18",
                state: "1",
                interest: "1",
                birthday: "1999-09-09",
                address: "河北省邯郸市",
                time: "08:08"
            }
        ]
        //给手动添加的表格添加key
        dataSource.map((item, index) => {
            item.key = index
        })
        this.setState({
            dataSource
        })
        //调用request方法
        this.request();
    }

    //动态获取mock数据
    /*//这是源生的axios 
    request=()=>{
        let baseUrl = 'https://www.easy-mock.com/mock/5b9f3f5d1f157370f7e0a38c/bicycleapi';
        params{}//post用这个
        axios.get(baseUrl+'/table/list').then((res)=>{
            //console.log(JSON.stringify(res));
            if(res.status == "200" && res.data.code == 1){
                this.setState({
                    dataSource2:res.data.data
                })
            }
        })
    }
    */

    //自己封装后的axios
    request = () => {
        let _this = this;
        axios.ajax({
            url: "/table/list",
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
                    dataSource2: res.data.list,
                    //删除成功后，清空chekbox状态
                    selectedRowKeys:[],
                    selectedRows:null,
                    //分页操作
                    pagination:utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        //调用request
                        this.request();
                    })
                })
            }
        })
    }

    //单选处理
    //用户点击的位置（哪一行）(当前这一行数据，当前索引)
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: "信息",
            content: `用户名：${record.userName},爱好：${record.interest}`
        })
        this.setState({
            //点击的key
            selectedRowKeys: selectKey,
            //点击的行
            selectItem: record

        })

    }

    //多选的删除按钮
    goDel = (() => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id)
        })
        Modal.confirm({
            title: "删除提示",
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                //刷新页面
                this.request();
            }
        })
    })

    render() {
        //如果这个写外边的话，里面引用时需要this.state
        //定义表头
        const columns = [
            {
                title: "id",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
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
        const { selectedRowKeys } = this.state;

        //单选
        const rowSelection = {
            type: "radio",
            // 指定选中项的 key 数组，需要和 onChange 进行配合,table的api
            selectedRowKeys
        }

        //多选
        const rowCheckSelection = {
            type: "checkbox",
            // 指定选中项的 key 数组，需要和 onChange 进行配合,table的api
            selectedRowKeys,
            //（key，当前选择的哪一行）
            onChange: (selectedRowKeys, selectedRows) => {
                let ids = [];
                selectedRows.map((item) => {
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                    // 存id,操作时候用
                    selectedIds: ids
                })
            }
        }

        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                <Card title="动态数据渲染表格-Mock" style={{ margin: "10px 0" }}>
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>

                <Card title="Mock-单选" style={{ margin: "10px 0" }}>
                    <Table
                        //边框
                        bordered
                        //单选
                        rowSelection={rowSelection}
                        //用户点击的哪一行
                        onRow={(record, index) => {
                            return {
                                //为了逻辑清晰，将封装成方法
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                                // //点击行
                                // onClick:()=>{

                                // },
                                // //鼠标移入行
                                // onMouseEnter:()=>{

                                // }

                            }
                        }
                        }
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>

                <Card title="Mock-多选" style={{ margin: "10px 0" }}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.goDel}>删除</Button>
                    </div>
                    <Table
                        //边框
                        bordered
                        //多选
                        rowSelection={rowCheckSelection}
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>

                <Card title="Mock-表格分页" style={{ margin: "10px 0" }}>
                    <Table
                        //边框
                        bordered
                        pagination={this.state.pagination}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        )
    }
}
