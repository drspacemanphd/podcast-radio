function RssEntry(guid, podcast, title, publicationDate, link, duration) {
    this.guid = guid;
    this.podcast = podcast;
    this.title = title;
    this.publicationDate = publicationDate;
    this.link = link;
    this.duration = duration;
}

function RssEntryBuilder() {
    this.Guid = null;
    this.Podcast = null;
    this.Title = null;
    this.PublicationDate = null;
    this.Link = null;
    this.Duration = null;

    this.guid = (guid) => {
        this.Guid = guid;
        return this;
    }

    this.podcast = (podcast) => {
        this.Podcast = podcast;
        return this;
    }

    this.title = (title) => {
        this.Title = title;
        return this;
    }

    this.publicationDate = (publicationDate) => {
        this.PublicationDate = publicationDate;
        return this;
    }

    this.link = (link) => {
        this.Link = link;
        return this;
    }

    this.duration = (duration) => {
        this.Duration = duration;
        return this;
    }

    this.build = () => {
        return new RssEntry(this.Guid, this.Podcast, this.Title, this.PublicationDate, this.Link, this.Duration);
    }

}

module.exports = RssEntryBuilder;