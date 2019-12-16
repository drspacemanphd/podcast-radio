function PodcastEpisode(EpisodeId, Title, Podcast, PublicationDate, Downloads, Link, Duration) {
    this.EpisodeId = EpisodeId;
    this.Title = Title;
    this.Podcast = Podcast;
    this.PublicationDate = PublicationDate;
    this.Downloads = Downloads;
    this.Link = Link;
    this.Duration = Duration;
}

function PodcastEpisodeBuilder() {

    this.EpisodeId = null;
    this.Title = null;
    this.Podcast = null;
    this.PublicationDate = null;
    this.Downloads = null;
    this.Link = null;
    this.Duration = null;

    this.episodeId = (episodeId) => {
        this.EpisodeId = episodeId;
        return this;
    }

    this.title = (title) => {
        this.Title = title;
        return this;
    }

    this.podcast = (podcast) => {
        this.Podcast = podcast;
        return this;
    }

    this.publicationDate = (publicationDate) => {
        this.PublicationDate = publicationDate;
        return this;
    }
    this.downloads = (downloads) => {
        this.Downloads = downloads;
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
        return new PodcastEpisode(this.EpisodeId, this.Title, this.Podcast, this.PublicationDate, this.Downloads, this.Link, this.Duration);
    }

}

module.exports = PodcastEpisodeBuilder;