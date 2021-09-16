const $ = require("jquery");
const isIterable = require('../isIterable');

const SubDocFileViewer = function (data) {
  try {
    const headerDiv = $('<div class="col-sm-2">').html(`<strong>${data.fieldName}</strong>`);
    if (Array.isArray(data.value)) {
      let div = $('<div class="row">');
      div.append(headerDiv);
      let htmlPart = '';
      data.value.forEach(d => {
        htmlPart = parseFileViewer(data.config, d, data.path);
      });
      div.append(htmlPart);
      return div;
    } else {
      let div = $('<div class="row">');
      div.append(headerDiv);
      let htmlPart = parseFileViewer(data.config, data.value, data.path);
      div.append(htmlPart);
      return div;
    }
  } catch (e) {
    let div = $('<div class="row">');
    div.append($('<span>').html(`Error building iframe ${e}`));
    return div;
  }
}

function parseFileViewer(config, data, path) {
  const value = JSON.parse(data);
  let mediaPath = '';
  if (config.resolveVia) {
    mediaPath = `${config.resolveVia}/${path}/${value['@id']}`;
  } else if (config.prefix) {
    mediaPath = config.prefix + d;
  }
  let a = `<a href="#view/#${config.viewer}/${mediaPath}" alt="Index Location: ' + ${value}">${value['@id']}</a>`;
  if (config.label) {
    const label = $('<div class="col-sm-2">').html(`<strong>${config.label}</strong>`);
    const value = $('<div class="col-sm-8">').html(a);
    label.append(value);
    return label;
  } else {
    const value = $('<div class="col-sm-12">').html(a);
    return value;
  }
}

module.exports = SubDocFileViewer;
