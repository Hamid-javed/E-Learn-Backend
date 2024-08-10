const mongoose = require("mongoose");
const Mentor = require("../models/mentorSchema");
const Catagorie = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");
const User = require("../models/userSchema");
const bcrypt = require('bcrypt')
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/E-learning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mentorsData = [
  {
    name: "John Doe",
    image:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "I am a dedicated software engineer with a passion for building scalable, efficient, and innovative solutions. With a strong foundation in computer science and extensive experience in full-stack development, I specialize in designing and implementing software systems that address real-world challenges.",
    title: "Software Engineer",
    reviews: [
      {
        rating: 5,
        review:
          "John has an exceptional ability to break down complex concepts into easily understandable chunks. His mentoring style is supportive and encouraging, which really helped me gain confidence in my coding abilities.",
      },
      {
        rating: 4,
        review:
          " His extensive industry experience adds great value to his teaching, and I have learned a lot from his real-world examples. I would highly recommend John to anyone looking to deepen their understanding of software development.",
      },
    ],
    courses: [],
    numOFReviews: 2,
    numOfCourses: 2,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/johndoe" },
      { platform: "Twitter", link: "https://twitter.com/johndoe" },
      { platform: "facebook", link: "https://facebook.com/johndoe" },
      { platform: "linkdin", link: "https://linkdin.com/johndoe" },
    ],
  },
  {
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "I am a seasoned data scientist and machine learning expert with a deep passion for extracting valuable insights from complex datasets and creating intelligent systems. With a robust background in statistics, mathematics, and computer science, I specialize in developing data-driven solutions that drive business growth and innovation.",
    title: "Data Scientist",
    reviews: [
      {
        rating: 5,
        review:
          "Jane is a fantastic mentor who goes above and beyond to ensure her mentees succeed. She is incredibly patient and always available to answer questions, no matter how small. Jane's feedback is constructive and insightful",
      },
    ],
    courses: [],
    numOFReviews: 1,
    numOfCourses: 1,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/janesmith" },
      { platform: "Twitter", link: "https://twitter.com/janesmith" },
      { platform: "facebook", link: "https://facebook.com/janesmith" },
      { platform: "linkdin", link: "https://linkdin.com/janesmith" },
    ],
  },
  {
    name: "Mike Johnson",
    image:
      "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "Beyond coding, I find immense satisfaction in teaching and mentoring aspiring developers. I believe in the power of sharing knowledge and helping others unlock their potential. Whether through one-on-one mentorship, conducting workshops, or creating educational content, my goal is to make complex concepts accessible and engaging for learners of all levels.",
    title: "Full-Stack Web Developer",
    reviews: [
      {
        rating: 4,
        review:
          "Michael is an exceptional mentor who combines technical expertise with a genuine passion for teaching. He is adept at identifying individual strengths and tailoring his mentoring approach accordingly. Michael's insightful feedback and practical tips have significantly enhanced my understanding of software development.",
      },
    ],
    courses: [],
    numOFReviews: 1,
    numOfCourses: 2,
    socialMedia: [
      { platform: "Twitter", link: "https://twitter.com/mikejohnson" },
      { platform: "Twitter", link: "https://twitter.com/mikejhonson" },
      { platform: "facebook", link: "https://facebook.com/mikejhonson" },
      { platform: "linkdin", link: "https://linkdin.com/mikejhonson" },
    ],
  },
  {
    name: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "In my role as a front-end developer, I specialize in crafting responsive and dynamic web applications using modern technologies like HTML, CSS, JavaScript, and frameworks such as React and Vue.js. My focus is on ensuring that every interaction is smooth, every page loads efficiently, and every design element serves a clear purpose.",
    title: "Front-end developer and UX/UI designer.",
    reviews: [
      {
        rating: 4,
        review:
          " Her teaching style is interactive and engaging, which makes learning both effective and fun. She is always prepared with well-structured lessons and real-life examples that enhance the learning experience. Emily's constructive criticism has helped me to refine my skills and approach problems more strategically. I highly recommend her mentorship to anyone looking to advance their career.",
      },
    ],
    courses: [],
    numOFReviews: 2,
    numOfCourses: 1,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/emilydavis" },
      { platform: "Instagram", link: "https://instagram.com/emilydavis" },
      { platform: "facebook", link: "https://facebook.com/emilydavis" },
      { platform: "linkdin", link: "https://linkdin.com/emilydavis" },
    ],
  },
  {
    name: "Robert Brown",
    image:
      "https://plus.unsplash.com/premium_photo-1710911199022-9faa1c04dc0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "With a solid foundation in both software development and system administration, I am skilled in implementing and managing CI/CD pipelines, automating infrastructure provisioning, and monitoring system performance. I leverage tools and technologies such as Docker, Kubernetes, Jenkins, Terraform, and Ansible to facilitate seamless integration and deployment processes, ensuring that code changes are delivered efficiently and with high quality",
    title: "DevOps engineer",

    reviews: [
      {
        rating: 5,
        review:
          "His methodical approach to problem-solving and his ability to explain technical details clearly have been invaluable. He is always willing to share his knowledge and provides practical advice that is applicable to real-world scenarios.",
      },
      {
        rating: 5,
        review:
          "Robert has been an instrumental figure in my professional growth. which really helped me gain confidence in my coding abilities. His extensive industry experience adds great value to his teaching, and I have learned a lot from his real-world examples.",
      },
    ],
    courses: [],
    numOFReviews: 1,
    numOfCourses: 2,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/robertbrown" },
      { platform: "GitHub", link: "https://github.com/robertbrown" },
      { platform: "facebook", link: "https://facebook.com/robertbrown" },
      { platform: "linkdin", link: "https://linkdin.com/robertbrown" },
    ],
  },
  {
    name: "Alice Johnson",
    image:
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "I am a creative graphic designer with a passion for crafting visually stunning and impactful designs. With a solid background in visual communication and design principles, I specialize in creating engaging graphics, brand identities, and user interfaces that resonate with audiences. My goal is to transform ideas into compelling visual stories.",
    title: "Graphic Designer",
    reviews: [
      {
        rating: 5,
        review:
          "Alice has a remarkable talent for turning abstract ideas into visually appealing designs. Her attention to detail and creativity are second to none. Working with her has been a truly inspiring experience.",
      },
      {
        rating: 4,
        review:
          "Her ability to understand client needs and deliver outstanding designs on time is impressive. Alice's work consistently exceeds expectations, making her a top choice for anyone needing high-quality graphic design.",
      },
    ],
    courses: [],
    numOFReviews: 2,
    numOfCourses: 2,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/alicejohnson" },
      { platform: "Twitter", link: "https://twitter.com/alicejohnson" },
      { platform: "Facebook", link: "https://facebook.com/alicejohnson" },
      { platform: "Dribbble", link: "https://dribbble.com/alicejohnson" },
    ],
  },
  {
    name: "Michael Lee",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "I am a dedicated cyber security expert with extensive experience in protecting systems and data from cyber threats. With a deep understanding of security protocols, risk management, and threat analysis, I specialize in developing strategies to safeguard digital assets and ensure robust security measures. My mission is to create secure environments where organizations can thrive without fear of cyber attacks.",
    title: "Cyber Security Expert",
    reviews: [
      {
        rating: 5,
        review:
          "Michael is an exceptional security expert who provides invaluable insights into safeguarding systems against threats. His expertise and proactive approach have significantly enhanced our security posture.",
      },
      {
        rating: 4,
        review:
          "He has a thorough understanding of cyber security best practices and a knack for identifying potential vulnerabilities. Michael's advice and solutions are always practical and effective.",
      },
    ],
    courses: [],
    numOFReviews: 2,
    numOfCourses: 2,
    socialMedia: [
      { platform: "LinkedIn", link: "https://linkedin.com/in/michaellee" },
      { platform: "Twitter", link: "https://twitter.com/michaellee" },
      { platform: "Facebook", link: "https://facebook.com/michaellee" },
      { platform: "GitHub", link: "https://github.com/michaellee" },
    ],
  },
];

const categories = [
  { name: "Web Development" },
  { name: "UI/Ux Design" },
  { name: "Data Science" },
  { name: "DevOps" },
  { name: "Graphic Design" },
  { name: "Backend Development" },
  { name: "Cyber Security" },
];

// const mentorId = [
//   { webDev: "66b61bac3d1641861398657c" },
//   { datSci: "66b61bac3d16418613986581" },
//   { fullstack: "66b61bac3d16418613986586" },
//   { uiux: "66b61bac3d1641861398658b" },
//   { devOps: "66b61bac3d16418613986590" },
//   { gDesign: "66b61bac3d16418613986595" },
//   { cyber: "66b61bac3d1641861398659a" },
// ];
const thumbnails = [
  "https://plus.unsplash.com/premium_photo-1678566154673-a728037f3f00?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1663050633633-2856e875dcc7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://plus.unsplash.com/premium_photo-1661692759400-15aa4e2de6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1617240016072-d92174e44171?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1665203646951-1840d93398a4?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1690207925012-0feb0b85ddf8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670213989449-0df2d16d712c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661372041123-1eda2823211e?q=80&w=1797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1690191793779-ca5132c113c5?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1656067638332-1d189bf81079?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1654220670179-f1098a09d9ba?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1626654386409-180d8880fca5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661281312741-531b9e37b756?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661284886711-4eaee4fa7771?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1614064643087-96ce7f0737c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683121713210-97667d2e83c8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1624969862644-791f3dc98927?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661872680599-bfb0a671f8b1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const mentorReviews = [
  [
    {
      rating: 5,
      review:
        "John's expertise in software engineering is truly exceptional. His ability to break down complex topics into manageable pieces was incredibly helpful. His deep understanding of both theoretical concepts and practical applications made each session highly informative and engaging. I feel much more confident in my coding skills thanks to his guidance.",
    },
    {
      rating: 4,
      review:
        "John is an excellent mentor with a wealth of knowledge in software engineering. His real-world examples and hands-on approach to teaching have provided me with a strong foundation in the field. While his sessions were incredibly beneficial, I sometimes found the pace a bit fast, but overall, his guidance was invaluable.",
    },
    {
      rating: 5,
      review:
        "Mentoring style is incredibly supportive and encouraging. His feedback was always constructive and aimed at helping me grow as a developer. His detailed explanations and patience made complex topics easier to understand. I greatly appreciate his dedication and the confidence he helped me build in my coding abilities.",
    },
    {
      rating: 4,
      review:
        "I had a great experience with John as my mentor. His sessions were full of valuable insights and practical advice. He made sure to address all my questions and provided thoughtful responses. Occasionally, I felt that more time could be spent on certain topics, but his overall mentoring approach was very effective.",
    },
    {
      rating: 5,
      review:
        "John's extensive industry experience and real-world examples made his sessions incredibly valuable. His ability to relate theoretical concepts to practical applications helped me grasp complex ideas more easily. His supportive and detailed feedback has significantly enhanced my programming skills and understanding of software engineering.",
    },
  ],

  [
    {
      rating: 5,
      review:
        "Jane's deep knowledge of data science and her effective teaching methods make learning complex topics much more manageable. Her ability to explain intricate concepts with clarity and her hands-on approach to problem-solving have greatly enhanced my understanding of data analysis and machine learning. Jane's mentoring has been a key factor in my progress in the field.",
    },
    {
      rating: 4,
      review:
        "She is an exceptional mentor who provides insightful and practical feedback. Her expertise in data science and machine learning is evident in her teaching. While her sessions are generally very helpful, occasionally the topics covered could benefit from a bit more depth. Nonetheless, her guidance has been instrumental in my learning journey.",
    },
    {
      rating: 5,
      review:
        "With Jane's guidance, I've been able to tackle challenging data science problems with confidence. Her thorough explanations and encouragement have made complex subjects more accessible. Jane's mentorship has not only improved my technical skills but also my overall approach to data-driven problem solving.",
    },
    {
      rating: 4,
      review:
        "Jane offers a wealth of knowledge and practical insights into data science and machine learning. Her feedback is always detailed and aimed at helping me improve. Sometimes, the pace of the sessions felt a bit rushed, but her expertise and support have been greatly beneficial to my learning experience.",
    },
    {
      rating: 5,
      review:
        "The mentorship has been invaluable in my journey through data science. Her ability to connect theoretical knowledge with practical applications has greatly enhanced my learning. Her supportive approach and willingness to go the extra mile to ensure I understand the material have made a significant impact on my progress.",
    },
  ],
  [
    {
      rating: 5,
      review:
        "His approach to teaching web design is both innovative and practical. His lessons are well-structured and cover a broad range of topics, from the basics of HTML and CSS to advanced design principles. His feedback is always constructive, and his passion for design is evident in every session. I've gained a lot of valuable skills through his mentorship.",
    },
    {
      rating: 4,
      review:
        "This course provides a comprehensive overview of web design concepts. His practical examples and design challenges are particularly useful for understanding how to apply theoretical knowledge. Occasionally, I found the sessions a bit intense, but overall, his guidance has been instrumental in improving my design skills.",
    },
    {
      rating: 5,
      review:
        "Michael is a fantastic mentor with a deep understanding of web design. His ability to break down complex design principles into manageable lessons has greatly enhanced my learning experience. His constructive feedback and encouragement have been crucial in helping me develop my skills and confidence as a designer.",
    },
    {
      rating: 4,
      review:
        "The lessons in web design are engaging and informative. He covers a wide range of topics, and his practical approach helps in applying design concepts effectively. While some sessions felt a bit rushed, his overall mentoring approach is very effective and has significantly improved my web design skills.",
    },
    {
      rating: 5,
      review:
        "Michael's expertise in web design has been incredibly valuable to me. His ability to teach complex concepts in a clear and understandable way has made a significant impact on my learning. His feedback is always detailed and aimed at helping me grow as a designer, and I appreciate his dedication and support.",
    },
  ],
  [
    {
      rating: 5,
      review:
        "The insights into UX design are both deep and practical. Her sessions cover a wide range of topics and include hands-on exercises that help reinforce learning. Her feedback is always thoughtful and aimed at helping me improve my design skills. Sarah's mentorship has been a key factor in my growth as a UX designer.",
    },
    {
      rating: 4,
      review:
        "This provides a thorough understanding of UX design principles. Her lessons are well-organized, and her feedback is constructive. While some topics could benefit from more in-depth exploration, her overall approach to teaching UX design is highly effective and has helped me enhance my skills.",
    },
    {
      rating: 5,
      review:
        "That is an excellent mentor with a deep passion for UX design. Her sessions are informative and engaging, and her feedback helps in refining my design approach. Her support and guidance have greatly contributed to my development as a UX designer, and I highly value her expertise.",
    },
    {
      rating: 4,
      review:
        "The lessons in UX design are both practical and insightful. Her ability to provide constructive feedback and her focus on real-world applications have been very beneficial. Although some topics felt a bit rushed, her overall mentoring approach has significantly improved my understanding of UX design.",
    },
    {
      rating: 5,
      review:
        "Mentorship in UX design has been outstanding. Her lessons are well-structured and cover essential topics in great detail. Her feedback is always aimed at helping me grow as a designer, and her supportive approach has made a significant difference in my learning experience.",
    },
  ],
  [
    {
      rating: 5,
      review:
        "Their approach to teaching machine learning is both comprehensive and engaging. Her lessons cover a wide range of topics and include practical exercises that reinforce learning. Her feedback is insightful, and her passion for the subject is evident in every session. Emily's guidance has greatly enhanced my understanding of machine learning.",
    },
    {
      rating: 4,
      review:
        "The course provides a thorough understanding of machine learning concepts. Her lessons are well-organized, and her feedback is constructive. Although some topics could benefit from additional depth, her overall approach to teaching is very effective and has contributed significantly to my learning.",
    },
    {
      rating: 5,
      review:
        "This machine learning has been exceptional. Her ability to explain complex concepts clearly and her practical approach to teaching have been invaluable. Her feedback is always aimed at helping me improve my skills, and her support has greatly enhanced my knowledge in the field.",
    },
    {
      rating: 4,
      review:
        "they offer a detailed and practical understanding of machine learning. Her sessions are informative, and her feedback is always constructive. While some aspects of the course could be expanded, her overall mentoring approach has been very effective in advancing my knowledge in machine learning.",
    },
    {
      rating: 5,
      review:
        "the sessions on machine learning are engaging and full of valuable insights. Her ability to break down complex topics and provide practical examples has been incredibly helpful. Her guidance and feedback have been instrumental in my growth as a machine learning practitioner.",
    },
  ],

  [
    {
      rating: 5,
      review:
        "His expertise in DevOps is evident in his well-structured and practical lessons. His approach to teaching containerization and infrastructure management is both thorough and engaging. His feedback is always constructive, and his support has been crucial in helping me understand and apply DevOps principles effectively.",
    },
    {
      rating: 4,
      review:
        "That provides a comprehensive overview of DevOps practices. His lessons on containerization and monitoring are particularly useful. Occasionally, the pace of the sessions felt a bit quick, but his overall guidance has been very helpful in advancing my DevOps skills.",
    },
    {
      rating: 5,
      review:
        "their mentorship in DevOps is exceptional. His ability to explain complex concepts clearly and his hands-on approach to teaching have been incredibly valuable. His feedback is always aimed at helping me improve, and his support has greatly enhanced my understanding of DevOps practices.",
    },
    {
      rating: 4,
      review:
        "the course offers a detailed and practical approach to DevOps. His lessons are informative, and his feedback is constructive. While some sessions could benefit from more depth, his overall mentoring approach has been effective in helping me grasp essential DevOps concepts.",
    },
    {
      rating: 5,
      review:
        "the sessions on DevOps are engaging and insightful. His expertise in containerization and infrastructure management has been invaluable. His constructive feedback and supportive approach have greatly contributed to my learning and application of DevOps principles.",
    },
  ],

  [
    {
      rating: 5,
      review:
        "their approach to teaching graphic design is both creative and practical. Her lessons cover a wide range of design principles and techniques, and her feedback is always constructive. Her passion for design is evident in her sessions, and her guidance has been instrumental in developing my skills in graphic design.",
    },
    {
      rating: 4,
      review:
        "this provides a thorough understanding of graphic design concepts. Her lessons are well-structured, and her practical approach helps in applying design principles effectively. Occasionally, some topics felt a bit rushed, but her overall mentoring has been very beneficial.",
    },
    {
      rating: 5,
      review:
        "Mentorship in graphic design has been exceptional. Her ability to explain complex design concepts clearly and her hands-on approach to teaching have been incredibly valuable. Her feedback is always aimed at helping me improve, and her support has greatly enhanced my skills as a designer.",
    },
    {
      rating: 4,
      review:
        "the sessions on graphic design are engaging and informative. Her expertise and practical examples have been very helpful. While some topics could be explored in more depth, her overall approach to teaching design principles has significantly improved my skills.",
    },
    {
      rating: 5,
      review:
        "their expertise in graphic design is evident in her well-organized and creative lessons. Her feedback is constructive and aimed at helping me refine my design skills. Her guidance has been instrumental in developing my understanding of graphic design principles and techniques.",
    },
  ],
];
const reviews = [
  {
    rating: 5,
    review:
      "An exceptional course with clear explanations and practical exercises. It exceeded my expectations.",
  },
  {
    rating: 4,
    review:
      "Well-structured and informative. Some areas could use more depth, but overall a great learning experience.",
  },
  {
    rating: 5,
    review:
      "The best course I've taken! The instructor's expertise and the detailed content made complex topics easy to understand.",
  },
  {
    rating: 3,
    review:
      "The course was decent but lacked engagement. More interactive elements would enhance the learning experience.",
  },
  {
    rating: 4,
    review:
      "A solid course that provides a good foundation. The real-world examples were especially helpful.",
  },
  {
    rating: 5,
    review:
      "Highly recommended! The course material was well-organized and the instructor was very knowledgeable.",
  },
  {
    rating: 4,
    review:
      "The course covered a lot of material, but a few topics could have been explained in more detail.",
  },
  {
    rating: 5,
    review:
      "Fantastic course! The hands-on projects and quizzes really helped reinforce the concepts learned.",
  },
  {
    rating: 3,
    review:
      "Useful content, but the course could benefit from a faster pace and more engaging delivery.",
  },
  {
    rating: 4,
    review:
      "Good course overall. The instructor was clear and concise, though some areas felt a bit rushed.",
  },
  {
    rating: 5,
    review:
      "Incredible course with practical insights and clear instruction. I learned a lot and feel confident in the subject.",
  },
  {
    rating: 4,
    review:
      "Very informative with practical examples. A few more advanced topics would be a great addition.",
  },
  {
    rating: 5,
    review:
      "Excellent course! The material was well-organized and the instructor provided valuable feedback.",
  },
  {
    rating: 3,
    review:
      "The course was okay but lacked depth in some areas. More detailed explanations would be helpful.",
  },
  {
    rating: 4,
    review:
      "Great course with a lot of valuable information. The pacing was good, but some sections could use more examples.",
  },
  {
    rating: 5,
    review:
      "One of the best courses I've taken. The content was relevant and the teaching style was engaging.",
  },
  {
    rating: 4,
    review:
      "Good course with clear explanations. Additional interactive elements would improve the overall experience.",
  },
  {
    rating: 5,
    review:
      "Outstanding course! The practical projects were very helpful in applying the concepts learned.",
  },
  {
    rating: 3,
    review:
      "The course was useful but needed more detailed explanations and examples for better understanding.",
  },
  {
    rating: 4,
    review:
      "A comprehensive course with useful content. The instructor was knowledgeable, though some topics were a bit brief.",
  },
  {
    rating: 5,
    review:
      "Excellent course! The content was well-structured and the instructor's expertise was evident.",
  },
  {
    rating: 4,
    review:
      "Very good course. The material was relevant, but a few sections could have been more engaging.",
  },
  {
    rating: 5,
    review:
      "An exceptional learning experience! The course was well-organized and provided in-depth knowledge on the topic.",
  },
  {
    rating: 3,
    review:
      "The course was adequate but lacked interactive components. More hands-on activities would be beneficial.",
  },
  {
    rating: 4,
    review:
      "Good course with practical examples. The pacing was generally good, though some sections felt a bit slow.",
  },
  {
    rating: 5,
    review:
      "Fantastic course! The instructor was engaging, and the content was highly relevant and useful.",
  },
  {
    rating: 4,
    review:
      "Great course overall. Some topics were covered in more detail than others, but it was very informative.",
  },
  {
    rating: 5,
    review:
      "Highly recommend this course! The clear explanations and practical exercises made learning enjoyable.",
  },
  {
    rating: 3,
    review:
      "The course provided useful information but lacked depth in certain areas. More detailed content would be helpful.",
  },
  {
    rating: 4,
    review:
      "A solid course with good content. The pace was good, but a few more interactive elements would enhance learning.",
  },
  {
    rating: 5,
    review:
      "Incredible course with detailed content and practical applications. The instructor did an excellent job.",
  },
  {
    rating: 4,
    review:
      "Very good course with useful material. A few more examples and hands-on activities would improve it further.",
  },
  {
    rating: 5,
    review:
      "Exceptional course! The instructor was knowledgeable, and the content was well-organized and relevant.",
  },
  {
    rating: 3,
    review:
      "The course was helpful but needed more engaging content and practical examples to reinforce learning.",
  },
  {
    rating: 4,
    review:
      "Great course with practical insights. The material was well-presented, though some topics could be more detailed.",
  },
  {
    rating: 5,
    review:
      "Excellent course! The content was clear, and the projects were highly beneficial for applying what was learned.",
  },
  {
    rating: 4,
    review:
      "A good course overall. The material was useful, but a few more interactive elements would enhance the experience.",
  },
  {
    rating: 5,
    review:
      "Highly recommended! The course was well-organized, and the instructor's teaching style was very effective.",
  },
  {
    rating: 3,
    review:
      "The course covered basic concepts but lacked depth in some areas. More detailed content would be useful.",
  },
  {
    rating: 4,
    review:
      "Good course with relevant information. The pace was steady, though some sections could be more engaging.",
  },
  {
    rating: 5,
    review:
      "Fantastic learning experience! The course was well-structured, and the practical exercises were very helpful.",
  },
  {
    rating: 4,
    review:
      "Very informative course. The material was relevant, though some sections felt a bit rushed.",
  },
  {
    rating: 5,
    review:
      "An outstanding course with clear explanations and practical applications. I feel much more confident in the subject.",
  },
  {
    rating: 3,
    review:
      "The course was decent but could benefit from more interactive content and practical examples.",
  },
  {
    rating: 4,
    review:
      "Good course with useful material. A few more examples and hands-on activities would make it even better.",
  },
  {
    rating: 5,
    review:
      "Excellent course! The content was detailed, and the instructor provided valuable feedback throughout.",
  },
  {
    rating: 4,
    review:
      "Great course overall. The material was useful, but a few more interactive elements would enhance the experience.",
  },
  {
    rating: 5,
    review:
      "Highly recommend this course! The instructor was engaging, and the content was relevant and practical.",
  },
  {
    rating: 3,
    review:
      "The course provided basic information but lacked depth in certain areas. More detailed content would be beneficial.",
  },
  {
    rating: 4,
    review:
      "A solid course with practical insights. The pacing was good, though some sections could use more detail.",
  },
  {
    rating: 5,
    review:
      "Fantastic course with clear instruction and valuable content. The practical projects were especially helpful.",
  },
  {
    rating: 4,
    review:
      "Good course with useful material. The instructor was knowledgeable, but a few more examples would improve it.",
  },
  {
    rating: 5,
    review:
      "Exceptional learning experience! The course was well-organized, and the content was highly relevant.",
  },
  {
    rating: 3,
    review:
      "The course was okay but needed more interactive elements and detailed explanations for better understanding.",
  },
  {
    rating: 4,
    review:
      "Great course with practical examples. The content was useful, though a few more advanced topics would be helpful.",
  },
  {
    rating: 5,
    review:
      "Highly recommend this course! The instructor's expertise and the well-structured content made learning enjoyable.",
  },
  {
    rating: 4,
    review:
      "A good course overall. The material was useful, but some sections felt a bit rushed and could use more detail.",
  },
];
const courseDescriptions = [
  "Master the basics of web development with HTML and CSS, learning how to create structured web pages and apply styling to elements. You'll gain a solid understanding of web design principles and the foundational skills needed to build visually appealing websites.",
  "Dive into JavaScript to grasp essential programming concepts such as variables, functions, loops, and events. This course is tailored to help you build a strong foundation in JavaScript, equipping you with the skills to create interactive and dynamic web applications.",
  "Explore techniques for making websites responsive and adaptable to various screen sizes and devices. Learn how to use flexible grids, media queries, and other responsive design principles to ensure a consistent and optimal user experience across different platforms.",
  "Get acquainted with modern JavaScript frameworks like React, Vue, and Angular. This course covers how these frameworks can streamline the development of dynamic and interactive web applications, including state management, component-based architecture, and routing.",
  "Learn how to create comprehensive web applications from start to finish. This course addresses both front-end and back-end development, including setting up servers, managing databases, and deploying applications, providing a full-stack perspective on web development.",
  "Gain an understanding of the fundamental principles of web security. This course teaches how to protect web applications from common vulnerabilities such as cross-site scripting (XSS) and SQL injection, ensuring that your applications are secure and resilient against attacks.",
  "Explore the principles of user experience (UX) design, focusing on how to create user-friendly interfaces. The course covers user research, usability testing, and designing intuitive user experiences to enhance overall satisfaction and effectiveness.",
  "Delve into the basics of user interface (UI) design, including color theory, typography, layout design, and visual hierarchy. This course provides the foundational knowledge needed to design aesthetically pleasing and functional user interfaces for various applications.",
  "Learn the techniques of wireframing and prototyping to visualize and test design concepts before development. The course covers creating wireframes, building interactive prototypes, and iterating on design ideas to ensure they meet user needs and expectations.",
  "Understand how to map out user journeys to identify pain points and opportunities for improvement. This course teaches you to create user personas and journey maps, helping you enhance the overall user experience by addressing specific user needs and behaviors.",
  "Discover the design thinking methodology to tackle complex problems and drive innovation. The course covers empathizing with users, defining problems, ideating solutions, prototyping, and testing ideas, all aimed at fostering creative and user-centered solutions.",
  "Learn the fundamentals of data analysis, including methods for data collection, cleaning, and exploration. This course introduces basic statistical techniques and tools for analyzing data to gain actionable insights and make data-driven decisions.",
  "Explore machine learning concepts using Python, covering both supervised and unsupervised learning. The course includes practical implementation of machine learning algorithms with libraries like scikit-learn, focusing on model evaluation and real-world applications.",
  "Understand how to present data effectively through visualization techniques. This course teaches the use of tools such as Tableau and D3.js to create compelling charts, graphs, and interactive visualizations that communicate data insights clearly and effectively.",
  "Explore the principles of big data analytics and the tools used for managing and analyzing large datasets. The course covers frameworks like Hadoop and Spark, providing insights into handling and deriving value from big data in various applications.",
  "Learn statistical analysis using R, a programming language designed for data analysis. This course covers data manipulation, statistical modeling, and hypothesis testing, equipping you with the skills to draw meaningful conclusions from complex data sets.",
  "Get an overview of DevOps practices and their impact on software development and deployment. The course includes topics such as continuous integration, continuous delivery, and fostering collaboration between development and operations teams to streamline workflows.",
  "Learn how to use Docker for containerization, which involves packaging applications and their dependencies into isolated containers. This course covers Docker basics, creating Docker images, managing containers, and understanding container orchestration.",
  "Discover Kubernetes and its role in managing containerized applications. The course introduces key Kubernetes concepts, including deployment strategies, service discovery, and scaling, providing you with the knowledge to manage and orchestrate containerized environments effectively.",
  "Explore the practice of infrastructure as code (IaC) to automate and manage IT infrastructure through code. The course covers tools like Terraform and Ansible, focusing on provisioning and configuring infrastructure in a scalable and repeatable manner.",
  "Understand the importance of monitoring and logging in maintaining application performance and reliability. This course includes setting up monitoring systems, analyzing logs, and troubleshooting issues to ensure your applications run smoothly and efficiently.",
  "Learn the fundamentals of graphic design, including visual communication, layout principles, and color theory. This course provides a comprehensive introduction to creating effective and aesthetically pleasing graphic design projects for various purposes.",
  "Focus on creating memorable and meaningful logos that effectively represent a brand. The course covers design principles, typography, and logo development techniques, helping you craft logos that are visually appealing and convey the right message.",
  "Explore various illustration techniques and styles to enhance your design skills. This course includes both digital and traditional illustration methods, providing you with a range of tools and approaches to create engaging and visually striking illustrations.",
  "Discover how to design and develop backend systems using Node.js. This course covers advanced techniques and best practices for building scalable and efficient backend solutions, including performance optimization and error handling.",
  "Learn the fundamentals of cyber security, focusing on protecting digital systems and data from threats. This course covers basic concepts, security protocols, and practical techniques for safeguarding information and ensuring the integrity of online systems.",
  "Understand ethical hacking and penetration testing to identify and address security vulnerabilities. The course covers techniques for conducting security assessments, finding weaknesses, and implementing measures to improve overall system security.",
  "Explore advanced threat detection methods to identify and mitigate sophisticated cyber threats. This course covers techniques for analyzing security events, using advanced tools, and implementing proactive measures to protect against emerging threats.",
  "Learn how to secure cloud platforms and services against potential cyber threats. This course includes strategies for securing cloud infrastructure, implementing access controls, and ensuring compliance with security standards and regulations.",
  "Understand the principles of network security and defense, focusing on protecting network infrastructures from attacks. The course covers topics such as firewall configuration, intrusion detection systems, and secure network architecture.",
];

const lessons = [
  [
    {
      title: "Introduction to HTML",
      desc: "Basics of HTML and its structure",
      img: "https://example.com/html-intro.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/html-intro",
    },
    {
      title: "HTML Elements and Attributes",
      desc: "Understanding different HTML elements and their attributes",
      img: "https://example.com/html-elements.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/html-elements",
    },
    {
      title: "CSS Basics",
      desc: "Introduction to CSS for styling web pages",
      img: "https://example.com/css-basics.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/css-basics",
    },
    {
      title: "CSS Layout Techniques",
      desc: "Advanced CSS layout techniques and responsive design",
      img: "https://example.com/css-layout.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/css-layout",
    },
  ],
  [
    {
      title: "JavaScript Basics",
      desc: "Introduction to JavaScript and its syntax",
      img: "https://example.com/js-basics.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/js-basics",
    },
    {
      title: "JavaScript Functions",
      desc: "Creating and using functions in JavaScript",
      img: "https://example.com/js-functions.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/js-functions",
    },
    {
      title: "DOM Manipulation",
      desc: "Interacting with the Document Object Model (DOM)",
      img: "https://example.com/dom-manipulation.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/dom-manipulation",
    },
    {
      title: "JavaScript ES6 Features",
      desc: "Understanding new features introduced in ES6",
      img: "https://example.com/es6-features.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/es6-features",
    },
  ],
  [
    {
      title: "Responsive Design Principles",
      desc: "Fundamentals of creating responsive web designs",
      img: "https://example.com/responsive-principles.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/responsive-principles",
    },
    {
      title: "Fluid Layouts",
      desc: "Designing fluid and adaptive layouts",
      img: "https://example.com/fluid-layouts.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/fluid-layouts",
    },
    {
      title: "Media Queries",
      desc: "Using media queries for responsive design",
      img: "https://example.com/media-queries.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/media-queries",
    },
    {
      title: "Responsive Typography",
      desc: "Adjusting typography for different screen sizes",
      img: "https://example.com/responsive-typography.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/responsive-typography",
    },
  ],
  [
    {
      title: "Introduction to Frameworks",
      desc: "Overview of modern JavaScript frameworks",
      img: "https://example.com/frameworks-intro.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/frameworks-intro",
    },
    {
      title: "React Basics",
      desc: "Getting started with React framework",
      img: "https://example.com/react-basics.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/react-basics",
    },
    {
      title: "Vue.js Fundamentals",
      desc: "Introduction to Vue.js and its features",
      img: "https://example.com/vue-fundamentals.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/vue-fundamentals",
    },
    {
      title: "Angular Essentials",
      desc: "Understanding the core concepts of Angular",
      img: "https://example.com/angular-essentials.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/angular-essentials",
    },
  ],
  [
    {
      title: "Introduction to Web Applications",
      desc: "Basics of building web applications",
      img: "https://example.com/web-apps-intro.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/web-apps-intro",
    },
    {
      title: "Frontend vs Backend",
      desc: "Understanding the difference between frontend and backend development",
      img: "https://example.com/frontend-backend.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/frontend-backend",
    },
    {
      title: "Building RESTful APIs",
      desc: "Creating RESTful APIs for web applications",
      img: "https://example.com/restful-apis.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/restful-apis",
    },
    {
      title: "Deploying Web Applications",
      desc: "Deploying web applications to production environments",
      img: "https://example.com/deploying-web-apps.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/deploying-web-apps",
    },
  ],
  [
    {
      title: "Web Security Basics",
      desc: "Introduction to web security concepts",
      img: "https://example.com/web-security-basics.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/web-security-basics",
    },
    {
      title: "Common Security Vulnerabilities",
      desc: "Understanding common web security vulnerabilities",
      img: "https://example.com/security-vulnerabilities.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/security-vulnerabilities",
    },
    {
      title: "Secure Coding Practices",
      desc: "Best practices for writing secure code",
      img: "https://example.com/secure-coding.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/secure-coding",
    },
    {
      title: "Web Application Firewalls",
      desc: "Configuring and using web application firewalls",
      img: "https://example.com/web-firewalls.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/web-firewalls",
    },
  ],
  [
    {
      title: "UX Design Overview",
      desc: "Introduction to UX design principles",
      img: "https://example.com/ux-design-overview.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/ux-design-overview",
    },
    {
      title: "User Research Methods",
      desc: "Techniques for conducting user research",
      img: "https://example.com/user-research.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/user-research",
    },
    {
      title: "Usability Testing",
      desc: "Methods for testing usability in UX design",
      img: "https://example.com/usability-testing.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/usability-testing",
    },
    {
      title: "Design Thinking Approach",
      desc: "Applying design thinking in UX design",
      img: "https://example.com/design-thinking.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/design-thinking",
    },
  ],
  [
    {
      title: "Introduction to UI Design",
      desc: "Basics of UI design principles",
      img: "https://example.com/ui-design-intro.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/ui-design-intro",
    },
    {
      title: "Design Patterns in UI",
      desc: "Common design patterns used in UI design",
      img: "https://example.com/ui-design-patterns.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/ui-design-patterns",
    },
    {
      title: "UI Design Tools",
      desc: "Tools and software for UI design",
      img: "https://example.com/ui-design-tools.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/ui-design-tools",
    },
    {
      title: "Creating Interactive UI",
      desc: "Designing interactive elements for user interfaces",
      img: "https://example.com/interactive-ui.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/interactive-ui",
    },
  ],
  [
    {
      title: "Wireframing Basics",
      desc: "Introduction to wireframing techniques",
      img: "https://example.com/wireframing-basics.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/wireframing-basics",
    },
    {
      title: "Creating Prototypes",
      desc: "Building prototypes for user testing",
      img: "https://example.com/creating-prototypes.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/creating-prototypes",
    },
    {
      title: "Wireframing Tools",
      desc: "Tools used for creating wireframes",
      img: "https://example.com/wireframing-tools.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/wireframing-tools",
    },
    {
      title: "Prototyping Best Practices",
      desc: "Best practices for creating effective prototypes",
      img: "https://example.com/prototyping-best-practices.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/prototyping-best-practices",
    },
  ],
  [
    {
      title: "User Journey Mapping Basics",
      desc: "Introduction to mapping user journeys",
      img: "https://example.com/user-journey-mapping.jpg",
      duration: 3600000,
      link: "http://example.com/lesson/user-journey-mapping",
    },
    {
      title: "Creating User Personas",
      desc: "Developing user personas for UX design",
      img: "https://example.com/user-personas.jpg",
      duration: 5400000,
      link: "http://example.com/lesson/user-personas",
    },
    {
      title: "Mapping User Flows",
      desc: "Creating user flows for better user experience",
      img: "https://example.com/user-flows.jpg",
      duration: 7200000,
      link: "http://example.com/lesson/user-flows",
    },
    {
      title: "Analyzing User Journeys",
      desc: "Techniques for analyzing user journeys and improving UX",
      img: "https://example.com/analyzing-user-journeys.jpg",
      duration: 10800000,
      link: "http://example.com/lesson/analyzing-user-journeys",
    },
  ],
  [
    {
      title: "Introduction to Design Thinking",
      desc: "Basics of design thinking methodology",
      img: "https://example.com/design-thinking-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Empathy and Research",
      desc: "Understanding user needs and conducting research",
      img: "https://example.com/empathy-research.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Ideation Techniques",
      desc: "Generating and refining ideas",
      img: "https://example.com/ideation-techniques.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Prototyping and Testing",
      desc: "Creating prototypes and testing solutions",
      img: "https://example.com/prototyping-testing.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Data Analysis",
      desc: "Fundamentals of data analysis techniques",
      img: "https://example.com/data-analysis-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Data Cleaning and Preparation",
      desc: "Techniques for cleaning and preparing data",
      img: "https://example.com/data-cleaning.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Exploratory Data Analysis",
      desc: "Exploring data sets and identifying patterns",
      img: "https://example.com/exploratory-analysis.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Data Analysis with Python",
      desc: "Using Python for data analysis tasks",
      img: "https://example.com/data-analysis-python.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Machine Learning with Python",
      desc: "Basics of machine learning using Python",
      img: "https://example.com/ml-python-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Supervised Learning Techniques",
      desc: "Exploring supervised learning methods",
      img: "https://example.com/supervised-learning.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Unsupervised Learning and Clustering",
      desc: "Understanding unsupervised learning and clustering methods",
      img: "https://example.com/unsupervised-learning.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Model Evaluation and Optimization",
      desc: "Techniques for evaluating and optimizing machine learning models",
      img: "https://example.com/model-evaluation.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Data Visualization",
      desc: "Fundamentals of data visualization techniques",
      img: "https://example.com/data-visualization-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Creating Charts and Graphs",
      desc: "Techniques for creating effective charts and graphs",
      img: "https://example.com/charts-graphs.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Interactive Data Visualizations",
      desc: "Building interactive visualizations for better insights",
      img: "https://example.com/interactive-visualizations.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Data Visualization Tools",
      desc: "Exploring tools for data visualization",
      img: "https://example.com/visualization-tools.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Big Data Analytics",
      desc: "Overview of big data analytics concepts",
      img: "https://example.com/big-data-analytics-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Big Data Technologies and Tools",
      desc: "Exploring technologies and tools for big data",
      img: "https://example.com/big-data-tools.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Data Processing and Storage",
      desc: "Techniques for processing and storing big data",
      img: "https://example.com/data-processing.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Big Data Analytics",
      desc: "In-depth analysis techniques for big data",
      img: "https://example.com/advanced-big-data.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Statistical Analysis with R",
      desc: "Basics of statistical analysis using R",
      img: "https://example.com/statistical-analysis-r-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Descriptive Statistics with R",
      desc: "Understanding descriptive statistics with R",
      img: "https://example.com/descriptive-statistics.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Inferential Statistics and Hypothesis Testing",
      desc: "Performing inferential statistics and hypothesis testing",
      img: "https://example.com/inferential-statistics.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Statistical Techniques",
      desc: "Exploring advanced statistical methods with R",
      img: "https://example.com/advanced-statistical-techniques.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to DevOps",
      desc: "Overview of DevOps principles and practices",
      img: "https://example.com/devops-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Continuous Integration and Delivery",
      desc: "Implementing continuous integration and delivery pipelines",
      img: "https://example.com/ci-cd.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Infrastructure as Code with Terraform",
      desc: "Using Terraform for infrastructure management",
      img: "https://example.com/infrastructure-code.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Monitoring and Logging in DevOps",
      desc: "Techniques for monitoring and logging in a DevOps environment",
      img: "https://example.com/devops-monitoring.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Containerization with Docker",
      desc: "Basics of containerization using Docker",
      img: "https://example.com/docker-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Docker Images and Containers",
      desc: "Understanding Docker images and containers",
      img: "https://example.com/docker-images.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Docker Compose and Orchestration",
      desc: "Using Docker Compose for multi-container applications",
      img: "https://example.com/docker-compose.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Docker Techniques",
      desc: "Exploring advanced Docker features and techniques",
      img: "https://example.com/advanced-docker.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Kubernetes",
      desc: "Fundamentals of Kubernetes for container orchestration",
      img: "https://example.com/kubernetes-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Kubernetes Architecture",
      desc: "Understanding the architecture of Kubernetes",
      img: "https://example.com/kubernetes-architecture.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Managing Kubernetes Clusters",
      desc: "Techniques for managing and scaling Kubernetes clusters",
      img: "https://example.com/kubernetes-clusters.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Kubernetes Features",
      desc: "Exploring advanced Kubernetes features and use cases",
      img: "https://example.com/advanced-kubernetes.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Infrastructure as Code",
      desc: "Basics of infrastructure as code concepts",
      img: "https://example.com/infrastructure-code-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Infrastructure Automation with Ansible",
      desc: "Using Ansible for infrastructure automation",
      img: "https://example.com/infrastructure-automation.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Infrastructure as Code with CloudFormation",
      desc: "Implementing infrastructure as code with AWS CloudFormation",
      img: "https://example.com/cloudformation.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Infrastructure Management",
      desc: "Exploring advanced topics in infrastructure management",
      img: "https://example.com/advanced-infrastructure.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Monitoring and Logging",
      desc: "Basics of monitoring and logging principles",
      img: "https://example.com/monitoring-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Setting Up Monitoring Tools",
      desc: "Configuring monitoring tools and techniques",
      img: "https://example.com/setting-up-monitoring.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Log Management and Analysis",
      desc: "Managing and analyzing logs",
      img: "https://example.com/log-management.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Monitoring Techniques",
      desc: "Exploring advanced methods for monitoring",
      img: "https://example.com/advanced-monitoring.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Graphic Design",
      desc: "Fundamentals of graphic design principles",
      img: "https://example.com/graphic-design-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Graphic Design Software Overview",
      desc: "Overview of popular graphic design software",
      img: "https://example.com/graphic-software.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Creating Visual Assets",
      desc: "Designing visual assets for different media",
      img: "https://example.com/visual-assets.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Graphic Design Trends",
      desc: "Exploring current trends in graphic design",
      img: "https://example.com/design-trends.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Logo Design",
      desc: "Basics of designing effective logos",
      img: "https://example.com/logo-design-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Logo Design Principles",
      desc: "Understanding key principles of logo design",
      img: "https://example.com/logo-design-principles.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Color Theory in Logo Design",
      desc: "Applying color theory to logo design",
      img: "https://example.com/color-theory.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Creating a Logo Portfolio",
      desc: "Building a portfolio to showcase logo designs",
      img: "https://example.com/logo-portfolio.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Illustration Techniques",
      desc: "Basics of illustration techniques",
      img: "https://example.com/illustration-techniques-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Digital Illustration Tools",
      desc: "Overview of tools used in digital illustration",
      img: "https://example.com/digital-tools.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Vector vs. Raster Illustration",
      desc: "Understanding vector and raster illustration methods",
      img: "https://example.com/vector-vs-raster.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Creating Complex Illustrations",
      desc: "Techniques for creating detailed and complex illustrations",
      img: "https://example.com/complex-illustrations.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Typography",
      desc: "Basics of typography and its importance",
      img: "https://example.com/typography-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Typography Terminology",
      desc: "Understanding common typography terms",
      img: "https://example.com/typography-terms.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Choosing Typefaces",
      desc: "Selecting appropriate typefaces for different designs",
      img: "https://example.com/choosing-typefaces.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Typography Techniques",
      desc: "Exploring advanced techniques in typography",
      img: "https://example.com/advanced-typography.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Brand Identity Design",
      desc: "Fundamentals of brand identity design",
      img: "https://example.com/brand-identity-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Developing Brand Guidelines",
      desc: "Creating guidelines to maintain brand consistency",
      img: "https://example.com/brand-guidelines.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Creating Brand Assets",
      desc: "Designing various assets for brand identity",
      img: "https://example.com/brand-assets.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Brand Identity Case Studies",
      desc: "Analyzing successful brand identity designs",
      img: "https://example.com/brand-case-studies.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Node.js",
      desc: "Basics of Node.js and its features",
      img: "https://example.com/nodejs-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Node.js Modules and NPM",
      desc: "Using Node.js modules and NPM for package management",
      img: "https://example.com/nodejs-modules.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Building RESTful APIs with Node.js",
      desc: "Creating RESTful APIs using Node.js",
      img: "https://example.com/nodejs-apis.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Node.js Concepts",
      desc: "Exploring advanced concepts in Node.js",
      img: "https://example.com/advanced-nodejs.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Express.js",
      desc: "Basics of Express.js for building web applications",
      img: "https://example.com/expressjs-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Routing with Express.js",
      desc: "Creating routes and handling requests",
      img: "https://example.com/express-routing.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Middleware in Express.js",
      desc: "Understanding and using middleware in Express.js",
      img: "https://example.com/express-middleware.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Express.js Techniques",
      desc: "Exploring advanced features and techniques in Express.js",
      img: "https://example.com/advanced-expressjs.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to MongoDB",
      desc: "Fundamentals of MongoDB and its features",
      img: "https://example.com/mongodb-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "CRUD Operations with MongoDB",
      desc: "Performing Create, Read, Update, and Delete operations",
      img: "https://example.com/mongodb-crud.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Indexing and Aggregation",
      desc: "Using indexing and aggregation for efficient queries",
      img: "https://example.com/mongodb-indexing.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced MongoDB Features",
      desc: "Exploring advanced features and techniques in MongoDB",
      img: "https://example.com/advanced-mongodb.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "API Development with Express.js",
      desc: "Building APIs using Express.js",
      img: "https://example.com/expressjs-api.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Authentication and Authorization",
      desc: "Implementing authentication and authorization in Express.js APIs",
      img: "https://example.com/express-auth.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Testing Express.js APIs",
      desc: "Techniques for testing APIs built with Express.js",
      img: "https://example.com/express-testing.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Performance Optimization",
      desc: "Optimizing the performance of Express.js APIs",
      img: "https://example.com/express-optimization.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Advanced Node.js Techniques",
      desc: "Exploring advanced techniques in Node.js",
      img: "https://example.com/advanced-nodejs.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Node.js and Microservices",
      desc: "Building microservices using Node.js",
      img: "https://example.com/nodejs-microservices.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Asynchronous Programming in Node.js",
      desc: "Understanding asynchronous programming concepts",
      img: "https://example.com/nodejs-async.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Node.js Best Practices",
      desc: "Best practices for Node.js development",
      img: "https://example.com/nodejs-best-practices.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Cyber Security",
      desc: "Fundamentals of cyber security principles",
      img: "https://example.com/cybersecurity-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Threats and Vulnerabilities",
      desc: "Understanding common cyber threats and vulnerabilities",
      img: "https://example.com/threats-vulnerabilities.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Cyber Security Tools and Techniques",
      desc: "Overview of tools and techniques for cyber security",
      img: "https://example.com/cybersecurity-tools.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Building a Security Strategy",
      desc: "Creating a comprehensive security strategy",
      img: "https://example.com/security-strategy.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Ethical Hacking and Penetration Testing",
      desc: "Basics of ethical hacking and penetration testing",
      img: "https://example.com/ethical-hacking.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Tools for Penetration Testing",
      desc: "Overview of tools used in penetration testing",
      img: "https://example.com/pentest-tools.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Conducting Vulnerability Assessments",
      desc: "Techniques for conducting vulnerability assessments",
      img: "https://example.com/vulnerability-assessments.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Penetration Testing",
      desc: "Exploring advanced techniques in penetration testing",
      img: "https://example.com/advanced-pentest.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Threat Detection",
      desc: "Basics of threat detection and response",
      img: "https://example.com/threat-detection-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Threat Detection Tools",
      desc: "Overview of tools for threat detection",
      img: "https://example.com/threat-detection-tools.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Analyzing Threats",
      desc: "Techniques for analyzing and responding to threats",
      img: "https://example.com/analyzing-threats.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Threat Detection Techniques",
      desc: "Exploring advanced techniques for threat detection",
      img: "https://example.com/advanced-threat-detection.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Cyber Security for Cloud Platforms",
      desc: "Fundamentals of cyber security for cloud platforms",
      img: "https://example.com/cloud-security-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Cloud Security Best Practices",
      desc: "Best practices for securing cloud environments",
      img: "https://example.com/cloud-security-best-practices.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Securing Cloud Services",
      desc: "Techniques for securing various cloud services",
      img: "https://example.com/securing-cloud-services.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Cloud Security Strategies",
      desc: "Exploring advanced strategies for cloud security",
      img: "https://example.com/advanced-cloud-security.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Compliance and Regulatory Requirements",
      desc: "Basics of compliance and regulatory requirements",
      img: "https://example.com/compliance-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Understanding Regulatory Frameworks",
      desc: "Overview of various regulatory frameworks",
      img: "https://example.com/regulatory-frameworks.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Implementing Compliance Programs",
      desc: "Techniques for implementing compliance programs",
      img: "https://example.com/compliance-programs.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Compliance Strategies",
      desc: "Exploring advanced strategies for compliance",
      img: "https://example.com/advanced-compliance.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
  [
    {
      title: "Introduction to Network Security and Defense",
      desc: "Fundamentals of network security and defense strategies",
      img: "https://example.com/network-security-intro.jpg",
      duration: 3600000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Network Defense Mechanisms",
      desc: "Overview of mechanisms used in network defense",
      img: "https://example.com/network-defense.jpg",
      duration: 5400000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Securing Network Architectures",
      desc: "Techniques for securing network architectures",
      img: "https://example.com/securing-network.jpg",
      duration: 7200000,
      link: "http://example/course/lesson/video",
    },
    {
      title: "Advanced Network Security Techniques",
      desc: "Exploring advanced techniques in network security",
      img: "https://example.com/advanced-network-security.jpg",
      duration: 10800000,
      link: "http://example/course/lesson/video",
    },
  ],
];

const courses = require("./courses");

function genRandom(lowLimit, highLimit) {
  return Math.floor(Math.random() * highLimit + lowLimit);
}

const seedMentors = async () => {
  try {
    await Catagorie.deleteMany({});
    const insertedCategories = await Catagorie.insertMany(categories);

    for (let o = 0; o < mentorsData.length; o++) {
      mentorsData[o].reviews = mentorReviews[o];
      mentorsData[o].numOFReviews = mentorsData[o].reviews.length;
    }

    await Mentor.deleteMany({});
    const insertedMentors = await Mentor.insertMany(mentorsData);
    const mentors = await Mentor.find();

    let mentorId = [
      { webDev: "66b61bac3d164186139865" },
      { datSci: "66b61bac3d164186139865" },
      { fullstack: "66b61bac3d164186139865" },
      { uiux: "66b61bac3d1641861398658b" },
      { devOps: "66b61bac3d16418613986590" },
      { gDesign: "66b61bac3d16418613986595" },
      { cyber: "66b61bac3d1641861398659a" },
    ];
    const newMentorId = mentors.map((mentor) => mentor._id);
    for (let l = 0; l < mentors.length; l++) {
      if (l === 0) {
        mentorId[l].webDev = newMentorId[l];
      }
      if (l === 1) {
        mentorId[l].datSci = newMentorId[l];
      }
      if (l === 2) {
        mentorId[l].fullstack = newMentorId[l];
      }
      if (l === 3) {
        mentorId[l].uiux = newMentorId[l];
      }
      if (l === 4) {
        mentorId[l].devOps = newMentorId[l];
      }
      if (l === 5) {
        mentorId[l].gDesign = newMentorId[l];
      }
      if (l === 6) {
        mentorId[l].cyber = newMentorId[l];
      }
    }

    await Course.deleteMany({});

    for (let i = 0; i < courses.length; i++) {
      courses[i].students = courses[i].students;
      courses[i].data.details.category = courses[i].data.details.category;
      courses[i].data.details.title = courses[i].data.details.title;
      courses[i].data.details.price = courses[i].data.details.price;
      //rating
      //reviews
      courses[i].data.details.img = thumbnails[i];
      courses[i].data.duration = genRandom(21600000, 54000000);
      courses[i].data.description = courseDescriptions[genRandom(1, 28)];

      const reviewArray = [];
      const randomLength = genRandom(4, 16);
      for (let j = 0; j < randomLength; j++) {
        reviewArray.push(reviews[genRandom(1, 49)]);
      }

      courses[i].data.reviews = reviewArray;
      // const key = Object.keys(lessons[i])[0];
      // courses[i].data.lessons = lessons[i][key];

      let totalRating = 0;
      for (let k = 0; k < courses[i].data.reviews.length; k++) {
        totalRating += courses[i].data.reviews[k].rating;
      }
      let averageRating = totalRating / courses[i].data.reviews.length;
      let roundedRating = parseFloat(averageRating.toFixed(1));

      courses[i].data.details.rating = roundedRating;
      courses[i].data.details.numOfReviews = courses[i].data.reviews.length;

      courses[i].data.lessons = lessons[i];

      if (courses[i].data.details.category === "Web Development") {
        courses[i].data.mentor = mentorId[0].webDev;
        // courses[i].data.mentor = mongoose.Types.ObjectId("66b61bac3d1641861398657c")
      }
      if (courses[i].data.details.category === "Cyber Security") {
        courses[i].data.mentor = mentorId[6].cyber;
      }
      if (courses[i].data.details.category === "Graphic Design") {
        courses[i].data.mentor = mentorId[5].gDesign;
      }
      if (courses[i].data.details.category === "DevOps") {
        courses[i].data.mentor = mentorId[4].devOps;
      }
      if (courses[i].data.details.category === "Data Science") {
        courses[i].data.mentor = mentorId[1].datSci;
      }
      if (courses[i].data.details.category === "UI/UX Design") {
        courses[i].data.mentor = mentorId[3].uiux;
      }
      if (courses[i].data.details.category === "Backend Development") {
        courses[i].data.mentor = mentorId[2].fullstack;
      }
    }

    const insertedCourses = await Course.insertMany(courses);
    const coursesInDb = await Course.find();

    let courseId = [[], [], [], [], [], [], []];

    for (let m = 0; m < coursesInDb.length; m++) {
      if (coursesInDb[m].data.details.category === "Web Development") {
        courseId[0].push(coursesInDb[m]._id);
      }
      if (coursesInDb[m].data.details.category === "Cyber Security") {
        courseId[6].push(coursesInDb[m]._id);
      }
      if (coursesInDb[m].data.details.category === "Graphic Design") {
        courseId[5].push(coursesInDb[m]._id);
      }
      if (coursesInDb[m].data.details.category === "DevOps") {
        courseId[4].push(coursesInDb[m]._id);
      }
      if (coursesInDb[m].data.details.category === "Data Science") {
        courseId[1].push(coursesInDb[m]._id);
      }
      if (coursesInDb[m].data.details.category === "UI/UX Design") {
        courseId[3].push(coursesInDb[m]._id);
      }
      if (coursesInDb[m].data.details.category === "Backend Development") {
        courseId[2].push(coursesInDb[m]._id);
      }
    }
    mentorId.forEach(async (menid, index) => {
      courseId[index].forEach(async (corid) => {
        if (index === 0) {
          const x = await Mentor.updateOne(
            { _id: menid.webDev },
            { $push: { courses: corid } }
          );
        }
        if (index === 1) {
          const x = await Mentor.updateOne(
            { _id: menid.datSci },
            { $push: { courses: corid } }
          );
        }
        if (index === 2) {
          const x = await Mentor.updateOne(
            { _id: menid.fullstack },
            { $push: { courses: corid } }
          );
        }
        if (index === 3) {
          const x = await Mentor.updateOne(
            { _id: menid.uiux },
            { $push: { courses: corid } }
          );
        }
        if (index === 4) {
          const x = await Mentor.updateOne(
            { _id: menid.devOps },
            { $push: { courses: corid } }
          );
        }
        if (index === 5) {
          const x = await Mentor.updateOne(
            { _id: menid.gDesign },
            { $push: { courses: corid } }
          );
        }
        if (index === 6) {
          const x = await Mentor.updateOne(
            { _id: menid.cyber },
            { $push: { courses: corid } }
          );
        }
      });
    });
    // await User.deleteMany({});
    const flatCourseId = courseId.flat();

    for (let i = 0; i < 30; i++) {
      const user = new User({
        name: `user-${i}`,
        email: `user-${i}@g`,
        password: await bcrypt.hash('1234', 10),
        savedCourses: genRandomCourses(flatCourseId, genRandom(6, 12)),
        boughtCourses: genRandomCourses(flatCourseId, genRandom(6, 12)),
      });
      const x = await user.save();
    }

    const savedUsers = await User.find()

    savedUsers.forEach((user) => {
      user.boughtCourses.forEach( async (bc) => {
        const id = new mongoose.Types.ObjectId(bc)
        const f = await Course.updateOne({_id: id}, {$push: {students: user._id}})
      })
    })
    const userIds = savedUsers.map((user) => user._id)
    coursesInDb.forEach( async (course) => {
      course.data.reviews.forEach(async (review, index) => {
          review.user = userIds[genRandom(0, userIds.length)]
      })
      const h = await course.save()
    })

    mentors.forEach(async(mentor) => {
      mentor.reviews.forEach((review) => {
        review.user = userIds[genRandom(0, userIds.length)]
      })
      const h = await mentor.save()

    })



    
 


    // fs.writeFileSync("new2.js", JSON.stringify(courses), {
    //   encoding: "utf8",
    // });

    console.log("Database seeded ");
    // mongoose.connection.close();
    // check()
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

const genRandomCourses = (courses, num) => {
  let limit = num;
  let ranCourses = [];
  for (let i = 0; i < limit; i++) {
    ranCourses.push(courses[genRandom(0, courses.length)]);
  }
  return ranCourses;
};

const check = async () => {
  const i = await Mentor.find();
  i.forEach((o) => {
    console.log(o.courses.length);
  });
};



const kkk = async () => {
  const mento = await Mentor.find({})
  const cour = await Course.find({})
  const use = await User.find({})

mento.forEach(async (men) => {
  const u = await men.save();
});
cour.forEach(async (men) => {
  const u = await men.save();
});
use.forEach(async (men) => {
  const u = await men.save();
});

}



const all = async () => {
 await seedMentors();
 await kkk()

// // //  const cou = await Mentor.findOne({_id: "66b6e2a3c3681c55c9c625f2"}).populate("courses").exec()
//  const cou = await Course.findOne({_id: "66b6e967a5f1da32acd5d508"}).populate("data.reviews._id").exec()
//  let arr = []
//  arr.push(cou)
//  fs.writeFileSync("new.js", JSON.stringify(arr))

//  console.log(cou)
}

all()


// const y = async () => {
//   try {
//     const mentor = await Mentor.findOne({ _id: "66b645c586c532593c4a2d93" })
//     //  const x = mentor.courses.populate('courses')
//     //  console.log(x)
//     const all = await Mentor.find()

//     all.forEach((item) => {
//       const v = item.save()
//     })

//     const y = await mentor.save()

//     return // Optionally return the populated course document

//   } catch (err) {
//     console.error("Error fetching course:", err);
//     // Handle the error as needed (e.g., return null or throw an error)
//     return null;
//   }
// };

// y();

//   students: [],
//   data: {
//     details: {
//       category: 'Web Development',
//       title: 'Introduction to HTML & CSS',
//       price: 99.99,
//       rating: 4.6,
//       numOfReviews: 120,
//       img: 'https://example.com/html-css.jpg',
//     },
//     mentor: '64d3d8e78c0c4a1b5f0f3c59', // Replace with actual Mentor ID
//     duration: 10,
//     description: 'Learn the basics of HTML and CSS to build and style your first web pages.',
//     reviews: [],
//     lessons: [
//       { title: 'HTML Basics', desc: 'Introduction to HTML elements and structure', img: 'https://example.com/html-basics.jpg' },
//       { title: 'CSS Fundamentals', desc: 'Learn how to style your HTML elements using CSS', img: 'https://example.com/css-fundamentals.jpg' },
//     ],
//   },
// },
