const ytdl = require('ytdl-core');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video id' });

  try {
    const info = await ytdl.getInfo('https://www.youtube.com/watch?v=' + id);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });
    if (!format) return res.status(404).json({ error: 'No audio format found' });
    res.json({ url: format.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
