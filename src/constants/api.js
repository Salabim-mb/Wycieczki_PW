const domain = process.env.REACT_APP_BACKEND_PATH;

const BLOG = `${domain}/blog/`;
const BLOG_TOPIC = `${BLOG}topic/`;
const BLOG_RESERVATION = `${BLOG}post-reservation/`;
const BLOG_POST = `${BLOG}post/`;

const paths = {
    BLOG,
    BLOGS: `${BLOG}blogs/`,
    BLOG_TOPIC,
    BLOG_TOPICS: `${BLOG}topics/`,
    BLOG_RESERVATION,
    BLOG_POST,
    BLOG_POSTS: `${BLOG}posts/`,
    BLOG_INDEX_CHANGE: `${BLOG}index-change/`,
    TOPIC_INDEX_CHANGE: `${BLOG_TOPIC}index-change/`,
    BLOG_IMAGE: `${BLOG}image-attachment/`,
    BLOG_DOWNLOADABLE: `${BLOG}downloadable-attachment/`,
};

export default paths;