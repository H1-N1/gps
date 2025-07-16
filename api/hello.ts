

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from 'google-play-scraper';

import { VercelRequest, VercelResponse } from '@vercel/node';
import app from 'your-scraper-library'; // Replace with actual import

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { package: pkg } = req.query;

  if (!pkg || Array.isArray(pkg)) {
    return res.status(400).json({ error: 'Missing or invalid ?package=com.example.app' });
  }

  try {
    const data = await app({ appId: pkg });

    // Format last update
    let lastUpdateISO: string;
    if (data.updatedTimestamp) {
      lastUpdateISO = new Date(data.updatedTimestamp).toISOString();
    } else if (data.updated) {
      lastUpdateISO = new Date(data.updated).toISOString();
    } else {
      lastUpdateISO = null;
    }

    // Format rating
    const rating = data.score ? parseFloat(data.score.toFixed(1)) : null;

    return res.status(200).json({
      package: data.appId,
      name: data.title,
      icon: data.icon,
      version: data.version,
      installs: data.installs,
      rating: rating,
      developer: data.developer,
      lastUpdate: lastUpdateISO
    });

  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch app info.', details: err.message });
  }
}

