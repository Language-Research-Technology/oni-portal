const $ = require("jquery");
const ViewErrorElement = require('./ViewErrorElement');

const ViewError = function (state) {
  const dummy = $('<div>');
  const col = $('<div class="col">');
  const summary = $('<div class="jumbotron">');
  col.append(summary.append(ViewErrorElement(state.error)));
  dummy.append(col);
  return dummy.html();
};

module.exports = ViewError;
