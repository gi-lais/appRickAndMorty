module.exports = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    },
};
