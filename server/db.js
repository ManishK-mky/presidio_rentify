const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO); // This is used to connect our backend code with the database.

module.exports = mongoose.connection

// module.exports = ...' This line exports the mongoose.connection object so that it can be imported and used in other parts of your application.
//  By exporting the connection object, other parts of your application can access the database connection to perform operations such as querying
//  the database, creating models, and listening for events like errors and disconnections.