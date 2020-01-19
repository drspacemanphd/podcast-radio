const fetch = require('node-fetch');
const parser = require('../PodcastEpisodeRssParser');

const dummyXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" media="screen" href="/~d/styles/rss2full.xsl"?>
<?xml-stylesheet type="text/css" media="screen" href="http://feeds.feedburner.com/~d/styles/itemcontent.css"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
    <channel>
        <title>Pod Save America</title>
        <link>https://crooked.com/</link>
        <language>en</language>
        <copyright>© 2019 Crooked Media. All Rights Reserved.</copyright>
        <description>&lt;p&gt;Four former aides to President Obama—Jon Favreau, Jon Lovett, Dan Pfeiffer and Tommy Vietor—are joined by journalists, politicians, activists, and more for a no-bullshit conversation about politics. They cut through the noise to break down the week’s news, and help people figure out what matters and how they can help. New episodes Mondays and Thursdays.&lt;/p&gt;</description>
        <image>
            <url>https://megaphone-prod.s3.amazonaws.com/podcasts/454f50d8-0f0c-11e9-a73b-132c930842e3/image/5e963f8f8811e208b1a90c91507a0f7880c7b861bf81c290e44c193e891a507bbe99798dd7ed0cd795a4fede54560f167fa023553f66c29ff86bf9f8322c7f83.jpeg</url>
            <title>Pod Save America</title>
            <link>https://crooked.com/</link>
        </image>
        <itunes:explicit>yes</itunes:explicit>
        <itunes:type>episodic</itunes:type>
        <itunes:subtitle />
        <itunes:author>Crooked Media</itunes:author>
        <itunes:summary>&lt;p&gt;Four former aides to President Obama—Jon Favreau, Jon Lovett, Dan Pfeiffer and Tommy Vietor—are joined by journalists, politicians, activists, and more for a no-bullshit conversation about politics. They cut through the noise to break down the week’s news, and help people figure out what matters and how they can help. New episodes Mondays and Thursdays.&lt;/p&gt;</itunes:summary>
        <itunes:owner>
            <itunes:name>Crooked Media</itunes:name>
            <itunes:email>hey@getcrookedmedia.com</itunes:email>
        </itunes:owner>
        <itunes:image href="https://megaphone-prod.s3.amazonaws.com/podcasts/454f50d8-0f0c-11e9-a73b-132c930842e3/image/5e963f8f8811e208b1a90c91507a0f7880c7b861bf81c290e44c193e891a507bbe99798dd7ed0cd795a4fede54560f167fa023553f66c29ff86bf9f8322c7f83.jpeg" />
        <itunes:category text="News">
            <itunes:category text="Politics" /></itunes:category>
        <atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="http://feeds.feedburner.com/pod-save-america" />
        <feedburner:info xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" uri="pod-save-america" />
        <atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="hub" href="http://pubsubhubbub.appspot.com/" />
        <item>
            <title>“Whine cave.” (Debate recap special!)</title>
            <description>Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.</description>
            <pubDate>Fri, 20 Dec 2019 22:44:08 -0000</pubDate>
            <itunes:title>“Whine cave.” (Debate recap special!)</itunes:title>
            <itunes:episodeType>full</itunes:episodeType>
            <itunes:author>Crooked Media</itunes:author>
            <itunes:subtitle />
            <itunes:summary>Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.</itunes:summary>
            <content:encoded>
                <![CDATA[<p>Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.</p>]]>
      
            </content:encoded>
            <itunes:duration>4421</itunes:duration>
            <guid isPermaLink="false">
                <![CDATA[7277507a-1d29-11ea-b924-9f63a64f75bd]]>
            </guid>
            <enclosure url="https://traffic.megaphone.fm/DGT9480688261.mp3" length="0" type="audio/mpeg" />
        </item>
        <item>
            <title>“A jury of Trump’s peers.”</title>
            <description>The House prepares to impeach Donald Trump as new polling shows an uptick in support, Chuck Schumer tries to prevent Mitch McConnell from rigging the Senate trial, and the Democratic presidential candidates prepare for their final debate of 2019.</description>
            <pubDate>Mon, 16 Dec 2019 22:03:50 -0000</pubDate>
            <itunes:title>“A jury of Trump’s peers.”</itunes:title>
            <itunes:episodeType>full</itunes:episodeType>
            <itunes:author>Crooked Media</itunes:author>
            <itunes:subtitle />
            <itunes:summary>The House prepares to impeach Donald Trump as new polling shows an uptick in support, Chuck Schumer tries to prevent Mitch McConnell from rigging the Senate trial, and the Democratic presidential candidates prepare for their final debate of 2019.</itunes:summary>
            <content:encoded>
                <![CDATA[<p>The House prepares to impeach Donald Trump as new polling shows an uptick in support, Chuck Schumer tries to prevent Mitch McConnell from rigging the Senate trial, and the Democratic presidential candidates prepare for their final debate of 2019.</p>]]>
      
            </content:encoded>
            <itunes:duration>3265</itunes:duration>
            <guid isPermaLink="false">
                <![CDATA[615dacf8-1d29-11ea-b5e9-1b60da98e390]]>
            </guid>
            <enclosure url="https://traffic.megaphone.fm/DGT1296210074.mp3" length="0" type="audio/mpeg" />
        </item>
</channel>
</rss>`;

const badXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" media="screen" href="/~d/styles/rss2full.xsl"?>
<?xml-stylesheet type="text/css" media="screen" href="http://feeds.feedburner.com/~d/styles/itemcontent.css"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
    <channel>
        <title>Pod Save America</title>
        <link>https://crooked.com/</link>
        <language>en</language>
        <copyright>© 2019 Crooked Media. All Rights Reserved.</copyright>
        <description>&lt;p&gt;Four former aides to President Obama—Jon Favreau, Jon Lovett, Dan Pfeiffer and Tommy Vietor—are joined by journalists, politicians, activists, and more for a no-bullshit conversation about politics. They cut through the noise to break down the week’s news, and help people figure out what matters and how they can help. New episodes Mondays and Thursdays.&lt;/p&gt;</description>
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
        title: 'Pod Save America',
        author: 'Crooked Media',
        category: 'News',
        imageUrl: 'https://megaphone-prod.s3.amazonaws.com/podcasts/454f50d8-0f0c-11e9-a73b-132c930842e3/image/5e963f8f8811e208b1a90c91507a0f7880c7b861bf81c290e44c193e891a507bbe99798dd7ed0cd795a4fede54560f167fa023553f66c29ff86bf9f8322c7f83.jpeg',
        entries: [
            {
                guid: '7277507a-1d29-11ea-b924-9f63a64f75bd',
                title: 'Whine cave. (Debate recap special!)',
                author: 'Crooked Media',
                description: 'Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.',
                pubDate: '2019-12-20',
                duration: '01:13:41',
                mp3Location: 'https://traffic.megaphone.fm/DGT9480688261.mp3'
            },
            {
                guid: '615dacf8-1d29-11ea-b5e9-1b60da98e390',
                title: 'A jury of Trump’s peers.',
                author: 'Crooked Media',
                description: 'The House prepares to impeach Donald Trump as new polling shows an uptick in support, Chuck Schumer tries to prevent Mitch McConnell from rigging the Senate trial, and the Democratic presidential candidates prepare for their final debate of 2019.',
                pubDate: '2019-12-16',
                duration: '00:54:25',
                mp3Location: 'https://traffic.megaphone.fm/DGT1296210074.mp3'
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
        title: 'Pod Save America',
        author: 'Crooked Media',
        category: 'News',
        imageUrl: 'https://megaphone-prod.s3.amazonaws.com/podcasts/454f50d8-0f0c-11e9-a73b-132c930842e3/image/5e963f8f8811e208b1a90c91507a0f7880c7b861bf81c290e44c193e891a507bbe99798dd7ed0cd795a4fede54560f167fa023553f66c29ff86bf9f8322c7f83.jpeg',
        entries: [
            {
                guid: '7277507a-1d29-11ea-b924-9f63a64f75bd',
                title: 'Whine cave. (Debate recap special!)',
                author: 'Crooked Media',
                description: 'Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.',
                pubDate: '2019-12-20',
                duration: '01:13:41',
                mp3Location: 'https://traffic.megaphone.fm/DGT9480688261.mp3'
            },
            {
                guid: '615dacf8-1d29-11ea-b5e9-1b60da98e390',
                title: 'A jury of Trump’s peers.',
                author: 'Crooked Media',
                description: 'The House prepares to impeach Donald Trump as new polling shows an uptick in support, Chuck Schumer tries to prevent Mitch McConnell from rigging the Senate trial, and the Democratic presidential candidates prepare for their final debate of 2019.',
                pubDate: '2019-12-16',
                duration: '00:54:25',
                mp3Location: 'https://traffic.megaphone.fm/DGT1296210074.mp3'
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
        title: 'Pod Save America',
        author: 'Crooked Media',
        category: 'News',
        imageUrl: 'https://megaphone-prod.s3.amazonaws.com/podcasts/454f50d8-0f0c-11e9-a73b-132c930842e3/image/5e963f8f8811e208b1a90c91507a0f7880c7b861bf81c290e44c193e891a507bbe99798dd7ed0cd795a4fede54560f167fa023553f66c29ff86bf9f8322c7f83.jpeg',
        entries: [
            {
                guid: '7277507a-1d29-11ea-b924-9f63a64f75bd',
                title: 'Whine cave. (Debate recap special!)',
                author: 'Crooked Media',
                description: 'Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.',
                pubDate: '2019-12-20',
                duration: '01:13:41',
                mp3Location: 'https://traffic.megaphone.fm/DGT9480688261.mp3'
            },
            {
                guid: '615dacf8-1d29-11ea-b5e9-1b60da98e390',
                title: 'A jury of Trump’s peers.',
                author: 'Crooked Media',
                description: 'The House prepares to impeach Donald Trump as new polling shows an uptick in support, Chuck Schumer tries to prevent Mitch McConnell from rigging the Senate trial, and the Democratic presidential candidates prepare for their final debate of 2019.',
                pubDate: '2019-12-16',
                duration: '00:54:25',
                mp3Location: 'https://traffic.megaphone.fm/DGT1296210074.mp3'
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

test('test that rss feed properly truncated based on lookback', () => {

    // Setup mock input
    const rssUrl = 'RSS_URL';
    const lookback = 1;

    // Setup expected data
    const expected = {
        title: 'Pod Save America',
        author: 'Crooked Media',
        category: 'News',
        imageUrl: 'https://megaphone-prod.s3.amazonaws.com/podcasts/454f50d8-0f0c-11e9-a73b-132c930842e3/image/5e963f8f8811e208b1a90c91507a0f7880c7b861bf81c290e44c193e891a507bbe99798dd7ed0cd795a4fede54560f167fa023553f66c29ff86bf9f8322c7f83.jpeg',
        entries: [
            {
                guid: '7277507a-1d29-11ea-b924-9f63a64f75bd',
                title: 'Whine cave. (Debate recap special!)',
                author: 'Crooked Media',
                description: 'Jon, Jon, Tommy, and Dan talk about the impeachment of Donald Trump and the final Democratic debate of 2019, hosted by PBS and POLITICO in Los Angeles, California.',
                pubDate: '2019-12-20',
                duration: '01:13:41',
                mp3Location: 'https://traffic.megaphone.fm/DGT9480688261.mp3'
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