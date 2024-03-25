const express = require("express");
const appRoutes = require("./routes/routes");
module.exports = function startApplication(app) {
  const port = process.env.PORT || 4044;

  app.use(express.json());
  app.use("/api", appRoutes);
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
