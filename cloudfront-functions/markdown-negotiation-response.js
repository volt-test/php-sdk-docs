// CloudFront Function — Viewer Response
// Sets Content-Type and x-markdown-tokens headers for markdown responses.
function handler(event) {
  var response = event.response;
  var uri = event.request.uri;

  if (uri.endsWith('.md')) {
    response.headers['content-type'] = {
      value: 'text/markdown; charset=utf-8',
    };

    var len = response.headers['content-length']
      ? parseInt(response.headers['content-length'].value, 10)
      : 0;
    if (len > 0) {
      response.headers['x-markdown-tokens'] = {
        value: String(Math.ceil(len / 4)),
      };
    }
  }

  return response;
}
