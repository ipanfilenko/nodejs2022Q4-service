import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column({ default: false })
    grammy: boolean;
}
