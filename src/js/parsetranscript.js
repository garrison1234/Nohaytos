App = {
  parsedJSON: {},
  transcriptWordsArray: [],
  finalText: null,

  // call from index.html to convert the JSON object
  formatTranscript: function() {
    var text = $("#inputJSON").val();
    App.parsedJSON = JSON.parse(text);
    var transcriptString = App.parsedJSON.results.transcripts[0].transcript;
    var fixedTranscriptString = App.removeQuestionMarkSpace(transcriptString);
    App.transcriptWordsArray = App.separateWords(fixedTranscriptString);
    App.finalText = App.formatSegments(App.transcriptWordsArray);
    App.finalTextWithStamps = App.formatSegmentsWithStamps(
      App.transcriptWordsArray
    );
    $("#form-output").text(App.finalText);
    $("#form-output-timestamps").text(App.finalTextWithStamps);
  },

  // remove unnecessary space before question marks
  removeQuestionMarkSpace: function(stringWithSpaces) {
    var correctedString = "";
    for (var index = 0; index <= stringWithSpaces.length; index++) {
      if (!(stringWithSpaces[index + 1] == "?")) {
        correctedString += stringWithSpaces[index];
      }
    }
    return correctedString;
  },

  // separate words by spaces, except when there is a question mark (in this case add to end of word)
  separateWords: function(string) {
    var wordsArray = [];
    var stringIndex = 0;
    for (var index = 0; index <= string.length; index++) {
      if (string[index + 1] == " ") {
        var newWord = string.slice(stringIndex, index + 1);
        wordsArray.push(newWord);
        stringIndex = index + 2;
      }
    }
    return wordsArray;
  },

  // format the transcription
  formatSegments: function(transcriptWordsArray) {
    var formattedTranscript = "";
    var wordIndex = 0;
    var speakers = ["Héctor", "Roberto"];
    var speakerName = "";
    App.parsedJSON.results.speaker_labels.segments.forEach((element, index) => {
      if (element.items.length > 0) {
        speakers.forEach((element2, index2) => {
          if (index2 == element.speaker_label[4]) {
            speakerName = speakers[index2];
            formattedTranscript += speakerName + ": ";
          }
        });
        for (var i = 0; i < element.items.length; i++) {
          formattedTranscript += transcriptWordsArray[wordIndex + i] + " ";
        }
        wordIndex += i;
        formattedTranscript += "\r\n\r\n";
      }
    });
    return formattedTranscript;
  },

  // format the transcription and add time stamps with .ass formatting
  formatSegmentsWithStamps: function(transcriptWordsArray) {
    var formattedTranscript = "";
    var formattedTranscript =
      "[Script Info]" +
      "\r\n" +
      "Title: No hay tos transcript" +
      "\r\n" +
      "PlayResY: 1024s" +
      "\r\n" +
      "\r\n" +
      "[V4 Styles]" +
      "\r\n" +
      "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding" +
      "\r\n" +
      "Style: Texto,Patua One,5npm st6,3813419,16118007,16118007,3813429,1,0,0,0,0,10,50,50,0,0,0" +
      "\r\n" +
      "\r\n" +
      "[Events]" +
      "\r\n" +
      "Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text" +
      "\r\n";
    var wordIndex = 0;
    var speakers = ["Roberto", "Héctor"];
    var speakerName = "";
    var defaultText = "Dialogue: Marked=0,";
    var defaultText2 = ",Texto,,0,0,0,,";
    App.parsedJSON.results.speaker_labels.segments.forEach((element, index) => {
      if (element.items.length > 0) {
        formattedTranscript += defaultText;
        var segmentTimeStamps = App.getTimeStamps(element);
        formattedTranscript +=
          segmentTimeStamps[0] + "," + segmentTimeStamps[1];
        formattedTranscript += defaultText2;
        speakers.forEach((element2, index2) => {
          if (index2 == element.speaker_label[4]) {
            speakerName = speakers[index2];
            formattedTranscript += speakerName + ": ";
          }
        });
        for (var i = 0; i < element.items.length; i++) {
          formattedTranscript += transcriptWordsArray[wordIndex + i] + " ";
        }
        wordIndex += i;
        formattedTranscript += "\r\n";
      }
    });
    return formattedTranscript;
  },

  // get start and end time stamps
  getTimeStamps: function(segment) {
    var timeStamps = [];
    timeStamps[0] = App.formatTime(segment.start_time);
    timeStamps[1] = App.formatTime(segment.end_time);
    return timeStamps;
  },

  // format time for .ass file
  formatTime: function(timeInSeconds) {
    var hours = Math.trunc(timeInSeconds / 3600);
    timeInSeconds -= hours * 3600;
    var minutes = Math.trunc(timeInSeconds / 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    timeInSeconds -= minutes * 60;
    timeInSeconds = timeInSeconds.toFixed(2);
    if (timeInSeconds < 10) {
      timeInSeconds = "0" + timeInSeconds;
    }
    var formattedTime = "";
    formattedTime = hours + ":" + minutes + ":" + timeInSeconds;
    return formattedTime;
  }
};
