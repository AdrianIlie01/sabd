import {BaseEntity, BeforeInsert, BeforeUpdate, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "../../category/entities/category.entity";
import {BadRequestException} from "@nestjs/common";


@Entity('category_links')
export class CategoryLinkEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CategoryEntity, (category_entity) => category_entity.category_link, {nullable: false})
    category: CategoryEntity


    @ManyToOne(() => CategoryEntity, (category_entity) => category_entity.category_link, {nullable: false})
    parent: CategoryEntity

}
