const isProduction = process.env.NODE_ENV === 'production';

export const API = {
    key: '',
    domain: isProduction ? 'api-domain.com' : 'http://localhost:3000',
}