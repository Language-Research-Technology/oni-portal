const $ = require("jquery");

const ViewErrorElement = function (error) {
  let message = 'Display Error';
  if (error['status']) {
    message = error['status'];
  }
  const dummy = $('<div>');

  const heading = $('<h3>').html('Error');
  const messageHtml = $('<p>').html(`${error['message']}`);
  const messageDetail = $('<p>').html(message);
  dummy.append(heading).append(messageDetail).append(messageHtml);
  return dummy.html();
};

module.exports = ViewErrorElement;
