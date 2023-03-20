import {
    BaseEntity, BeforeInsert,
    Column, CreateDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {PortfolioEntity} from "../../portfolio/entities/portfolio.entity";
import {BadRequestException} from "@nestjs/common";

@Entity('images')
export class ImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    file_name: string;

    @Column({ type: 'varchar', length: 255 })
    path: string;

    @ManyToOne(() => PortfolioEntity, (portfolio: PortfolioEntity) => portfolio.images)
    portfolio: PortfolioEntity

    @CreateDateColumn()
    create_date: Date;

    @UpdateDateColumn()
    update_date: Date;

    @BeforeInsert()
    async imageUpload(){
        if (this.portfolio === null) {
            throw new BadRequestException('This portfolio does not exist!');
        }

    }

}
