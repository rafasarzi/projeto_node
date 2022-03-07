import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) =>{
  try{
    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    delete user.password;

    return response.json({ user, token });

  } catch (err) {let errorMessage = 'falha';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return response.status(400).json({ error: errorMessage});
  }
});

export default sessionsRouter;

