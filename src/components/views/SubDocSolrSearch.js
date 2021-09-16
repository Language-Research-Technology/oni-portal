const _ = require('lodash');
const $ = require("jquery");
const SolrService = require('../SolrService');

function subjsontohtml(config, data) {

  let html = $('<div class="">');
  const header = $('<p></p>').html(`<strong>${config.headerLabel || 'Details'}</strong>`);
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

function searchToHtml({results, mainSearch, searchInput}) {
  let html = $('<div class="">');
  const header = $('<p></p>').html(`<strong>Contains</strong>`);
  html.append(header);
  if (results.data.docs) {
    _.each(results.data.docs, function (e) {
      const container = $('<div class="row">');
      const type = _.first(e['Type']) || '';
      const id = e['id'];
      const name = _.first(e['name']);
      const label = $('<div class="col-sm-2">').html(`<strong>${type}</strong>`);
      const value = $('<div class="col-sm-8">').html(`<a href="/#view/${id}">${name}</a>`);
      container.append(label).append(value);
      html.append(container)
    });
  }
  const encodedSearchInput = encodeURIComponent(searchInput);
  const searchId = `${mainSearch}=${encodedSearchInput}`;
  const seeMore = $('<p></p>').html(`<a href="/#search/0/1/${searchId}">see more</a>`);
  html.append(seeMore);
  return html;
}

async function solrSearch(state, mainSearch, searchInput) {
  const inputDecode = _.first(searchInput);
  let input = {
    [mainSearch]: inputDecode
  }
  const search = await SolrService.select(
    state,
    {
      start: 0,
      page: 0,
      search: input,
      showFacet: false
    });
  return {results: search, mainSearch: mainSearch, searchInput: inputDecode};
}

const SubDocSolrSearch = async function (state, data) {
  try {
    const results = await solrSearch(state, data.config.searchField || 'main_search', data.value);
    const html = searchToHtml(results);
    return html;
  } catch (e) {
    console.log(`Error searching for ${data.value}`);
    console.log(e);
    const html = $(`<p>error rendering element:</p>`);
    html.append(`<p>${e}</p>)`);
    return html;
  }
}


module.exports = SubDocSolrSearch;
