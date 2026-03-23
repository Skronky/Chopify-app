export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  try {
    const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5&country=us`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'iTunes fetch failed', detail: err.message });
  }
}

