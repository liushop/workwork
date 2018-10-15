import React, { Component } from 'react'
import MenuConfig from './../../config/menuConfig'
import './index.less'
//使用redux,让组件和redux连起来
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action'
import {NavLink} from 'react-router-dom'
//引入菜单相关
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
export default class Navleft extends Component {

    //当前所在菜单高亮
    state={
        currentKey:''
    }
    //渲染菜单
    componentWillMount() {
        //刷新页面时获取hash,正则为#开始和?后面所有值为空
    let currentKey = window.location.hash.replace(/#|\?.*/g,'');
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            currentKey,
            menuTreeNode
        })
    }
    //使用递归,菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    //这里是一级菜单
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }

    //菜单点击事件
    goClick=({item})=>{
        //单击事件对象
        //console.log(item);
        //最下面用了connect，才能props
        const {dispatch} = this.props;
        //取菜单组件中的title，返回对象，type和name
        dispatch(switchMenu(item.props.title))
        //点击之后让当前所在页面导航高亮，把key存下
        this.setState({
            currentKey:item.key
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>CHAO99.TOP</h1>
                </div>
                <Menu theme="dark"
                //onClick={this.goClick}
                //当前所在页面导航高亮
                selectedKeys = {[this.state.currentKey]}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

//已经受redux管理了
//export default connect()(Navleft);
