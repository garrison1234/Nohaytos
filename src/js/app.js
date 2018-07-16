App = {
    parsedJSON: {},
    transcriptWordsArray: [],
    finalText: null,

     // call from index.html to convert the JSON object
     formatTranscript: function() {
       var text = $('#inputJSON').val();
       App.parsedJSON = JSON.parse(text);
       var transcriptString = App.parsedJSON.results.transcripts[0].transcript;
       var fixedTranscriptString = App.removeQuestionMarkSpace(transcriptString);
       App.transcriptWordsArray = App.separateWords(fixedTranscriptString);
       App.finalText = App.formatSegments(App.transcriptWordsArray);
       $( "#form-output" ).text(App.finalText);
     },

     // remove unnecessary space before question marks
     removeQuestionMarkSpace: function(stringWithSpaces) {
       var correctedString = '';
       for(var index = 0; index <= stringWithSpaces.length; index++) {
         if(!(stringWithSpaces[index + 1] == "?")) {
           correctedString += stringWithSpaces[index];
         }
       }
       return correctedString;
     },

     // separate words by spaces, except when there is a question mark (in this case add to end of word)
     separateWords: function(string) {
       var wordsArray = [];
       var stringIndex = 0;
       for(var index = 0; index <= string.length; index++) {
         if(string[index + 1] == " ") {
           var newWord = string.slice(stringIndex, index + 1);
           wordsArray.push(newWord);
           stringIndex = index + 2;
         }
       }
       return wordsArray;
     },

     // format the transcription
     formatSegments: function(transcriptWordsArray) {
       var formattedTranscript = '';
       var wordIndex = 0;
       var speakers = ['Héctor', 'Roberto'];
       var speakerName = '';
       App.parsedJSON.results.speaker_labels.segments.forEach((element, index) => {
         if(element.items.length > 0) {
           speakers.forEach((element2, index2) => {
             if(index2 == element.speaker_label[4]) {
               speakerName = speakers[index2];
               formattedTranscript += ( speakerName + ': ');
               console.log('segment index: ' + index + ' , speaker_label: ' + speakerName);
             }
           });
           for(var i = 0; i < element.items.length; i++) {
              formattedTranscript += (transcriptWordsArray[wordIndex + i] + ' ');
              console.log('new word: ' + transcriptWordsArray[wordIndex + i]);
           }
           console.log('i: ' + i);
           wordIndex += i;
           console.log('wordIndex: ' + wordIndex);
           formattedTranscript += '\n'
         }
       });
       return formattedTranscript;
     }
}
