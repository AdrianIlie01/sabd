import {
    BaseEntity, BeforeInsert, BeforeUpdate,
    Column, CreateDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn, Unique, UpdateDateColumn,
} from 'typeorm';
import {IsEmail, IsNotEmpty, IsUrl} from "class-validator";
import {BadRequestException} from "@nestjs/common";
import {PortfolioEntity} from "../../portfolio/entities/portfolio.entity";

@Entity('customer')
export class CustomerEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({ length: 255, nullable: true })
    website_url: string;

    @OneToMany(() => PortfolioEntity, (portfolio:PortfolioEntity) => portfolio.customer)
    portfolios: PortfolioEntity[];

    @CreateDateColumn()
    create_date: Date;

    @UpdateDateColumn()
    update_date: Date;

    @BeforeInsert()
    async insertName(){
        const customer = await CustomerEntity.find({where:{name: this.name}});
        if (customer.length > 0) {
            throw new BadRequestException('This customer name already exists');
        }

    }

    @BeforeUpdate()
    async updateName(){
        const customer = await CustomerEntity.find({where:{name: this.name}});
        if (customer.length > 0) {
            throw new BadRequestException('This customer name already exists');
        }
    }

    @BeforeInsert()
    insert() {
        if (this.name !== this.name.trim() || this.email !== this.email.trim() || this.website_url !== this.website_url.trim()) {
            throw new BadRequestException('Customer fields does not allow empty spaces');
        }
    }
    @BeforeUpdate()
    update() {
        if (this.name !== this.name.trim() || this.email !== this.email.trim() || this.website_url !== this.website_url.trim()) {
            throw new BadRequestException('Customer fields does not allow empty spaces');
        }
    }

}
