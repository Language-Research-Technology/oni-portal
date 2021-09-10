const Menu = function (data) {
  return `
<nav class="navbar navbar-expand-lg navbar-dark bg-black">
  <a class="navbar-brand" style="visibility: hidden" href="">Data Portal</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      ${pageLinks(data)}   
    </ul>
  </div>
</nav>
  `
};

function pageLinks(data) {
  let home = {ref: '#', title: 'Home'}
  if (data.header['home']) {
    home = data.header['home'];
  }
  let html = `<li class="nav-item active">
      <a class="nav-link" href="${home.ref}">${home.title}</a>
    </li>`;
  if (data.header['menu']) {
    data.header['menu'].forEach((m) => {
      const page = data.pages[m];
      if (page) {
        html += `<li class="nav-item active">
      <a class="nav-link" href="/#page/${m}">${page.title}</a>
      </li>`
      }
    })
  }
  return html;
}

module.exports = Menu;
