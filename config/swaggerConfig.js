import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Numer API",
    version: "1.0.0",
    description: "API for Numer",
  },
  servers: [
    {
      url: "http://localhost:3030/api",
      description: "Server api for Numer",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
