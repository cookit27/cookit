/**
 * Created by galra on 5/3/2017.
 */
StatementBuilder = function() {

    //***************************************
    // Main statement builder
    //***************************************
    this.createStatement = function(sentence, markedSentence) {
            var statement = "SELECT recipes.Recipe_Title, recipes.Recipe_PrepTime, recipes.Recipe_Instructions , ingredientsSec.Ingredient_Name" +
                        "FROM tbl_Recipes recipes";

        if (markedSentence.foodGroupTagIndexList.length > 0) {
            statement += this.tagStatement(markedSentence, sentence);
        }

        if (markedSentence.ingredientIndexList.length > 0) {
            statement += this.ingridientStatement(markedSentence, sentence);
        }

        statement += " INNER JOIN tbl_Recipe_to_Ingredient ingToRecSec " +
                            "ON recipes.Recipe_ID = ingToRecSec.Recipe_ID " +
                     "INNER JOIN tbl_Ingredients ingredientsSec " +
                            "ON ingredientsSec.Ingredient_ID = ingToRecSec.Ingredient_ID";


        console.log(statement);
        return statement;
    }

    //***************************************
    // Food group tag statement builder
    //***************************************
    this.tagStatement = function(markedSentence, sentence) {
        var statement = "  INNER JOIN tbl_FoodGroups tags ON ";

        // Take all the marked tags and add them to the statement
        for (var tagIndex = 0; tagIndex < markedSentence.foodGroupTagIndexList.length; tagIndex++) {

            statement += "tags.FoodGroup_Desc ";

            // Check if needs to add NOT
            if (this.isExcluded(markedSentence.foodGroupTagIndexList[tagIndex].index, markedSentence.includeIndexList, markedSentence.excludeIndexList)) {
                statement += "!";
            }

            statement += "= '";

            // In case the tag phrase is more than 1 word, concatenating them all

            for (var tagLength = 0; tagLength < markedSentence.foodGroupTagIndexList[tagIndex].length; tagLength++) {
                if (tagLength > 0)
                    statement += " ";

                statement += sentence[markedSentence.foodGroupTagIndexList[tagIndex].index + tagLength];
            }

            statement += "'";

            if (tagIndex != markedSentence.foodGroupTagIndexList.length - 1) {
                statement += " AND ";
            }

        }

        statement += " INNER JOIN tbl_Recipe_to_FoodGroup tagsToRec ON" +
            " tags.Recipe_ID = recipes.Recipe_ID" +
            " AND tags.FoodGroup_ID = tagsToRec.FoodGroup_ID";

        return statement;
    }

    //***************************************
    // Ingredient statement builder
    //***************************************
    this.ingridientStatement = function(markedSentence, sentence) {
        var statement = "  INNER JOIN tbl_Ingredients ingredients ON ";

        // Take all the marked tags and add them to the statement
        for (var ingIndex = 0; ingIndex < markedSentence.ingredientIndexList.length; ingIndex++) {

            statement += "ingredients.Ingredient_Name ";

            // Check if needs to add NOT
            if (this.isExcluded(markedSentence.ingredientIndexList[ingIndex].index, markedSentence.includeIndexList, markedSentence.excludeIndexList)) { // TODO: check if exclude
                statement += "!";
            }

            statement += "= '";

            // In case the ingredient phrase is more than 1 word, concatenating them all

            for (var ingLength = 0; ingLength < markedSentence.ingredientIndexList[ingIndex].length; ingLength++) {
                if (ingLength > 0)
                    statement += " ";

                statement += sentence[markedSentence.ingredientIndexList[ingIndex].index + ingLength];
            }

            statement += "'";

            if (ingIndex != markedSentence.ingredientIndexList.length - 1) {
                statement += " AND ";
            }
        }

        statement += " INNER JOIN tbl_Recipe_to_Ingredient ingToRec "+
                     "ON ingredients.Ingredient_ID = ingToRec.Ingredient_ID " +
                     "AND recipes.Recipe_ID = ingToRec.Recipe_ID";

        return statement;
    }

    this.isExcluded = function(wordIndex, includeIndexList, excludeIndexList){

        var includeIndex = this.findClosestIndex(wordIndex, includeIndexList);
        var excludeIndex = this.findClosestIndex(wordIndex, excludeIndexList);

        return excludeIndex >= includeIndex;
    };

    this.findClosestIndex = function(wordIndex, list){
        var isExist = false;
        var i = 0;

        while (i < list.length && list[i].index < wordIndex){
            isExist = true;
            i++;
        }

        if (!isExist){
            return -1;
        }

        return list[i - 1].index + list[i - 1].length - 1;
    }

}

module.exports = StatementBuilder;