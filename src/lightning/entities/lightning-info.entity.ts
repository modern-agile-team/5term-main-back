// import { IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
// import { Column, Entity } from 'typeorm';

// @Entity({
//   name: 'lightning_info',
// }) // USER : 테이블 명
// export class LightningInfoEntity {
//   @IsBoolean()
//   @IsNotEmpty({ message: '활성여부를 입력해주세요' })
//   @Column({ type: 'boolean', nullable: false, default: true })
//   active: boolean;

//   @IsDate()
//   @IsNotEmpty({ message: '만남 날짜를 입력해주세요' })
//   @Column({ type: 'date', nullable: false })
//   meeting_date: Date;
// }
