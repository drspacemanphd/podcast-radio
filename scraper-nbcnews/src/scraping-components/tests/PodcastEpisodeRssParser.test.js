const fetch = require('node-fetch');
const parser = require('../PodcastEpisodeRssParser');

const dummyXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:art19="https://art19.com/xmlns/rss-extensions/1.0" xmlns:googleplay="https://www.google.com/schemas/play-podcasts/1.0/">
    <channel>
        <title>The Rachel Maddow Show</title>
        <description>
            <![CDATA[<p>Rachel Maddow works with unmatched rigor and resolve to explain our complex world and deliver news in a way that's illuminating and dynamic, connecting the dots to make sense of complex issues. Join her every weeknight as she provides in-depth reporting to illuminate the current state of political affairs and reveals the importance of transparency and accountability from our leaders.</p>]]>
    
        </description>
        <managingEditor>multimedia@msnbc.com?subject=Podcasts (MSNBC)</managingEditor>
        <copyright>© © Copyright © 2019 NBC News</copyright>
        <generator>ART19</generator>
        <atom:link href="https://rss.art19.com/msnbc-rachel-maddow" rel="self" type="application/rss+xml"/>
        <link>http://www.msnbc.com/rachel-maddow-show</link>
        <itunes:new-feed-url>https://podcastfeeds.nbcnews.com/msnbc-rachel-maddow</itunes:new-feed-url>
        <itunes:owner>
            <itunes:name>MSNBC</itunes:name>
            <itunes:email>multimedia@msnbc.com?subject=Podcasts</itunes:email>
        </itunes:owner>
        <itunes:author>Rachel Maddow, MSNBC</itunes:author>
        <itunes:summary>
            <![CDATA[<p>Rachel Maddow works with unmatched rigor and resolve to explain our complex world and deliver news in a way that's illuminating and dynamic, connecting the dots to make sense of complex issues. Join her every weeknight as she provides in-depth reporting to illuminate the current state of political affairs and reveals the importance of transparency and accountability from our leaders.</p>]]>
    
        </itunes:summary>
        <language>en</language>
        <itunes:explicit>no</itunes:explicit>
        <itunes:category text="News"/>
        <itunes:keywords>POLITICS,President,ISSUES,Washington,NBC,Rachel Maddow,MADDOW,Election,public,policy,campaign,congress,government,madow</itunes:keywords>
        <itunes:type>episodic</itunes:type>
        <itunes:image href="https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg"/>
        <image>
            <url>https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg</url>
            <link>http://www.msnbc.com/rachel-maddow-show</link>
            <title>The Rachel Maddow Show</title>
        </image>        
        <item>
            <title>New evidence calls for answer on cancelled Pence Ukraine trip</title>
            <description>
                <![CDATA[<p>9:20 New evidence calls for answer on cancelled Pence Ukraine trip</p><p>9:31 Flood of new impeachment evidence shaping views ahead of trial</p><p>9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme</p><p>9:57 Prohibition's repeal shows America can correct its mistakes</p>]]>
      
            </description>
            <itunes:title>New evidence calls for answer on cancelled Pence Ukraine trip</itunes:title>
            <itunes:episodeType>full</itunes:episodeType>
            <itunes:summary>9:20 New evidence calls for answer on cancelled Pence Ukraine trip

9:31 Flood of new impeachment evidence shaping views ahead of trial

9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme

9:57 Prohibition's repeal shows America can correct its mistakes</itunes:summary>
            <content:encoded>
                <![CDATA[<p>9:20 New evidence calls for answer on cancelled Pence Ukraine trip</p><p>9:31 Flood of new impeachment evidence shaping views ahead of trial</p><p>9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme</p><p>9:57 Prohibition's repeal shows America can correct its mistakes</p>]]>
      
            </content:encoded>
            <guid isPermaLink="false">gid://art19-episode-locator/V0/n7sr1uXWwoo8vPIdVMRZPkstbo6BhXPm_kCvHO1nRMY</guid>
            <pubDate>Sat, 18 Jan 2020 05:13:19 -0000</pubDate>
            <itunes:explicit>no</itunes:explicit>
            <itunes:image href="https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg"/>
            <itunes:keywords>Politics,President,ISSUES,washington,NBC,Rachel Maddow,MADDOW,Election,public,Policy,campaign,Congress,government,madow</itunes:keywords>
            <itunes:duration>00:45:01</itunes:duration>
            <enclosure url="https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/f82d2f29-80b5-4ce4-9dfa-b64a60475a6c.mp3" type="audio/mpeg" length="43222831"/>
        </item>
        <item>
            <title>Part 2 of Rachel Maddow's exclusive interview with Lev Parnas</title>
            <description>
                <![CDATA[<p>9:06 Parnas: 'I don't think Vice President Biden did anything wrong'</p><p>9:08 Parnas: Yovanovitch's anti-corruption stance made her a target</p><p>9:14 Parnas: Perry fell short in his part in Trump's Ukraine scheme</p><p>9:24 Parnas: Trump helped push for visa for former Ukraine official</p><p>9:40 Parnas describes how Trump struggled to fire Amb. Yovanovitch</p>]]>
      
            </description>
            <itunes:title>Part 2 of Rachel Maddow's exclusive interview with Lev Parnas</itunes:title>
            <itunes:episodeType>full</itunes:episodeType>
            <itunes:summary>9:06 Parnas: 'I don't think Vice President Biden did anything wrong'

9:08 Parnas: Yovanovitch's anti-corruption stance made her a target

9:14 Parnas: Perry fell short in his part in Trump's Ukraine scheme

9:24 Parnas: Trump helped push for visa for former Ukraine official

9:40 Parnas describes how Trump struggled to fire Amb. Yovanovitch</itunes:summary>
            <content:encoded>
                <![CDATA[<p>9:06 Parnas: 'I don't think Vice President Biden did anything wrong'</p><p>9:08 Parnas: Yovanovitch's anti-corruption stance made her a target</p><p>9:14 Parnas: Perry fell short in his part in Trump's Ukraine scheme</p><p>9:24 Parnas: Trump helped push for visa for former Ukraine official</p><p>9:40 Parnas describes how Trump struggled to fire Amb. Yovanovitch</p>]]>
      
            </content:encoded>
            <guid isPermaLink="false">gid://art19-episode-locator/V0/sLcAq2uTPDmrZZS7LhWcY-V7NNHAB_dyJa8ClqQNQac</guid>
            <pubDate>Fri, 17 Jan 2020 04:11:30 -0000</pubDate>
            <itunes:explicit>no</itunes:explicit>
            <itunes:image href="https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg"/>
            <itunes:keywords>Politics,President,ISSUES,washington,NBC,Rachel Maddow,MADDOW,Election,public,Policy,campaign,Congress,government,madow</itunes:keywords>
            <itunes:duration>00:44:46</itunes:duration>
            <enclosure url="https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/6dd6079b-bde4-4451-8d9c-971ae1d8afe5.mp3" type="audio/mpeg" length="42985430"/>
        </item>
    </channel>
</rss>`;

const badXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:art19="https://art19.com/xmlns/rss-extensions/1.0" xmlns:googleplay="https://www.google.com/schemas/play-podcasts/1.0/">
    <channel>
        <title>The Rachel Maddow Show</title>
        <description>
            <![CDATA[<p>Rachel Maddow works with unmatched rigor and resolve to explain our complex world and deliver news in a way that's illuminating and dynamic, connecting the dots to make sense of complex issues. Join her every weeknight as she provides in-depth reporting to illuminate the current state of political affairs and reveals the importance of transparency and accountability from our leaders.</p>]]>
    
        </description>
        <managingEditor>multimedia@msnbc.com?subject=Podcasts (MSNBC)</managingEditor>
        <copyright>© © Copyright © 2019 NBC News</copyright>
        <generator>ART19</generator>
`
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
        title: 'The Rachel Maddow Show',
        author: 'Rachel Maddow, MSNBC',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/n7sr1uXWwoo8vPIdVMRZPkstbo6BhXPm_kCvHO1nRMY',
                title: `New evidence calls for answer on cancelled Pence Ukraine trip`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:20 New evidence calls for answer on cancelled Pence Ukraine trip; 9:31 Flood of new impeachment evidence shaping views ahead of trial; 9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme; 9:57 Prohibition's repeal shows America can correct its mistakes`,
                pubDate: '2020-01-18',
                duration: '00:45:01',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/f82d2f29-80b5-4ce4-9dfa-b64a60475a6c.mp3'
            },
            {
                guid: 'gid://art19-episode-locator/V0/sLcAq2uTPDmrZZS7LhWcY-V7NNHAB_dyJa8ClqQNQac',
                title: `Part 2 of Rachel Maddow's exclusive interview with Lev Parnas`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:06 Parnas: 'I don't think Vice President Biden did anything wrong'; 9:08 Parnas: Yovanovitch's anti-corruption stance made her a target; 9:14 Parnas: Perry fell short in his part in Trump's Ukraine scheme; 9:24 Parnas: Trump helped push for visa for former Ukraine official; 9:40 Parnas describes how Trump struggled to fire Amb. Yovanovitch`,
                pubDate: '2020-01-16',
                duration: '00:44:46',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/6dd6079b-bde4-4451-8d9c-971ae1d8afe5.mp3'
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
        title: 'The Rachel Maddow Show',
        author: 'Rachel Maddow, MSNBC',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/n7sr1uXWwoo8vPIdVMRZPkstbo6BhXPm_kCvHO1nRMY',
                title: `New evidence calls for answer on cancelled Pence Ukraine trip`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:20 New evidence calls for answer on cancelled Pence Ukraine trip; 9:31 Flood of new impeachment evidence shaping views ahead of trial; 9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme; 9:57 Prohibition's repeal shows America can correct its mistakes`,
                pubDate: '2020-01-18',
                duration: '00:45:01',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/f82d2f29-80b5-4ce4-9dfa-b64a60475a6c.mp3'
            },
            {
                guid: 'gid://art19-episode-locator/V0/sLcAq2uTPDmrZZS7LhWcY-V7NNHAB_dyJa8ClqQNQac',
                title: `Part 2 of Rachel Maddow's exclusive interview with Lev Parnas`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:06 Parnas: 'I don't think Vice President Biden did anything wrong'; 9:08 Parnas: Yovanovitch's anti-corruption stance made her a target; 9:14 Parnas: Perry fell short in his part in Trump's Ukraine scheme; 9:24 Parnas: Trump helped push for visa for former Ukraine official; 9:40 Parnas describes how Trump struggled to fire Amb. Yovanovitch`,
                pubDate: '2020-01-16',
                duration: '00:44:46',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/6dd6079b-bde4-4451-8d9c-971ae1d8afe5.mp3'
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
        title: 'The Rachel Maddow Show',
        author: 'Rachel Maddow, MSNBC',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/n7sr1uXWwoo8vPIdVMRZPkstbo6BhXPm_kCvHO1nRMY',
                title: `New evidence calls for answer on cancelled Pence Ukraine trip`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:20 New evidence calls for answer on cancelled Pence Ukraine trip; 9:31 Flood of new impeachment evidence shaping views ahead of trial; 9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme; 9:57 Prohibition's repeal shows America can correct its mistakes`,
                pubDate: '2020-01-18',
                duration: '00:45:01',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/f82d2f29-80b5-4ce4-9dfa-b64a60475a6c.mp3'
            },
            {
                guid: 'gid://art19-episode-locator/V0/sLcAq2uTPDmrZZS7LhWcY-V7NNHAB_dyJa8ClqQNQac',
                title: `Part 2 of Rachel Maddow's exclusive interview with Lev Parnas`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:06 Parnas: 'I don't think Vice President Biden did anything wrong'; 9:08 Parnas: Yovanovitch's anti-corruption stance made her a target; 9:14 Parnas: Perry fell short in his part in Trump's Ukraine scheme; 9:24 Parnas: Trump helped push for visa for former Ukraine official; 9:40 Parnas describes how Trump struggled to fire Amb. Yovanovitch`,
                pubDate: '2020-01-16',
                duration: '00:44:46',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/6dd6079b-bde4-4451-8d9c-971ae1d8afe5.mp3'
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
            expect(error).toEqual(new Error('Unclosed root tag\nLine: 11\nColumn: 0\nChar: '));
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(rssUrl);
        });

});

test('test that rss feed can be properly truncated', () => {

    // Setup mock input
    const rssUrl = 'RSS_URL';
    const lookback = 1;

    // Setup expected data
    const expected = {
        title: 'The Rachel Maddow Show',
        author: 'Rachel Maddow, MSNBC',
        category: 'News',
        imageUrl: 'https://content.production.cdn.art19.com/images/8f/90/d0/90/8f90d090-ae5c-434e-b410-bd4ed1f64a8f/6e9fc8f0935fd9c09b9381c3ed6b4e2114393cbd72956052d84272ea53554ccf5e76f76d5ce59930a462e4a7d77123a2baf2e550a0480ed602e91a8c09254bcb.jpeg',
        entries: [
            {
                guid: 'gid://art19-episode-locator/V0/n7sr1uXWwoo8vPIdVMRZPkstbo6BhXPm_kCvHO1nRMY',
                title: `New evidence calls for answer on cancelled Pence Ukraine trip`,
                author: 'Rachel Maddow, MSNBC',
                description: `9:20 New evidence calls for answer on cancelled Pence Ukraine trip; 9:31 Flood of new impeachment evidence shaping views ahead of trial; 9:45 GAO busts Trump 'no crime' claim with regard to Ukraine scheme; 9:57 Prohibition's repeal shows America can correct its mistakes`,
                pubDate: '2020-01-18',
                duration: '00:45:01',
                mp3Location: 'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/f82d2f29-80b5-4ce4-9dfa-b64a60475a6c.mp3'
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