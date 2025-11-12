import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    coverageProvider: 'v8',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@iota/core$': '<rootDir>/lib/iota-core',
        '^@iota/core/(.*)$': '<rootDir>/lib/iota-core/$1',
    },
    testPathIgnorePatterns: ['tests'],
};

export default config;
