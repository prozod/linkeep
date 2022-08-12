import * as cheerio from 'cheerio';
import { OGOutput } from '../types/ogscraper';

export async function og_scraper(html: string) {
  const $ = cheerio.load(html);
  const title = $('title').text();
  const description = $("meta[name='description']").attr('content');
  const ogTitle = $("meta[property='og:title']").attr('content');
  const ogImage = {
    url: $("meta[property='og:image']").attr('content'),
    type: $("meta[property='og:image:type']").attr('content'),
    width: $("meta[property='og:image:width']").attr('content'),
    height: $("meta[property='og:image:height']").attr('content'),
  };
  const ogDescription = $("meta[property='og:description']").attr('content');
  const ogVideo = $("meta[property='og:video']").attr('content');
  const ogType = $("meta[property='og:type']").attr('content');
  const ogUrl = $("meta[property='og:url']").attr('content');
  const ogSitename = $("meta[property='og:site_name']").attr('content');
  const twitterSite = $("meta[property='twitter:site']").attr('content');
  const twitterCreator = $("meta[property='twitter:creator']").attr('content');
  const twitterImage = $("meta[property='twitter:image']").attr('content');

  const og_scrap_data: OGOutput = {
    meta: {
      description: description,
      title: title,
    },
    og: {
      image: ogImage,
      description: ogDescription,
      title: ogTitle,
      site_name: ogSitename,
      type: ogType,
      url: ogUrl,
      video: ogVideo,
    },
    twitter: {
      site: twitterSite,
      creator: twitterCreator,
      image: twitterImage,
    },
  };

  return og_scrap_data;
}
