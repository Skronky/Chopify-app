const { YtdlCore } = require('@ybd-project/ytdl-core/serverless');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video id' });

  try {
    const ytdl = new YtdlCore();
    const info = await ytdl.getBasicInfo('https://www.youtube.com/watch?v=' + id);
    const formats = info.formats.filter(function(f) { return f.mimeType && f.mimeType.includes('audio'); });
    formats.sort(function(a, b) { return (b.audioBitrate || 0) - (a.audioBitrate || 0); });
    const best = formats[0];
    if (!best) return res.status(404).json({ error: 'No audio format found' });
    res.json({ url: best.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
