var Reflux = require('reflux');
var UserPuzzleActions = require('../actions/user-puzzle-actions');
var Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

var UserPuzzleStore = Reflux.createStore({
  listenables: [UserPuzzleActions],

  onGetRemainTime: function () {
    agent.get('/user-puzzle/remain-time')
      .set('Content-Type', 'application/json')
      .end()
      .then((res) => {
        this.trigger({
          'remainTime': res.body.remainTime
        });
      });
  },

  onSubmit: function () {
    this.trigger({
      showModal: true
    });
  }
});

module.exports = UserPuzzleStore;