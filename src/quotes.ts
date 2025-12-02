export const motivationalQuotes = [
  "The only impossible journey is the one you never begin.",
  "Life is either a daring adventure or nothing at all.",
  "Don't be pushed by your problems. Be led by your dreams.",
  "The biggest adventure you can take is to live the life of your dreams.",
  "Your time is limited, don't waste it living someone else's life.",
  "The only way to do great work is to love what you do.",
  "Life is too short to be stuck in a job you hate.",
  "Dream big, work hard, stay focused, and surround yourself with good people.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't count the days, make the days count.",
  "Life begins at the end of your comfort zone.",
  "The world is a book, and those who do not travel read only one page.",
  "Jobs fill your pocket, but adventures fill your soul.",
  "Escape the ordinary, embrace the extraordinary.",
  "Your dreams don't have an expiration date. Take a deep breath and try again.",
  "Sometimes you need to step outside, get some air, and remind yourself of who you are.",
  "The cave you fear to enter holds the treasure you seek.",
  "Life is short. Break the rules, forgive quickly, kiss slowly, love truly.",
  "Twenty years from now you will be more disappointed by the things you didn't do.",
  "The only person you are destined to become is the person you decide to be.",
];

export const getRandomQuote = (): string => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};
