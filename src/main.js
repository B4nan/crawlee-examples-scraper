/**
 * This template is a production ready boilerplate for developing with `CheerioCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

// For more information, see https://sdk.apify.com
import { Actor, log } from 'apify';
// For more information, see https://crawlee.dev
import { CheerioCrawler } from 'crawlee';
import { router } from './routes.js';

// Initialize the Apify SDK
await Actor.init();

const { maxRequestsPerCrawl = 10 } = await Actor.getInput() ?? {};

const proxyConfiguration = await Actor.createProxyConfiguration();

log.info('starting crawler with input', { maxRequestsPerCrawl });

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestHandler: router,
    maxRequestsPerCrawl,
    // just for testing purposes, so we never crawl more than `maxRequestsPerCrawl`
    maxConcurrency: 1,
});

await crawler.run(['https://crawlee.dev/docs/examples']);

// Exit successfully
await Actor.exit();
