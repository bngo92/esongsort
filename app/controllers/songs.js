import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['elo:desc'],
  sortedSongs: Ember.computed.sort('model', 'sortProps'),
  count: function() {
    this.randomize();
    return 1;
  }.property('model.[]'),
  actions: {
    update(win, lose) {
      let win_start = win.get('elo')
      let lose_start = lose.get('elo')
      let expected_win = 1 / ( 1 + Math.pow(10, (lose_start - win_start) / 400))
      let expected_lose = 1 / ( 1 + Math.pow(10, (win_start - lose_start) / 400))
      let win_diff = 32 * (1 - expected_win);
      let win_end = win_start + win_diff;
      console.log(`winner went up ${win_diff} from ${win_start} to ${win_end}`);
      win.set('elo', win_end);
      let lose_diff = 32 * -expected_lose;
      let lose_end = lose_start + lose_diff;
      console.log(`loser went down ${lose_diff} from ${lose_start} to ${lose_end}`);
      lose.set('elo', lose_end);
      this.randomize();
      this.set('count', this.get('count') + 1);
    }
  },
  randomize: function() {
    let length = this.get('model').get('length')
    let leftIndex = Math.floor(Math.random() * length);
    this.set('left', this.get('model').objectAt(leftIndex));
    let rightIndex = Math.floor(Math.random() * (length - 1));
    if (rightIndex >= leftIndex) rightIndex++;
    this.set('right', this.get('model').objectAt(rightIndex));
  }

});
