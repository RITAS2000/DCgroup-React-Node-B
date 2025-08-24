
import { FIFTEEN_MINUTES } from '../constants/index.js';
import { registerUser,logoutUser,loginUser } from '../services/auth.js';


export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { session, user } = await loginUser(req.body);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken: session.accessToken,
    },
  });
};




export const logoutUserController = async (req, res) => {
    console.log('in logoutUserController');

    console.log('cookies', req.cookies);

    if (req.cookies.sessionId) {

      await logoutUser(req.cookies.sessionId);
    }
    console.log('logged out');


    res.clearCookie('sessionId');
    //res.clearCookie('refreshToken');

    res.status(204).send();
};
