const express = require("express");

module.exports = function startApplication(app) {
    const port = process.env.PORT || 4044;

    app.use(express.json());

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
