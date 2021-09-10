const $ = require('jquery');

const SubDocArrayIndexResolve = function (data) {
  if (Array.isArray(data.value)) {
    const dataValue = data.value;
    dataValue.forEach(function (d) {
      if (data.config.json) {
        try {
          const json = JSON.parse(d);
          if (data.config.element) {
            d = json;
          } else {
            d = json;
          }
        } catch (e) {
          console.error(e);
          throw ('Error: cannot parse json SubDocImageArray');
        }
      }
      let hrefFields = data.config.element.href || ['id'];
      let textFields = data.config.element.text || ['name'];

      if(Array.isArray(d)) {
        d.forEach(function (dd) {
          const text = textFields.find((ref) => {
            if (dd[ref]) {
              return dd[ref];
            }
          });
          const href = hrefFields.find((ref) => {
            if (dd[ref]) {
              return dd[ref];
            }
          });
          let a = `<a href="#view/${dd[href]}" alt="Index Location: ' + ${dd[text]}">${dd[text]}</a>`;
          if (data.config.label) {
            const label = $('<div class="col-sm-2">').html(`<strong>${data.config.label}</strong>`);
            const value = $('<div class="col-sm-8">').html(a);
            data.element.append(label).append(value);
          } else {
            const value = $('<div class="col-sm-12">').html(a);
            data.element.append(value);
          }
        });
      }else{
        const text = textFields.find((ref) => {
          if (d[ref]) {
            return d[ref];
          }
        });
        const href = hrefFields.find((ref) => {
          if (d[ref]) {
            return d[ref];
          }
        });
        let a = `<a href="#view/${d[href]}" alt="Index Location: ' + ${d[text]}">${d[text]}</a>`;
        if (data.config.label) {
          const label = $('<div class="col-sm-2">').html(`<strong>${data.config.label}</strong>`);
          const value = $('<div class="col-sm-8">').html(a);
          data.element.append(label).append(value);
        } else {
          const value = $('<div class="col-sm-12">').html(a);
          data.element.append(value);
        }
      }
    });

    return data.element;
  } else {
    return data.element.append('Error: value is not in array form')
  }
};

module.exports = SubDocArrayIndexResolve;
