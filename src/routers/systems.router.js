import cmd from 'node-cmd';
import { Router } from 'express';

const systemsRouter = Router();
const { SYSTEM_SECRET, GITHUB_URL, GITHUB_TOKEN } = process.env;

// ✔ create update system api
systemsRouter.post('/', async (req, res) => {
  try {
    // ✔ get and check token from request header
    let token = req.headers['x-token'];
    if (!token && token !== SYSTEM_SECRET) return console.Error('Update system api error.', 'Token is missing or wrong.', 'Add token in request header and try again.', res, 401);

    // ✔ check repository url for update and add repository url with github token in process environment
    const repository = req.body.repository_url || GITHUB_URL;
    process.env.GITHUB_URL = repository.replace('github.com', GITHUB_TOKEN + '@github.com');

    // ✔ run update system bash and handle error
    cmd.run('bash src/configs/update-system.sh', (error, data, detail) => {
      if (!error) return console.Fail('Update system api error.', detail.trim(), 'Report to admin with error detail.', res);
      console.Success('Update system api success.', undefined, res);

      // ✔ refresh system in 3 seconds
      setTimeout(() => {
        process.on('exit', () => spawn(process.argv.shift(), process.argv, { cwd: process.cwd(), detached: true, stdio: 'inherit' }));
        process.exit();
      }, 3000);
    });
  } catch (error) {
    return console.Fail('Update system api unknown error.', error.message, 'Report to admin.', res);
  }
});

// ✔ create refresh system api
systemsRouter.get('/', async (req, res) => {
  // ✔ get and check token from request header
  let token = req.headers['x-token'];
  if (!token && token !== SYSTEM_SECRET) return console.Error('Update system api error.', 'Token is missing or wrong.', 'Add token in request header and try again.', res, 401);

  // ✔ response success and refresh system
  console.Success('Refresh system api success.', undefined, res);
  process.on('exit', () => spawn(process.argv.shift(), process.argv, { cwd: process.cwd(), detached: true, stdio: 'inherit' }));
  process.exit();
});

export default systemsRouter;
