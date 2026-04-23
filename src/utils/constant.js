// export const BASE_URL = 'http://localhost:7777';
// export const BASE_URL = '/api';

export const BASE_URL =
  location.hostname === 'localhost' ? 'http://localhost:7777' : '/api';

export const emptyFeedContent = [
  {
    title: 'React useState',
    text: 'A React Hook that lets functional components store and manage local state. Whenever state updates, React re-renders the component automatically.',
    tag: 'React',
  },
  {
    title: 'React useEffect',
    text: 'Handles side effects like API calls, subscriptions, and DOM updates. Runs after render and can be controlled using dependency array.',
    tag: 'React',
  },
  {
    title: 'Virtual DOM',
    text: 'A lightweight copy of real DOM. React updates Virtual DOM first, compares differences (diffing), and updates only changed parts in real DOM.',
    tag: 'React',
  },
  {
    title: 'JS Closures',
    text: 'A closure is when a function remembers variables from its outer scope even after that outer function has finished executing.',
    tag: 'JS',
  },
  {
    title: 'Event Loop',
    text: 'JavaScript mechanism that handles asynchronous operations by moving tasks between call stack, callback queue, and microtask queue.',
    tag: 'JS Engine',
  },

  {
    title: 'Promises',
    text: 'Represents a value that may be available now, later, or never. Used for handling async operations with states: pending, resolved, rejected.',
    tag: 'JS',
  },
  {
    title: 'Async/Await',
    text: 'Syntactic sugar over Promises that makes asynchronous code look synchronous and easier to read and maintain.',
    tag: 'JS',
  },
  {
    title: 'Hoisting',
    text: 'JavaScript behavior where variable and function declarations are moved to the top of their scope before execution.',
    tag: 'JS',
  },
  {
    title: 'Debouncing',
    text: 'A performance optimization technique where a function executes only after a delay when the user stops triggering it.',
    tag: 'Performance',
  },
  {
    title: 'Throttling',
    text: 'Limits how often a function can be executed within a given time interval, useful for scroll and resize events.',
    tag: 'Performance',
  },

  {
    title: 'Node Event Loop',
    text: 'Core of Node.js that handles async operations using callbacks, timers, and I/O operations without blocking the main thread.',
    tag: 'Node.js',
  },
  {
    title: 'Express Middleware',
    text: 'Functions that execute during request-response cycle. Used for authentication, logging, error handling, etc.',
    tag: 'Backend',
  },
  {
    title: 'REST API',
    text: 'Architectural style for building APIs using HTTP methods like GET, POST, PUT, DELETE with stateless communication.',
    tag: 'Backend',
  },
  {
    title: 'JWT Auth',
    text: 'JSON Web Token is used for secure authentication. It stores user info in encrypted token sent between client and server.',
    tag: 'Security',
  },
  {
    title: 'CORS',
    text: 'Security feature that controls how resources are shared between different origins (domains) in web applications.',
    tag: 'Backend',
  },

  {
    title: 'MongoDB Schema',
    text: 'Defines structure of documents in MongoDB using Mongoose, including fields, types, and validation rules.',
    tag: 'Database',
  },
  {
    title: 'Indexing',
    text: 'Database optimization technique that speeds up search queries by creating quick lookup references.',
    tag: 'DB',
  },
  {
    title: 'Aggregation',
    text: 'Powerful MongoDB feature used to process and transform data using stages like $match, $group, $sort.',
    tag: 'DB',
  },
  {
    title: 'SQL vs NoSQL',
    text: 'SQL uses structured tables and fixed schema, while NoSQL offers flexible schema and horizontal scalability.',
    tag: 'DB',
  },
  {
    title: 'ACID Properties',
    text: 'Ensures reliable transactions in databases: Atomicity, Consistency, Isolation, and Durability.',
    tag: 'DB',
  },

  {
    title: 'System Design',
    text: 'Designing scalable and efficient systems by balancing performance, reliability, scalability, and maintainability.',
    tag: 'System',
  },
  {
    title: 'Load Balancer',
    text: 'Distributes incoming traffic across multiple servers to improve performance and reliability.',
    tag: 'System',
  },
  {
    title: 'Caching',
    text: 'Stores frequently accessed data in fast storage to reduce latency and improve performance.',
    tag: 'Performance',
  },
  {
    title: 'CDN',
    text: 'Content Delivery Network that delivers content from nearest server to reduce load time and latency.',
    tag: 'System',
  },
  {
    title: 'Microservices',
    text: 'Architecture where application is split into small independent services communicating via APIs.',
    tag: 'Architecture',
  },

  {
    title: 'Docker',
    text: 'Tool that packages applications into containers so they run consistently across different environments.',
    tag: 'DevOps',
  },
  {
    title: 'CI/CD',
    text: 'Continuous Integration and Continuous Deployment automate testing, building, and deployment pipelines.',
    tag: 'DevOps',
  },
  {
    title: 'Kubernetes',
    text: 'System for managing containerized applications, handling scaling, deployment, and load balancing.',
    tag: 'DevOps',
  },
  {
    title: 'Git Branching',
    text: 'Technique to create separate lines of development to work on features independently.',
    tag: 'Git',
  },
  {
    title: 'Merge Conflict',
    text: 'Occurs when Git cannot automatically merge changes from different branches.',
    tag: 'Git',
  },

  {
    title: 'React Props',
    text: 'Props are used to pass data from parent to child components in React.',
    tag: 'React',
  },
  {
    title: 'Redux',
    text: 'Centralized state management library used for managing global application state.',
    tag: 'React',
  },
  {
    title: 'Context API',
    text: 'Provides a way to share data globally without passing props through multiple levels.',
    tag: 'React',
  },
  {
    title: 'useMemo',
    text: 'React Hook used to memoize expensive calculations and avoid unnecessary re-computations.',
    tag: 'React',
  },
  {
    title: 'useCallback',
    text: 'Memoizes functions to prevent unnecessary re-renders in child components.',
    tag: 'React',
  },

  {
    title: 'WebSockets',
    text: 'Enables real-time bidirectional communication between client and server.',
    tag: 'Networking',
  },
  {
    title: 'HTTP Methods',
    text: 'Standard methods like GET (fetch), POST (create), PUT (update), DELETE (remove).',
    tag: 'Backend',
  },
  {
    title: 'Status Codes',
    text: 'HTTP response codes like 200 (OK), 404 (Not Found), 500 (Server Error).',
    tag: 'Backend',
  },
  {
    title: 'Auth vs AuthZ',
    text: 'Authentication verifies identity, while Authorization controls permissions.',
    tag: 'Security',
  },
];
