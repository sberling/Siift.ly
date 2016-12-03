(function () {

  angular
    .module('simpsonsQuote', [])
    .controller('randomQuote', function($scope) {
      $scope.info = quotes[Math.floor(Math.random() * quotes.length)];
      $scope.pick = function() {
        $scope.info = quotes[Math.floor(Math.random() * quotes.length)];
      };
    });


  var quotes = [
    {
      line: 'Me fail english? That\'s unpossible.',
      character: 'Ralph Wiggum'
    },
    {
      line: 'When I grow up, I\'m going to Bovine University.',
      character: 'Ralph Wiggum'
    },
    {
      line: 'How can someone with glasses so thick be so stupid.',
      character: 'Bart Simpson'
    },
    {
      line: 'Internet? Is that thing still around?',
      character: 'Homer Simpson'
    },
    {
      line: 'Television! Teacher, mother, secret lover.',
      character: 'Homer Simpson'
    },
    {
      line: 'Oh, so they have internet on computers now.',
      character: 'Homer Simpson'
    },
    {
      line: 'There\'s no justice like angry-mob justice.',
      character: 'Principal Skinner'
    },
    {
      line: 'Silly customer, you cannot hurt a Twinkie!',
      character: 'Apu Nahasapeemapetilon'
    },
    {
      line: 'What good is money if it can\'t inspire terror in your fellow man?',
      character: 'Mr. Burns'
    },
    {
      line: 'Ah jeez, can\'t you people take the law into your own hands?',
      character: 'Chief Wiggum'
    },
    {
      line: 'Shut up, brain. I don\'t need you any more, I\'m popular now.',
      character: 'Lisa Simpson'
    },
    {
      line: 'Hi, everybody!',
      character: 'Dr. Nick'
    },
    {
      line: 'Why do I have the feeling that someday I\'ll be describing this to a psychiatrist?',
      character: 'Lisa Simpson'
    },
    {
      line: 'Oh my God! The dead have risen and are voting Republican.',
      character: 'Bart Simpson'
    },
    {
      line: 'I have caught word that a child is using his imagination and I\'ve come to put a stop to it.',
      character: 'Principal Skinner'
    },
    {
      line: 'Ack. There is no emoticon to express what I am feeling right now.',
      character: 'Comic Book Guy'
    },
    {
      line: 'I think we\'d be all better off if each country had it\'s own planet.',
      character: 'Barney Gumble'
    },
    {
      line: 'Damnit Smithers. This is brain surgery, not rocket science.',
      character: 'Mr. Burns'
    },
    {
      line: 'Step over this line and say that. I\'ll kick your butt... at Nintendo.',
      character: 'Milhouse Van Houten'
    },
    {
      line: 'Weaseling out of things is important to learn. It\'s what separates us from the animals...except the weasel.',
      character: 'Homer Simpson'
    },
    {
      line: 'Fame was like a drug, but what was even more like a drug were the drugs.',
      character: 'Homer Simpson'
    },
    {
      line: 'Uh, no, you got the wrong number. This is 9-1... 2.',
      character: 'Chief Wiggum'
    },
    {
      line: 'It\'s true, I\'m a Rageaholic...I just can\'t live without Rageahol!',
      character: 'Homer Simpson'
    },
    {
      line: 'I\'ll keep it short and sweet - Family. Religion. Friendship. These are the three demons you must slay if you wish to succeed in business.',
      character: 'Mr. Burns.'
    },
    {
      line: 'You don\'t like your job, you don\'t strike. You go in every day and do it really half-assed. That\'s the American way.',
      character: 'Homer Simpson'
    },
    {
      line: 'I\'ve learned that life is one crushing defeat after another until you just wish Flanders was dead.',
      character: 'Homer Simpson'
    },
    {
      line: 'Hi! I\'m Troy McClure. You may remember me from such self help tapes as \'Smoke Yourself Thin\' and \'Get Some Confidence, Stupid!\'',
      character: 'Troy McClure'
    },
    {
      line: 'This is the greatest case of false advertising I\'ve seen since I sued the movie \'The Never Ending Story.\'',
      character: 'Lionel Hutz'
    }
  ];

}());
