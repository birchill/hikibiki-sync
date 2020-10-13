// THIS IS ALL JUST PROOF-OF-CONCEPT! DON'T PAY ANY ATTENTION TO IT!

export function getTokens(str: string, lang: string): Array<string> {
  const lc = str.toLocaleLowerCase(lang);
  const tokens = [...new Set(tokenize(lc, lang))];
  const withoutStopwords = tokens.filter(isNotStopWord);
  // If we have only stop words, we should return them
  return withoutStopwords.length ? withoutStopwords : tokens;
}

function tokenize(str: string, lang: string): Array<string> {
  switch (lang) {
    case 'de':
      return str.split(/[^a-zäöüß0-9]+/);

    case 'ru':
      return str.split(/[^a-zа-яё0-9]/);

    case 'es':
      return str.split(/[^a-zá-úñü0-9]+/);

    case 'hu':
      return str.split(/[^a-záéíóúöüőű0-9]+/);

    case 'sv':
      return str.split(/[^a-z0-9åäöü0-9]+/);

    case 'fr':
      return str.split(/[^a-z0-9äâàéèëêïîöôùüûæœçÿ]+/);

    case 'sl':
      return str.split(/[^a-z0-9_čšžáéíóúŕêôàèìòù]+/);

    case 'nl':
      return str.split(/[^a-záéíóúàèëïöüĳ]+/);

    default:
      console.error(`Unrecognized language ${lang}`);
    /* Fall through to default tokenizer */

    case 'en':
      return str.split(/\W+/);
  }
}

function isNotStopWord(token: string): boolean {
  return token.length > 1 && !ENGLISH_STOPWORDS.has(token);
}

// prettier-ignore
const ENGLISH_STOPWORDS = new Set<string>([
  'a', 'about', 'after', 'again', 'all', 'am', 'an', 'and', 'any', 'are',
  "aren't", 'as', 'at', 'be', 'because', 'been', 'being', 'below', 'between',
  'both', 'but', 'by', "can't", 'cannot', 'could', "couldn't", 'did', "didn't",
  'do', 'does', "doesn't", 'doing', "don't", 'down', 'for', 'from', 'had',
  "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll",
  "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his',
  'how', "how's", "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is',
  "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most',
  "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over',
  'own', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't",
  'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd",
  "they'll", "they're", "they've", 'this', 'those', 'through', 'to', 'too',
  'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're",
  "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where',
  "where's", 'which', 'while', "who's", 'whom', 'why', "why's", 'with',
  "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're", "you've",
  'your', 'yours', 'yourself', 'yourselves',
]);

// Stop words
//
// English:
// https://dev.mysql.com/doc/refman/8.0/en/fulltext-stopwords.html
// http://xpo6.com/list-of-english-stop-words/
//
// Multiple languages:
// https://www.ranks.nl/stopwords/
// https://code.google.com/archive/p/stop-words/
