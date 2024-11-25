// 200 OK
export const sendSuccessResponse = (message, data, res) => {
    res.status(200).json({ success: true, message, data });
};

// 201 Created
export const sendCreatedResponse = (message, data, res) => {
    res.status(201).json({ success: true, message, data });
};

// 400 Bad Request
export const sendBadRequestResponse = (message, res) => {
    res.status(400).json({ success: false, message });
};

// 401 Unauthorized
export const sendUnauthorizedResponse = (message, res) => {
    res.status(401).json({ success: false, message });
};

// 403 Forbidden
export const sendForbiddenResponse = (message, res) => {
    res.status(403).json({ success: false, message });
};

// 404 Not Found
export const sendNotFoundResponse = (message, res) => {
    res.status(404).json({ success: false, message });
};

// 500 Internal Server Error
export const sendServerErrorResponse = (message, res) => {
    res.status(500).json({ success: false, message });
};

// 204 No Content (useful for delete operations)
export const sendNoContentResponse = (res) => {
    res.status(204).send();
};