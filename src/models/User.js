import Sequelize, { Model } from 'sequelize';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
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
          isEmail: {
            msg: 'Email inválido!',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          isStrongPassword(value) {
            if (!validator.isLength(value, { minLength: 12 })) throw new Error('A senha deverá ter mais de 12 caracteres');
          },

        },
      }, // Campo virtual, ou seja, não existe no banco de dados.
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 9);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
