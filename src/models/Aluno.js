import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome do aluno deve ser entre 3 e 255 caracteres',
          },
        },
      },
      Sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O sobrenome do aluno deve ser entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          args: true,
          msg: 'Email já cadastrado!',
        },
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome do aluno deve ser entre 3 e 255 caracteres',
          },
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      data_nascimento: {
        type: Sequelize.DATE,
        defaultValue: '',
        validate: {
          isBefore: {
            args: new Date().toISOString(),
            msg: 'Data inválida',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}
