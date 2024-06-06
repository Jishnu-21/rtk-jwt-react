const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminModel')
const User = require('../model/userModel')

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


const getUser = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    await user.updateOne({ isActive: !user.isActive });
    const updatedUser = await User.findById(req.params.id)

    res.status(200).json(updatedUser)
})

const searchUser = asyncHandler(async (req, res) => {

    try {
        let search = req.body.search
        User.find({
            $or: [
                { name: { $regex: ".*" + search + ".*", $options: "i" } },
                { email: { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            console.log(err)
            res.status(400).json(err);
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({ id: req.params.id })
})


const editUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // Update user information
    user.name = name;
    user.email = email;

    // Save the updated user to the database
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
});


module.exports = {
    getUser,
    loginAdmin,
    updateUser,
    deleteUser,
    searchUser,
    editUser
}