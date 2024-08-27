import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from '../../enums/action.enum';
import { Role } from '../../enums/role.enum';
import { UsersDto } from '../../routes/resource/dto/users.dto';

export class Project {
  id: string;
  name: string;
}

export class User {
  id: string;
  name: string;
  role: Role.Admin | Role.User;
}

//Subjects - Entities that can be manipulated, create permissions
//Add as much as you want to the union
type Subjects = InferSubjects<typeof Project | typeof User> | 'all';
//PossibleAbilities - Actions that can be performed
type PossibleAbilities = [Action, Subjects];
//Conditions - MongoQuery, this is for filtering
type Conditions = MongoQuery;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UsersDto) {
    const { can, cannot, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );

    // Users
    // cannot read projects/resources or anything you decide
    // but can create projects/resources
    if (user.role === Role.User) {
      can(Action.Create, Project);
      cannot([Action.Read], Project);
    }

    // Admins
    // here we can grant permissions to manage only users
    // but we can also deny specific permissions, like forbid managing projects
    if (user.role === Role.Admin) {
      can(Action.Manage, User);
      can(Action.Read, Project);
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
