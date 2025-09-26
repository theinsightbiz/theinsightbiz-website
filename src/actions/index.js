export const toggleMenu = () => ({ type: 'ui/toggleMenu' })
export const showToast = (msg) => ({ type: 'ui/toast', payload: msg })
export const clearToast = () => ({ type: 'ui/clearToast' })

export const addPost = (post) => ({ type: 'content/addPost', payload: post })
export const addInquiry = (inq) => ({ type: 'content/addInquiry', payload: inq })
export const setBlogFilter = (payload) => ({ type: 'content/setFilter', payload })
