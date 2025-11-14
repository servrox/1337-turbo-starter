import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    coverageProvider: 'v8',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@repo/iota-core$': '<rootDir>/../../packages/iota-core/src',
        '^@repo/iota-core/(.*)$': '<rootDir>/../../packages/iota-core/src/$1',
    },
    testPathIgnorePatterns: ['tests'],
};

export default config;
