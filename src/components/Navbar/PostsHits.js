import React, { createElement } from "react"

function PostsHits({ hit, components }) {
  return (
    <a href={`/posts/${hit._id}`} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="title" />
        </div>
      </div>
    </a>
  )
}

export default PostsHits
