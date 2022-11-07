export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.API_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      if(req.query.entity === 'blog')
      {
        await res.revalidate(req.query.slug)  
      } 
      else 
      {
        await res.revalidate(req.query.entity + '/' + req.query.slug)
      }
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }