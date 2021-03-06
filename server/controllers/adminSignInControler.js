const Staff = require("../models/staffModel");
const bcrypt = require("bcrypt");
// ##########################################

const staffControl = {
  getUsers: async (req, res) => {
    try {
      const users = await Staff.find();

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  adminSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const staff = await Staff.findOne({ email });

      if (staff) {
        // if(password == staff.password){
        //     res.json({
        //         _id: staff._id,
        //         name: staff.fullName,
        //         email: staff.email,
        //         role: staff.role,
        //     })
        // }

        // ###################
        bcrypt
          .compare(password, staff.password)
          .then((isMatch) => {
            console.log("passwords are matching");

            console.log(staff.role);

            res.json({
              _id: staff._id,
              name: staff.fullName,
              email: staff.email,
              role: staff.role,
            });
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });

        // ########################

        // else{
        //     console.log("incorrect password")
        //     return res.status(500).json({msg: "invalid password"})
        // }
      } else {
        console.log("incorrect email");
        return res.status(500).json({ msg: "invalid Email" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = staffControl;
