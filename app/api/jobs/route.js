import cheerio from 'cheerio';

export async function GET() {
  const res = await fetch('https://remoteok.com/remote-dev-jobs');
  const html = await res.text();
  const $ = cheerio.load(html);
  const jobs = [];

  $('tr.job').each((_, el) => {
    const title = $(el).find('.company_and_position [itemprop="title"]').text();
    const company = $(el).find('.company_and_position [itemprop="name"]').text();
    const link = 'https://remoteok.com' + $(el).attr('data-href');
    if (title && company) jobs.push({ title, company, link });
  });

  return Response.json(jobs.slice(0, 5));
}
