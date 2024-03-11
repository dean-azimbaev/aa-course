require("dotenv").config();

const express = require("express");
const SchemaRegistry = require("./registry");

const HTTP_PORT = process.env.HTTP_PORT;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);

  return next();
});
// Схема будет создавать ручками

app.post("/schemas/:domain/:name/:version/validate", (req, res) => {
  const schema = req.body;

  if (!schema) {
    return res
      .status(400)
      .json({ message: "object for validation must provided in request body" });
  }

  const domain = req.params["domain"];
  const name = req.params["name"];
  const version = req.params["version"];

  if (!SchemaRegistry.exists(domain, name, version)) {
    return res.status(404).json({
      message: `Schema for domain ${domain} object: ${name} with version: ${version} not found`,
    });
  }

  const validatedSchema = SchemaRegistry.validate(
    schema,
    domain,
    name,
    version
  );

  res.status(201).json(validatedSchema);
});

app.get("/schemas/:domain/:event_name/:version", (req, res) => {
  res.status(201).json();
});

function main() {
  app.listen(HTTP_PORT, () => {
    console.log("Schema registry started on port: ", HTTP_PORT);
  });
}

main();
