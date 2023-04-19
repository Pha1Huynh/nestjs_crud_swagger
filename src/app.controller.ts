import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiHeader } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
}
