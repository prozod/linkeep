# Linkeep ALPHA
### About (what is it?)
Repo for Linkeep, a webapp, browser extension made to manage and store your bookmarks efficiently.  
Offers full CRUD capabilities and import/exports for bookmarks via the Chrome extension.

#### Information (tech stack)
- Linkeep tech-stack: 
    - React (with TypeScript)
    - TailwindCSS
    - PostgreSQL (ORM: Prisma)
    - Node (Express server, Zod for input validation, JWT for a basic authentication and authorization flow)
    - Redis (used as an in-memory store/caching)
- Both the server and client are individual Docker instances running Alpine as the base image (lightweight, small image size, linux base functionalities).
- Database is running on AWS RDS.
- Backend is deployed on AWS via the Elastic Container Registry.
- Frontend is deployed on Vercel.


### How to run it on your machine: 
> To be updated.
