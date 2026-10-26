/**
 * Vietnamese for the job listings, keyed by the English.
 *
 * The listings live as a literal in `app/[locale]/careers/[id]/page.tsx`, so this is the same
 * lookup shape the other content modules use: a miss falls back to English, so a role added
 * without a translation still renders.
 *
 * Role titles are kept in English. They are what a candidate searches for, what they will put on
 * a CV, and what the rest of the industry calls the job; "Kỹ sư học máy cao cấp" is accurate and
 * would make the posting harder to find. Department, location and contract type ARE translated,
 * because those are facts about working here rather than the name of a profession.
 */
export const JOBS_VI: Record<string, string> = {
  /* Departments, locations and contract types. */
  Engineering: "Kỹ thuật",
  Product: "Sản phẩm",
  "Customer Success": "Thành công khách hàng",
  "Remote (India/Vietnam)": "Làm từ xa (Ấn Độ/Việt Nam)",
  "Full-time": "Toàn thời gian",
  Negotiable: "Thoả thuận",

  /* Senior Machine Learning Engineer */
  "We're looking for a Senior Machine Learning Engineer to build the models behind Pulse's decisions: reading product evidence, ranking which catalogue gaps are worth fixing, and deciding live which products meet a shopper's requirements. This is a high-impact role where your work decides what merchants fix and what shoppers are shown.":
    "Chúng tôi đang tìm một Senior Machine Learning Engineer để xây dựng các mô hình đứng sau quyết định của Pulse: đọc bằng chứng sản phẩm, xếp hạng khoảng trống nào trong danh mục đáng sửa, và quyết định trực tiếp sản phẩm nào đáp ứng yêu cầu của người mua. Đây là vị trí có ảnh hưởng lớn, nơi công việc của bạn quyết định người bán sửa gì và người mua được thấy gì.",
  "Design and implement models that read product evidence and decide what fits a requirement":
    "Thiết kế và triển khai mô hình đọc bằng chứng sản phẩm và quyết định điều gì đáp ứng một yêu cầu",
  "Keep model inference fast enough for the live storefront path":
    "Giữ cho mô hình suy luận đủ nhanh cho luồng cửa hàng trực tiếp",
  "Build and maintain our feature engineering pipeline":
    "Xây dựng và duy trì luồng xử lý đặc trưng dữ liệu",
  "Collaborate with product to translate business needs into ML solutions":
    "Phối hợp với bộ phận sản phẩm để chuyển nhu cầu kinh doanh thành giải pháp học máy",
  "Mentor junior engineers and contribute to technical culture":
    "Dìu dắt kỹ sư mới vào nghề và góp phần xây dựng văn hoá kỹ thuật",
  "Stay current with ML research and evaluate new techniques":
    "Theo sát nghiên cứu học máy và đánh giá các kỹ thuật mới",
  "5+ years of machine learning engineering experience":
    "Từ 5 năm kinh nghiệm làm kỹ sư học máy trở lên",
  "Experience building and deploying real-time inference systems":
    "Kinh nghiệm xây dựng và triển khai hệ thống suy luận thời gian thực",
  "Strong proficiency in Python and PyTorch or TensorFlow":
    "Thành thạo Python và PyTorch hoặc TensorFlow",
  "Background in recommendation systems, NLP, or behavioral modeling":
    "Nền tảng về hệ gợi ý, xử lý ngôn ngữ tự nhiên hoặc mô hình hoá hành vi",
  "Experience with MLOps: model training, versioning, and deployment":
    "Kinh nghiệm MLOps: huấn luyện, quản lý phiên bản và triển khai mô hình",
  "Strong communication skills and ability to work cross-functionally":
    "Kỹ năng giao tiếp tốt và khả năng làm việc xuyên bộ phận",
  "Experience with e-commerce or personalization domains":
    "Kinh nghiệm trong lĩnh vực thương mại điện tử hoặc cá nhân hoá",
  "Familiarity with vector databases and similarity search":
    "Quen thuộc với cơ sở dữ liệu vector và tìm kiếm theo độ tương đồng",
  "Experience with streaming data processing (Kafka, Flink)":
    "Kinh nghiệm xử lý dữ liệu luồng (Kafka, Flink)",
  "Publications or open-source contributions in ML":
    "Có công bố khoa học hoặc đóng góp mã nguồn mở trong lĩnh vực học máy",

  /* Senior Backend Engineer */
  "Join our backend team to design and build the distributed systems that power Pulse. You'll work on high-throughput, low-latency services that handle millions of requests while maintaining strict reliability and performance requirements.":
    "Gia nhập đội backend để thiết kế và xây dựng các hệ thống phân tán vận hành Pulse. Bạn sẽ làm việc với những dịch vụ thông lượng cao, độ trễ thấp, xử lý hàng triệu yêu cầu trong khi vẫn phải đáp ứng các yêu cầu khắt khe về độ tin cậy và hiệu năng.",
  "Design and build scalable backend services":
    "Thiết kế và xây dựng các dịch vụ backend có khả năng mở rộng",
  "Optimize system performance for sub-50ms response times":
    "Tối ưu hiệu năng hệ thống để đạt thời gian phản hồi dưới 50ms",
  "Implement robust data pipelines for real-time processing":
    "Triển khai các luồng dữ liệu vững chắc cho xử lý thời gian thực",
  "Maintain and improve our Kubernetes-based infrastructure":
    "Duy trì và cải thiện hạ tầng chạy trên Kubernetes",
  "Participate in on-call rotation and incident response":
    "Tham gia ca trực luân phiên và xử lý sự cố",
  "Contribute to architecture decisions and technical roadmap":
    "Góp phần vào các quyết định kiến trúc và lộ trình kỹ thuật",
  "5+ years of backend engineering experience":
    "Từ 5 năm kinh nghiệm làm kỹ sư backend trở lên",
  "Experience with high-throughput, low-latency distributed systems":
    "Kinh nghiệm với hệ thống phân tán thông lượng cao, độ trễ thấp",
  "Proficiency in Go, Rust, or Python": "Thành thạo Go, Rust hoặc Python",
  "Strong understanding of Kubernetes and cloud infrastructure (AWS/GCP)":
    "Hiểu sâu về Kubernetes và hạ tầng đám mây (AWS/GCP)",
  "Experience with databases (PostgreSQL, Redis, ClickHouse)":
    "Kinh nghiệm với cơ sở dữ liệu (PostgreSQL, Redis, ClickHouse)",
  "Familiarity with observability tools and practices":
    "Quen thuộc với công cụ và thực hành giám sát hệ thống",
  "Experience with real-time streaming systems":
    "Kinh nghiệm với hệ thống truyền dữ liệu thời gian thực",
  "Background in API design and developer experience":
    "Nền tảng về thiết kế API và trải nghiệm lập trình viên",
  "Experience with CDN and edge computing":
    "Kinh nghiệm với CDN và điện toán biên",
  "Contributions to open-source infrastructure projects":
    "Có đóng góp cho các dự án hạ tầng mã nguồn mở",

  /* Frontend Engineer */
  "We're looking for a Frontend Engineer to build beautiful, performant interfaces for our dashboard and integration tools. You'll create experiences that help customers understand their personalization performance and optimize their results.":
    "Chúng tôi đang tìm một Frontend Engineer để xây dựng những giao diện đẹp và nhanh cho bảng điều khiển và bộ công cụ tích hợp. Bạn sẽ tạo ra những trải nghiệm giúp khách hàng hiểu được hiệu quả cá nhân hoá của họ và tối ưu kết quả.",
  "Build and maintain our customer-facing dashboard":
    "Xây dựng và duy trì bảng điều khiển dành cho khách hàng",
  "Create data visualizations that surface actionable insights":
    "Tạo các biểu đồ dữ liệu làm nổi bật những điều có thể hành động được",
  "Develop integration tools and documentation experiences":
    "Phát triển công cụ tích hợp và trải nghiệm đọc tài liệu",
  "Collaborate with design to implement pixel-perfect interfaces":
    "Phối hợp với thiết kế để dựng giao diện chuẩn tới từng pixel",
  "Optimize frontend performance and user experience":
    "Tối ưu hiệu năng frontend và trải nghiệm người dùng",
  "Write tests and maintain code quality standards":
    "Viết kiểm thử và giữ chuẩn chất lượng mã nguồn",
  "3+ years of frontend development experience":
    "Từ 3 năm kinh nghiệm phát triển frontend trở lên",
  "Expert-level React and TypeScript":
    "Thành thạo ở mức chuyên sâu React và TypeScript",
  "Experience with data visualization (D3, Recharts, or similar)":
    "Kinh nghiệm trực quan hoá dữ liệu (D3, Recharts hoặc tương đương)",
  "Strong eye for design and attention to UX details":
    "Có mắt thẩm mỹ tốt và chú ý tới chi tiết trải nghiệm người dùng",
  "Familiarity with modern CSS (Tailwind, CSS-in-JS)":
    "Quen thuộc với CSS hiện đại (Tailwind, CSS-in-JS)",
  "Experience with testing frameworks (Jest, Cypress)":
    "Kinh nghiệm với các framework kiểm thử (Jest, Cypress)",
  "Experience with Next.js or similar frameworks":
    "Kinh nghiệm với Next.js hoặc các framework tương tự",
  "Background in B2B SaaS products": "Nền tảng về sản phẩm SaaS B2B",
  "Experience with design systems": "Kinh nghiệm với hệ thống thiết kế",
  "Interest in developer tools and documentation":
    "Quan tâm tới công cụ dành cho lập trình viên và tài liệu kỹ thuật",

  /* Solutions Engineer */
  "As a Solutions Engineer, you'll help our customers successfully integrate Pulse and maximize their personalization results. You'll bridge the gap between technical implementation and business outcomes, becoming a trusted advisor to our customers.":
    "Ở vai trò Solutions Engineer, bạn sẽ giúp khách hàng tích hợp Pulse thành công và khai thác tối đa kết quả cá nhân hoá. Bạn sẽ bắc cầu giữa phần triển khai kỹ thuật và kết quả kinh doanh, trở thành người cố vấn đáng tin cậy của khách hàng.",
  "Guide customers through Pulse integration and setup":
    "Hướng dẫn khách hàng tích hợp và thiết lập Pulse",
  "Troubleshoot technical issues and provide solutions":
    "Chẩn đoán sự cố kỹ thuật và đưa ra giải pháp",
  "Create technical documentation and integration guides":
    "Soạn tài liệu kỹ thuật và hướng dẫn tích hợp",
  "Collaborate with product on customer feedback and feature requests":
    "Phối hợp với bộ phận sản phẩm về phản hồi của khách hàng và yêu cầu tính năng",
  "Conduct technical demos for prospective customers":
    "Thực hiện demo kỹ thuật cho khách hàng tiềm năng",
  "Build tools and scripts to streamline customer onboarding":
    "Xây dựng công cụ và script để rút gọn quá trình tiếp nhận khách hàng mới",
  "3+ years in solutions engineering, technical consulting, or similar":
    "Từ 3 năm kinh nghiệm ở vị trí solutions engineering, tư vấn kỹ thuật hoặc tương đương",
  "Strong understanding of e-commerce platforms (Shopify, Magento, etc.)":
    "Hiểu rõ các nền tảng thương mại điện tử (Shopify, Magento, v.v.)",
  "Experience with APIs, JavaScript, and web technologies":
    "Kinh nghiệm với API, JavaScript và các công nghệ web",
  "Excellent communication and presentation skills":
    "Kỹ năng giao tiếp và thuyết trình xuất sắc",
  "Ability to translate technical concepts for non-technical audiences":
    "Khả năng diễn giải khái niệm kỹ thuật cho người không chuyên",
  "Customer-focused mindset and problem-solving orientation":
    "Tư duy lấy khách hàng làm trung tâm và thiên về giải quyết vấn đề",
  "Experience with personalization or recommendation systems":
    "Kinh nghiệm với hệ thống cá nhân hoá hoặc hệ gợi ý",
  "Background in analytics or data platforms":
    "Nền tảng về phân tích dữ liệu hoặc nền tảng dữ liệu",
  "Familiarity with SQL and data analysis":
    "Quen thuộc với SQL và phân tích dữ liệu",
  "Previous startup experience": "Từng làm việc tại startup",

  /* Product Designer */
  "We're looking for a Product Designer to shape the future of our product experience. You'll design intuitive interfaces that make complex personalization technology accessible to e-commerce teams of all technical levels.":
    "Chúng tôi đang tìm một Product Designer để định hình tương lai trải nghiệm sản phẩm của mình. Bạn sẽ thiết kế những giao diện trực quan, giúp công nghệ cá nhân hoá phức tạp trở nên dễ tiếp cận với các đội thương mại điện tử ở mọi trình độ kỹ thuật.",
  "Lead design for our customer dashboard and tools":
    "Dẫn dắt thiết kế cho bảng điều khiển và bộ công cụ dành cho khách hàng",
  "Conduct user research and synthesize insights":
    "Thực hiện nghiên cứu người dùng và tổng hợp phát hiện",
  "Create wireframes, prototypes, and high-fidelity designs":
    "Dựng wireframe, bản mẫu tương tác và thiết kế chi tiết",
  "Collaborate closely with engineering on implementation":
    "Phối hợp chặt chẽ với đội kỹ thuật trong quá trình triển khai",
  "Develop and maintain our design system":
    "Phát triển và duy trì hệ thống thiết kế",
  "Define UX patterns for data-heavy interfaces":
    "Định hình các mẫu trải nghiệm cho giao diện nhiều dữ liệu",
  "4+ years of product design experience":
    "Từ 4 năm kinh nghiệm thiết kế sản phẩm trở lên",
  "Strong portfolio demonstrating complex B2B product work":
    "Hồ sơ năng lực tốt, thể hiện được các dự án sản phẩm B2B phức tạp",
  "Proficiency in Figma and prototyping tools":
    "Thành thạo Figma và các công cụ dựng bản mẫu",
  "Experience designing data-heavy interfaces and dashboards":
    "Kinh nghiệm thiết kế giao diện và bảng điều khiển nhiều dữ liệu",
  "Ability to conduct and synthesize user research":
    "Khả năng thực hiện và tổng hợp nghiên cứu người dùng",
  "Strong collaboration skills with engineering teams":
    "Kỹ năng phối hợp tốt với các đội kỹ thuật",
  "Experience with analytics or marketing technology products":
    "Kinh nghiệm với sản phẩm phân tích dữ liệu hoặc công nghệ tiếp thị",
  "Background in design systems": "Nền tảng về hệ thống thiết kế",
  "Basic understanding of frontend development":
    "Hiểu biết cơ bản về phát triển frontend",
  "Interest in data visualization": "Quan tâm tới trực quan hoá dữ liệu",

  /* ---- the careers index, whose summaries are shorter than the detail pages' -------------- */
  "Build and optimize our real-time inference engine. You'll work on ML models that process millions of requests per day with sub-50ms latency requirements.":
    "Xây dựng và tối ưu bộ máy suy luận thời gian thực. Bạn sẽ làm việc với các mô hình học máy xử lý hàng triệu yêu cầu mỗi ngày với yêu cầu độ trễ dưới 50ms.",
  "5+ years of ML engineering experience":
    "Từ 5 năm kinh nghiệm kỹ sư học máy trở lên",
  "Experience with real-time inference systems":
    "Kinh nghiệm với hệ thống suy luận thời gian thực",
  "Strong Python and PyTorch/TensorFlow skills":
    "Thành thạo Python và PyTorch/TensorFlow",
  "Background in recommendation systems or NLP":
    "Nền tảng về hệ gợi ý hoặc xử lý ngôn ngữ tự nhiên",
  "Design and build the distributed systems that power Pulse. Focus on scalability, reliability, and performance.":
    "Thiết kế và xây dựng các hệ thống phân tán vận hành Pulse. Tập trung vào khả năng mở rộng, độ tin cậy và hiệu năng.",
  "5+ years backend engineering experience":
    "Từ 5 năm kinh nghiệm kỹ sư backend trở lên",
  "Experience with high-throughput, low-latency systems":
    "Kinh nghiệm với hệ thống thông lượng cao, độ trễ thấp",
  "Familiarity with Kubernetes and cloud infrastructure":
    "Quen thuộc với Kubernetes và hạ tầng đám mây",
  "Build beautiful, performant interfaces for our dashboard and integration tools. Create experiences that help customers understand and optimize their personalization.":
    "Xây dựng giao diện đẹp và nhanh cho bảng điều khiển và bộ công cụ tích hợp. Tạo ra trải nghiệm giúp khách hàng hiểu và tối ưu việc cá nhân hoá của họ.",
  "3+ years frontend development experience":
    "Từ 3 năm kinh nghiệm phát triển frontend trở lên",
  "Experience with data visualization": "Kinh nghiệm trực quan hoá dữ liệu",
  "Strong eye for design and UX":
    "Có mắt thẩm mỹ tốt về thiết kế và trải nghiệm người dùng",
  "Help customers integrate Pulse and maximize their results. Bridge the gap between technical implementation and business outcomes.":
    "Giúp khách hàng tích hợp Pulse và khai thác tối đa kết quả. Bắc cầu giữa phần triển khai kỹ thuật và kết quả kinh doanh.",
  "3+ years in solutions engineering or technical consulting":
    "Từ 3 năm kinh nghiệm solutions engineering hoặc tư vấn kỹ thuật trở lên",
  "Strong understanding of e-commerce platforms":
    "Hiểu rõ các nền tảng thương mại điện tử",
  "Experience with APIs and JavaScript": "Kinh nghiệm với API và JavaScript",
  "Excellent communication skills": "Kỹ năng giao tiếp xuất sắc",
  "Shape the future of our product experience. Design intuitive interfaces that make complex personalization technology accessible.":
    "Định hình tương lai trải nghiệm sản phẩm của chúng tôi. Thiết kế những giao diện trực quan giúp công nghệ cá nhân hoá phức tạp trở nên dễ tiếp cận.",
  "4+ years product design experience":
    "Từ 4 năm kinh nghiệm thiết kế sản phẩm trở lên",
  "Strong portfolio showing complex B2B products":
    "Hồ sơ năng lực tốt với các sản phẩm B2B phức tạp",
  "Proficiency in Figma": "Thành thạo Figma",
  "Experience with data-heavy interfaces":
    "Kinh nghiệm với giao diện nhiều dữ liệu",
};
