import { GraphQLServer, PubSub } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { default as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";
import path from "path";

const pubsub = new PubSub();
const prisma = new PrismaClient();

// Create a GraphQL-Yoga server
const createServer = () => {
  const server = new GraphQLServer({
    context: ({ request }) => ({
      prisma,
      pubsub,
      request,
    }),
    resolvers,
    typeDefs,
  });

  // Allow server to use the cors
  server.express.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", [
      process.env.GROOMZY_FRONTEND_URL,
    ]);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  server.express.get("/?/profile/:filename", (req, res) => {
    // Get the data request
    const notFound = {
      message: "The requested file does not exist.",
      success: false,
    };

    // Internal server error
    const internalServerError = {
      message:
        "There has been an internal server error while retrieving a profile picture.",
      success: false,
    };

    // Get all the params from the request
    const { filename } = req.params;

    // Get the base path if exist
    const basePath = process.env.GROOMZY_IMAGES_BASE_DIR || "";

    // Form a full path for the image location
    const fullPath = path.join(`${basePath}/profile`, filename);

    // Download the profile picture.
    res.download(fullPath, (err) => {
      console.log(err);
      if (err) {
        if (!res.headersSent) {
          res.status(500).send(internalServerError);
        } else {
          res.end();
        }
      }
    });
  });

  server.express.get("/?/gallery/:filename", (req, res) => {
    // Get the image
    const notFound = {
      message: "The requested image does not exist.",
      success: false,
    };

    // Internal server error
    const internalServerError = {
      message:
        "There has been an internal server error while retrieving gallery image.",
      success: false,
    };

    // Get all the params from the request
    const { filename } = req.params;

    // Get the base path if exist
    const basePath = process.env.GROOMZY_IMAGES_BASE_DIR || "";

    // Form a full path for the image location
    const fullPath = path.join(`${basePath}/gallery`, filename);

    // Download the gallery image.
    res.download(fullPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(500).send(internalServerError);
        } else {
          res.end();
        }
      }
    });
  });

  server.express.get("/?/tsandcs", (req, res) => {
    // Get the terms and conditions file
    const notFound = {
      message: "The requested terms and conditions file does not exist.",
      success: false,
    };

    // Internal server error
    const internalServerError = {
      message:
        "There has been an internal server error while retrieving terms and conditions.",
      success: false,
    };

    // Get the base path if exist
    const filePath = process.env.GROOMZY_TERMS_AND_CONDITIONS_BASE_DIR || "";

    // Download the gallery image.
    res.download(filePath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(500).send(internalServerError);
        } else {
          res.end();
        }
      }
    });
  });

  return server;
};

createServer().start({
  cors: {
    credentials: true,
    origin: process.env.GROOMZY_FRONTEND_URL,
  },
});
