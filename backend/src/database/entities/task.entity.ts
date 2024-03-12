import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn() //Turn to @PrimaryGeneratedColumn() for auto-incremental ID's
    id: number;
    
    @Column("text")
    name: string;
    
    @Column()
    completed: boolean;
}