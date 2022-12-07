export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.API_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
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
      return res.status(500).send('Error revalidating')
    }
  }