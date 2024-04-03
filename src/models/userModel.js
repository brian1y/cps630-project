const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// user signup function
userSchema.statics.signup = async function(username, password) {

    // validate user credentials

    // username can have alphanumeric characters, hyphens and underscores. Must be 1 to 16 characters in length
    const user_regex = /^[a-zA-Z0-9_-]{1,16}$/;

    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    if (!user_regex.test(username)) {
        throw Error('Username is invalid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // check if username already exists in database
    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('Username already in use')
    }

    // hash user password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create entry
    const user = await this.create({ username, password: hash })

    return user

}

// login function

userSchema.statics.login = async function(username, password) {
    // validate user credentials

    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    // check if username exists
    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Invalid username')
    }

    // check if login password matches hashed password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid password')
    }

    return user

}


module.exports = mongoose.model('User', userSchema)