const { User, Book } = require("../models");
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context }).select(
          "-__v -password"
        );

        return userData;
      }
    },
  },

  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});

      if(!user){
        throw new AuthenticationError('Incorrect credentials');
      }

      const correntPw = await user.isCorrectPassword(password);

      if(!correctPw){
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPW = await user.isCorrectPassword(password);
      return {user, token};
    },

    addUser: async (parents, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return {user, token};
    },

    saveBook: async () => {

    },

    removeBook: async () => {

    }
  }

};

module.exports = resolvers;
