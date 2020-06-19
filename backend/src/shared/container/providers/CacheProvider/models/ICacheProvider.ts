export default interface ICacheProvider {
  save<T>(key: string, value: T): Promise<void>;
  invalidate(key: string): Promise<void>;
  retrieve<T>(key: string): Promise<T | null>;
  invalidatePrefix(prefix: string): Promise<void>;
}
