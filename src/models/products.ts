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
    })
    name!:string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description!:string;

    
    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false,
    })
    price!:number;


}