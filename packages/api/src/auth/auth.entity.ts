import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Unique,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class UserAuth {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
