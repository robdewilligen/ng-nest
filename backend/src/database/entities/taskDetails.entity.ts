import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity()
export class TaskDetailsEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    description: string
    
    @OneToOne(() => TaskEntity, ( task ) => task.details, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
    task: TaskEntity
}