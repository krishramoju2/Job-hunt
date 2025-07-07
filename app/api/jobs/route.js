import cheerio from 'cheerio';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword')?.toLowerCase();
  const companyFilter = searchParams.get('company')?.toLowerCase();

  const res = await fetch('https://remoteok.com/remote-dev-jobs');
  const html = await res.text();
  const $ = cheerio.load(html);
  const jobs = [];

  $('tr.job').each((_, el) => {
    const title = $(el).find('.company_and_position [itemprop="title"]').text().trim();
    const company = $(el).find('.company_and_position [itemprop="name"]').text().trim();
    const link = 'https://remoteok.com' + $(el).attr('data-href');

    if (title && company) {
      jobs.push({ title, company, link });
    }
  });

  // Apply filters
  const filtered = jobs.filter((job) => {
    const matchesKeyword = keyword ? job.title.toLowerCase().includes(keyword) : true;
    const matchesCompany = companyFilter ? job.company.toLowerCase().includes(companyFilter) : true;
    return matchesKeyword && matchesCompany;
  });

  return Response.json(filtered.slice(0, 20));
}
