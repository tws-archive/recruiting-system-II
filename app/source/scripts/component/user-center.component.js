var React = global.React = require('react');
var ReactDom = require('react-dom');
var Input = require('react-bootstrap/lib/Input');
var UserDetailActions = require('../actions/user-detail-actions');
var UserDetailStore = require('../store/user-detail-store');
var Reflux = require('reflux');
var validate = require("validate.js");
var constraint = require('../../../mixin/user-detail-constraint');

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return ""
}

var UserDetail = React.createClass({
  mixins: [Reflux.connect(UserDetailStore)],

  getInitialState: function () {
    return {
      school: '',
      name: '',
      mobilePhone: '',
      email: '',
      gender: '',
      major: '',
      degree: '',
      schoolError: '',
      nameError: '',
      majorError: '',
      genderError: false,
      degreeError: false
    }
  },

  componentDidMount: function () {
    UserDetailActions.loadUserDetail();
  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;

    this.setState({[stateName]: newState});
  },

  genderChange: function (evt) {
    var newState = '';
    var choose = evt.target.name;

    if (choose === '男') {
      newState = '男';
    } else {
      newState = '女';
    }
    this.setState({gender: newState});
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    var valObj = {};

    valObj[name] = value;

    var result = validate(valObj, constraint);
    var error = getError(result, name);
    var stateObj = {};

    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  genderValidate: function (evt) {
    if (this.state.genderError === true) {
      this.setState({genderError: false})
    }
  },

  degreeValidate:function (evt) {
    if(this.state.degree !== '') {
      this.setState({degreeError: false})
    }else {
      this.setState({degreeError: true})
    }
  },

  checkInfo: function () {
    var school = ReactDom.findDOMNode(this.refs.school);
    var name = ReactDom.findDOMNode(this.refs.name);
    var major = ReactDom.findDOMNode(this.refs.major);
    var userInfo = [];

    userInfo.push(school, name, major);
    var pass = false;
    var stateObj = {};

    userInfo.forEach((item) => {
      var valObj = {};
      var value = item.value;
      var name = item.name;

      valObj[name] = value;
      var result = validate(valObj, constraint);
      var error = getError(result, name);

      if (error !== '') {
        pass = true;
      }
      stateObj[name + 'Error'] = error;
      this.setState(stateObj);
    });
    return pass;
  },

  update: function (evt) {
    evt.preventDefault();

    if (this.state.gender === '') {
      this.setState({genderError: true})
    } else {
      this.setState({genderError: false});
    }

    if (this.state.degree === '') {
      this.setState({degreeError: true})
    } else {
      this.setState({degreeError: false});
    }

    var userData = {
      school: this.state.school,
      name: this.state.name,
      mobilePhone: this.state.mobilePhone,
      email: this.state.email,
      gender: this.state.gender,
      major: this.state.major,
      degree: this.state.degree
    };

    if (this.state.schoolError !== '' || this.state.nameError !== '' || this.state.majorError !== '') {
      return;
    } else if (this.checkInfo()) {
      return;
    }
    UserDetailActions.updateUserDetail(userData);
  },

  render: function () {
    return (
        <div id="account-info">
          <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">学校</label>
          <div className={"form-group has-" + (this.state.schoolError === '' ? '' : 'error')}>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputSuccess1" aria-describedby="helpBlock2"
                     placeholder="学校"
                     onChange={this.handleChange} ref="school" name="school" value={this.state.school}
                     onBlur={this.validate}/>
            </div>
            <div className={"error alert alert-danger" + (this.state.schoolError === '' ? ' hide' : '')} role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              {this.state.schoolError}
            </div>
          </div>

          <label htmlFor="inputName" className="col-sm-4 col-md-4 control-label">姓名</label>
          <div className={"form-group has-" + (this.state.nameError === '' ? '' : 'error')}>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputSuccess1" aria-describedby="helpBlock2"
                     placeholder="姓名"
                     onChange={this.handleChange} name="name" ref="name" value={this.state.name}
                     onBlur={this.validate}/>
            </div>
            <div className={"error alert alert-danger" + (this.state.nameError === '' ? ' hide' : '')} role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              {this.state.nameError}
            </div>
          </div>

          <label htmlFor="inputMobilePhone" className="col-sm-4 col-md-4 control-label">手机</label>
          <div className="form-group">
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputMobilePhone" placeholder="手机"
                     disabled="disabled" value={this.state.mobilePhone}/>
            </div>
          </div>

          <label htmlFor="inputEmail" className="col-sm-4 col-md-4 control-label">邮箱</label>
          <div className="form-group">
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputEmail" placeholder="邮箱" disabled="disabled"
                     value={this.state.email}/>
            </div>
          </div>

          <label htmlFor="inputGender" className="col-sm-4 col-md-4 control-label">性别</label>
          <div className="form-group">
            <div className="col-sm-4 col-md-4" onClick={this.genderValidate}>
              <input type="radio" name="男" className="gender" onChange={this.genderChange}
                     checked={this.state.gender === "男" ? "checked" : ""}/>男
              <input type="radio" name="女" className="gender" onChange={this.genderChange}
                     checked={this.state.gender === "女" ? "checked" : ""}/>女
            </div>
            <div className={"error alert alert-danger" + (this.state.genderError === true ? '' : ' hide')} role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              请选择性别
            </div>
          </div>

          <label htmlFor="inputMajor" className="col-sm-4 col-md-4 control-label">专业</label>
          <div className={"form-group has-" + (this.state.majorError === '' ? '' : 'error')}>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputSuccess1" aria-describedby="helpBlock2"
                     placeholder="专业"
                     onChange={this.handleChange} name="major" ref="major" value={this.state.major}
                     onBlur={this.validate}/>
            </div>
            <div className={"error alert alert-danger" + (this.state.majorError === '' ? ' hide' : '')} role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              {this.state.majorError}
            </div>

          </div>

          <label htmlFor="inputDegree" className="col-sm-4 col-md-4 control-label">学历学位</label>
          <div className="form-group">
            <div className="col-sm-4 col-md-4 degree" onBlur={this.degreeValidate}>
              <Input type="select" placeholder="学历学位" name="degree" value={this.state.degree}
                     onChange={this.handleChange}>
                <option value="">请选择</option>
                <option value="专科" >专科及以下</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </Input>
            </div>
            <div className={"error alert alert-danger" + (this.state.degreeError === true ? '' : ' hide')} role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              请选择学历
            </div>

          </div>

          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4">
              <button type="submit" className="btn btn-default" onClick={this.update}>保存</button>
            </div>
          </div>
        </div>
    )

  }
});

module.exports = UserDetail;