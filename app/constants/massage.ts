export const message = {
    SUCCESS: {
        ASSET_CREATED: 'The asset has been successfully registered.',
        ASSET_DELETED: 'The asset has been successfully deleted.',
        ASSET_MODIFIED: 'The changed have been reflected.',
        LOGIN_SUCCESS: 'You are now logged in.',
        LOGOUT_SUCCESS: 'You are now logged out.', 
        SIGNUP_SUCCESS: 'You have successfully signed up. Please log in to continue.',
    },

    ERROR: {
        NOT_FOUND: 'Asset not found.',
        VALIDATION_ERROR: 'Please check your input.',
        LOGIN_ERROR: 'Login failed.',
        SERVER_ERROR: 'A server error has occurred.',
        NETWORK_ERROR: 'A network error has occurred.',
        FORBIDDEN: 'You do not have permission.',
    },

    CONFIRM: {
        DELETE_ASSET: 'Are you sure that removing this asset?',
        CONFIRMED_RETURN: 'Would you like to return it?',
        LOGOUT: 'Are you sure you want to log out?'
    }
} as const;