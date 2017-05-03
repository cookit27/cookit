/**
 * Created by galra on 5/3/2017.
 */
var Connectorlist = require('../shared/definition/definition');

function MarkSentence() {

    // data members
    this.conList = new Connectorlist();
    this.sentencefoodGroupTagIndexList = [];
    this.sentenceingredientIndexList = [];
    this.sentenceincludeIndexList = [];
    this.sentenceexcludeIndexList = [];
    this.sentenceisExcluded = false;
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

        return 0;
    }


    this.findObjectsInSentence = function(sentence, myList){
        var indexListToReturn = [];

        // Pass through the list
        for (var i = 0; i < myList.length; i++){

            // Split the current object in the list to an array of worlds
            var wordsToSearch = myList[i].split(/[ -]+/);
            var index = sentence.search(wordsToSearch[0]);
            var isWordsExist = (index != -1);

            // Check if all the words exist in the sentence in a row
            if (wordsToSearch.length > 1){
                for (var k = 1; k < wordsToSearch.length; k++){
                    if (myList[index + k] != wordsToSearch[k]){
                        isWordsExist = false;
                    }
                }

            }

            if (isWordsExist){
                indexListToReturn.push({index: index, length: wordsToSearch.length});

            }
        }

        return indexListToReturn;

    }
}

module.exports = MarkSentence;