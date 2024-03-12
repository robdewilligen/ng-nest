import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskDetailsEntity } from "./taskDetails.entity";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn() //Turn to @PrimaryGeneratedColumn() for auto-incremental ID's
    id: number;
    
    @Column("text")
    name: string;
    
    @Column()
    completed: boolean;
    
    @OneToOne(
        () => TaskDetailsEntity,
        (details) => details.task,
        {
            cascade: true,
        }
    )
    details: TaskDetailsEntity;
}