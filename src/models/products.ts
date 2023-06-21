import { Table, Model, Column,  DataType} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "products",
    indexes: [{ name: 'products_name_index', fields: ['name']}]
})

export class Products extends Model<Products> {
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
    name!:string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    })
    description!:string;

    
    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    })
    price!:number;
}
