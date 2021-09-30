module.exports = ({db}) => {
    return {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            
            return "Server is up and running!!!"
        }
    }
};