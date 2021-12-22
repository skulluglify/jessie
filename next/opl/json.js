// const { urlToRequest } = require("loader-utils");
const validate = require("schema-utils");
// JSON default

const schema = {
    type: "object",
    properties: {
    test: {
        type: "string",
    }
  }
};

const recurs = require("./recurs.js");

module.exports = {

    default: function (source) {
        
        const options = this.getOptions();

        validate(schema, options, {
        
            name: "Wrapper JSON Loader",
            baseDataPath: "options",
        
        });

        const obj = JSON.parse(source);
        
        const context = recurs(obj);
        
        return `export default ${context};`;
    }

}
