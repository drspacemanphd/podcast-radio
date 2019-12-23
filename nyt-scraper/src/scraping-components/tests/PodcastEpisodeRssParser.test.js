const fetch = require('node-fetch');
const parser = require('../PodcastEpisodeRssParser');

const dummyXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:art19="https://art19.com/xmlns/rss-extensions/1.0" xmlns:googleplay="https://www.google.com/schemas/play-podcasts/1.0/">
    <channel>
        <title>The Daily</title>
        <description>
            <![CDATA[<p>This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro. Twenty minutes a day, five days a week, ready by 6 a.m.</p>]]>
    
        </description>
        <managingEditor>thedaily@nytimes.com (The New York Times)</managingEditor>
        <copyright>© 2018-2019 THE NEW YORK TIMES COMPANY; The New York Times encourages the use of RSS feeds for personal use in a news reader or as part of a non-commercial blog, subject to your agreement to our Terms of Service. Any commercial use of the RSS feed, and thus our content accessible via it, is prohibited without a written specific permission from The New York Times . We require proper format and attribution whenever New York Times content is posted on other's properties, and we reserve the right to require that you cease distributing our content.</copyright>
        <generator>ART19</generator>
        <atom:link href="https://rss.art19.com/the-daily" rel="self" type="application/rss+xml"/>
        <link>https://www.nytimes.com/the-daily</link>
        <itunes:owner>
            <itunes:name>The New York Times</itunes:name>
            <itunes:email>thedaily@nytimes.com</itunes:email>
        </itunes:owner>
        <itunes:author>The New York Times</itunes:author>
        <itunes:summary>
            <![CDATA[<p>This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro. Twenty minutes a day, five days a week, ready by 6 a.m.</p>]]>
    
        </itunes:summary>
        <language>en</language>
        <itunes:explicit>no</itunes:explicit>
        <itunes:category text="News">
            <itunes:category text="Daily News"/></itunes:category>
        <itunes:type>episodic</itunes:type>
        <itunes:image href="https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg"/>
        <image>
            <url>https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg</url>
            <link>https://www.nytimes.com/the-daily</link>
            <title>The Daily</title>
        </image>
        <item>
            <title>Year in Sound</title>
            <description>
                <![CDATA[<p>Our first episode of 2019 opened the year with a question: “<a href="https://www.nytimes.com/2019/01/02/podcasts/the-daily/house-democrats-investigation-cummings-nadler-schiff.html" target="_blank">What will Democrats do with their new power</a>?” One of our last offered the answer: “<a href="https://www.nytimes.com/2019/12/19/podcasts/the-daily/impeachment-trump-democrats.html" target="_blank">Impeach the president</a>.” This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit<a href="https://www.nytimes.com/thedaily" target="_blank">nytimes.com/thedaily</a>.</p><p>Here’s some nostalgia as we head into 2020:</p><ul><li>Our photo editors pored over ten years of images to bring you:<a href="https://www.nytimes.com/interactive/2019/world/decade-in-pictures.html" target="_blank"> The decade in pictures</a>.</li><li>And if you’re looking for a longer read over the holidays, check out our editors’ picks for the<a href="https://www.nytimes.com/2019/11/26/books/review/podcast-10-best-books-2019.html" target="_blank"> 10 best books of 2019</a>.</li></ul>]]>
      
</description>
<itunes:title>Year in Sound</itunes:title>
<itunes:episodeType>full</itunes:episodeType>
<itunes:summary>Our first episode of 2019 opened the year with a question: “What will Democrats do with their new power?” One of our last offered the answer: “Impeach the president.” This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit nytimes.com/thedaily.

Here’s some nostalgia as we head into 2020:Our photo editors pored over ten years of images to bring you: The decade in pictures.And if you’re looking for a longer read over the holidays, check out our editors’ picks for the 10 best books of 2019.</itunes:summary>
<content:encoded>
    <![CDATA[<p>Our first episode of 2019 opened the year with a question: “<a href="https://www.nytimes.com/2019/01/02/podcasts/the-daily/house-democrats-investigation-cummings-nadler-schiff.html" target="_blank">What will Democrats do with their new power</a>?” One of our last offered the answer: “<a href="https://www.nytimes.com/2019/12/19/podcasts/the-daily/impeachment-trump-democrats.html" target="_blank">Impeach the president</a>.” This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit<a href="https://www.nytimes.com/thedaily" target="_blank">nytimes.com/thedaily</a>.</p><p>Here’s some nostalgia as we head into 2020:</p><ul><li>Our photo editors pored over ten years of images to bring you:<a href="https://www.nytimes.com/interactive/2019/world/decade-in-pictures.html" target="_blank"> The decade in pictures</a>.</li><li>And if you’re looking for a longer read over the holidays, check out our editors’ picks for the<a href="https://www.nytimes.com/2019/11/26/books/review/podcast-10-best-books-2019.html" target="_blank"> 10 best books of 2019</a>.</li></ul>]]>
      
</content:encoded>
<guid isPermaLink="false">gid://art19-episode-locator/V0/uEQMwDBYOYJz-82T4MfWUp-ryIcxQ_cmkFQLMBQ8OHU</guid>
<pubDate>Mon, 23 Dec 2019 10:55:00 -0000</pubDate>
<itunes:explicit>no</itunes:explicit>
<itunes:image href="https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg"/>
<itunes:duration>00:29:05</itunes:duration>
<enclosure url="https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/5d0d0b03-afc3-4481-8cdd-99f229949825.mp3" type="audio/mpeg" length="27932212"/>
</item>
</channel>
</rss>`;

const badXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:art19="https://art19.com/xmlns/rss-extensions/1.0" xmlns:googleplay="https://www.google.com/schemas/play-podcasts/1.0/">
    <channel>
        <title>The Daily</title>
        <description>
            <![CDATA[<p>This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro. Twenty minutes a day, five days a week, ready by 6 a.m.</p>]]>
    
        </description>
        <managingEditor>thedaily@nytimes.com (The New York Times)</managingEditor>
        <copyright>© 2018-2019 THE NEW YORK TIMES COMPANY; The New York Times encourages the use of RSS feeds for personal use in a news reader or as part of a non-commercial blog, subject to your agreement to our Terms of Service. Any commercial use of the RSS feed, and thus our content accessible via it, is prohibited without a written specific permission from The New York Times . We require proper format and attribution whenever New York Times content is posted on other's properties, and we reserve the right to require that you cease distributing our content.</copyright>
`;

jest.mock('node-fetch', () => jest.fn());

beforeEach(() => {
    fetch.mockReset();
});

test('test that rss feed can be properly parsed', () => {
    
    // Setup mock input
    const rssUrl = 'RSS_URL';
    const lookback = 3;

    // Setup expected data
    const expected = {
        title: 'The Daily',
        author: 'The New York Times',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/uEQMwDBYOYJz-82T4MfWUp-ryIcxQ_cmkFQLMBQ8OHU',
                title: 'Year in Sound',
                author: 'The New York Times',
                description: `Our first episode of 2019 opened the year with a question: \"What will Democrats do with their new power?\" One of our last offered the answer: \"Impeach the president.\" This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit nytimes.com/thedaily. Here’s some nostalgia as we head into 2020:Our photo editors pored over ten years of images to bring you: The decade in pictures.And if you’re looking for a longer read over the holidays, check out our editors’ picks for the 10 best books of 2019.`,
                pubDate: '2019-12-23',
                duration: '00:29:05',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/5d0d0b03-afc3-4481-8cdd-99f229949825.mp3'
            }
        ]
    };

    // Setup mock
    fetch.mockImplementation((xml) => Promise.resolve(
        {
            text: () => Promise.resolve(dummyXml)
        }
    ));

    // Test and assert
    return parser.getRssFeed(rssUrl, lookback)
        .then(data => {
            expect(data).toEqual(expected);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(rssUrl);
        });

});

test('test that process is aborted if error thrown getting rss feed', () => {

    // Setup mock input
    const rssUrl = 'RSS_URL';
    const lookback = 3;

    // Setup expected data
    const expected = {
        title: 'The Daily',
        author: 'The New York Times',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/uEQMwDBYOYJz-82T4MfWUp-ryIcxQ_cmkFQLMBQ8OHU',
                title: 'Year in Sound',
                author: 'The New York Times',
                description: `Our first episode of 2019 opened the year with a question: \"What will Democrats do with their new power?\" One of our last offered the answer: \"Impeach the president.\" This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit nytimes.com/thedaily. Here’s some nostalgia as we head into 2020:Our photo editors pored over ten years of images to bring you: The decade in pictures.And if you’re looking for a longer read over the holidays, check out our editors’ picks for the 10 best books of 2019.`,
                pubDate: '2019-12-23',
                duration: '00:29:05',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/5d0d0b03-afc3-4481-8cdd-99f229949825.mp3'
            }
        ]
    };

    // Setup mock
    fetch.mockImplementation((xml) => Promise.resolve(
        {
            text: () => Promise.reject(new Error('ERROR THROWN WHEN GETTING RSS FEED'))
        }
    ));

    // Test and assert
    return parser.getRssFeed(rssUrl, lookback)
        .catch(error => {
            expect(error).toEqual(new Error('ERROR THROWN WHEN GETTING RSS FEED'));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(rssUrl);
        });

});

test('test that process is aborted if error thrown parsing rss feed', () => {

    // Setup mock input
    const rssUrl = 'RSS_URL';
    const lookback = 3;

    // Setup expected data
    const expected = {
        title: 'The Daily',
        author: 'The New York Times',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/uEQMwDBYOYJz-82T4MfWUp-ryIcxQ_cmkFQLMBQ8OHU',
                title: 'Year in Sound',
                author: 'The New York Times',
                description: `Our first episode of 2019 opened the year with a question: \"What will Democrats do with their new power?\" One of our last offered the answer: \"Impeach the president.\" This audio time capsule captures the weeks in between — a crescendo of controversy and culture wars to wrap up the decade. For more information on today’s episode, visit nytimes.com/thedaily. Here’s some nostalgia as we head into 2020:Our photo editors pored over ten years of images to bring you: The decade in pictures.And if you’re looking for a longer read over the holidays, check out our editors’ picks for the 10 best books of 2019.`,
                pubDate: '2019-12-23',
                duration: '00:29:05',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/5d0d0b03-afc3-4481-8cdd-99f229949825.mp3'
            }
        ]
    };

    // Setup mock
    fetch.mockImplementation((xml) => Promise.resolve(
        {
            text: () => Promise.resolve(badXml)
        }
    ));

    // Test and assert
    return parser.getRssFeed(rssUrl, lookback)
        .catch(error => {
            expect(error).toEqual(new Error('Unclosed root tag\nLine: 10\nColumn: 0\nChar: '));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(rssUrl);
        });

});

test('test that rss feed can be properly truncated', () => {

    // Setup mock input
    const rssUrl = 'RSS_URL';
    const lookback = 0;

    // Setup expected data
    const expected = {
        title: 'The Daily',
        author: 'The New York Times',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/01/1b/f3/d6/011bf3d6-a448-4533-967b-e2f19e376480/7fdd4469c1b5cb3b66aa7dcc9fa21f138efe9a0310a8a269f3dcd07c83a552844fcc445ea2d53db1e55d6fb077aeaa8a1566851f8f2d8ac4349d9d23a87a69f5.jpeg',
        entries: []
    };

    // Setup mock
    fetch.mockImplementation((xml) => Promise.resolve(
        {
            text: () => Promise.resolve(dummyXml)
        }
    ));

    // Test and assert
    return parser.getRssFeed(rssUrl, lookback)
        .then(data => {
            expect(data).toEqual(expected);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(rssUrl);
        });

});