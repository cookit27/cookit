/**
 * Created by galra on 5/3/2017.
 */
this.isExcluded = false;

StatementBuilder = function() {

    this.createStatement = function(sentence, foodGroupTagIndexList, ingredientIndexList) {
        var statement = "SELECT recipes.Recipe_Title, recipes.Recipe_PrepTime, recipes.Recipe_Instructions " +
            "FROM tbl_Recipes recipes";

        if (foodGroupTagIndexList.length > 0) {
            statement += "  INNER JOIN tbl_FoodGroupTag tags ON ";

            // Take all the marked tags and add them to the statement
            for (var tagIndex = 0; tagIndex < foodGroupTagIndexList.length; tagIndex++) {
                // Check if needs to add NOT
                if (this.isExcluded) { // TODO: check if exclude
                    statement += "NOT ";
                }

                statement += "tags.Tag_Title = '";

                // In case the tag phrase is more than 1 word, concatenating them all

                for (var tagLength = 0; tagLength < foodGroupTagIndexList[tagIndex].length; tagLength++) {
                    if (tagLength > 0)
                        statement += " ";

                    statement += sentence[foodGroupTagIndexList[tagIndex].index + tagLength];
                }

                statement += "'";

                if (tagIndex != foodGroupTagIndexList.length - 1) {
                    statement += " AND ";
                }

            }

            statement += " INNER JOIN tbl_Recipes_to_FoodGroupTag tagsToRec ON" +
                         " tags.Recipe_ID = recipes.Recipe_ID" +
                         " AND tags.tag_ID = tagsToRec.tag_ID";

        }

        if (ingredientIndexList.length > 0) {
            statement += "  INNER JOIN tbl_ingredients ingredients ON ";

            // Take all the marked tags and add them to the statement
            for (var ingIndex = 0; ingIndex < ingredientIndexList.length; ingIndex++) {
                // Check if needs to add NOT
                if (this.isExcluded) { // TODO: check if exclude
                    statement += "NOT ";
                }

                statement += "ingredients.ingredients_Name = '";

                // In case the ingredient phrase is more than 1 word, concatenating them all

                for (var ingLength = 0; ingLength < ingredientIndexList[ingIndex].length; ingLength++) {
                    if (ingLength > 0)
                        statement += " ";

                    statement += sentence[ingredientIndexList[ingIndex].index + ingLength];
                }

                statement += "'";

                if (ingIndex != ingredientIndexList.length - 1) {
                    statement += " AND ";
                }
            }

            statement += " INNER JOIN tbl_Recipe_to_Ingridient ingToRec ON "+
            "ingredients.ingredient_ID = ingToRec.ingredient_ID " +
            "AND recipes.recipe_ID = ingToRec.recipe_id";
        }

        console.log(statement);
        return statement;
    }
}

module.exports = StatementBuilder;