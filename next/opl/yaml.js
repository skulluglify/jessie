// const { urlToRequest } = require("loader-utils");
const validate = require("schema-utils");
const YAML = require("yaml");

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
          
            name: "Wrapper YAML Loader",
            baseDataPath: "options",
        
        });

        const obj = YAML.parse(source);

        const context = recurs(obj);

        return `export default ${context}`;

    }

}