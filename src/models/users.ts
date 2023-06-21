import { Table, Model, Column,  DataType} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "users",
    indexes: [{ name: 'users_username_index', fields: ['username']}, { name: 'users_email_index', fields: ['email']}]
})

export class Users extends Model<Users> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            min: 6,
            notNull: true
        }
    })
    username!:string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 6,
            notNull: true
        }
    })
    password!:string;

    
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
            notNull: true
        }
    })
    email!:string;


}