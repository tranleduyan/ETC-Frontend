// Declaring all the API credentials
export const API = {
    key: process.env.REACT_APP_API_KEY,
    domain: process.env.REACT_APP_API_DOMAIN,
};

// Contains all the regular expression
export const REGEX = {
    // First character is always a letter and followed by 0 or more characters that are either letters, digits, dots, or underscores, always ends with @spu.edu.
    emailAddress: /^[a-zA-Z][a-zA-Z0-9._]*@spu\.edu$/,
    
    // Only one or more digits
    onlyDigits: /^\d+$/,
    
    // Only alpha/letters and space are allowed
    name: /^[A-Za-z\s'-]+$/,

    // First start with 900, and the exactly the next 6 characters (must all be digits)
    studentID: /^900\d{6}$/,
};
