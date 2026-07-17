import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SKILL_NAMES } from '@ai-kingdoms/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private defaultSkills() {
    return Object.fromEntries(SKILL_NAMES.map((skill) => [skill, { level: 1, xp: 0 }]));
  }

  private defaultEquipment() {
    return {
      head: null,
      chest: null,
      legs: null,
      feet: null,
      hands: null,
      mainHand: null,
      offHand: null,
      ring1: null,
      ring2: null,
      necklace: null,
      cape: null,
      ammo: null,
    };
  }

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        passwordHash,
        character: {
          create: {
            name: dto.characterName,
            skillsJson: this.defaultSkills(),
            inventoryJson: [],
            equipmentJson: this.defaultEquipment(),
            questLogJson: [],
          },
        },
      },
      include: { character: true },
    });

    return this.signToken(user.id, user.email, user.role, user.character?.id ?? null);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { character: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return this.signToken(user.id, user.email, user.role, user.character?.id ?? null);
  }

  signToken(userId: string, email: string, role: string, characterId: string | null) {
    const payload = { sub: userId, email, role, characterId };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: userId, email, role, characterId },
    };
  }
}
