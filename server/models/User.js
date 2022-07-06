const mongoose =  require ('mongoose')
const {isEmail} = require ('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Can't be blank"]
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:[true, "Can't be blank"],
        index:true,
        validate:[isEmail, "Invalid email"]
    },
    password:{
        type:String,
        required:[true, "Can't be blank"]
    },
    picture:{
        type:String,
    },
    newMessages:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        default:'Online'
    }
}, {minimize:false})
// with minimize we can have empry obj by default and it will not throw an error

// HOOK TO HASHING THE PASSWORD BEFORE START DOING ANYTHING ELSE
UserSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, function(err,salt){
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})

//RETURN EVERYTHING EXCEPT THE PASSWORD
UserSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}


//creating findByCredentials function
UserSchema.statics.findByCredentials = async function(email,password){
    const user = await User.findOne({email})
    if(!user) throw new Error ("Invalid email or password")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error ("Invalid email or password")
    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User