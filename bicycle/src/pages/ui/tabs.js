import React, { Component } from 'react'
import { Card, message, Tabs, Icon } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class Tabss extends Component {
    //给新加的key一个默认值，在add中是自增的
    newTabIndex=0;

    callback = (key) => {
        message.info("Hi，您选择了页签" + key);
    }
    
    //动态添加删除标签
    componentWillMount(){

        //定义标签
        const panes = [

            {
                title:"tab1",
                content:"tab1",
                key:1
            },
            {
                title:"tab2",
                content:"tab2",
                key:2
            },
            {
                title:"tab3",
                content:"tab3",
                key:3
            },
            
        ]
        this.setState({
            //让当前点击的高亮
            activeKey:panes[0].key,
            panes
        })
    }

    //点击可切换卡片（可编辑那用）
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }

    //targetKey当前这个key
    onEdit=(targetKey,active)=>{
        this[active](targetKey)
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        //将添加的title动态化，0，1,2,3
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      }
    
      remove = (targetKey) => {
          //获取当前激活的这个key
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            //判断删除的给打开的是不是一个key
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
      }
    render() {
        return (
            <div>
                <Card title="Tabs标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tabs带图的标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 1</span>} key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 1</span>} key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tabs带图的标签页" className="card-wrap">
                {/* type="editable-card"可将样式设置为可编辑 */}
                    <Tabs 
                    onChange={this.onChange}
                    // 用动态来控制key
                    activeKey={this.state.activeKey}
                    //defaultActiveKey="1"
                     type="editable-card"
                     onEdit={this.onEdit}
                     >
                        {this.state.panes.map((panel)=>{
                            return <TabPane
                            tab={panel.title}
                            key={panel.key}
                            />
                        })}
                    </Tabs>
                </Card>
            </div>
        )
    }
}
