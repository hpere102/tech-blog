async function editFormHandler(event) {
    event.preventDefault();
  

  const postTitle = document.querySelector('input[name="post-title"]').value.trim();
  const postContent = document.querySelector('textarea[name="content"]').value.trim();

  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (postTitle) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: postTitle,
        content: postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}
  
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);