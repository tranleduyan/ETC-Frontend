const isProduction = process.env.NODE_ENV === 'production';

export const API = {
    key: process.env.REACT_APP_API_KEY,
    domain: process.env.REACT_APP_API_DOMAIN,
}
