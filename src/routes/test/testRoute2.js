/**
 * Test rute 2
 */

 module.exports = ({}) => {
    return {
        method: 'GET',
        path: '/test2',
        options: {
            tags: ['api'],
            auth: 'jwt'
        },
        handler: async (request, h) => {
            console.log('We are here 2');

            console.log("credentials: ", request.auth.credentials);

            return {answer: 'Test 2'};
        }
    }
};