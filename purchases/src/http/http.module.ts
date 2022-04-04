import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '@database/database.module';

import { CustomersResolver } from '@http/graphql/resolvers/customers.resolver';
import { ProductsResolver } from '@http/graphql/resolvers/products.resolver';
import { PurchasesResolver } from '@http/graphql/resolvers/purchases.resolver';

import { CustomersService } from '@services/customers.service';
import { ProductsService } from '@services/products.service';
import { PurchasesService } from '@services/purchases.service';

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
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
