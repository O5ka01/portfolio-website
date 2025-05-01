/**
 * Database utilities
 * This file serves as the central export point for database-related utilities
 */
import { DatabaseConnector, CollectionType } from './database';

// Export a singleton instance of the DatabaseConnector
export const db = DatabaseConnector.getInstance();

// Define common interfaces that resolve the type issues
export interface DbQuery<T> {
  filter(criteria: Record<string, unknown>): DbQuery<T>;
  sort(field: string, direction: 'asc' | 'desc'): DbQuery<T>;
  limit(n: number): DbQuery<T>;
  skip(n: number): DbQuery<T>;
  toArray(): Promise<T[]>;
  first(): Promise<T | null>;
}

export interface DbCollection<T> {
  find(filter?: Record<string, unknown>): DbQuery<T>;
  findOne(filter: Record<string, unknown>): Promise<T | null>;
  count(filter?: Record<string, unknown>): Promise<number>;
}

// Add collection method type to DatabaseConnector
declare module './database' {
  interface DatabaseConnector {
    collection<T>(name: string): DbCollection<T>;
  }
}

// Database collection factory
export function createCollection<T>(name: string, language = 'de'): DbCollection<T> {
  return {
    find: (filter?: Record<string, unknown>) => {
      let currentFilter = filter || {};
      let currentLimit: number | undefined;
      let currentSkip: number | undefined;
      let currentSort: { field: string; direction: 'asc' | 'desc' } | undefined;
      
      const query: DbQuery<T> = {
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
            'blogPosts': 'blogPosts',
            'experiences': 'experiences',
            'content': 'projects' // Default to projects for content collection
          };
          
          const modelType = collectionToModelType[name] || 'projects';
          
          // Get data using the database connector
          let data = await db.getAll(modelType, { 
            language,
            filter: currentFilter as Record<string, unknown>
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
          
          return data as T[];
        },
        first: async () => {
          const results = await query.limit(1).toArray();
          return results.length > 0 ? results[0] : null;
        },
      };
      
      return query;
    },
    findOne: async (filter: Record<string, unknown>) => {
      return await createCollection<T>(name, language).find(filter).first();
    },
    count: async (filter?: Record<string, unknown>) => {
      const results = await createCollection<T>(name, language).find(filter).toArray();
      return results.length;
    }
  };
}

// Add a collection method to the db object
db.collection = function<T>(name: string): DbCollection<T> {
  return createCollection<T>(name);
};
