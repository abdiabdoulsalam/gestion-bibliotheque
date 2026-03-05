import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivreModule } from './livre/livre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from './livre/entities/book.entities';
import { AuteurModule } from './auteur/auteur.module';
import { Auteur } from './auteur/entities/auteur.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entites/category.entites';
import { LoanModule } from './loan/loan.module';
import { Loan } from './loan/entities/loan.entities';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entites';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    LivreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'iiii',
      database: 'book',
      autoLoadEntities: true,
      entities: [Livre, Auteur, Category, Loan, User],
      synchronize: true,
    }),
    AuteurModule,
    CategoryModule,
    LoanModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
