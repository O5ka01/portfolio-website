/**
 * Server-side caching utility
 * Provides a memory cache for server functions with TTL support
 */

interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize?: number; // Max number of items in cache
}

interface CacheItem<T> {
  value: T;
  expiry: number;
}

type CacheStore = Map<string, CacheItem<unknown>>;

export class ServerCache {
  private static instance: ServerCache;
  private cache: CacheStore = new Map();
  private config: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes default TTL
    maxSize: 100, // Default max size
  };

  private constructor(config?: Partial<CacheConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }

    // Clean expired items periodically
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanExpired(), 60 * 1000); // Clean every minute
    }
  }

  public static getInstance(config?: Partial<CacheConfig>): ServerCache {
    if (!ServerCache.instance) {
      ServerCache.instance = new ServerCache(config);
    }
    return ServerCache.instance;
  }

  /**
   * Get an item from cache
   */
  public get<T>(key: string): T | null {
    const item = this.cache.get(key) as CacheItem<T> | undefined;
    
    if (!item) return null;
    
    // Check if item has expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  /**
   * Set an item in cache with optional TTL override
   */
  public set<T>(key: string, value: T, ttl?: number): void {
    // Check if we need to evict items
    if (this.config.maxSize && this.cache.size >= this.config.maxSize) {
      this.evictOldest();
    }
    
    const expiry = Date.now() + (ttl || this.config.ttl);
    this.cache.set(key, { value, expiry } as CacheItem<unknown>);
  }

  /**
   * Delete an item from cache
   */
  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all items from cache
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Get the current cache size
   */
  public size(): number {
    return this.cache.size;
  }

  /**
   * Memoize an async function with caching
   * @param fn The function to memoize
   * @param keyFn Optional function to generate a key from the arguments
   * @param ttl Optional TTL override
   */
  public memoize<T, Args extends unknown[]>(
    fn: (...args: Args) => Promise<T>,
    keyFn?: (...args: Args) => string,
    ttl?: number
  ): (...args: Args) => Promise<T> {
    return async (...args: Args): Promise<T> => {
      // Generate cache key
      const key = keyFn
        ? keyFn(...args)
        : `${fn.name}:${JSON.stringify(args)}`;
      
      // Check cache first
      const cached = this.get<T>(key);
      if (cached !== null) {
        return cached;
      }
      
      // Execute function and cache result
      const result = await fn(...args);
      this.set(key, result, ttl);
      return result;
    };
  }

  /**
   * Remove all expired items from cache
   */
  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Evict the oldest item from cache when it reaches maxSize
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestExpiry = Infinity;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry < oldestExpiry) {
        oldestExpiry = item.expiry;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}
