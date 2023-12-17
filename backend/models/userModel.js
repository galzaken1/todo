import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })


// Pre triggers function that happens before 
//saving a new user.
//used to hash password for security
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {  // isModified, returns true if modified
        return next();
    }
    const salt = await bcrypt.genSalt(10); // // generates salt - a random number of bytes
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPasswords = async function (enteredPassword) {
    const match = await bcrypt.compare(enteredPassword, this.password);
    return match
}
const User = mongoose.model("User", userSchema);
export default User