import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getUsers, submitUser, getUserData, updateUser, deleteUser } from '@/api/users'

import store from '@/store'
import { IsUser } from '@/types/user';

export interface IUserState {
  users: IsUser[]
  name: string
  email: string
  phone: number
}

@Module({ dynamic: true, store, name: 'user' })

class User extends VuexModule implements IUserState {
  public users: IsUser[] = []
  public name = ''
  public email = ''
  public phone = 0

  @Mutation
  private SET_USERS(users: IsUser[]) {
    this.users = users
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Mutation
  private SET_PHONE(phone: number) {
    this.phone = phone
  }

  @Action
  public async getUsers() {

    const { data } = await getUsers({ /* Your params here */ })
    if (!data) {
      throw Error('Something wents wrong!')
    }
    const users = data.users.data

    this.SET_USERS(users)
  }

  @Action
  public async submitUser(params: any) {
   const response = await submitUser( params )
   return response;
  }

  @Action
  public async getUserData(id: number) {
   const response = await getUserData(id)
   return response;
  }

  @Action
  public async updateUser(params: IsUser) {
   const response = await updateUser(params);
    return response;
  }

  @Action
  public async deleteUser(id: number) {
   const response = await deleteUser(id);
    return response;
  }

}

export const UserModule = getModule(User)
