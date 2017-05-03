/**
 * Created by galra on 5/3/2017.
 */
var Connectorlist = require('../shared/definition/definition');

function MarkSentence() {

    // data members
    this.conList = new Connectorlist();
    this.foodGroupTagIndexList = [];
    this.ingredientIndexList = [];
    this.includeIndexList = [];
    this.excludeIndexList = [];
    this.isExcluded = false;
    this.isOr = false;

    this.splitSentence = function(sentence){
        return sentence.split(/[ ,.;]+/);
    }

    this.markSentence = function(sentence){
        var sentenceSplitted = this.splitSentence(sentence);

        this.foodGroupTagIndexList = this.findObjectsInSentence(sentenceSplitted, this.conList.foodGroupTagList);
        this.ingredientIndexList = this.findObjectsInSentence(sentenceSplitted, this.conList.ingredientsList);
        this.excludeIndexList = this.findObjectsInSentence(sentenceSplitted, this.conList.excludeList);
        this.includeIndexList = this.findObjectsInSentence(sentenceSplitted, this.conList.includeList);

        // sort all the lists by index
        this.foodGroupTagIndexList.sort(compare);
        this.ingredientIndexList.sort(compare);
        this.excludeIndexList.sort(compare);
        this.includeIndexList .sort(compare);
    }

    var compare = function(a,b) {
        if (a.index < b.index)
            return -1;
        if (a.index > b.index)
            return 1;
        if (a.length > b.length)
            return -1

        return 1;
    }


    this.findObjectsInSentence = function(sentence, myList){
        var indexListToReturn = [];

        // Pass through the list of objects to search in the sntence
        for (var i = 0; i < myList.length; i++){
            // Split the current object in the list to an array of worlds
            var wordsToSearch = myList[i].split(/[ -]+/);

            // Search the object inside the sentence
            for (var senIndex = 0; senIndex < sentence.length - wordsToSearch.length + 1; senIndex++) {
                var isWordsExist = true;

                // Check if all the words exist in the sentence in a row
                for (var k = 0; k < wordsToSearch.length; k++) {
                    if (sentence[senIndex + k] != wordsToSearch[k]) {
                        isWordsExist = false;
                    }
                }

                if (isWordsExist) {
                    indexListToReturn.push({index: senIndex, length: wordsToSearch.length});

                }
            }
        }

        return indexListToReturn;

    }
}

module.exports = MarkSentence;