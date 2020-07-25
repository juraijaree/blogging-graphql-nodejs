import getUserId from '../utils/getUserId';

const Query = {
  me (parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({ where: { id: userId } });
  },

  // ---------------------------------
  // ============= USER ==============
  // ---------------------------------

  users (parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = { first, skip, after, orderBy };

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },

  // ---------------------------------
  // ============= POST ==============
  // ---------------------------------

  async post (parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts({
      where: {
        id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      }
    }, info);

    if (posts.length === 0) {
      throw new Error('Post not found');
    }

    return posts[0];
  },

  posts (parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        published: true
      }
    };

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },

  myPosts (parent, { query, first, skip, after, orderBy }, { prisma, request }, info) {
    const userId = getUserId(request);

    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        author: {
          id: userId
        }
      }
    };

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },

  // ---------------------------------
  // ============= COMMENT ===========
  // ---------------------------------

  comments (parent, { first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = { first, skip, after, orderBy };

    return prisma.query.comments(opArgs, info);
  }
};

export default Query;
