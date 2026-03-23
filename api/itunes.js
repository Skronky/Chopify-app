export default async function handler(req, res) {
  const { q } = req.query;
  const r = await fetch(`https://itunes.apple.com/search?term=${q}&entity=song&limit=5&country=us`);
  const data = await r.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
}
