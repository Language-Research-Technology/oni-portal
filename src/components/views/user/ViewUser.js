const $ = require("jquery");

const ViewUser =  {

  main: function (state) {

    const dummy = $('<div>');
    const col = $('<div class="col">');
    const summary = $('<div class="jumbotron">');
    const user = state['config']['user'];
    const data = $('<div>');
    if(user) {
      const p1 = $('<p>').html(`User: ${user.displayName}`);
      const p2 = $('<p>').html(`Provider: ${user.provider}, username: ${user.username}`);
      const ul = $('<ul>');
      if(user['memberships'] && user['memberships']['teams']) {
        for(let m of user['memberships']['teams']) {
          const t = m['team'];
          const li = $('<li>');
          const org = $('<span>').html(`Organization: <a href="${t['organization']['html_url']}">${t['organization']['login']}</a>`);
          const name = $('<span>').html(`Member of: ${t['name']}`);
          li.append(org).append(' > ').append(name);
          ul.append(li);
        }
      }
      data.append(p1).append(p2).append(ul);
      const refresh = $('<p>').html(`<a href="/auth/check?redirect=%23user%2F">Check Access</a>`);
      data.append(refresh);
    }
    col.append(summary.append(data));
    dummy.append(col);
    return dummy.html();
  },

};

module.exports = ViewUser;
