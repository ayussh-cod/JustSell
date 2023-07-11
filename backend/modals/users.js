const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  pic: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(user.password, salt);
    user.password = hashpassword;
    next();
  } catch (error) {}
});
const User = mongoose.model("User", UserSchema);
module.exports=User;
