const mongoose = require("mongoose");
const bcypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmploye: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isApplicant: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    tokens:
      {
          
              type:String,
              required:false
          

      }
  
  },
  {
    timestamps: true,
  },
  
  
);


userSchema.methods.generateAuthToken = async function () {
  try{
      let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
      this.tokens=this.tokens.concat({token:token})
      await this.save();
      return token
  }
  catch(err) {
     console.log(err)
  }
}

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
