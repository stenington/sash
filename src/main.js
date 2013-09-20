/* 
  Expects globals 
    jquery as '$'
    nunjucks w/ compiled templates as 'nunjucks'
    png-js as PNG
    moment as moment
  because whatever.
*/

var env = nunjucks.env;

$(document).ready(function(){
  var badges = Array.prototype.slice.call(document.getElementsByClassName('flip'));
  badges.forEach(function(badge) {
    if (badge.src.indexOf('.png') === -1)
      return; 
    /* ORIGIN and PORT come from `uglifyjs -d` in Makefile */
    var origin = ORIGIN || ('http://localhost:' + PORT);
    $.get(origin + '/unbake', {
      url: badge.src
    }, function(data, status, xhr) {
      var context = data.structures;
      context.extra = {
        badgeSrc: badge.src
      };
      var issuedOn = context.assertion.issued_on || context.assertion.issuedOn;
      if (issuedOn)
        context.extra.issuedAgo = moment(issuedOn).fromNow();
      badge.outerHTML = env.render('flip.html', context);
    }, 
    'json');
  });
});
