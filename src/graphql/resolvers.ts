const Recipe = require('../models/recipe');

type Recipe = {
  name: String;
  description: String;
  createdAt: String;
  thumbsUp: Number;
  thumbsDown: Number;
};

interface QueryRecipeArgs {
  ID: Number;
}

interface QueryGetRecipesArgs {
  amount: Number;
}

export const resolvers = {
  Query: {
    async recipe(_: Recipe, { ID }: QueryRecipeArgs) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_: Recipe, { amount }: QueryGetRecipesArgs) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_: any, { recipeInput: { name, description } }: any) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });

      const res = await createdRecipe.save(); // MongoDB saving occurs

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_: any, { ID }: any) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; // 1 if something was deleted, 0 if nothing was deleted
    },
    async editRecipe(_: any, { ID, recipeInput: { name, description } }: any) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          { name: name, description: description }
        )
      ).modifiedCount;
      return wasEdited; // 1 if something was updated, 0 if nothing was updated
    },
  },
};
