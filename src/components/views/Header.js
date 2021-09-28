const Header = function (data) {
  let html;
  if (data.config['user']) {
    const user = data.config['user'];
    const displayName = user['displayName'];
    html = `<div class="align-middle">User: <a href="#user/">${displayName}</a><br/><a href="/auth/logout">Logout</a></div>`;
  } else {
    html = `<h6 class="align-middle"><a href="/auth/github">Login</a></h6>`;
  }
  return `
<header id="header" class="container">
  <div class="row">
    <div class="col-sm vertical-center">
      <nav class="navbar navbar-light bg-transparent">
        <a class="navbar-brand" href="${data.header.URL}">
          <img src="${data.header.logo}" width="110" height="51" class="d-inline-block align-top" alt="${data.header.title}">
          <span style="font-size: 188%">${data.header.title}</span>
        </a>
      </nav>
    </div>
    <div class="col-sm vertical-center"></div>
    <div class="col-sm vertical-center"></div>
    <div class="col-sm vertical-center">
    <nav class="navbar navbar-light bg-transparent">${html}</nav>
    </div>
  </div>
</header>
`
};

module.exports = Header;
