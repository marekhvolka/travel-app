import {Mutation, Query, Resolver} from "type-graphql";
import {User} from "../models/User";
import * as bcrypt from "bcrypt";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find({})
  }

  @Mutation(() => User)
  updateUser(_, { id, firstName, lastName, email, password, role }) {
    return User.update(id, {
      firstName,
      lastName,
      email,
      role,
      passwordHash: bcrypt.hash(password, 10)
    })
  }
}
