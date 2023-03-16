import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {PortfolioEntity} from "../../portfolio/entities/portfolio.entity";

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


}
