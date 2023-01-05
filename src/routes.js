import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        globs: ['https://crawlee.dev/docs/examples/*'],
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, $, log }) => {
    const title = $('title').text();
    const createdAt = new Date();
    log.info(`${title}`, { url: request.loadedUrl });

    await Dataset.pushData({
        url: request.loadedUrl,
        title,
        createdAt,
    });
});
