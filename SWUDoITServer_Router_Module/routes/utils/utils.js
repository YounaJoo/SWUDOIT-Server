const authUtil = {
    successTrue: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },

    successTrueArray: (status, message, index) => {
        return{
            status: status,
            success: true,
            message: message,
            index: index,
        }
    },

    successFalse: (status, message) => {

        return {
            status: status,
            success: false,
            message: message
        }
    },
};

module.exports = authUtil;