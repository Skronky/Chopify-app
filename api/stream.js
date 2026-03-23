const play = require('play-dl');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video id' });

  try {
    const info = await play.video_info('https://www.youtube.com/watch?v=' + id);
    console.log('formats:', JSON.stringify(info.format).slice(0, 500));
    res.json({ debug: JSON.stringify(info.format).slice(0, 500) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
