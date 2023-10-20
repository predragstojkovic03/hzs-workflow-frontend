export const apiUrl =
  import.meta.env.VITE_NODE_ENV === 'local'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_NODE_ENV === 'development'
    ? 'https://hzs-workflow-backend-git-development-predragstojkovic03.vercel.app'
    : 'https://hzs-workflow-backend.vercel.app';
