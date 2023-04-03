// import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
// import { Column, Entity, Index } from 'typeorm';
// import { Exclude } from 'class-transformer';
// import { IsNumber } from 'class-validator/types/decorator/decorators';

// @Index('email', ['email'], { unique: true })
// @Entity({
//   name: 'USER',
// }) // USER : 테이블 명
// export class UserEntity {
//   @IsNumber()
//   @IsNotEmpty()
//   @Column({ type: 'int', nullable: false })
//   writer_id: number;

//   @IsString()
//   @IsNotEmpty({ message: '제목을 입력해주세요' })
//   @Column({ type: 'varchar', nullable: false })
//   title: string;

//   @IsString()
//   @IsNotEmpty({ message: '내용을 입력해주세요' })
//   @Column({ type: 'text', nullable: true })
//   contents: string;
// }
