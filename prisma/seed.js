const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seed() {
   const john = await prisma.user.create({
      data: {
         username: "john",
         email: "johndoe@example.com",
         // Password = twixrox
         passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
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

const dummyContent =
   "# RelooX\n\n## What is Lorem Ipsum?\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n\n## Why do we use it?\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n\n## Where does it come from?\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32."
