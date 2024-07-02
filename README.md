# NestJS Starter App

This is a starter app for NestJS, a powerful Node.js framework. It provides authentication and authorization using Passport, along with general configurations for database, logging, and security.

## Features

- Database configuration
- Authentication, authorization, RBAC
- Security (helmet, rate limiting, CORS)
- Health checks
- Admin routes
- Logging
- Documentation (Swagger, compodoc)
- Testing (Jest)
- Linting (ESLint, Prettier)

## Installation

1. Clone the repository: `git clone https://github.com/BereDarius/nestjs-starter-app.git`
2. Install dependencies: `yarn install`
3. Set up the necessary environment variables:

- Create a `.env` file in the root directory
- Add the following variables:

  ```bash
  # .env

  PORT=3000
  NODE_ENV=development
  JWT_SECRET=your_secret
  LOG_LEVEL=debug

  DB_TYPE=postgres
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=your_username
  DB_PASSWORD=your_password
  DB_NAME=your_database
  ```

4. Generate a self-signed certificate for HTTPS (optional, but recommended for production):

   ```bash
   $ mkdir secrets
   ```

   ```bash
   $ cd secrets
   ```

   ```bash
   $ openssl genrsa -out private-key.pem 2048
   ```

   ```bash
   $ openssl req -new -sha256 -key private-key.pem -out csr.pem
   ```

   ```bash
   $ openssl x509 -req -in csr.pem -signkey private-key.pem -out public-certificate.pem
   ```

   ```bash
   $ rm csr.pem
   ```

5. Start the server: `yarn start:dev`

## Usage

You can access the API documentation at `http://localhost:3000/api`. The Swagger UI provides a user-friendly interface to test the endpoints.

There is also a separate admin route at `http://localhost:3000/api/admin`. This endpoint should be protected and only accessible to users with the `admin` role.

## Authorization

In order to protect routes, you can use the `@UseGuards(JwtGuard)` decorator. This will ensure that only authenticated users can access the route.

This decorator can be used both at the controller level:

```typescript
// users.controller.ts

import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // routes...
}
```

in which case all routes in the controller will be protected.

Or at the method level:

```typescript
// users.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // other routes...
}
```

in which case only the specified route will be protected.

## RBAC (Role-Based Access Control)

In order to restrict access to certain routes based on the user's role, you can use the `@Roles` decorator together with the `RoleEnum`.

This decorator takes roles as arguments and checks if the user either has at least one of the specified roles or a role with higher priority.

For example, if a route is protected with `@Roles(RoleEnum.ADMIN)`, only users with the `admin` role will be able to access it.

But if the route is protected with `@Roles(RoleEnum.USER)`, both `admin` and `user` roles will be able to access it.

```typescript
// users.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Roles(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // other routes...
}
```

Same as for the `@UseGuards` decorator, the `@Roles` decorator can be used at the controller level or at the method level.

## Documentation

### Swagger

In order to register a new route in Swagger, you can use the decorators provided by the `@nestjs/swagger` package.

In the `main.ts` file, you can change the Swagger configuration for regular/admin routes:

```typescript
// main.ts

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { NestFactory } from '@nestjs/core';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
// ... other imports

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ... other configurations

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TODO App API')
    .setDescription('Starter code for an API using NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AuthModule, TodosModule, UsersModule],
  });
  SwaggerModule.setup('api', app, document);

  const adminSwaggerConfig = new DocumentBuilder();
  // ... admin configuration
  const adminDocument = SwaggerModule.createDocument(app, adminSwaggerConfig, {
    include: [AdminModule, HealthModule],
  });
  SwaggerModule.setup('api/admin', app, adminDocument);

  await app.listen(3000);
}
bootstrap();
```

An end-to-end example would look like this:

```typescript
// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  // other properties...
}

// users.controller.ts

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard) // when you have a protected route
  @ApiBearerAuth() // don't forget to add this decorator; it lets Swagger know that the route is protected
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // other routes...
}
```

### Compodoc

In order to generate documentation using Compodoc, you can run the following command:

```bash
$ yarn doc
```

This will generate a `documentation` folder and start a local server at `http://localhost:8080`.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
