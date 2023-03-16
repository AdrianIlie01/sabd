import {
    BaseEntity, BeforeInsert, BeforeUpdate,
    Column, CreateDateColumn,
    Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {ImageEntity} from "../../images/entities/image.entity";
import {CustomerEntity} from "../../customer/entities/customer.entity";
import {BadRequestException} from "@nestjs/common";

@Entity('portfolio')
export class PortfolioEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ default: true })
    is_visible: boolean;

    @Column({ length: 255, nullable: true })
    website_url: string;

    @ManyToOne(() => CustomerEntity, (customer: CustomerEntity) => customer.portfolios)
    customer: CustomerEntity;

    @OneToMany(() => ImageEntity, (image: ImageEntity) => image.portfolio)
    images: ImageEntity[]

    @CreateDateColumn()
    create_date: Date;

    @UpdateDateColumn()
    update_date: Date;

    @BeforeInsert()
    async insertTitle(){
        const portfolio = await PortfolioEntity.find({where:{title: this.title}});
        if (portfolio.length > 0) {
            throw new BadRequestException('This portfolio title already exists');
        }

    }

    @BeforeUpdate()
    async updateTitle(){
        const portfolio = await CustomerEntity.find({where:{name: this.title}});
        if (portfolio.length > 0) {
            throw new BadRequestException('This portfolio title already exists');
        }
    }

    @BeforeInsert()
    insert() {
        if (this.title !== this.title.trim() || this.description !== this.description.trim()) {
            throw new BadRequestException('Portfolio fields does not allow empty spaces');
        }
    }
    @BeforeUpdate()
    update() {
        if (this.title !== this.title.trim() || this.description !== this.description.trim()) {
            throw new BadRequestException('Portfolio fields does not allow empty spaces');
        }
    }
}
