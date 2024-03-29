import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskDetailsEntity } from "./taskDetails.entity";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    name: string;
    
    @Column()
    completed: boolean;
    
    @OneToOne(
        () => TaskDetailsEntity,
        ( details ) => details.task,
        {
            cascade: true,
            eager: true,
            onDelete: "CASCADE",
        }
    )
    details: TaskDetailsEntity;
}