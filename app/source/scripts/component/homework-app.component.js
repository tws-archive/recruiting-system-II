'use strict';

var React = require('react');
var HomeworkAction = require('../actions/homework-actions');

var HomeworkApp = React.createClass({

  componentDidMount: function () {
    HomeworkAction.changeOrderId(this.props.orderId);
  },
  render() {

    return this.props.children;
  }
});

module.exports = HomeworkApp;