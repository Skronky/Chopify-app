import { YtdlCore } from '@ybd-project/ytdl-core/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video id' });

  try {
    const ytdl = new YtdlCore();
    const info = await ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${id}`);
    const formats = info.formats.filter(f => f.mimeType && f.mimeType.includes('audio'));
    formats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));
    const best = formats[0];
    if (!best) return res.status(404).json({ error: 'No audio format found' });
    res.json({ url: best.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}