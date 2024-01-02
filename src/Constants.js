// Declaring all the API credentials
export const API = {
    // API key for authentication
    key: process.env.REACT_APP_API_KEY,
    
    // Domain or base URL for making API requests
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

    // must be exactly 9 characters (must all be digits)
    schoolId: /^\d{9}$/,
};

// Contains in-app predefined messages
export const MESSAGE = {
    // Message for indicating empty inventory
    emptyInventory: 'There are no items in the inventory.',

    // Message for indicating empty reservations
    emptyReservation: 'There are no reservations.',

    // Message for successfully added an equipment type
    successTypeAddition: 'The type has been successfully added to the inventory.',

    // Message for successfully added an equipment type
    successModelAddition: 'The model has been successfully added to the inventory.',

    // Message for successfully added an equipment type
    successEquipmentAddition: 'The equipment has been successfully added to the inventory.',
};

export const OPTIONS = {
    equipment: {
        conditions: [
            {
                label: 'New',
                value: 'New',
            },
            {
                label: 'Used',
                value: 'Used,'
            },
        ],
        maintenanceStatus: [
            {
                label: 'Ready',
                value: 'Ready',
            },
            {
                label: 'Under Repair',
                value: 'Under Repair',
            }
        ],
        reservationStatus: [
            {
                label: 'In Use',
                value: 'In Use',
            },
            {
                label: 'Available',
                value: 'Available',
            }
        ],
    },
};