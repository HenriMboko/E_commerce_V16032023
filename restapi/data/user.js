const bcrypt = require("bcrypt")


const users = [
    {
        name: "Admin user",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Henri user",
        email: "henri@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Peas user",
        email: "peas@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    }
]


module.exports = users;