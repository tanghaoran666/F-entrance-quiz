import React, { Component } from 'react';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      visible: false,
      name: '',
    };
  }

  componentDidMount = () => {
    this.initFunction();
  };

  // TODO GTB-工程实践: - 方法的命名没有体现业务逻辑
  initFunction = async () => {
    try {
      const data = await fetch('http://localhost:8080/students', {
        method: 'GET',
      });
      const result = await data.json();
      this.setState({
        students: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
// TODO GTB-工程实践: - 方法命名没有体现业务逻辑。

  handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      await this.addStudent();
      this.setState({
        visible: false,
        name: '',
      });
      this.initFunction();
    }
  };

  handleClick = () => {
    this.setState({ visible: true });
  };

  // TODO GTB-工程实践: - API请求应该被提取到公共组件
  addStudent = async () => {
    try {
      await fetch('http://localhost:8080/student', {
        method: 'POST',
        body: this.state.name,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.initFunction();
    } catch (err) {
      // TODO GTB-工程实践: - console.log不应该被提交
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <h2>学员列表</h2>
        <div className="students">
          {this.state.students.map((item) => (
            <div className="student" key={item.id}>
              {item.id}. {item.name}
            </div>
          ))}
          <button className="student-btn" type="button" onClick={this.handleClick}>
            +添加学员
          </button>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="请填写名字后按下回车"
            className="student-input"
            // TODO GTB-知识点: - 使用onKeyUp更合适
            onKeyDown={this.handleKeyDown}
            // TODO GTB-完成度: - 需求是要添加学员的按钮和这个input是互斥的shown和hidden,而不是input自己shown和hidden哈
            hidden={!this.state.visible}
          />
        </div>
      </div>
    );
  }
}
export default StudentList;
