import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';
import path from 'node:path';

import { DatabaseModule } from '@database/database.module';

import { CoursesResolver } from '@http/graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from '@http/graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from '@http/graphql/resolvers/students.resolver';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    StudentsResolver,
    EnrollmentsResolver,
    CoursesResolver,

    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
