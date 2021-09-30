const $ = require('jquery');
const ocfltools = require('../OCFLTools');

const SubDocImageArray = function (data) {
  if (Array.isArray(data.value)) {
    const dataValue = data.value;
    dataValue.forEach(function (d) {
      if (data.config.json) {
        try {
          const json = JSON.parse(d);
          d = json[data.config.element || '@id'];
        } catch (e) {
          console.error(e);
          throw ('Error: cannot parse json SubDocImageArray');
        }
      }
      //TODO: use a proper file descriptor or read it from the metadata!
      let mediaType = undefined;
      if (d.match(/\.(?:wav|mp3)$/i)) {
        mediaType = 'mp3';
      }
      if (d.match(/\.(?:txt|doc|pdf|xml|csv)$/i)) {
        mediaType = 'txt';
      }
      let imagePath = '';
      if (data.config.resolveVia) {
        const deOcflPath = ocfltools.cleanPath(data.path);
        imagePath = `${data.config.resolveVia}/${deOcflPath}/${d}`;
      } else if (data.config.prefix) {
        imagePath = data.config.prefix + d;
      }
      let valueMedia = '';
      if (mediaType === 'mp3') {
        valueMedia = `<audio controls><source src="${imagePath}" type="audio/mpeg" about="${'Audio Location: ' + imagePath}">Your browser does not support the audio element.</audio>`;
      } else if (mediaType === 'txt') {
        valueMedia = `<a href="${imagePath}" alt="${'Text Location: ' + imagePath}">${d}</a>`;
      } else {
        valueMedia = `<img style="max-height: 300px;" src="${imagePath}" alt="${'Image Location: ' + imagePath}">`
      }
      if (data.config.label) {
        const label = $('<div class="col-sm-2">').html(`<strong>${data.config.label}</strong>`);
        const value = $('<div class="col-sm-10">').html(valueMedia);
        data.element.append(label).append(value);
      } else {
        const value = $('<div class="col-sm-12">').html(valueMedia);
        data.element.append(value);
      }
    });
    return data.element;
  } else {
    return data.element.append('Error: value is not in array form')
  }
};

module.exports = SubDocImageArray;
