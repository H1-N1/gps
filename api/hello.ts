import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from 'google-play-scraper';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { package: pkg, m } = req.query;

    if (!pkg || Array.isArray(pkg)) {
        return res.status(400).json({ error: 'Missing or invalid ?package=com.example.app' });
    }

    try {
        const data = await app({ appId: pkg });

        const timestamp = data.updatedTimestamp || data.updated;
        const lastUpdate = timestamp
            ? new Date(timestamp).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).replace(/ /g, ' ')
            : null;

        if (m === 'all') {
            return res.status(200).json(data);
        }

        return res.status(200).json({
            package: data.appId,
            name: data.title,
            icon: data.icon,
            version: data.version,
            installs: data.installs,
            rating: parseFloat(data.score).toFixed(1),
            developer: data.developer,
            lastUpdate: lastUpdate
            released: data.released,  
            url: data.url,
            summary: data.summary
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch app info.', details: err.message });
    }

}


/*
const { package: pkg } = req.query;

  if (!pkg || Array.isArray(pkg)) {
    return res.status(400).json({ error: 'Missing or invalid ?package=com.example.app' });
  }

  try {
    const data = await app({ appId: pkg });

    const timestamp = data.updatedTimestamp || data.updated;

  const lastUpdate = timestamp
    ? new Date(timestamp).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/ /g, ' ')
    : null;

    //return res.status(200).json(data);
    return res.status(200).json({
        package: data.appId,
        name: data.title,
        icon: data.icon,
        version: data.version,
        installs: data.installs,
        rating: data.scoreText,
        developer: data.developer,
        lastUpdate: lastUpdate
      });
   

  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch app info.', details: err.message });
  }


*/
