/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            loaders: {}, // Automatyczna konfiguracja, możesz tu dodać niestandardowe ustawienia
        },
    },
};

module.exports = nextConfig;
