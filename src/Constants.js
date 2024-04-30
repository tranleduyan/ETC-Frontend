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

    // Message for indicating empty upcoming reservations
    emptyUpcomingReservation: 'There are no upcoming reservations.',

    // Message for indicating empty types
    emptyType: 'There are no types in the inventory.',

    // Message for indicating empty models
    emptyModel: 'There are no models in the inventory.',

    // Message for indicating empty equipments
    emptyEquipment: 'There is no equipment in the inventory.',

    // Message for indicating empty available items
    emptyAvailableModels: 'There is no equipment available in this time period.',

    // Message for successfully added an equipment type
    successTypeAddition: 'The type has been successfully added to the inventory.',

    // Message for successfully added an equipment model
    successModelAddition: 'The model has been successfully added to the inventory.',

    // Message for successfully added an equipment 
    successEquipmentAddition: 'The equipment has been successfully added to the inventory.',

    // Message for successfully removed mass equipment types
    successTypeMassRemoval: 'The selected types have been successfully removed from the inventory.',

    // Message for successfully removed mass equipment models
    successModelMassRemoval: 'The selected models have been successfully removed from the inventory.',

    // Message for successfully removed mass equipments
    successEquipmentMassRemoval: 'The selected equipment have been successfully removed from the inventory.',

    // Message for successfully removed an equipment type
    successTypeRemoval: 'The type has been successfully removed from the inventory.',

    // Message for successfully removed an equipment model
    successModelRemoval: 'The model has been successfully removed from the inventory.',

    // Message for successfully removed an equipment
    successEquipmentRemoval: 'The equipment has been successfully removed from the inventory.',

    // Message for successfully update a type
    successTypeUpdate: 'The type has been successfully updated in the inventory.',

    // Message for successfully update a type
    successEquipmentUpdate: 'The equipment has been successfully updated in the inventory.',

    // Message for successfully update a type
    successModelUpdate: 'The model has been successfully updated in the inventory.',
};

// Constants for drop down options
export const OPTIONS = {
    // Options for equipments dropdowns - conditions, maintenance status, reservation status
    equipment: {
        conditions: [
            {
                label: 'New',
                value: 'New',
            },
            {
                label: 'Used',
                value: 'Used'
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