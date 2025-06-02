/**
 * Database connector
 * 
 * This utility provides an abstraction layer for database operations
 * It currently uses a simple JSON file-based system but can be easily
 * replaced with a real database like MongoDB, PostgreSQL, or Supabase
 */
import fs from 'fs';
import path from 'path';
import { siteConfig } from './config';
import { ServerCache } from './cache';

// Initialize the cache with a 60-minute TTL for database data
const cache = ServerCache.getInstance({ ttl: 60 * 60 * 1000 });

// Model interfaces
export interface BaseModel {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project extends BaseModel {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  technologies?: string[];
  featured?: boolean;
}

export interface BlogPost extends BaseModel {
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  date: string;
  author?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface Experience extends BaseModel {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  skills?: string[];
  url?: string;
}

// Map model types to their collection names
export type CollectionType = 'projects' | 'experiences' | 'content';
type ModelTypeMap = {
  projects: Project;
  experiences: Experience;
  content: Project;
};

/**
 * Database connector class
 */
export class DatabaseConnector {
  private static instance: DatabaseConnector;
  private dataDir: string;
  
  constructor() {
    // In a production environment, this would point to a real database
    // For development, we'll use a local JSON file structure
    this.dataDir = path.join(process.cwd(), 'src', 'data');
    
    // Ensure data directory exists
    if (!fs.existsSync(this.dataDir)) {
      try {
        fs.mkdirSync(this.dataDir, { recursive: true });
      } catch (error) {
        console.error('Failed to create data directory:', error);
      }
    }
  }

  public static getInstance(): DatabaseConnector {
    if (!DatabaseConnector.instance) {
      DatabaseConnector.instance = new DatabaseConnector();
    }
    return DatabaseConnector.instance;
  }

  /**
   * Get collection
   */
  public collection<T>(name: string) {
    return createCollection<T>(name);
  }

  /**
   * Get all items from a collection
   */
  public async getAll<T extends keyof ModelTypeMap>(
    collection: T,
    options: { language?: string; filter?: Partial<ModelTypeMap[T]>; limit?: number; offset?: number } = {}
  ): Promise<ModelTypeMap[T][]> {
    const { language = siteConfig.defaultLocale, filter, limit, offset } = options;
    
    // Create cache key
    const cacheKey = `db:${collection}:${language}:${JSON.stringify(filter)}:${limit || 'all'}:${offset || 0}`;
    
    // Check cache first
    const cachedData = cache.get<ModelTypeMap[T][]>(cacheKey);
    if (cachedData !== null) {
      return cachedData;
    }
    
    try {
      // In production, this would be a database query
      // For now, we'll read from a JSON file
      const filePath = path.join(this.dataDir, `${collection}_${language}.json`);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        // Try default language as fallback
        const defaultFilePath = path.join(this.dataDir, `${collection}_${siteConfig.defaultLocale}.json`);
        if (!fs.existsSync(defaultFilePath)) {
          return [];
        }
        const data = JSON.parse(fs.readFileSync(defaultFilePath, 'utf8')) as ModelTypeMap[T][];
        cache.set(cacheKey, data);
        return data;
      }
      
      let data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as ModelTypeMap[T][];
      
      // Apply filter if provided
      if (filter) {
        data = data.filter(item => 
          Object.entries(filter).every(([key, value]) => 
            item[key as keyof ModelTypeMap[T]] === value
          )
        );
      }
      
      // Apply pagination if provided
      if (offset !== undefined || limit !== undefined) {
        data = data.slice(offset || 0, offset !== undefined && limit !== undefined ? offset + limit : undefined);
      }
      
      // Cache the result
      cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);
      return [];
    }
  }

  /**
   * Get a single item by ID
   */
  public async getById<T extends keyof ModelTypeMap>(
    collection: T,
    id: string,
    options: { language?: string } = {}
  ): Promise<ModelTypeMap[T] | null> {
    const { language = siteConfig.defaultLocale } = options;
    
    // Create cache key
    const cacheKey = `db:${collection}:${language}:id:${id}`;
    
    // Check cache first
    const cachedData = cache.get<ModelTypeMap[T]>(cacheKey);
    if (cachedData !== null) {
      return cachedData;
    }
    
    try {
      const items = await this.getAll(collection, { language });
      const item = items.find(item => item.id === id) || null;
      
      // Cache the result
      if (item) {
        cache.set(cacheKey, item);
      }
      
      return item;
    } catch (error) {
      console.error(`Error fetching ${collection} by ID:`, error);
      return null;
    }
  }

  /**
   * Get a single item by slug (for blog posts)
   */
  public async getBySlug<T extends keyof ModelTypeMap>(
    collection: T,
    slug: string,
    options: { language?: string } = {}
  ): Promise<ModelTypeMap[T] | null> {
    const { language = siteConfig.defaultLocale } = options;
    
    // Create cache key
    const cacheKey = `db:${collection}:${language}:slug:${slug}`;
    
    // Check cache first
    const cachedData = cache.get<ModelTypeMap[T]>(cacheKey);
    if (cachedData !== null) {
      return cachedData;
    }
    
    try {
      const items = await this.getAll(collection, { language });
      // Type assertion needed since not all model types have slug property
      const item = items.find(item => 'slug' in item && item.slug === slug) || null;
      
      // Cache the result
      if (item) {
        cache.set(cacheKey, item);
      }
      
      return item;
    } catch (error) {
      console.error(`Error fetching ${collection} by slug:`, error);
      return null;
    }
  }

  /**
   * Search items by keyword
   */
  public async search<T extends keyof ModelTypeMap>(
    collection: T,
    query: string,
    options: { language?: string; fields?: Array<keyof ModelTypeMap[T]>; limit?: number } = {}
  ): Promise<ModelTypeMap[T][]> {
    const { language = siteConfig.defaultLocale, fields, limit } = options;
    
    // Create cache key
    const cacheKey = `db:${collection}:${language}:search:${query}:${fields?.join(',')}:${limit || 'all'}`;
    
    // Check cache first
    const cachedData = cache.get<ModelTypeMap[T][]>(cacheKey);
    if (cachedData !== null) {
      return cachedData;
    }
    
    try {
      const items = await this.getAll(collection, { language });
      const normalizedQuery = query.toLowerCase();
      
      const results = items.filter(item => {
        // If fields are specified, only search in those fields
        if (fields && fields.length > 0) {
          return fields.some(field => {
            const value = item[field as keyof ModelTypeMap[T]];
            return typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);
          });
        }
        
        // Otherwise, search in all string fields
        return Object.values(item).some(
          value => typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)
        );
      });
      
      // Apply limit if provided
      const limitedResults = limit ? results.slice(0, limit) : results;
      
      // Cache the result
      cache.set(cacheKey, limitedResults);
      
      return limitedResults;
    } catch (error) {
      console.error(`Error searching ${collection}:`, error);
      return [];
    }
  }

  /**
   * For development/testing: Save mock data to file
   */
  public async saveMockData<T extends keyof ModelTypeMap>(
    collection: T,
    data: ModelTypeMap[T][],
    language: string = siteConfig.defaultLocale
  ): Promise<boolean> {
    try {
      const filePath = path.join(this.dataDir, `${collection}_${language}.json`);
      
      // Add timestamps
      const now = new Date().toISOString();
      const dataWithTimestamps = data.map(item => ({
        ...item,
        updatedAt: now,
        createdAt: item.createdAt || now
      }));
      
      // Write to file
      fs.writeFileSync(filePath, JSON.stringify(dataWithTimestamps, null, 2));
      
      // Invalidate cache for this collection
      cache.delete(`db:${collection}:${language}:all:undefined:0`);
      
      return true;
    } catch (error) {
      console.error(`Error saving mock data for ${collection}:`, error);
      return false;
    }
  }
}

// Database collection factory
export function createCollection<T>(name: string, language = 'de') {
  return {
    find: (filter?: Record<string, unknown>) => {
      let currentFilter = filter || {};
      let currentLimit: number | undefined;
      let currentSkip: number | undefined;
      let currentSort: { field: string; direction: 'asc' | 'desc' } | undefined;
      
      const query = {
        filter: (criteria: Record<string, unknown>) => {
          currentFilter = { ...currentFilter, ...criteria };
          return query;
        },
        sort: (field: string, direction: 'asc' | 'desc') => {
          currentSort = { field, direction };
          return query;
        },
        limit: (n: number) => {
          currentLimit = n;
          return query;
        },
        skip: (n: number) => {
          currentSkip = n;
          return query;
        },
        toArray: async () => {
          // Map collection names to model types
          const collectionToModelType: Record<string, CollectionType> = {
            'projects': 'projects',
            'experiences': 'experiences',
            'content': 'projects' // Default to projects for content collection
          };
          
          const modelType = collectionToModelType[name] as CollectionType;
          if (!modelType) {
            throw new Error(`Unknown collection: ${name}`);
          }
          
          // Get data using the database connector
          const db = DatabaseConnector.getInstance();
          let data = await db.getAll(modelType, { 
            language,
            filter: currentFilter as Partial<Record<string, unknown>>
          });
          
          // Apply sorting if specified
          if (currentSort) {
            data = [...data].sort((a, b) => {
              const aValue = a[currentSort!.field as keyof typeof a];
              const bValue = b[currentSort!.field as keyof typeof b];
              const factor = currentSort!.direction === 'asc' ? 1 : -1;
              
              // Handle string comparison
              if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue) * factor;
              }
              
              // Handle undefined values
              if (aValue === undefined && bValue === undefined) return 0;
              if (aValue === undefined) return 1 * factor; // Undefined values go last
              if (bValue === undefined) return -1 * factor;
              
              // Handle numeric/other comparison
              if (aValue < bValue) return -1 * factor;
              if (aValue > bValue) return 1 * factor;
              return 0;
            });
          }
          
          // Apply skip and limit if specified
          if (currentSkip !== undefined) {
            data = data.slice(currentSkip);
          }
          
          if (currentLimit !== undefined) {
            data = data.slice(0, currentLimit);
          }
          
          return data as unknown as T[];
        },
        first: async () => {
          const results = await query.limit(1).toArray();
          return results.length > 0 ? results[0] : null;
        },
      };
      
      return query;
    },
    findOne: async (filter: Record<string, unknown>) => {
      const query = createCollection<T>(name, language).find(filter);
      return await query.first();
    },
    count: async (filter?: Record<string, unknown>) => {
      const results = await createCollection<T>(name, language).find(filter).toArray();
      return results.length;
    }
  };
}
