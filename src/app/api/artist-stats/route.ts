/**
 * Artist Stats API
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 * 
 * Essential Spotify artist statistics for portfolio showcase
 */

import { withApiMiddleware } from '@/utils/apiMiddleware';
import { getArtistStats } from '@/utils/spotifyApi';
import { apiConfig } from '@/utils/config';

export const GET = withApiMiddleware(
  async () => {
    return await getArtistStats();
  },
  {
    cache: {
      key: 'artist_stats_api',
      ttl: apiConfig.cache.spotifyTtl,
    },
  }
);
