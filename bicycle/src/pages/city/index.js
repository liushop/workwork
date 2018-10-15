import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Pagination } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {

    state = {
        list: [],
        //开通城市弹窗是否显示
        isShowOpenCity: false

    }

    params = {
        page: 1
    }

    //开通城市
    goOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    //开通城市提交方法
    goSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        //调用接口
        axios.ajax({
            url:"/city/open",
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code == "1"){
                message.success(res.data);
                this.setState({
                    //关闭开通城市对话框
                    isShowOpenCity:false
                })
                //刷新现有列表
                this.requestList();
            }
        })
    }

    //默认请求接口数据
    requestList = () => {
        //将this指向本方法
        let _this = this;
        axios.ajax({
            url: "/open_city",
            data: {
                params: {
                    //默认页数为1
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.data.item_list.map((item, index) => {
                    //添加key
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
    componentDidMount() {
        this.requestList();
    }
    render() {
        //表头
        const columns = [
            {
                title: "城市ID",
                dataIndex: "id"
            }, {
                title: "城市名称",
                dataIndex: "name"
            }, {
                title: "用车模式",
                dataIndex: "mode",
                render(mode){
                    return mode==1?"停车点":"禁停区"
                }
            }, {
                title: "营运模式",
                dataIndex: "op_mode",
                render(op_mode){
                    return op_mode == 1 ?"自营":"加盟"
                }
            }, {
                title: "授权加盟商",
                dataIndex: "franchisee_name"
            }, {
                title: "城市管理员",
                dataIndex: "city_admins",
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: "城市开通时间",
                dataIndex: "open_time"
            }, {
                title: "操作时间",
                dataIndex: "update_time",
                render:Utils.formateDate
            }, {
                title: "操作人",
                dataIndex: "sys_user_name"
            },
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>

                <Card>
                    <Button type="primary" onClick={this.goOpenCity} style={{ marginTop: 10 }}>开通城市</Button>
                </Card>

                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                    />
                </div>

                {/* 点击开通按钮弹出start */}
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    //关闭
                    onCancel={
                        () => {
                            this.setState({
                                isShowOpenCity: false
                            })
                        }
                    }
                    //确定
                    onOk={this.goSubmit}
                >
                {/* 相当于平时开发中的ref属性，将cityForm保存到this当中 */}
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm=inst;}}/>
                </Modal>
                {/* 点击开通按钮弹出end */}
            </div>
        )
    }

}

//搜索信息表单
class FilterForm extends React.Component {
    render() {
        //getFieldDecorator是js对象，可以实现数据双向绑定
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator("city_id")(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">邯郸市</Option>
                                <Option value="2">北京市</Option>
                                <Option value="3">杭州市</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="用车模式">
                    {
                        getFieldDecorator("mode")(
                            <Select
                                style={{ width: 129 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="营运模式">
                    {
                        getFieldDecorator("op_mode")(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator("auth_status")(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{ margin: "0 20px" }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

//创建表单
FilterForm = Form.create({})(FilterForm);

//开通城市对话框
class OpenCityForm extends React.Component {
    render() {
        //使用栅格系统，将label和input写在一行
        const FormItemLayout = {
            labelCol: {
                span:5
            },
            wrapperCol: {
                span:19
            }
        }

        //得到所有form表单的值
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...FormItemLayout}>
                {
                    getFieldDecorator("city_id",{
                        initialValue:"1"
                    })(
                        <Select style={{width:100}}>
                        <Option value="0">全部</Option>
                        <Option value="1">邯郸市</Option>
                        <Option value="2">北京市</Option>
                    </Select>
                    )
                }
                    {/* <Select style={{width:100}}>
                        <Option value="0">全部</Option>
                        <Option value="1">邯郸市</Option>
                        <Option value="2">北京市</Option>
                    </Select> 
                    做双向数据绑定，需要换个方式写，下面也如此
                    */}
                </FormItem>

                <FormItem label="营运模式"{...FormItemLayout}>
                {
                    getFieldDecorator("op_mode",{
                        initialValue:"1"
                    })(
                    <Select style={{width:100}}>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                    )
                }
                </FormItem>

                <FormItem label="用车模式"{...FormItemLayout}>
                {
                    getFieldDecorator("use_mode",{
                        initialValue:"1"
                    })(
                    <Select style={{width:100}}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                    )
                }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm)