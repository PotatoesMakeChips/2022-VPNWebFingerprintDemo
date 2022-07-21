import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: User }]),
  ],
  controllers: [TrackController],
  providers: [TrackService]
})
export class TrackModule {}
