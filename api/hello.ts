import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from 'google-play-scraper';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { package: pkg } = req.query;

  if (!pkg || Array.isArray(pkg)) {
    return res.status(400).json({ error: 'Missing or invalid ?package=com.example.app' });
  }

  try {
    const data = await app({ appId: pkg });

    // Convert timestamp to ISO date
   const lastUpdateISO = data.updatedTimestamp || data.updated
      ? new Date(data.updatedTimestamp || data.updated).toISOString()
      : null;

    // Round rating to 1 decimal
    const rating = (typeof data.score === 'number' ? Math.round(data.score * 10) / 10 :
                   typeof data.rating === 'number' ? Math.round(data.rating * 10) / 10 :
                   null);
    //return res.status(200).json(data);
  return res.status(200).json({
      package: data.appId,
      name: data.title,
      icon: data.icon,
      version: data.version,
      installs: data.installs,
      rating: data.scoreText,
      developer: data.developer,
      lastUpdate: lastUpdateISO
    });
   

  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch app info.', details: err.message });
  }
}


/*



*/
