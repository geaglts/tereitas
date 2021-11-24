async function validate({ schema, data }) {
    try {
        const approvedValidation = await schema.validate(data);
        return { data: approvedValidation, message: 'approved', approved: true };
    } catch (error) {
        const { message } = JSON.parse(JSON.stringify(error));
        return { data: null, message, approved: false };
    }
}

export default validate;
