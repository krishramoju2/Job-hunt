import cheerio from 'cheerio';

export async function GET() {
  const res = await fetch('https://www.linkedin.com/search/results/people/?keywords=HR%20SDE'); // ideally needs a proxy or authenticated API
  const html = await res.text();
  const $ = cheerio.load(html);
  const contacts = [];

  // NOTE: This is placeholder logic — LinkedIn blocks scraping.
  // In real use, you'd use a service like Apollo, Lusha, or a paid API.

  $('div.search-result').each((_, el) => {
    const name = $(el).find('.name').text().trim();
    const title = $(el).find('.headline').text().trim();
    const email = $(el).find('.email').text().trim(); // unlikely to exist on public pages
    const company = $(el).find('.company').text().trim();
    if (name && title) {
      contacts.push({ name, title, email, company });
    }
  });

  return Response.json(contacts.slice(0, 10));
}
