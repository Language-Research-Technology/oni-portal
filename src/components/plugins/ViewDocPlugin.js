const $ = require("jquery");


const ViewDocPlugin = {

  load: function (state, viewer, query) {

    const div = $('<div>');
    switch (viewer) {
      case '#file/':
        div.append(viewer);
        div.append(query);
        div.append('plain-text');
        break;
      default:
        console.log('no plugin selected');
    }
    return div.html();
  }
}
module.exports = ViewDocPlugin;
