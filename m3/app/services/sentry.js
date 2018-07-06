const Raven = require('raven');
const sentryConfig = require('../../config/sentry');

const ravenClient = Raven.config(sentryConfig.sentryDNS).install();

module.exports = ravenClient;
