import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt'> {}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;
} 
