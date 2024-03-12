import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity()
export class TaskDetailsEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    description: string
    
    @OneToOne(() => TaskEntity, (task) => task.details)
    @JoinColumn()
    task: TaskEntity
}