// Restore legacy GitHub Pages deep links without navigating off this origin.
(function (location) {
  if (location.search[1] !== '/') return;
  if (/(?:^|[/?&])(?:\.\.|%2e%2e)(?:[/?&#]|$)/i.test(location.search)) return;
  var restored = location.search.slice(1).split('&').map(function (part) {
    return part.replace(/~and~/g, '&');
  }).join('?');
  var base = location.pathname.replace(/\/$/, '');
  var target = base + restored + location.hash;
  try {
    var url = new URL(target, location.origin);
    if (url.origin === location.origin && (url.pathname === base || url.pathname.indexOf(base + '/') === 0)) {
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  } catch (_) {
    // Malformed legacy links leave the current page intact.
  }
}(window.location));
