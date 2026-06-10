// CORS
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",

    // Vercel deployments
    "https://shyampari-edutech-pvt-ltd-delta.vercel.app",
    "https://shyampari-edutech-pvt-ltd-xrb1.vercel.app",

    // Render backend (if accessed directly)
    "https://shyampari-edutech-pvt-ltd-1.onrender.com",

    // Custom domain
    "https://www.shyampariedtech.com",
    "https://shyampariedtech.com"
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log("Origin:", origin);

        // Allow requests with no origin (Postman, mobile apps, curl)
        if (!origin) {
            return callback(null, true);
        }

        const isLocalhost =
            /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

        const isVercelApp =
            /^https:\/\/shyampari-edutech-pvt-ltd.*\.vercel\.app$/.test(origin);

        const isAllowedOrigin = allowedOrigins.includes(origin);

        if (isLocalhost || isVercelApp || isAllowedOrigin) {
            callback(null, true);
        } else {
            console.error("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With"
    ],

    credentials: true,

    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));