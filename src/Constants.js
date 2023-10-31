const isProduction = process.env.NODE_ENV === 'production';

export const API = {
    key: isProduction ? process.env.API_KEY : process.env.REACT_APP_API_KEY,
    domain: isProduction ? process.env.API_DOMAIN : process.env.REACT_APP_API_DOMAIN,
}
