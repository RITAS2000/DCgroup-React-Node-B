
import {logoutUser} from '../services/auth.js';


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
