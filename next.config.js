/* eslint-disable @typescript-eslint/no-var-requires */
const {REACT_APP_ENV} = process.env
const CONFIG = require(`./src/config/${REACT_APP_ENV}`)

const isLocal = REACT_APP_ENV === 'local'
const LOCAL_ORIGIN = 'http://localhost:3000'

/** both server and client */
const publicRuntimeConfig = {
    REACT_APP_ENV,
    ...CONFIG,
}

/**
 * @todo api proxy(local) 추가 필요
 */
module.exports = {
    env: publicRuntimeConfig,
    publicRuntimeConfig,
    generateEtags: true,
    webpack: ({entry: originalEntries, plugins, ...restConfig}, {webpack}) => ({
        ...restConfig,
        entry: async () => {
            const entries = await originalEntries()

            if (
                entries['main.js'] &&
                !entries['main.js'].includes('./src/utils/polyfills.js')
            ) {
                entries['main.js'].unshift('./src/utils/polyfills.js')
            }

            return entries
        },
        plugins: [...plugins, new webpack.IgnorePlugin(/\/__tests__\//)],
    }),
    async redirects() {
        return [
            {
                basePath: false,
                source: '/',
                destination: '/covid',
                permanent: true,
            },
            {
                basePath: false,
                source: '/login',
                destination: '/covid/login',
                permanent: true,
            },
        ]
    },
    ...(isLocal && {
        async rewrites() {
            return [
                {
                    basePath: false,
                    source: '/image/:path*',
                    destination: `${LOCAL_ORIGIN}/:publicfiles`,
                },
                {
                    basePath: false,
                    source: '/assets/:path*',
                    destination: `${LOCAL_ORIGIN}/:publicfiles`,
                },
            ]
        },
    }),
}
