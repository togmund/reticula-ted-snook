import { ThrowableRouter, withContent } from 'itty-router-extras'

const router = ThrowableRouter()

// Router
function handleInfo() {
  const response = {
    apiversion: '1',
    author: 'togmund',
    color: '#888888',
    head: 'default',
    tail: 'default',
  }
  return new Response(JSON.stringify(response), { status: 200 })
}

function handleStart({ content }) {
  console.log(content)
  return new Response('Start', { status: 200 })
}

function handleMove({ content }) {
  console.log(content.board)
  const response = {
    move: 'up',
    shout: "I guess I'll go up then.",
  }
  return new Response(JSON.stringify(response), { status: 200 })
}

function handleEnd({ content }) {
  return new Response('Not Found.', { status: 200 })
}

// Routes
router.get('/', withContent, handleInfo)
router.post('/start', withContent, handleStart)
router.post('/move', withContent, handleMove)
router.post('/end', withContent, handleEnd)

// Boilerplate
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request)),
)
