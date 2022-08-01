const options = {
  swaggerDefinition: {
    info: {
      title: "JaksimHaru API",
      version: "1.0.0",
      description: "JSHR API with express",
    },
    host: "localhost:8800",
    basePath: "/",
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

export default options;
