// utils/reducer/reducer.utils.js

/**
 * Function to create an action
 * @param {string} type - The type of the action
 * @param {*} payload - The payload of the action
 * @returns {Object} - Action object with type and payload
 */
const createAction = (type, payload) => {
    return {
      type,
      payload,
    };
  };
  
  export default createAction;
  