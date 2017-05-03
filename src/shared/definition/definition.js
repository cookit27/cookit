/**
 * Created by galra on 5/3/2017.
 */
function Connectorlist() {
    this.includeList = ["and", "include", "includes", "included", "including", "has", "have",
        "having", "with", "in", "inside", "on", "contain", "contains", "containing", "have"];

    this.excludeList =  ["not", "no", "without", "does not contain", "doesn’t contain", "doesnt contain",
        "not include", "not includes", "exclude", "with no", "lacking", "don’t", "free", "doesn’t have",
        "doesnt have", "does not have"],

// TODO: actually take the ingridiants from the db
     this.ingredientsList = ["sugar", "flour", "milk", "apple",
    "orange", "", "broccoli", "soy", "chocolate", "tomato", "cucumber", "Parmesan Cheese",
        "spinach", "eggs", "almond", "asparagus", "cauliflower", "fresh basil",
        "olive oil", "canola oil", "salt", "garlic", "olive", "green onion",
    "mushroom", "lemon", "coconut", "soda", "banana", "garlic clove", "bread flour",
        "cranberry", "pepper", "butter", "water", "lemon juice",
    "white flour", "zucchini", "eggplant", "dry yeast", "green bell pepper",
    "balsamic vinegar", "honey", "squash", "red onion", "red bell pepper", "red wine vinegar",
        "dijon mustard", "walnut", "radish", "mozzarella cheese"];

     this.foodGroupTagList =  ["gluten", "gluten free", "dairy", "nuts", "vegetarian", "vegan", "meat", "fat", "protein", "fruits"];

// TODO: OR words - complete after the second task

};


module.exports = Connectorlist;
