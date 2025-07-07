export async function GET() {
  const quotes = [
    {
      quote: "Stay hungry, stay foolish.",
      author: "Steve Jobs"
    },
    {
      quote: "It’s not about ideas. It’s about making ideas happen.",
      author: "Scott Belsky"
    },
    {
      quote: "Work hard and be nice to people.",
      author: "Sundar Pichai"
    },
    {
      quote: "Your time is limited, so don’t waste it living someone else’s life.",
      author: "Steve Jobs"
    },
    {
      quote: "Learn continually — there's always one more thing to learn!",
      author: "Satya Nadella"
    },
  ];

  return Response.json(quotes);
}
