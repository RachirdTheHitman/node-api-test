const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  payDate: {
    type: Date,
    default: Date.now
  },
  payFrequency: {
    type: String,
    default: 'Monthly'
  },
  annualIncome: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("annualIncome must be a positive number");
      }
    }
  },
  grossIncome: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("grossIncome must be a positive number");
      }
    }
  },
  incomeTax: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("incomeTax must be a positive number");
      }
    }
  },
  netIncome: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("netIncome must be a positive number");
      }
    }
  },
  super: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("super must be a positive number");
      }
    }
  },
  pay: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("pay must be a positive number");
      }
    }
  }
});

userSchema.pre("save", async function(next) {
  const user = this;

  const userRetrieved = await User.find({ name: user.name });
  if (userRetrieved.length) {
    console.log("userRetrieved", userRetrieved);
    console.log("user exists: ", user.name);
    next(new Error("The user exists and already be paid in this month!"));
  }

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
