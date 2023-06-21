import { Table, Model, Column,  DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Users } from "./users"
import { Products } from "./products"

@Table({
    timestamps: true,
    tableName: "reviews",
    indexes: [{ name: 'reviews_userID_index', fields: ['userID']}, { name: 'reviews_productID_index', fields: ['productID']}]
})

export class Reviews extends Model<Reviews> {
    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    })
    userID!:number;

    @BelongsTo(() => Users)
    user!: Users;

    @ForeignKey(() => Products)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true,
            notNull: true,
        }
    })
    productID!:number;

    @BelongsTo(() => Products)
    product!: Products;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isDecimal: true,
            notEmpty: true,
            notNull: true
        }
    })
    rating!:number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    comment!:string;
}