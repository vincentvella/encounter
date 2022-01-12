import { Injectable } from '@nestjs/common';
import { Profile, SharedAttributes, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateEncounterInput } from './dto/create-encounter.input';
import { UpdateEncounterInput } from './dto/update-encounter.input';
import { Encounter } from './entities/encounter.entity';

type EncounterData = {
  profile: Profile & { user: User }
  sharedAttributes: SharedAttributes
}

const profileAttributeMap: Record<keyof SharedAttributes, (profile: EncounterData['profile']) => string> = {
  email: profile => profile.email,
  firstName: profile => profile.firstName,
  id: profile => profile.id,
  lastName: profile => profile.lastName,
  phoneNumber: profile => profile.user.phoneNumber,
}

const returnRestrictedInformation = ({ profile, sharedAttributes }: EncounterData): Record<keyof SharedAttributes, string | null> => {
  return Object.keys(sharedAttributes).reduce((acc, attribute) => {
    const attributeAllowed: boolean = !!sharedAttributes[attribute]
    if (attributeAllowed) {
      acc[attribute] = profileAttributeMap[attribute](profile)
    }
    return acc
  }, { id: profile.id, email: null, firstName: null, lastName: null, phoneNumber: null })
}

@Injectable()
export class EncounterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profile: ProfileService
  ) { }

  create(createEncounterInput: CreateEncounterInput) {
    return 'This action adds a new encounter';
  }

  async findAll(userId: string): Promise<Encounter[]> {
    const { id } = await this.profile.findOne(userId)
    const encounters = await this.prisma.encounter.findMany({
      where: {
        savedOn: { not: null },
        OR: [{ profile1Id: id }, { profile2Id: id }],
      },
      include: {
        profile1SharedAttributes: true,
        profile1: {
          include: {
            user: true
          }
        },
        profile2SharedAttributes: true,
        profile2: {
          include: {
            user: true
          }
        },
      }
    })
    return encounters.map(({ savedOn, profile1SharedAttributes, profile1Id, profile2SharedAttributes, profile1, profile2, id }) => {
      if (profile1Id === id) {
        return {
          ...returnRestrictedInformation({ profile: profile1, sharedAttributes: profile1SharedAttributes }),
          savedOn,
          id,
        }
      }
      return {
        ...returnRestrictedInformation({ profile: profile2, sharedAttributes: profile2SharedAttributes }),
        savedOn,
        id,
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} encounter`;
  }

  update(id: number, updateEncounterInput: UpdateEncounterInput) {
    return `This action updates a #${id} encounter`;
  }

  remove(id: number) {
    return `This action removes a #${id} encounter`;
  }
}
