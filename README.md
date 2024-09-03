
# Groblje Horora

Groblje Horora is a full-stack Next.js blog application designed for Bruno Koić, a Media Culture graduate, poet, writer, and horror enthusiast. This project revitalizes a 17-year-old horror review blog, giving it a fresh look and modern features to attract a new audience. Through this platform, Bruno shares his thoughts and recommendations, helping readers discover horror movies worth watching—or avoiding.

[**Live**](https://www.groblje-horora.com/)

![preview](https://i.imgur.com/BzRZlFV.png)

## Objective

My main objective was to completely redesign the blog, which had been hosted on the outdated blog.hr platform and was not responsive at all. Also, the old platform lacked a database and had no consistent writing format, making it challenging to maintain. We had to come up with a new approach that could accommodate two main types of reviews: single reviews focusing on one movie and quad reviews covering four movies at once.

Additionally, we needed a robust image storage solution to ensure that all uploaded movie covers and scenes remained accessible and under Bruno's control. The new blog is designed to be easy to read and navigate, providing users with an enjoyable and engaging experience as they explore Bruno's horror content.

![decoration](https://i.imgur.com/4bxk67E.png)

## Design and Development

The design was a collaborative effort, with the initial prototype crafted in Figma by Tena Vuksanić. She brought a fresh and modern look to the previously outdated website, handling all future design tweaks to align with Bruno's vision.

My contribution included adding unique touches like a bloody knife cursor, home page cover design, a ghost loading spinner, a custom frame for the top 25 movies, and skull ratings instead of stars. I also made some small adjustments to the final design to simplify development while staying true to the original concept.

![details](https://i.imgur.com/4IA9C1p.png)
![homepage cover](https://i.imgur.com/0Vfj3sb.png)
## Technologies used to bring this project to life

**Next.js**
Serving as both the frontend and backend, Next.js was the perfect choice for building a fast, dynamic, and SEO-friendly blog. It allowed for efficient server-side rendering and easy routing, providing a smooth experience for users.

**MongoDB**
All reviews and user data are stored in MongoDB, a NoSQL database that offers flexibility and scalability. MongoDB's document-based structure was ideal for organizing the various types of content on the site, from reviews to user comments.

**Firebase**
For authentication and image storage, I turned to Firebase. It simplified the implementation of secure user authentication and made it easy to manage and store images, such as movie covers and user avatars, directly in the cloud.

## Transition to Next.js

The project initially started with React.js for the frontend, Express.js for the server and backend, MongoDB as the database, and Firebase for authentication and image storage. However, we encountered a significant challenge: the lack of server-side rendering, which made it difficult to create personalized Open Graph images, meta titles, meta descriptions and other meta data for shared review links on social media and messaging apps..

At that point, handling this issue with React and Express was beyond my capabilities, leading me to switch to Next.js. This React framework allowed me to manage both the frontend and backend, providing the server-side rendering I needed for enhanced shared link previews, improved SEO, and better Page Insights scores.

![Google Search results](https://i.imgur.com/OLE8L5e.png)

# Screenshots

![Reviews page and New Review page form](https://i.imgur.com/SmWLOL0.png)
![open graph and shares](https://i.imgur.com/5ezoG1M.png)
![single and quad review](https://i.imgur.com/8t6r5i1.png)
![review content](https://i.imgur.com/HtjYIgr.png)
![comments, likes and suggestions](https://i.imgur.com/PxQPl4V.png)
![login and top 25](https://i.imgur.com/oaZJlYE.png)
![tags](https://i.imgur.com/gRLmYSZ.png)