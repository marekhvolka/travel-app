import { User, Game, Step } from '../models';
import * as bcrypt from 'bcrypt';

const resolvers = {
    Query: {
        // Fetch all users
        async users() {
            return await User.all();
        },

        // Get a user by it ID
        async getUser(_, { id }) {
            return await User.findById(id);
        },
        // Fetch all games
        async games() {
            return await Game.all();
        },
        // Get a game by it ID
        async getGame(_, { id }) {
            return await Game.findById(id);
        },
        async steps() {
            return await Step.all();
        }
    },
    Mutation: {
        // Handles user login
        async login(_, { email, password }) {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('No user with that email');
            }
            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) {
                throw new Error('Incorrect password');
            }
            // Return json web token
            return jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '1y' });
        },
        // Create new user
        async createUser(_, { firstName, lastName, email, password, role }) {
            return await User.create({
                firstName,
                lastName,
                email,
                role,
                passwordHash: await bcrypt.hash(password, 10)
            });
        },
        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, password, role }, { authUser }) {
            // Make sure user is logged in
            // if (!authUser) {
            //     throw new Error('You must log in to continue!')
            // }
            // fetch the user by it ID
            const user = await User.findById(id);
            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                role,
                passwordHash: await bcrypt.hash(password, 10)
            });
            return user;
        },
        // Add a new game
        async addGame(_, { name, description}, { authUser }) {
            // Make sure user is logged in
            // if (!authUser) {
            //     throw new Error('You must log in to continue!')
            // }
            return await Game.create({
                name,
                description
            });
        },
        // Update a particular game
        async updateGame(_, { id, name, description }, { authUser }) {
            // Make sure user is logged in
            // if (!authUser) {
            //     throw new Error('You must log in to continue!')
            // }
            // fetch the game by it ID
            const game = await Game.findById(id);
            // Update the game
            await game.update({
                name,
                description
            });
            return game;
        },
        // Delete a specified game
        async deleteGame(_, { id }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }
            // fetch the game by it ID
            const game = await Game.findById(id);
            return await game.destroy();
        }
    },
};
module.exports = resolvers;
