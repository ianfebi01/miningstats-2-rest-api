import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0, refresh_token: 0 });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Register = async (req, res) => {
  // const user = await User.find();
  // res.json(user);
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(404)
      .json({ msg: 'Password and confirm password not match' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: 'register berhasil' });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    // const user = await User.find();
    // res.json(user);
    const user = await User.find({
      email: req.body.email,
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: 'Wrong Password' });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '20s',
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          refresh_token: refreshToken,
        },
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: 'Email tidak ditemukan' });
  }
};

export const Logout = async (req, res) => {
  // const user = await User.find();
  // res.json(user);
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.find({ refresh_token: refreshToken });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0]._id;
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        refresh_token: null,
      },
    }
  );
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};
