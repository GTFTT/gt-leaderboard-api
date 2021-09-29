/**
 * Test route
 */

module.exports = ({db}) => {
    return {
        method: 'GET',
        path: '/test',
        handler: async (request, h) => {

            
            const res = await db("test_tbl").select(`name`);
            // console.log('Test route: ', res);

            return {answer: 'OK', data: res};
        }
    }
};