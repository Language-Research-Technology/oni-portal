const $ = require("jquery");

const ViewSubDoc = require('./ViewSubDoc');
const SubDocHorizontal = require('./SubDocHorizontal');
const SubDocDate = require('./SubDocDate');
const SubDocIframe = require('./SubDocIframe');
const SubDoc = require('./SubDoc');
const SubDocLink = require('./SubDocLink');
const SubDocJson = require('./SubDocJson');
const SubDocJsonArray = require('./SubDocJsonArray');
const SubDocArrayJson = require('./SubDocArrayJson');
const SubDocArrayIndexResolve = require('./SubDocArrayIndexResolve');
const SubDocSubgraph = require('./SubDocSubgraph');
const SubDocImage = require('./SubDocImage');
const SubDocImageArray = require('./SubDocImageArray');
const SubDocFileViewer = require('./SubDocFileViewer');
const SubDocSubJson = require('./SubDocSubJson');
const SubDocSolrSearch = require('./SubDocSolrSearch');

const ViewTable = async function (data, doc) {

  const type = data.main.doc['record_type_s'];
  const fields = data.results.view[type].viewFields;

  const div = $('<div class="table table-responsive">');
  for (let sdcf of fields) {
    let nonEmptyDiv = undefined;
    console.log(`ViewTable: ${sdcf.field} -> ${sdcf.display}`);
    const list = $('<div>');
    switch (sdcf.display) {
      case 'SubDocHorizontal':
        if (doc[sdcf.field]) {
          const subDoc = SubDocHorizontal({
            key: sdcf.field,
            value: doc[sdcf.field],
            fieldName: sdcf.fieldName
          });
          nonEmptyDiv = true;
          list.append(subDoc);
        }
        break;
      case 'SubDocDate':
        if (doc[sdcf.field]) {
          const subDoc = SubDocDate({
            key: sdcf.field,
            value: doc[sdcf.field],
            fieldName: sdcf.fieldName
          });
          nonEmptyDiv = true;
          list.append(subDoc);
        }
        break;
      case 'SubDocIframe':
        // passing the config and the document id to the component so it can build the URL
        if (doc[sdcf.field]) {
          const subDoc = SubDocIframe(
            {
              key: sdcf.field,
              value: doc[sdcf.field],
              fieldName: sdcf.fieldName,
              id: doc['id'],
              cf: sdcf,
              api: data.apis.ocfl,
              external: sdcf['external']
            });
          nonEmptyDiv = true;
          list.append(subDoc);
        }
        break;
      case 'SubDoc':
        if (doc[sdcf.field]) {
          const subDoc = SubDoc({
            key: sdcf.field,
            value: doc[sdcf.field],
            fieldName: sdcf.fieldName,
            template: sdcf.template
          });
          nonEmptyDiv = true;
          list.append(subDoc);
        }
        break;
      case 'SubDocLink':
        if (doc[sdcf.field]) {
          const row = $('<div class="row">');
          const valueHtml = renderValue(data, sdcf, doc);
          if (valueHtml) {
            const subDoc = SubDocLink({
              config: sdcf,
              value: valueHtml,
              element: row
            });
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocJson':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          if (valueHtml) {
            const row = $('<div class="row">');
            const subDoc = SubDocJson({
              config: sdcf,
              value: valueHtml,
              element: row
            });
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocJsonArray':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          if (valueHtml) {
            const row = $('<div class="">');
            const subDoc = SubDocJsonArray({
              config: sdcf,
              value: valueHtml,
              element: row
            });
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocArrayJson':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          let repoPathId = _.first(doc.path) || '';
          if (doc.path) {
            repoPathId = repoPathId.replace(/\//g, '');
          }
          if (valueHtml) {
            const row = $('<div class="">');
            const subDoc = SubDocArrayJson({
              config: sdcf,
              value: valueHtml,
              element: row,
              path: repoPathId
            });
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocArrayIndexResolve':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          let repoPathId = _.first(doc.path) || '';
          if (doc.path) {
            repoPathId = repoPathId.replace(/\//g, '');
          }
          if (valueHtml) {
            const row = $('<div class="">');
            const subDoc = SubDocArrayIndexResolve({
              config: sdcf,
              value: valueHtml,
              element: row,
              path: repoPathId
            });
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocSubgraph':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          const row = $('<div class="row>');
          const subDocHtml = await SubDocSubgraph({
            config: sdcf,
            value: valueHtml,
            element: row
          });
          console.log(`subDocHtml = ${subDocHtml}`);
          nonEmptyDiv = true;
          list.append($('<div class="row">').html(subDocHtml));
          //list.append(subDoc);
        }
        break;
      case 'SubDocImage':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          if (valueHtml) {
            const row = $('<div class="row">');
            const subDoc = SubDocImage({config: sdcf, value: valueHtml, element: row});
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocImageArray':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          let repoPathId = _.first(doc.path) || '';
          if (doc.path) {
            repoPathId = repoPathId;
          }
          if (valueHtml) {
            const row = $('<div class="row">');
            const subDoc = SubDocImageArray({config: sdcf, value: valueHtml, element: row, path: repoPathId});
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocFileViewer':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          let repoPathId = _.first(doc.path) || '';
          if (doc.path) {
            repoPathId = repoPathId.replace(/\//g, '');
          }
          if (valueHtml) {
            const row = $('<div class="row">');
            const subDoc = SubDocFileViewer({config: sdcf, value: valueHtml, element: row, path: repoPathId});
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocSubJson':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          let repoPathId = _.first(doc.path) || '';
          if (doc.path) {
            repoPathId = repoPathId.replace(/\//g, '');
          }
          if (valueHtml) {
            const row = $('<div class="row">');
            const subDoc = SubDocSubJson({config: sdcf, value: valueHtml, element: row, path: repoPathId});
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      case 'SubDocSolrSearch':
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          let repoPathId = _.first(doc.path) || '';
          if (doc.path) {
            repoPathId = repoPathId.replace(/\//g, '');
          }
          if (valueHtml) {
            const row = $('<div class="row">');
            const subDoc = await SubDocSolrSearch(data, {config: sdcf, value: valueHtml, element: row, path: repoPathId});
            nonEmptyDiv = true;
            list.append(subDoc);
          }
        }
        break;
      default:
        if (doc[sdcf.field]) {
          const valueHtml = renderValue(data, sdcf, doc);
          if (valueHtml) {
            const row = $('<div class="row">');
            if (sdcf.label) {
              const label = $('<div class="col-sm-2">').html(`<strong>${sdcf.label}</strong>`);
              const value = $('<div class="col-sm-10">').html(valueHtml);
              row.append(label).append(value);
            } else {
              const value = $('<div class="col-sm-12">').html(valueHtml);
              row.append(value);
            }
            nonEmptyDiv = true;
            list.append(row);
          }
        } else {
          nonEmptyDiv = false;
        }
    }
    if (nonEmptyDiv) {
      div.append(list);
    }
  }
  return div.html();
};

// FIXME - should use same code as Facets

function renderValue(data, sdcf, doc) {
  if (sdcf.JSON) {
    try {
      const json = JSON.parse('[' + doc[sdcf.field] + ']');
      if (Array.isArray(json)) {
        return json.map((i) => i['display']).join(", ");
      } else {
        return json['display']
      }
    } catch (e) {
      console.log(`JSON value parse error on ${sdcf.field} "${doc[sdcf.field]}": ${e}`);
      return '';
    }
  } else {
    return doc[sdcf.field];
  }
}


module.exports = ViewTable;
