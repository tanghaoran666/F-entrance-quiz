import React, { Component } from 'react';

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  async componentDidMount() {
    try {
      // TODO GTB-工程实践: - API请求相关的代码应该抽取到一个独立的文件里面去
      const data = await fetch('http://localhost:8080/groups', {
        method: 'GET',
      });
      const result = await data.json();
      this.setState({
        groups: result,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getGroups() {
    try {
      // TODO GTB-工程实践: - API请求相关的代码应该抽取到一个独立的文件里面去
      const data = await fetch('http://localhost:8080/groups', {
        method: 'POST',
      });
      const result = await data.json();
      console.log(result);
      this.setState({
        groups: result,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div className="group-title">
          <h2>分组列表</h2>
          <button className="group-btn" type="button" onClick={this.getGroups.bind(this)}>
            分组学员
          </button>
        </div>
        <div>
          {/* // TODO GTB-知识点: - 组件抽象层次不够，这里应该再抽取出一层Group组件 */}
          {this.state.groups.map(function (item, index) {
            return (
              <div key={index}>
                {/* // TODO GTB-工程实践: - css class的命名格式不规范，正确的格式为a-b这种 */}
                <div className="groupTitle">{index + 1} 组</div>
                <div className="group-students">
                  {/* // TODO GTB-知识点: - 推荐使用ES6的箭头函数 */}
                  {/* // TODO GTB-工程实践: - map里面套map, 其实这个就已经在提示你应该再抽一层组件出来 */}
                  {/* // TODO GTB-工程实践: - item1 这种变量命名不合理，没有体现业务逻辑，不利于阅读和维护 */}
                  {item.students.map(function (item1) {
                    return (
                      <div className="student" key={item1.id}>
                        {item1.id}. {item1.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default GroupList;
