import { Permissions, Actions } from 'nest-casl';
import { InferSubjects } from '@casl/ability';

import { Roles } from '../../auth/enums/roles.enum';
import { Todos } from '../entities/todo.entity';

export type Subjects = InferSubjects<typeof Todos>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
  everyone({ can }) {
    can(Actions.create, Todos);
  },

  USER({ user, can }) {
    {
      can(Actions.read, Todos, { user: user.id });
      can(Actions.update, Todos, { user: user.id });
      can(Actions.delete, Todos, { user: user.id });
    }
  },
};
