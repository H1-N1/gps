import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;
  return res.json({
    message: `Hello ${name}!`,
  });
}


/*
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from 'google-play-scraper';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { package: pkg } = req.query;

  if (!pkg || Array.isArray(pkg)) {
    return res.status(400).json({ error: 'Missing or invalid ?package=com.example.app' });
  }

  try {
    const data = await app({ appId: pkg });

    return res.status(200).json({
      package: data.appId,
      name: data.title,
      icon: data.icon,
      version: data.version,
      installs: data.installs,
      rating: data.score,
      developer: data.developer
    });

  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch app info.', details: err.message });
  }
}
*/
