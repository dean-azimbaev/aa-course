const fs = require("fs");
const path = require("path");
const jsonschema = require("jsonschema");

class SchemaRegistry {
  static exists = (domain, name, version) => {
    const path_to_schema =
      path.join(__dirname, "schemas", domain, name, version) + ".json";

    const exists = fs.existsSync(path_to_schema);

    if (!exists) {
      console.debug(
        `Schema for domain: ${domain} object: ${name} with version: ${version} not found`
      );
    }

    return exists;
  };

  static validate = (object, domain, name, version) => {
    const path_to_schema =
      path.join(__dirname, "schemas", domain, name, version) + ".json";

    const schema = JSON.parse(
      fs.readFileSync(path_to_schema, { encoding: "utf8" })
    );

    const result = jsonschema.validate(object, schema);

    return {
      is_valid: result.valid,
    };
  };
}

module.exports = SchemaRegistry;
