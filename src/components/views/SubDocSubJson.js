const _ = require('lodash');
const $ = require("jquery");

function subjsontohtml(config, data){

  let html = $('<div class="">');
  const header = $('<p></p>').html(`<strong>${ config.headerLabel || 'Details'}</strong>`);
  html.append(header);
  _.each(config.elements, function (e) {
    const container = $('<div class="row">');
    const label = $('<div class="col-sm-2">').html(`<strong>${e['label']}</strong>`);
    const value = $('<div class="col-sm-8">').html(`${data[e['key']]}`);
    container.append(label).append(value);
    html.append(container)
  });

  return html;
}

const SubDocSubJson = function (data) {
  try {
    const subjson = JSON.parse(data.value);
    const html = subjsontohtml(data.config, subjson);
    return html;
  } catch (e) {
    console.log("Error rendering json");
    console.log(e);
    const html = $(`<p>error rendering element:</p>`);
    html.append(`<p>${e}</p>)`);
    return html;
  }
}


module.exports = SubDocSubJson;
