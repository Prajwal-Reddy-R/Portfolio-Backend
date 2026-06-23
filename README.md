 A portfolio website with a React frontend and Node.js/Express backend, deployed on Vercel and Render, using MongoDB Atlas for data storage.

 ## Deployment
 - **Frontend**: Hosted on Vercel at `https://portfolio-client-89p0mgr2t-prajwal-reddy-rs-projects.vercel.app`
 - **Backend**: Hosted on Render at `https://portfolio-server.onrender.com`
 - **Database**: MongoDB Atlas, `portfolio` database, `contacts` collection
 - **Setup**:
   1. Pushed backend to GitHub (`portfolio-server`), deployed on Render with `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`.
   2. Pushed frontend to GitHub (`portfolio-client`), deployed on Vercel.
   3. Updated backend CORS to allow Vercel URL.
 - **Testing**: Send POST to `/api/contact`, verify data in Atlas, email in Gmail.

 ## Local Testing
 ```bash
 # Backend
 cd server
 npm install
 npm run dev
 # Frontend
 cd client
 npm install
 npm run dev
 ```