export type Quote = {
  quote: string
  author?: string
}

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export const quotes: Quote[] = [
  {
    quote: 'Life is beautiful not because of the things we see or do. Live is beautiful because of the people we meet.',
    author: 'Simon Sinek'
  },
  {
    quote: 'Everyone you will ever meet knows something you don\'t.',
    author: 'Bill Nye'
  },
  {
    quote: 'If you\'re the smartest person you know, it\'s time to know some new people.',
    author: 'Robin S. Sharma'
  },
  {
    quote: 'Happiness is... when you make unexpected new friends.'
  },
  {
    quote: 'I meet people and they become chapters in my stories.',
    author: 'Avijeet Das'
  },
  {
    quote: 'Be genuinely interested in everyone you meet and everyone you meet will be genuinely interested in you.',
    author: 'Rasheed Ogunlaru'
  },
  {
    quote: 'Sometimes the greatest adventure is simply a conversation.',
    author: 'Amadeus Wolfe'
  },
  {
    quote: 'To be interesting, be interested',
  },
  {
    quote: 'Actions speak louder than words. A smile says \'I like you. I am glad to see you\''
  },
  {
    quote: 'You can\'t stay in the corner of the forest waiting for others to come to you. You have to go to them sometimes.',
    author: 'A. Milne'
  }
]
