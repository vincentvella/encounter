import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';
import { RolesGuard } from './authorization/roles.guard';
import { RoomModule } from './room/room.module';
import { BullModule } from '@nestjs/bull';
import { UserWaitingModule } from './user-waiting/user-waiting.module';
import { FeedbackModule } from './feedback/feedback.module';
import { EncounterModule } from './encounter/encounter.module';
import { HealthzController } from './healthz/healthz.controller';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      context: (req) => {
        // Some hacky logic in order to pass authorization connection param to global auth handler
        if (req?.extra?.request?.headers) {
          req.extra.request.headers.authorization = req?.connectionParams?.authorization || null
          return { req: req.extra.request }
        }
        return { req: req.request }
      },
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
      },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD
      },
    }),
    PrismaModule,
    UserModule,
    AuthenticationModule,
    ProfileModule,
    RoomModule,
    UserWaitingModule,
    FeedbackModule,
    EncounterModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
  ],
  controllers: [HealthzController]
})
export class AppModule { }
