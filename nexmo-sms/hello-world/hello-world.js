const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'a31df320',
  apiSecret: '1ukgRDorlcIEXH3N',
});

const from = 'HaiNV';
const to = '84967135492';
const text = 'Hello from HaiNV';

nexmo.message.sendSms(from, to, text);