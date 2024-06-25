import User from '../models/User';

class UserController {
  // CREATE -> Responsável por criar o usuário no banco de dados.
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(409).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(409).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }

      const { id: idAntigo, nome: nomeAntigo, email: emailAntigo } = user;
      const updatedUser = await user.update(req.body);
      const { id, nome, email } = updatedUser;

      return res.json({
        antigo: { idAntigo, nomeAntigo, emailAntigo },
        novo: { id, nome, email },
      });
    } catch (e) {
      return res.status(409).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy(req.body);

      return res.json(user);
    } catch (e) {
      return res.status(409).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();