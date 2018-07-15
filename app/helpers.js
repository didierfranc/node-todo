const buffer = (...arg) => Buffer.from(...arg);
const { stringify, parse } = JSON;

const toBase64 = string =>
  encodeURI(
    buffer(stringify(string))
      .toString('base64')
      .replace(/=/g, ''),
  );

// prettier-ignore
const fromBase64 = (string) => {
  try {
    return parse(buffer(decodeURI(string), 'base64').toString('utf8'));
  } catch (error) {
    return [];
  }
};

const clear = fn => (req, res) => {
  if (req.url.includes('/favicon.ico')) {
    res.end();
    return;
  }
  fn(req, res);
};

module.exports = {
  toBase64,
  fromBase64,
  clear,
};
