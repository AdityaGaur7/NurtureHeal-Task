export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const MESSAGES = {
    USER_CREATED: 'User created successfully',
    LOGIN_SUCCESS: 'Login successful',
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_EXISTS: 'User already exists with this email',
    ALL_FIELDS_REQUIRED: 'All fields are required',
    PASSWORD_LENGTH: 'Password must be at least 6 characters',
    NO_HEALTH_DATA: 'No health data found',
    SERVER_ERROR: 'Server error'
};

export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 6,
    MAX_STRESS_LEVEL: 10,
    MIN_STRESS_LEVEL: 1
};
