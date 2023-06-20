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
    })
    username!:string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    password!:string;

    
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    email!:string;


}