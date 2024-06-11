import { FindOptions, ModelScopeOptions, Op } from 'sequelize'

export const sequelizeDefaultScope = { where: { deleted_at: { [ Op.is ]: null } } } as FindOptions<unknown>

export const sequelizeScopes = { withTrash: {} } as ModelScopeOptions<unknown>