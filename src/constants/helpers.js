const _ = require('lodash');

/**
 * Takes model and converts it to another model
 * Example: {myVal: 123, testVal: 'hello'} => {my_val_in_db: 123, test_val_id_db: 'hello'}
 * @param {*} model - object to be converted
 * @param {*} fieldsMap - keyValue object says how to transform keys of model
 * @returns Converted model(ready to be inserted into knex)
 */
const convertModel = (model, fieldsMap) => {
    const convertedModel = _.transform(model, (result, value, key) => {
        const mapToKey = fieldsMap[key];
        if (mapToKey) result[mapToKey] = value;
        return result;
    });
    return convertedModel;
};

/**
 * Clear text from unwanted characters and prepare it for using in search queries(not only)
 * @param {*} text - text to be cleaned for search
 * @returns Clean text
 */
function escapeRegExp(text) {
    if (!text) {
      return text;
    }
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  

module.exports = {
    convertModel,
    escapeRegExp,
}