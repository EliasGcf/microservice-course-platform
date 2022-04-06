import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '@database/database.module';

import { CoursesResolver } from '@http/graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from '@http/graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from '@http/graphql/resolvers/students.resolver';

import { CoursesService } from '@services/courses.service';
import { EnrollmentsService } from '@services/enrollments.service';
import { StudentsService } from '@services/students.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
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
