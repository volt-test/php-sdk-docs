// CloudFront Function — Viewer Request
// Rewrites the URI to serve index.md when Accept: text/markdown is requested.
function handler(event) {
  var request = event.request;
  var accept = request.headers['accept'] ? request.headers['accept'].value : '';

  if (accept.indexOf('text/markdown') === -1) {
    return request;
  }

  var uri = request.uri;

  if (uri === '/' || uri === '/index.html') {
    request.uri = '/index.md';
  } else if (uri.endsWith('/index.html')) {
    request.uri = uri.replace(/\/index\.html$/, '/index.md');
  } else if (uri.endsWith('/')) {
    request.uri = uri + 'index.md';
  } else if (uri.indexOf('.') === -1) {
    request.uri = uri + '/index.md';
  }

  return request;
}
