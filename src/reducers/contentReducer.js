// contentReducer.js

const CONTENT_VERSION = 2; // <-- bump this when you edit default FAQs

const demoPosts = [
  { id: 1, title: 'Welcome to Insight Blog', body: 'We share updates on finance, tax & compliance from India and the UAE.', tags: ['news','compliance'], date: new Date().toISOString() },
];

const initial = {
  contentVersion: CONTENT_VERSION,
  faqs: [
    { q: 'What industries do you serve?', a: 'We work with startups, SMEs, and multinational companies across sectors such as manufacturing, services, and tech.'},
    { q: 'Do you operate in India, UAE, UK and USA?', a: 'Yes. We have deep experience in above jurisdictions and offer cross-border advisory.'},
    { q: 'How soon can we get started?', a: 'Discovery call within 24–48 hours and onboarding as per scope.'}
  ],
  posts: demoPosts,
  filter: { q: '', tag: null },
  inquiries: []
};

export default function contentReducer(state = initial, action) {
  // If app code has a newer content version, refresh default FAQs once.
  if (state.contentVersion !== CONTENT_VERSION) {
    return {
      ...state,
      contentVersion: CONTENT_VERSION,
      faqs: initial.faqs
    };
  }

  switch (action.type) {
    case 'content/addPost':
      return { ...state, posts: [{ ...action.payload, id: Date.now() }, ...state.posts] };
    case 'content/setFilter':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'content/addInquiry':
      return { ...state, inquiries: [...state.inquiries, action.payload] };
    // (Optional) expose a way to set FAQs at runtime:
    case 'content/setFaqs':
      return { ...state, faqs: action.payload };
    default:
      return state;
  }
}
