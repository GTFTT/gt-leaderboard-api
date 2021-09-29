/**
 * Route exception handler, if you need to proceed all errors or a specific type type of them from one point,
 * do it from here.
 * @param {*} param0  Contains handler
 * @param {*} request Request object
 * @param {*} h       Vision object for extending functionality
 * @returns 
 */
module.exports = async ({handler}, request, h) => {
    try {
        return await handler(request, h);
    } catch (err) {
        console.log(err);
        request.server.log(['error'], err);
        return err;
    }
};