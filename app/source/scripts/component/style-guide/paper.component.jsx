'use strict';

var Paper = React.createClass({
  getInitialState(){
    return {
      isMarked: false,
      isPublished: false,
      sectionNumber: 10,
      publishedNumber:1
    }
  },
  render: function() {
    return (
        <div className="paper-button col-xs-12">
          <h3 className="col-xs-9">
            name
          </h3>
          <div className="col-xs-3">
            <i className={"fa fa-2x" + (this.state.isMarkd ? ' fa-star' : ' fa-star-o')}></i>
          </div>
          <div className="col-md-9 col-sm-5 ">
            <div className={this.state.isPublished ? 'hide' : ''}>未发布：
              <a href="#">点击发布</a>
            </div>
            <div className={this.state.isPublished ? '' : ' hide'}>已发布
            </div>
            <div>章节个数：{this.state.sectionNumber}</div>
            <div>已发布个数：{this.state.publishedNumber}</div>
          </div>
          <div className="button-buttom">
            <a href="#" className="text-warning"><b>编辑</b></a>
            <a href="#" className="text-info"><b>导出成绩</b></a>
            <a href="#" className="text-success"><b>开始答题</b></a>
          </div>
        </div>
    )
  }
});

module.exports = Paper;
