const demoPosts = [
   { id: 1, title: 'Welcome to Insight Blog', body: 'We share updates on finance, tax & compliance from India and the UAE.', tags: ['news','compliance'], date: new Date().toISOString() },
]

const initial = {
  faqs: [
    { q: 'What industries do you serve?', a: 'We work with startups, SMEs, and multinational companies across sectors such as manufacturing, services, and tech.'},
    { q: 'Do you operate in India and UAE?', a: 'Yes. We have deep experience in both jurisdictions and offer cross-border advisory.'},
    { q: 'How soon can we get started?', a: 'Discovery call within 24–48 hours and onboarding as per scope.'}
  ],
  posts: demoPosts,
  filter: { q: '', tag: null },
  inquiries: []
}

export default function contentReducer(state = initial, action){
  switch(action.type){
    case 'content/addPost':
      return { ...state, posts: [{...action.payload, id: Date.now()}, ...state.posts] }
    case 'content/setFilter':
      return { ...state, filter: { ...state.filter, ...action.payload } }
    case 'content/addInquiry':
      return { ...state, inquiries: [...state.inquiries, action.payload] }
    default:
      return state
  }
}
