import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../../modules/users/services/CreateUserService';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import uploadConfig from '../../config/upload';
import UpdateUserAvatarService from '../../modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename,
    });

    return response.json({ user });
  },
);

export default usersRouter;
