import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async create(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json({ criado: true, aluno });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID inválido!'],
        });
      }
      const aluno = await Aluno.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado!'],
        });
      }
      const {
        id: idAntigo,
        nome: nomeAntigo,
        sobrenome: sobrenomeAntigo,
        email: emailAntigo,
        data_nascimento: data_nascimentoAntiga,
      } = aluno;
      const updatedUser = await aluno.update(req.body);
      const {
        id, nome, sobrenome, email, data_nascimento,
      } = updatedUser;

      return res.json({
        antigo: {
          idAntigo, nomeAntigo, sobrenomeAntigo, emailAntigo, data_nascimentoAntiga,
        },
        novo: {
          id, nome, sobrenome, email, data_nascimento,
        },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID inválido!'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado!'],
        });
      }
      const {
        nome, sobrenome, email, data_nascimento,
      } = aluno;
      return res.json({
        id, nome, sobrenome, email, data_nascimento,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID inválido!'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado!'],
        });
      }
      const { nome } = aluno;
      await aluno.destroy();
      return res.json({
        id, nome, apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
