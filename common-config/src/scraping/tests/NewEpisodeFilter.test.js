const episodeFilter = require('../NewEpisodeFilter');

const epsidesFromTestFeed = [
    {
        guid: '1',
        title: 'TITLE 1',
        author: 'AUTHOR 1',
        description: 'DESCRIPTION 1',
        pubDate: '2019-01-01',
        duration: '20:00',
        mp3Location: 'LOCATION 1'
    },
    {
        guid: '2',
        title: 'TITLE 2',
        author: 'AUTHOR 2',
        description: 'DESCRIPTION 2',
        pubDate: '2019-01-01',
        duration: '20:00',
        mp3Location: 'LOCATION 2'
    },
    {
        guid: '3',
        title: 'TITLE 3',
        author: 'AUTHOR 3',
        description: 'DESCRIPTION 3',
        pubDate: '2019-01-01',
        duration: '20:00',
        mp3Location: 'LOCATION 3'
    }
];

const idsOfSavedEpisodes = ['2'];


test('test that episodes can be properly filtered via id', () => {

    const expected = [
        {
            guid: '1',
            title: 'TITLE 1',
            author: 'AUTHOR 1',
            description: 'DESCRIPTION 1',
            pubDate: '2019-01-01',
            duration: '20:00',
            mp3Location: 'LOCATION 1'
        },
        {
            guid: '3',
            title: 'TITLE 3',
            author: 'AUTHOR 3',
            description: 'DESCRIPTION 3',
            pubDate: '2019-01-01',
            duration: '20:00',
            mp3Location: 'LOCATION 3'
        }
    ];

    expect(episodeFilter.filter(epsidesFromTestFeed, idsOfSavedEpisodes)).toEqual(expected);

});

test('test that all episodes returned when there are no saved episodes is empty', () => {
    expect(episodeFilter.filter(epsidesFromTestFeed, [])).toEqual(epsidesFromTestFeed);
});

test('test that no episodes returned when all have been saved', () => {
    const savedIds = epsidesFromTestFeed.map(e => e.guid);
    expect(episodeFilter.filter(epsidesFromTestFeed, savedIds)).toEqual([]);
});