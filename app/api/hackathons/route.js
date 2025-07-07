import cheerio from 'cheerio';

export async function GET() {
  const res = await fetch('https://mlh.io/seasons/2025/events'); // MLH official hackathon list
  const html = await res.text();
  const $ = cheerio.load(html);
  const hackathons = [];

  $('.event').each((_, el) => {
    const name = $(el).find('.event-name').text().trim();
    const date = $(el).find('.event-date').text().trim();
    const location = $(el).find('.event-location').text().trim();
    const link = $(el).find('a').attr('href');
    if (name && date) {
      hackathons.push({ name, date, location, link });
    }
  });

  return Response.json(hackathons.slice(0, 10));
}
