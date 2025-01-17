import Jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Credencial inválida'],
      });
    }

    const { id } = user;
    const token = Jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();
