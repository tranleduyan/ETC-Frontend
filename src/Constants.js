export const API = {
    key: process.env.REACT_APP_API_KEY,
    domain: process.env.REACT_APP_API_DOMAIN,
}

export const REGEX = {
    // First character is always a letter and followed by 0 or more characters that are either letters, digits, dots, or underscores, always ends with @spu.edu.
    emailAddress: /^[a-zA-z][a-zA-Z0-9._]*@spu\.edu$/,
    onlyDigits: /^\d+$/,
    name: /^[A-Za-z\s'-]+$/,
    studentID: /^900\d{6}$/,
}
