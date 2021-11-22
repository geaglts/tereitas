const schema = {
    name: (name = '') => {
        if (name.length < 3) return { approved: false, message: 'El nombre debe tener al menos 3 caracteres' };
        return { approved: true, message: '' };
    },
    description: (description = '') => {
        if (description.length > 0 && description.length < 3) {
            return { approved: false, message: 'La descripción debe tener al menos 3 caracteres' };
        }
        return { approved: true, message: '' };
    },
};

module.exports = schema;
