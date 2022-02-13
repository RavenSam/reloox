const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seed() {
   const john = await prisma.user.create({
      data: {
         username: "john",
         email: "johndoe@example.com",
         // Password = twixrox
         passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
         profile: {
            create: { avatar: "https://res.cloudinary.com/djmrxybvj/image/upload/v1644685490/loc/19_aea0he.png" },
         },
      },
   })

   await Promise.all(
      getCategories().map((cat) => {
         return prisma.category.create({ data: cat })
      })
   )

   await Promise.all(
      getPosts().map((post) => {
         const data = { authorId: john.id, ...post }
         return prisma.post.create({ data })
      })
   )
}

seed()

function getCategories() {
   return [
      { name: "food" },
      { name: "travel" },
      { name: "fashion" },
      { name: "personal" },
      { name: "business" },
      { name: "news" },
      { name: "sports" },
      { name: "politics" },
      { name: "education" },
      { name: "health" },
      { name: "music" },
   ]
}

function getPosts() {
   return [
      {
         title: "JavaScript Performance Tips",
         slug: "javascript-performance-tips",
         description: `We will look at 10 simple tips and tricks to increase the speed of your code when writing JS`,
         content: dummyContent,
      },
      {
         title: "Tailwind vs. Bootstrap",
         slug: "tailwind-vs-bootstrap",
         description: `Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them`,
         content: dummyContent,
      },
      {
         title: "Writing Great Unit Tests",
         slug: "writing-great-unit-tests",
         description: `We will look at 10 simple tips and tricks on writing unit tests in JavaScript`,
         content: dummyContent,
      },
      {
         title: "What Is New In PHP 8?",
         slug: "what-is-new-in-php-8",
         description: `In this article we will look at some of the new features offered in version 8 of PHP`,
         content: dummyContent,
      },
   ]
}

const dummyContent = "dummy"
