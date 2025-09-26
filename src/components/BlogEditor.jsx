import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../actions'

export default function BlogEditor(){
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    if(!title.trim() || !body.trim()) return
    const tagArr = tags.split(',').map(t => t.trim()).filter(Boolean)
    dispatch(addPost({ title, body, tags: tagArr, date: new Date().toISOString() }))
    setTitle(''); setBody(''); setTags('')
  }

  return (
    <form className="blog-editor" onSubmit={submit}>
      <h4>Add a Blog Post</h4>
      <input placeholder="Post title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea rows="6" placeholder="Write informative content..." value={body} onChange={e=>setBody(e.target.value)} />
      <input placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
      <button className="btn primary">Publish</button>
    </form>
  )
}
