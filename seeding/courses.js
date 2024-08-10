 const data = [
  {
    students: [],
    data: {
      details: {
        category: 'Web Development',
        title: 'Introduction to HTML & CSS',
        price: 99.99,
        rating: 4.6,
        numOfReviews: 120,
        img: 'https://example.com/html-css.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c59', // Replace with actual Mentor ID
      duration: 10,
      description: 'Learn the basics of HTML and CSS to build and style your first web pages.',
      reviews: [],
      lessons: [
        { title: 'HTML Basics', desc: 'Introduction to HTML elements and structure', img: 'https://example.com/html-basics.jpg' },
        { title: 'CSS Fundamentals', desc: 'Learn how to style your HTML elements using CSS', img: 'https://example.com/css-fundamentals.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Web Development',
        title: 'JavaScript Essentials',
        price: 119.99,
        rating: 4.8,
        numOfReviews: 85,
        img: 'https://example.com/javascript.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c5a', // Replace with actual Mentor ID
      duration: 15,
      description: 'Master the fundamentals of JavaScript and start programming interactive web pages.',
      reviews: [],
      lessons: [
        { title: 'JavaScript Basics', desc: 'Introduction to JavaScript syntax and operations', img: 'https://example.com/js-basics.jpg' },
        { title: 'DOM Manipulation', desc: 'Learn how to manipulate the Document Object Model', img: 'https://example.com/dom-manipulation.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Web Development',
        title: 'Responsive Web Design',
        price: 149.99,
        rating: 4.7,
        numOfReviews: 90,
        img: 'https://example.com/responsive-design.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c5b', // Replace with actual Mentor ID
      duration: 20,
      description: 'Learn how to make your web designs look great on any device with responsive design techniques.',
      reviews: [],
      lessons: [
        { title: 'Media Queries', desc: 'Understanding and using media queries', img: 'https://example.com/media-queries.jpg' },
        { title: 'Flexible Layouts', desc: 'Creating layouts that adapt to different screen sizes', img: 'https://example.com/flexible-layouts.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Web Development',
        title: 'Modern JavaScript Frameworks',
        price: 179.99,
        rating: 4.9,
        numOfReviews: 110,
        img: 'https://example.com/javascript-frameworks.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c5c', // Replace with actual Mentor ID
      duration: 25,
      description: 'Explore popular JavaScript frameworks like React, Angular, and Vue.js.',
      reviews: [],
      lessons: [
        { title: 'Introduction to React', desc: 'Getting started with React and its core concepts', img: 'https://example.com/react-intro.jpg' },
        { title: 'Angular Overview', desc: 'Overview of Angular framework and its features', img: 'https://example.com/angular-overview.jpg' },
        { title: 'Vue.js Essentials', desc: 'Understanding Vue.js and building interactive applications', img: 'https://example.com/vue-essentials.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Web Development',
        title: 'Building Web Applications',
        price: 199.99,
        rating: 4.8,
        numOfReviews: 130,
        img: 'https://example.com/web-applications.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c5d', // Replace with actual Mentor ID
      duration: 30,
      description: 'Learn how to build full-stack web applications using modern technologies and practices.',
      reviews: [],
      lessons: [
        { title: 'Front-end Development', desc: 'Building the user interface with HTML, CSS, and JavaScript', img: 'https://example.com/frontend-dev.jpg' },
        { title: 'Back-end Development', desc: 'Setting up the server and database with Node.js and Express', img: 'https://example.com/backend-dev.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Web Development',
        title: 'Web Security Fundamentals',
        price: 159.99,
        rating: 4.7,
        numOfReviews: 75,
        img: 'https://example.com/web-security.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c5e', // Replace with actual Mentor ID
      duration: 18,
      description: 'Understand the basics of web security and how to protect your web applications from common threats.',
      reviews: [],
      lessons: [
        { title: 'Common Web Vulnerabilities', desc: 'Overview of common vulnerabilities like XSS and CSRF', img: 'https://example.com/vulnerabilities.jpg' },
        { title: 'Best Security Practices', desc: 'Implementing best practices for web security', img: 'https://example.com/security-practices.jpg' },
      ],
    },
  },

  // UI/UX Design
  {
    students: [],
    data: {
      details: {
        category: 'UI/UX Design',
        title: 'Introduction to UX Design',
        price: 129.99,
        rating: 4.6,
        numOfReviews: 100,
        img: 'https://example.com/ux-design.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c6a', // Replace with actual Mentor ID
      duration: 22,
      description: 'Learn the fundamentals of UX design and user-centered design principles.',
      reviews: [],
      lessons: [
        { title: 'UX Principles', desc: 'Understanding user experience principles', img: 'https://example.com/ux-principles.jpg' },
        { title: 'User Research Techniques', desc: 'Conducting effective user research', img: 'https://example.com/user-research.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'UI/UX Design',
        title: 'UI Design Basics',
        price: 139.99,
        rating: 4.7,
        numOfReviews: 85,
        img: 'https://example.com/ui-design.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c6b', // Replace with actual Mentor ID
      duration: 24,
      description: 'Learn the basics of user interface design and create visually appealing web interfaces.',
      reviews: [],
      lessons: [
        { title: 'Design Principles', desc: 'Key principles of user interface design', img: 'https://example.com/design-principles.jpg' },
        { title: 'Color Theory', desc: 'Using color effectively in UI design', img: 'https://example.com/color-theory.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'UI/UX Design',
        title: 'Wireframing and Prototyping',
        price: 149.99,
        rating: 4.8,
        numOfReviews: 95,
        img: 'https://example.com/wireframing.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c6c', // Replace with actual Mentor ID
      duration: 26,
      description: 'Create wireframes and prototypes to visualize your design ideas.',
      reviews: [],
      lessons: [
        { title: 'Wireframing Tools', desc: 'Introduction to wireframing tools and techniques', img: 'https://example.com/wireframing-tools.jpg' },
        { title: 'Prototyping Techniques', desc: 'Building interactive prototypes for user testing', img: 'https://example.com/prototyping.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'UI/UX Design',
        title: 'User Journey Mapping',
        price: 159.99,
        rating: 4.9,
        numOfReviews: 80,
        img: 'https://example.com/journey-mapping.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c6d', // Replace with actual Mentor ID
      duration: 20,
      description: 'Learn how to map user journeys and improve the user experience of your designs.',
      reviews: [],
      lessons: [
        { title: 'Journey Mapping Basics', desc: 'Introduction to user journey mapping', img: 'https://example.com/journey-mapping-basics.jpg' },
        { title: 'Analyzing User Flows', desc: 'Analyzing and optimizing user flows', img: 'https://example.com/user-flows.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'UI/UX Design',
        title: 'Design Thinking',
        price: 169.99,
        rating: 4.8,
        numOfReviews: 75,
        img: 'https://example.com/design-thinking.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c6e', // Replace with actual Mentor ID
      duration: 28,
      description: 'Explore the design thinking methodology and its application in creating user-centered designs.',
      reviews: [],
      lessons: [
        { title: 'Design Thinking Process', desc: 'Understanding the design thinking process', img: 'https://example.com/thinking-process.jpg' },
        { title: 'Empathy and Ideation', desc: 'Techniques for empathy and ideation in design', img: 'https://example.com/empathy-ideation.jpg' },
      ],
    },
  },

  // Data Science
  {
    students: [],
    data: {
      details: {
        category: 'Data Science',
        title: 'Introduction to Data Analysis',
        price: 199.99,
        rating: 4.7,
        numOfReviews: 120,
        img: 'https://example.com/data-analysis.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c7a', // Replace with actual Mentor ID
      duration: 30,
      description: 'Learn the fundamentals of data analysis and statistical techniques.',
      reviews: [],
      lessons: [
        { title: 'Data Analysis Basics', desc: 'Introduction to data analysis techniques', img: 'https://example.com/data-analysis-basics.jpg' },
        { title: 'Statistical Methods', desc: 'Understanding statistical methods for data analysis', img: 'https://example.com/statistical-methods.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Data Science',
        title: 'Machine Learning with Python',
        price: 219.99,
        rating: 4.8,
        numOfReviews: 150,
        img: 'https://example.com/machine-learning.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c7b', // Replace with actual Mentor ID
      duration: 35,
      description: 'Explore machine learning algorithms and build predictive models using Python.',
      reviews: [],
      lessons: [
        { title: 'Supervised Learning', desc: 'Introduction to supervised learning algorithms', img: 'https://example.com/supervised-learning.jpg' },
        { title: 'Unsupervised Learning', desc: 'Understanding unsupervised learning techniques', img: 'https://example.com/unsupervised-learning.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Data Science',
        title: 'Data Visualization',
        price: 179.99,
        rating: 4.6,
        numOfReviews: 95,
        img: 'https://example.com/data-visualization.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c7c', // Replace with actual Mentor ID
      duration: 25,
      description: 'Learn how to visualize data effectively using tools and techniques.',
      reviews: [],
      lessons: [
        { title: 'Visualization Tools', desc: 'Introduction to data visualization tools', img: 'https://example.com/visualization-tools.jpg' },
        { title: 'Creating Dashboards', desc: 'Building interactive dashboards for data insights', img: 'https://example.com/creating-dashboards.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Data Science',
        title: 'Big Data Analytics',
        price: 229.99,
        rating: 4.9,
        numOfReviews: 80,
        img: 'https://example.com/big-data.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c7d', // Replace with actual Mentor ID
      duration: 40,
      description: 'Understand big data technologies and analytics for handling large datasets.',
      reviews: [],
      lessons: [
        { title: 'Big Data Technologies', desc: 'Overview of big data technologies like Hadoop and Spark', img: 'https://example.com/big-data-tech.jpg' },
        { title: 'Data Processing', desc: 'Techniques for processing and analyzing large data sets', img: 'https://example.com/data-processing.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Data Science',
        title: 'Statistical Analysis with R',
        price: 189.99,
        rating: 4.7,
        numOfReviews: 70,
        img: 'https://example.com/statistical-analysis.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c7e', // Replace with actual Mentor ID
      duration: 28,
      description: 'Learn statistical analysis techniques using the R programming language.',
      reviews: [],
      lessons: [
        { title: 'R Basics', desc: 'Introduction to R programming', img: 'https://example.com/r-basics.jpg' },
        { title: 'Advanced Statistical Methods', desc: 'Exploring advanced statistical methods in R', img: 'https://example.com/advanced-statistics.jpg' },
      ],
    },
  },

  // DevOps
  {
    students: [],
    data: {
      details: {
        category: 'DevOps',
        title: 'Introduction to DevOps',
        price: 159.99,
        rating: 4.6,
        numOfReviews: 100,
        img: 'https://example.com/devops.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c8a', // Replace with actual Mentor ID
      duration: 20,
      description: 'Learn the fundamentals of DevOps and its principles for improving development and operations.',
      reviews: [],
      lessons: [
        { title: 'DevOps Overview', desc: 'Introduction to DevOps practices and methodologies', img: 'https://example.com/devops-overview.jpg' },
        { title: 'CI/CD Pipelines', desc: 'Implementing continuous integration and continuous deployment', img: 'https://example.com/ci-cd.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'DevOps',
        title: 'Containerization with Docker',
        price: 179.99,
        rating: 4.7,
        numOfReviews: 85,
        img: 'https://example.com/docker.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c8b', // Replace with actual Mentor ID
      duration: 22,
      description: 'Understand containerization concepts and use Docker for application development and deployment.',
      reviews: [],
      lessons: [
        { title: 'Docker Basics', desc: 'Introduction to Docker and containerization', img: 'https://example.com/docker-basics.jpg' },
        { title: 'Docker Compose', desc: 'Managing multi-container Docker applications', img: 'https://example.com/docker-compose.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'DevOps',
        title: 'Kubernetes for Beginners',
        price: 199.99,
        rating: 4.8,
        numOfReviews: 110,
        img: 'https://example.com/kubernetes.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c8c', // Replace with actual Mentor ID
      duration: 25,
      description: 'Learn how to orchestrate containerized applications using Kubernetes.',
      reviews: [],
      lessons: [
        { title: 'Kubernetes Basics', desc: 'Introduction to Kubernetes and its components', img: 'https://example.com/kubernetes-basics.jpg' },
        { title: 'Deploying Applications', desc: 'Deploying and managing applications on Kubernetes', img: 'https://example.com/deploying-applications.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'DevOps',
        title: 'Infrastructure as Code',
        price: 189.99,
        rating: 4.7,
        numOfReviews: 95,
        img: 'https://example.com/infrastructure-as-code.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c8d', // Replace with actual Mentor ID
      duration: 30,
      description: 'Explore the concepts of infrastructure as code and use tools like Terraform to manage infrastructure.',
      reviews: [],
      lessons: [
        { title: 'Infrastructure as Code Concepts', desc: 'Understanding infrastructure as code principles', img: 'https://example.com/iac-concepts.jpg' },
        { title: 'Terraform Basics', desc: 'Getting started with Terraform for infrastructure management', img: 'https://example.com/terraform-basics.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'DevOps',
        title: 'Monitoring and Logging',
        price: 169.99,
        rating: 4.8,
        numOfReviews: 80,
        img: 'https://example.com/monitoring-logging.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c8e', // Replace with actual Mentor ID
      duration: 25,
      description: 'Learn how to monitor and log your applications effectively for better performance and troubleshooting.',
      reviews: [],
      lessons: [
        { title: 'Monitoring Tools', desc: 'Introduction to monitoring tools and practices', img: 'https://example.com/monitoring-tools.jpg' },
        { title: 'Logging Techniques', desc: 'Best practices for logging and analyzing logs', img: 'https://example.com/logging-techniques.jpg' },
      ],
    },
  },

  // Graphic Design
  {
    students: [],
    data: {
      details: {
        category: 'Graphic Design',
        title: 'Introduction to Graphic Design',
        price: 139.99,
        rating: 4.7,
        numOfReviews: 110,
        img: 'https://example.com/graphic-design.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c9a', // Replace with actual Mentor ID
      duration: 20,
      description: 'Learn the basics of graphic design and how to use design tools effectively.',
      reviews: [],
      lessons: [
        { title: 'Design Principles', desc: 'Key principles of graphic design', img: 'https://example.com/design-principles.jpg' },
        { title: 'Design Tools', desc: 'Overview of popular design tools', img: 'https://example.com/design-tools.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Graphic Design',
        title: 'Logo Design',
        price: 149.99,
        rating: 4.8,
        numOfReviews: 95,
        img: 'https://example.com/logo-design.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c9b', // Replace with actual Mentor ID
      duration: 22,
      description: 'Create impactful logos and learn design principles specific to logo design.',
      reviews: [],
      lessons: [
        { title: 'Logo Design Basics', desc: 'Introduction to logo design principles', img: 'https://example.com/logo-basics.jpg' },
        { title: 'Advanced Logo Techniques', desc: 'Exploring advanced techniques for logo design', img: 'https://example.com/advanced-logo.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Graphic Design',
        title: 'Illustration Techniques',
        price: 159.99,
        rating: 4.9,
        numOfReviews: 85,
        img: 'https://example.com/illustration-techniques.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c9c', // Replace with actual Mentor ID
      duration: 25,
      description: 'Learn various illustration techniques and create stunning digital artwork.',
      reviews: [],
      lessons: [
        { title: 'Digital Illustration Basics', desc: 'Introduction to digital illustration techniques', img: 'https://example.com/digital-illustration.jpg' },
        { title: 'Advanced Illustration Skills', desc: 'Enhancing your illustration skills with advanced techniques', img: 'https://example.com/advanced-illustration.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Graphic Design',
        title: 'Typography',
        price: 169.99,
        rating: 4.8,
        numOfReviews: 90,
        img: 'https://example.com/typography.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c9d', // Replace with actual Mentor ID
      duration: 28,
      description: 'Explore the art of typography and how to effectively use type in your designs.',
      reviews: [],
      lessons: [
        { title: 'Typography Basics', desc: 'Understanding the fundamentals of typography', img: 'https://example.com/typography-basics.jpg' },
        { title: 'Creative Typography', desc: 'Applying creative techniques to typography', img: 'https://example.com/creative-typography.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Graphic Design',
        title: 'Brand Identity Design',
        price: 179.99,
        rating: 4.7,
        numOfReviews: 80,
        img: 'https://example.com/brand-identity.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3c9e', // Replace with actual Mentor ID
      duration: 30,
      description: 'Learn how to create compelling brand identities and visual branding strategies.',
      reviews: [],
      lessons: [
        { title: 'Brand Identity Basics', desc: 'Introduction to brand identity design', img: 'https://example.com/identity-basics.jpg' },
        { title: 'Building a Brand', desc: 'Creating and implementing a cohesive brand strategy', img: 'https://example.com/building-brand.jpg' },
      ],
    },
  },

  // Backend Development
  {
    students: [],
    data: {
      details: {
        category: 'Backend Development',
        title: 'Introduction to Node.js',
        price: 129.99,
        rating: 4.6,
        numOfReviews: 90,
        img: 'https://example.com/nodejs.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca0', // Replace with actual Mentor ID
      duration: 20,
      description: 'Learn the basics of Node.js and build server-side applications.',
      reviews: [],
      lessons: [
        { title: 'Node.js Fundamentals', desc: 'Understanding Node.js and its core concepts', img: 'https://example.com/nodejs-fundamentals.jpg' },
        { title: 'Building APIs with Node.js', desc: 'Creating RESTful APIs using Node.js', img: 'https://example.com/nodejs-apis.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Backend Development',
        title: 'Express.js Essentials',
        price: 139.99,
        rating: 4.7,
        numOfReviews: 100,
        img: 'https://example.com/expressjs.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca1', // Replace with actual Mentor ID
      duration: 22,
      description: 'Get to know Express.js and build scalable web applications with it.',
      reviews: [],
      lessons: [
        { title: 'Express.js Overview', desc: 'Introduction to Express.js and its features', img: 'https://example.com/expressjs-overview.jpg' },
        { title: 'Building Web Apps', desc: 'Creating web applications using Express.js', img: 'https://example.com/expressjs-webapps.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Backend Development',
        title: 'Database Management with MongoDB',
        price: 159.99,
        rating: 4.8,
        numOfReviews: 115,
        img: 'https://example.com/mongodb.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca2', // Replace with actual Mentor ID
      duration: 25,
      description: 'Learn how to manage databases using MongoDB and build data-driven applications.',
      reviews: [],
      lessons: [
        { title: 'MongoDB Basics', desc: 'Introduction to MongoDB and its features', img: 'https://example.com/mongodb-basics.jpg' },
        { title: 'Advanced MongoDB', desc: 'Exploring advanced features and techniques in MongoDB', img: 'https://example.com/advanced-mongodb.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Backend Development',
        title: 'API Development with Express',
        price: 169.99,
        rating: 4.7,
        numOfReviews: 90,
        img: 'https://example.com/api-development.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca3', // Replace with actual Mentor ID
      duration: 28,
      description: 'Master API development with Express.js and create robust and scalable APIs.',
      reviews: [],
      lessons: [
        { title: 'API Development Basics', desc: 'Introduction to API development with Express.js', img: 'https://example.com/api-development-basics.jpg' },
        { title: 'Building Scalable APIs', desc: 'Techniques for building scalable APIs with Express.js', img: 'https://example.com/scalable-apis.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Backend Development',
        title: 'Advanced Node.js Techniques',
        price: 189.99,
        rating: 4.8,
        numOfReviews: 85,
        img: 'https://example.com/advanced-nodejs.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca4', // Replace with actual Mentor ID
      duration: 30,
      description: 'Dive deeper into Node.js with advanced techniques and best practices.',
      reviews: [],
      lessons: [
        { title: 'Advanced Node.js Concepts', desc: 'Exploring advanced Node.js features and techniques', img: 'https://example.com/advanced-nodejs-concepts.jpg' },
        { title: 'Node.js Best Practices', desc: 'Best practices for writing efficient and maintainable Node.js code', img: 'https://example.com/nodejs-best-practices.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Cyber Security',
        title: 'Introduction to Cyber Security',
        price: 149.99,
        rating: 4.6,
        numOfReviews: 120,
        img: 'https://example.com/introduction-to-cyber-security.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca1', // Replace with actual Mentor ID
      duration: 20,
      description: 'Learn the fundamentals of cyber security, including key concepts and techniques for protecting systems.',
      reviews: [],
      lessons: [
        { title: 'Cyber Security Basics', desc: 'An introduction to basic concepts and terminology in cyber security', img: 'https://example.com/cyber-security-basics.jpg' },
        { title: 'Network Security Fundamentals', desc: 'Understanding network security and how to protect networks from attacks', img: 'https://example.com/network-security.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Cyber Security',
        title: 'Ethical Hacking and Penetration Testing',
        price: 249.99,
        rating: 4.9,
        numOfReviews: 75,
        img: 'https://example.com/ethical-hacking.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca2', // Replace with actual Mentor ID
      duration: 40,
      description: 'Master the techniques of ethical hacking and penetration testing to find and fix vulnerabilities.',
      reviews: [],
      lessons: [
        { title: 'Introduction to Ethical Hacking', desc: 'Learn about ethical hacking and its role in cyber security', img: 'https://example.com/ethical-hacking-intro.jpg' },
        { title: 'Penetration Testing Tools', desc: 'A comprehensive guide to using penetration testing tools effectively', img: 'https://example.com/pen-test-tools.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Cyber Security',
        title: 'Advanced Threat Detection',
        price: 299.99,
        rating: 4.7,
        numOfReviews: 90,
        img: 'https://example.com/advanced-threat-detection.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca3', // Replace with actual Mentor ID
      duration: 35,
      description: 'Learn advanced techniques for detecting and responding to sophisticated cyber threats.',
      reviews: [],
      lessons: [
        { title: 'Threat Intelligence', desc: 'Understanding threat intelligence and its role in threat detection', img: 'https://example.com/threat-intelligence.jpg' },
        { title: 'Incident Response Strategies', desc: 'Developing effective strategies for responding to security incidents', img: 'https://example.com/incident-response.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Cyber Security',
        title: 'Cyber Security for Cloud Platforms',
        price: 179.99,
        rating: 4.8,
        numOfReviews: 110,
        img: 'https://example.com/cyber-security-cloud.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca4', // Replace with actual Mentor ID
      duration: 25,
      description: 'Explore security best practices and techniques for protecting cloud-based systems and data.',
      reviews: [],
      lessons: [
        { title: 'Cloud Security Fundamentals', desc: 'Learn the basics of securing cloud environments', img: 'https://example.com/cloud-security-fundamentals.jpg' },
        { title: 'Securing Cloud Storage', desc: 'Techniques for securing data stored in the cloud', img: 'https://example.com/securing-cloud-storage.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Cyber Security',
        title: 'Compliance and Regulatory Requirements',
        price: 129.99,
        rating: 4.5,
        numOfReviews: 100,
        img: 'https://example.com/compliance-regulatory.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca5', // Replace with actual Mentor ID
      duration: 15,
      description: 'Understand the key compliance and regulatory requirements for maintaining security standards in various industries.',
      reviews: [],
      lessons: [
        { title: 'Overview of Compliance Standards', desc: 'Introduction to major compliance standards and frameworks', img: 'https://example.com/compliance-standards.jpg' },
        { title: 'Implementing Regulatory Controls', desc: 'How to implement and manage regulatory controls effectively', img: 'https://example.com/regulatory-controls.jpg' },
      ],
    },
  },
  {
    students: [],
    data: {
      details: {
        category: 'Cyber Security',
        title: 'Network Security and Defense',
        price: 199.99,
        rating: 4.6,
        numOfReviews: 80,
        img: 'https://example.com/network-security.jpg',
      },
      mentor: '64d3d8e78c0c4a1b5f0f3ca6', // Replace with actual Mentor ID
      duration: 30,
      description: 'Learn about network security techniques and strategies to protect networks from various threats.',
      reviews: [],
      lessons: [
        { title: 'Network Security Protocols', desc: 'Exploring key network security protocols and their applications', img: 'https://example.com/network-security-protocols.jpg' },
        { title: 'Defense Mechanisms', desc: 'Implementing defense mechanisms to safeguard network infrastructure', img: 'https://example.com/defense-mechanisms.jpg' },
      ],
    },
  }
];
   
  
    
module.exports = data