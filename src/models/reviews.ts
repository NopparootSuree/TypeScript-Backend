import { Table, Model, Column,  DataType, ForeignKey } from "sequelize-typescript";
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
    })
    userID!:number;

    @ForeignKey(() => Products)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    productID!:number;

    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    rating!:number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    comment!:string;
}