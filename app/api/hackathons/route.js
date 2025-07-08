import cheerio from 'cheerio';

export async function GET() {
  try {
    const res = await fetch('https://mlh.io/seasons/2025/events');
    const html = await res.text();
    const $ = cheerio.load(html);
    const hackathons = [];

    $('.event').each((_, el) => {
      const name = $(el).find('.event-name').text().trim();
      const date = $(el).find('.event-date').text().trim();
      const location = $(el).find('.event-location').text().trim();
      const link = $(el).find('a').attr('href');
      
      if (name && date) {
        hackathons.push({
          name,
          date,
          location,
          link: link?.startsWith('http') ? link : `https://mlh.io${link}`,
        });
      }
    });

    return new Response(JSON.stringify(hackathons.slice(0, 10)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch hackathons' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
