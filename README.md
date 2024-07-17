This is your shiny new Next.js project, ready to take the web by storm. Let's get it fired up in a few easy steps:

## 1. Grab those dependencies:

First things first, fire up your terminal and run this magic command to install all the project needs:

```
npm install
```

## 2. Docker Compose

Docker Compose makes things super easy. Just run this command to start all the required services:

```
docker-compose up -d
```

## 3. Time to see your creation!

##

Open up your web browser and head over to http://localhost:3000. Your Next.js app should be waiting there for you!

## Bonus! Admin access:

The default admin credentials are:

```
Username: admin
Password: admin
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
NEXTAUTH_SECRET={your_serect}
```

### Hosting

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Change it when you deploy to vercel orr what ever hosting :)

### Database

```
DATABASE_URL="postgresql://ecommerce:password123@localhost:5432/ecommerce?schema=public"
```

### Google authentication

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
```

This is your shiny new Next.js project, ready to take the web by storm. Let's get it fired up in a few easy steps:

## 1. Grab those dependencies:

First things first, fire up your terminal and run this magic command to install all the project needs:

```
npm install
```

## 2. Docker Compose

Docker Compose makes things super easy. Just run this command to start all the required services:

```
docker-compose up -d
```

## 3. Time to see your creation!

Start project:

```
npx prisma db seed # generate seed data

npm run dev
```

Open up your web browser and head over to http://localhost:3000. Your Next.js app should be waiting there for you!

## Bonus! Admin access:

The default admin credentials are:

```
Username: admin
Password: admin
```
