import { request, response, Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import User from "../models/user";

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request, response) =>{
  try{
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });

    delete user.password;

    return response.json(user);

  } catch (err) {let errorMessage = 'falha';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return response.status(400).json({ error: errorMessage});
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
 async (request, response) => {
  try{
    const updateUserAvatar = new UpdateUserAvatarService();

   const user = await updateUserAvatar.execute({
     user_id: request.user.id,
     avatarFilename: request.file.filename,
   })

   delete user.password;

    return response.json(user)
  }catch (err) {let errorMessage = 'falha';
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  return response.status(400).json({ error: errorMessage});
}
});

export default usersRouter;

