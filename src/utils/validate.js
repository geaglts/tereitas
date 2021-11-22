function validate({ data = {}, schema = {} }) {
    const keys = Object.keys(data);
    if (keys === 0) return false;
    for (let key of keys) {
        const validationStatus = schema[key](data[key]);
        if (!validationStatus.approved) {
            return validationStatus;
        }
    }
    return { approved: true, message: '' };
}

module.exports = validate;
