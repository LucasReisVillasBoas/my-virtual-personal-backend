import assert from 'assert';

export function getEnvOrThrow(envName: string): string {
  const env = process.env[envName];
  assert(env, `Missing environment variable ${envName}`);
  return env;
}

export function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

export const PORT_NUMBER = getEnvOrDefault('PORT_NUMBER', '3000');

export const DATABASE_NAME = getEnvOrThrow('DATABASE_NAME');
export const DATABASE_USER = getEnvOrThrow('DATABASE_USER');
export const DATABASE_PASSWORD = getEnvOrThrow('DATABASE_PASSWORD');

export const MIN_HEIGTH = parseInt(getEnvOrDefault('MIN_HEIGTH', '0'), 10);
export const MAX_HEIGTH = parseInt(getEnvOrDefault('MAX_HEIGTH', '100'), 10);
export const MIN_WEIGHT = parseInt(getEnvOrDefault('MIN_WEIGHT', '0'), 10);
export const MAX_WEIGHT = parseInt(getEnvOrDefault('MAX_WEIGHT', '100'), 10);
