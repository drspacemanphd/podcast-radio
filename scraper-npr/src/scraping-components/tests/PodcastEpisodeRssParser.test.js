const fetch = require('node-fetch');
const parser = require('../PodcastEpisodeRssParser');

const dummyXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:npr="https://www.npr.org/rss/" xmlns:nprml="https://api.npr.org/nprml" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
    <channel>
        <title>Fresh Air</title>
        <link>http://www.npr.org/programs/fresh-air/</link>
        <description>
            <![CDATA[Fresh Air from WHYY, the Peabody Award-winning weekday magazine of contemporary arts and issues, is one of public radio's most popular programs. Hosted by Terry Gross, the show features intimate conversations with today's biggest luminaries.]]>
        </description>
        <copyright>Copyright 2015-2019 NPR - For Personal Use Only</copyright>
        <generator>NPR API RSS Generator 0.94</generator>
        <language>en</language>
        <itunes:summary>
            <![CDATA[Fresh Air from WHYY, the Peabody Award-winning weekday magazine of contemporary arts and issues, is one of public radio's most popular programs. Hosted by Terry Gross, the show features intimate conversations with today's biggest luminaries.]]>
        </itunes:summary>
        <itunes:author>NPR</itunes:author>
        <itunes:block>no</itunes:block>
        <itunes:owner>
            <itunes:email/>
            <itunes:name/>
        </itunes:owner>
        <itunes:category text="Arts">
            <itunes:category text="Books"/></itunes:category>
        <itunes:category text="TV &amp; Film"/>
        <itunes:category text="Society &amp; Culture"/>
        <itunes:image href="https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400"/>
        <itunes:type>episodic</itunes:type>
        <image>
            <url>https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400</url>
            <title>Fresh Air</title>
            <link>http://www.npr.org/programs/fresh-air/</link>
        </image>
        <lastBuildDate>Sat, 21 Dec 2019 00:01:52 -0500</lastBuildDate>
        <item>
            <title>Best Of: Charlize Theron / Best Albums Of 2019 / Julie Andrews</title>
            <description>
                <![CDATA[Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. <br/><br/>Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. <br/><br/>Julie Andrews talks about her career and family life with Terry Gross. "It was what it was: Chaotic, loving, crazy, wonderful, terrible," she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.']]>
            </description>
            <pubDate>Sat, 21 Dec 2019 00:01:52 -0500</pubDate>
            <copyright>Copyright 2015-2019 NPR - For Personal Use Only</copyright>
            <guid>f2b92544-e0e0-4d46-be47-e04552cf5235</guid>
            <link>https://www.npr.org/2019/12/20/790157296/best-of-charlize-theron-best-albums-of-2019-julie-andrews</link>
            <itunes:title>Best Of: Charlize Theron / Best Albums Of 2019 / Julie Andrews</itunes:title>
            <itunes:author>NPR</itunes:author>
            <itunes:summary>
                <![CDATA[Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. <br/><br/>Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. <br/><br/>Julie Andrews talks about her career and family life with Terry Gross. "It was what it was: Chaotic, loving, crazy, wonderful, terrible," she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.']]>
            </itunes:summary>
            <itunes:duration>3092</itunes:duration>
            <itunes:explicit>no</itunes:explicit>
            <itunes:episodeType>full</itunes:episodeType>
            <content:encoded>
                <![CDATA[Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. <br/><br/>Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. <br/><br/>Julie Andrews talks about her career and family life with Terry Gross. "It was what it was: Chaotic, loving, crazy, wonderful, terrible," she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.']]>
            </content:encoded>
            <enclosure url="https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191221_fa_fawpod-d342828c-b46a-4df6-aa05-d2ce4286aabc.mp3?awCollectionId=381444908&amp;awEpisodeId=790157296&amp;orgId=1&amp;d=3092&amp;p=381444908&amp;story=790157296&amp;t=podcast&amp;e=790157296&amp;size=49365917&amp;ft=pod&amp;f=381444908" length="49365917" type="audio/mpeg"/>
        </item>
        <item>
            <title>Author Investigates His Family Ties To Jimmy Hoffa's Disappearance </title>
            <description>
                <![CDATA[Jack Goldsmith's memoir 'In Hoffa's Shadow' centers on his investigation into his stepfather's involvement in the 1975 disappearance of mob-connected labor leader Jimmy Hoffa. Hoffa is portrayed by Al Pacino in Martin Scorsese's new Netflix film 'The Irishman.' (Originally broadcast Oct. 2019) <br/><br/>Also, film critic Justin Chang reviews Greta Gerwig's new adaptation of 'Little Women.']]>
            </description>
            <pubDate>Fri, 20 Dec 2019 16:30:44 -0500</pubDate>
            <copyright>Copyright 2015-2019 NPR - For Personal Use Only</copyright>
            <guid>a2f21bce-830b-4922-bb49-f5515b4c8694</guid>
            <link>https://www.npr.org/2019/12/20/790153324/author-investigates-his-family-ties-to-jimmy-hoffas-disappearance</link>
            <itunes:title>Author Investigates His Family Ties To Jimmy Hoffa's Disappearance </itunes:title>
            <itunes:author>NPR</itunes:author>
            <itunes:summary>
                <![CDATA[Jack Goldsmith's memoir 'In Hoffa's Shadow' centers on his investigation into his stepfather's involvement in the 1975 disappearance of mob-connected labor leader Jimmy Hoffa. Hoffa is portrayed by Al Pacino in Martin Scorsese's new Netflix film 'The Irishman.' (Originally broadcast Oct. 2019) <br/><br/>Also, film critic Justin Chang reviews Greta Gerwig's new adaptation of 'Little Women.']]>
            </itunes:summary>
            <itunes:duration>2872</itunes:duration>
            <itunes:explicit>no</itunes:explicit>
            <itunes:episodeType>full</itunes:episodeType>
            <content:encoded>
                <![CDATA[Jack Goldsmith's memoir 'In Hoffa's Shadow' centers on his investigation into his stepfather's involvement in the 1975 disappearance of mob-connected labor leader Jimmy Hoffa. Hoffa is portrayed by Al Pacino in Martin Scorsese's new Netflix film 'The Irishman.' (Originally broadcast Oct. 2019) <br/><br/>Also, film critic Justin Chang reviews Greta Gerwig's new adaptation of 'Little Women.']]>
            </content:encoded>
            <enclosure url="https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191220_fa_fapodfri-ca4b045d-f9c8-4c22-a939-cf28e8f9fc86.mp3?awCollectionId=381444908&amp;awEpisodeId=790153324&amp;orgId=1&amp;d=2872&amp;p=381444908&amp;story=790153324&amp;t=podcast&amp;e=790153324&amp;size=45857279&amp;ft=pod&amp;f=381444908" length="45857279" type="audio/mpeg"/>
        </item>
    </channel>
</rss>`;

const badXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:npr="https://www.npr.org/rss/" xmlns:nprml="https://api.npr.org/nprml" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
    <channel>
        <title>Fresh Air</title>
        <link>http://www.npr.org/programs/fresh-air/</link>
        <description>
            <![CDATA[Fresh Air from WHYY, the Peabody Award-winning weekday magazine of contemporary arts and issues, is one of public radio's most popular programs. Hosted by Terry Gross, the show features intimate conversations with today's biggest luminaries.]]>
        </description>
        <copyright>Copyright 2015-2019 NPR - For Personal Use Only</copyright>
        <generator>NPR API RSS Generator 0.94</generator>
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
        title: 'Fresh Air',
        author: 'NPR',
        category: 'Arts',
        imageUrl: 'https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400',
        entries: [
            {
                guid: 'f2b92544-e0e0-4d46-be47-e04552cf5235',
                title: 'Best Of: Charlize Theron and Best Albums Of 2019 and Julie Andrews',
                author: 'NPR',
                description: `Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. Julie Andrews talks about her career and family life with Terry Gross. \"It was what it was: Chaotic, loving, crazy, wonderful, terrible,\" she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.'`,
                pubDate: '2019-12-21',
                duration: '00:51:32',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191221_fa_fawpod-d342828c-b46a-4df6-aa05-d2ce4286aabc.mp3?awCollectionId=381444908&awEpisodeId=790157296&orgId=1&d=3092&p=381444908&story=790157296&t=podcast&e=790157296&size=49365917&ft=pod&f=381444908'
            },
            {
                guid: 'a2f21bce-830b-4922-bb49-f5515b4c8694',
                title: `Author Investigates His Family Ties To Jimmy Hoffa's Disappearance`,
                author: 'NPR',
                description: `Jack Goldsmith's memoir 'In Hoffa's Shadow' centers on his investigation into his stepfather's involvement in the 1975 disappearance of mob-connected labor leader Jimmy Hoffa. Hoffa is portrayed by Al Pacino in Martin Scorsese's new Netflix film 'The Irishman.' (Originally broadcast Oct. 2019) Also, film critic Justin Chang reviews Greta Gerwig's new adaptation of 'Little Women.'`,
                pubDate: '2019-12-20',
                duration: '00:47:52',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191220_fa_fapodfri-ca4b045d-f9c8-4c22-a939-cf28e8f9fc86.mp3?awCollectionId=381444908&awEpisodeId=790153324&orgId=1&d=2872&p=381444908&story=790153324&t=podcast&e=790153324&size=45857279&ft=pod&f=381444908'
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
        title: 'Fresh Air',
        author: 'NPR',
        category: 'Arts',
        imageUrl: 'https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400',
        entries: [
            {
                guid: 'f2b92544-e0e0-4d46-be47-e04552cf5235',
                title: 'Best Of: Charlize Theron and Best Albums Of 2019 and Julie Andrews',
                author: 'NPR',
                description: `Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. Julie Andrews talks about her career and family life with Terry Gross. \"It was what it was: Chaotic, loving, crazy, wonderful, terrible,\" she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.'`,
                pubDate: '2019-12-21',
                duration: '00:51:32',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191221_fa_fawpod-d342828c-b46a-4df6-aa05-d2ce4286aabc.mp3?awCollectionId=381444908&awEpisodeId=790157296&orgId=1&d=3092&p=381444908&story=790157296&t=podcast&e=790157296&size=49365917&ft=pod&f=381444908'
            },
            {
                guid: 'a2f21bce-830b-4922-bb49-f5515b4c8694',
                title: `Author Investigates His Family Ties To Jimmy Hoffa's Disappearance`,
                author: 'NPR',
                description: `Jack Goldsmith's memoir 'In Hoffa's Shadow' centers on his investigation into his stepfather's involvement in the 1975 disappearance of mob-connected labor leader Jimmy Hoffa. Hoffa is portrayed by Al Pacino in Martin Scorsese's new Netflix film 'The Irishman.' (Originally broadcast Oct. 2019) Also, film critic Justin Chang reviews Greta Gerwig's new adaptation of 'Little Women.'`,
                pubDate: '2019-12-20',
                duration: '00:47:52',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191220_fa_fapodfri-ca4b045d-f9c8-4c22-a939-cf28e8f9fc86.mp3?awCollectionId=381444908&awEpisodeId=790153324&orgId=1&d=2872&p=381444908&story=790153324&t=podcast&e=790153324&size=45857279&ft=pod&f=381444908'
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
        title: 'Fresh Air',
        author: 'NPR',
        category: 'Arts',
        imageUrl: 'https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400',
        entries: [
            {
                guid: 'f2b92544-e0e0-4d46-be47-e04552cf5235',
                title: 'Best Of: Charlize Theron and Best Albums Of 2019 and Julie Andrews',
                author: 'NPR',
                description: `Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. Julie Andrews talks about her career and family life with Terry Gross. \"It was what it was: Chaotic, loving, crazy, wonderful, terrible,\" she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.'`,
                pubDate: '2019-12-21',
                duration: '00:51:32',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191221_fa_fawpod-d342828c-b46a-4df6-aa05-d2ce4286aabc.mp3?awCollectionId=381444908&awEpisodeId=790157296&orgId=1&d=3092&p=381444908&story=790157296&t=podcast&e=790157296&size=49365917&ft=pod&f=381444908'
            },
            {
                guid: 'a2f21bce-830b-4922-bb49-f5515b4c8694',
                title: `Author Investigates His Family Ties To Jimmy Hoffa's Disappearance`,
                author: 'NPR',
                description: `Jack Goldsmith's memoir 'In Hoffa's Shadow' centers on his investigation into his stepfather's involvement in the 1975 disappearance of mob-connected labor leader Jimmy Hoffa. Hoffa is portrayed by Al Pacino in Martin Scorsese's new Netflix film 'The Irishman.' (Originally broadcast Oct. 2019) Also, film critic Justin Chang reviews Greta Gerwig's new adaptation of 'Little Women.'`,
                pubDate: '2019-12-20',
                duration: '00:47:52',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191220_fa_fapodfri-ca4b045d-f9c8-4c22-a939-cf28e8f9fc86.mp3?awCollectionId=381444908&awEpisodeId=790153324&orgId=1&d=2872&p=381444908&story=790153324&t=podcast&e=790153324&size=45857279&ft=pod&f=381444908'
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
    const lookback = 1;

    // Setup expected data
    const expected = {
        title: 'Fresh Air',
        author: 'NPR',
        category: 'Arts',
        imageUrl: 'https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400',
        entries: [
            {
                guid: 'f2b92544-e0e0-4d46-be47-e04552cf5235',
                title: 'Best Of: Charlize Theron and Best Albums Of 2019 and Julie Andrews',
                author: 'NPR',
                description: `Charlize Theron's new film, 'Bombshell,' follows the women of Fox News who accused then-CEO Roger Ailes of sexual harassment. She talks about playing former Fox anchor Megyn Kelly and growing up in apartheid-era South Africa. Rock critic Ken Tucker shares his favorite albums of 2019 — which all happen to be made by women. Julie Andrews talks about her career and family life with Terry Gross. \"It was what it was: Chaotic, loving, crazy, wonderful, terrible,\" she says. She's joined by her daughter, Emma Walton Hamilton, who reflects on what it was like growing up with Mary Poppins as your mom. The mother/daughter duo chronicle Andrews' early years in Hollywood in a new memoir, 'Home Work.'`,
                pubDate: '2019-12-21',
                duration: '00:51:32',
                mp3Location: 'https://play.podtrac.com/npr-381444908/edge1.pod.npr.org/anon.npr-podcasts/podcast/npr/fa/2019/12/20191221_fa_fawpod-d342828c-b46a-4df6-aa05-d2ce4286aabc.mp3?awCollectionId=381444908&awEpisodeId=790157296&orgId=1&d=3092&p=381444908&story=790157296&t=podcast&e=790157296&size=49365917&ft=pod&f=381444908'
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