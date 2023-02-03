import { User } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

let users = [] as User[];

export const inMemoryDB = {
    findAll: () => users,
    findOne: (id: string) => {
        return users.find((_user: User) => _user.id === id);
    },
    create: (user: CreateUserDto) => {
        const newUser: User = {
            login: user.login,
            password: user.password,
            id: uuidv4(),
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        users.push(newUser);

        const { password, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    },
    update: (user: UpdateUserDto, selectedUser: User) => {
        const selectedUserWithPassword = users.find((_user: User) => _user.id === selectedUser.id);

        if (selectedUserWithPassword.password !== user.oldPassword) {
            throw 'Incorrect password';
        }

        const updatedUser = {
            ...selectedUserWithPassword,
            password: user.newPassword,
            updatedAt: Date.now(),
            version: selectedUserWithPassword.version + 1
        };

        users = users.map((_user: User) => _user.id === updatedUser.id ? { ...updatedUser } : { ..._user } );

        const { password, ...userWithoutPassword } = updatedUser;

        return userWithoutPassword;
    },
    remove: (id: string) => {
        users = users.filter((_user: User) => _user.id !== id);
    },
}
