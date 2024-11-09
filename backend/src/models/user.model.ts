import { v4 as uuidv4 } from "uuid";
export type User = {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};

class UserModel {
  private users: User[] = [];

  // Get all users
  findAll(): User[] {
    return this.users;
  }
  findById(id: string): User | undefined {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) return undefined;
    return foundUser;
  }
  // Get user by username
  findByUsername(username: string): User | undefined {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      return user;
    }
    return undefined;
  }
  // Create user
  createUser(newUser: Omit<User, "id">): User {
    const user = {
      id: uuidv4(),
      ...newUser,
    };
    this.users.push(user);
    return user;
  }
  // Update user
  editUser(id: string, newData: Partial<User>): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;
    const updatedUser = {
      ...this.users[index],
      ...newData,
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }
  // Delete user
  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

export default new UserModel();
