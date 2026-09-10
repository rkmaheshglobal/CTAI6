import type { LearnSection } from "@/lib/types";

export type AiLearnChapter = {
  learn: LearnSection[];
  keyPoints: string[];
};

/** Full chapter reading material from CTAI Part 2 — self-contained on the Learn tab */
export const AI_LEARN_CONTENT: Record<string, AiLearnChapter> = {
  "ai-intro": {
    learn: [
      {
        id: "overview",
        title: "Introduction — What you will learn",
        content: [
          "This chapter introduces Artificial Intelligence (AI): what intelligence means, how AI works in daily life, how it differs from simple automation, and how machines learn from data.",
          "Read every section below carefully. All concepts needed for your exercises are explained here — you do not need any other book or PDF.",
        ],
        bullets: [
          "What is intelligence? · What is AI? · History of AI",
          "AI in daily life · Automation vs AI · Human vs machine intelligence",
          "How AI learns · Labelled vs unlabelled data · Three types of Machine Learning",
        ],
      },
      {
        id: "intelligence",
        title: "What is Intelligence?",
        content: [
          "Intelligence is the ability to learn, think, understand, solve problems, and apply knowledge effectively. It is not just one skill — it is a combination of many mental abilities.",
          "The level of intelligence differs in humans and animals based on how they perceive and behave. Intelligence means using knowledge, interpretation, and insight to complete tasks successfully. It also includes adapting to new situations and making appropriate decisions based on experience.",
          "Intelligence can be classified into different types based on how people think, learn, and interact with the world. Here are three examples from everyday school life:",
        ],
        bullets: [
          "Interpersonal intelligence (The Class Leader) — A student who naturally brings people together in a group project. When two classmates disagree, this person says: “Tom, you’re great at drawing, so make the poster. Jerry, you found the best information, so write the report.” They understand how others feel, communicate well, and help the team work smoothly.",
          "Naturalistic intelligence (The Nature Lover) — On a garden field trip, while others run around, this student watches ants carrying a leaf and can name different plants and birds. They are smart in how they make sense of the natural world.",
          "Intrapersonal intelligence (The Daydreamer) — Before a big test, instead of panicking, this student thinks: “I get distracted by noise, so I’ll use headphones. I remember better when I draw pictures in my notes.” They understand their own feelings and know how they learn best.",
        ],
      },
      {
        id: "what-is-ai",
        title: "What is Artificial Intelligence?",
        content: [
          "Artificial Intelligence (AI) is the field of computer science that makes machines intelligent — enabling them to perform tasks that usually require human intelligence.",
          "These machines can analyse data, recognise patterns, predict trends, solve problems, and make decisions using data and learning from experience. AI systems are designed to learn, adapt, and improve their performance over time.",
          "Two important ideas help us understand AI:",
          "Computing — using computers to perform mathematical, logical, or relational calculations.",
          "Intelligence — learning, reasoning, decision-making, and adapting to new situations.",
          "When computing and intelligence are combined, we get AI — machines that simulate human intelligence and assist in decision-making.",
        ],
      },
      {
        id: "ai-history-ancient",
        title: "History of AI — Ancient ideas & Alan Turing",
        content: [
          "Artificial intelligence has grown from simple rule-based programs into powerful systems that can learn, reason, and create.",
          "Long before computers existed, people built automatons — simple machines using water, gears, and levers. These could perform fixed tasks repeatedly but could not learn from experience. Although not truly intelligent, they shaped the idea of machines that could think and decide in the future. A famous example is the mechanical water clock used in ancient Egypt and Greece.",
          "In the 1940s, mathematician Alan Turing asked: “Can machines think?” This inspired researchers to explore intelligent computing.",
          "Turing introduced the Turing Test — a way to check machine intelligence. A machine passes if a person cannot tell whether they are talking to a machine or a human. Turing’s ideas laid the foundation for today’s AI in search engines, voice assistants, and recommendation systems.",
        ],
      },
      {
        id: "ai-history-modern",
        title: "History of AI — Birth of AI & modern era",
        content: [
          "In 1956, the Dartmouth Summer Research Project marked the birth of AI. John McCarthy — known as the ‘Father of Artificial Intelligence’ — coined the term Artificial Intelligence for the science of making computer programs that can think for themselves.",
          "Scientists began building computers that could solve problems and play simple games. However, progress slowed in the 1980s and 1990s because of slow processors, limited memory, and high cost. This period was called the AI Winter.",
          "Other founding contributors include Marvin Minsky, Claude Shannon, Herbert A. Simon, and Alan Newell. Their work in problem-solving, machine learning, and computational theory laid the foundation for modern AI.",
          "From the 2000s onward, computers became faster, cheaper, and more powerful. AI systems could store and process huge amounts of data. Instead of only following set rules, they began learning patterns from data and improving over time. Modern AI can recognise images, understand speech, and make simple decisions.",
        ],
      },
      {
        id: "ai-daily-life",
        title: "AI in our daily lives",
        content: [
          "AI has become an important part of everyday life. Often we use it without realising it. AI helps make tasks easier, faster, and more efficient by letting machines and apps learn, analyse data, and make smart decisions.",
        ],
        bullets: [
          "Smart home devices — Lights that change colour by time of day, thermostats that adjust to your preferences, AI vacuum cleaners, and more.",
          "Smartphones — Voice assistants, food apps, and reservation portals use AI. Even portrait mode uses AI to blur the background and focus on faces.",
          "Banking & finance — Banks use AI for customer service, fraud prevention, and investments. Automated emails about unusual transactions are AI watching your account.",
          "Healthcare — AI helps find and diagnose diseases, plan treatments, and support patient care in hospitals.",
          "E-commerce — Shopping sites suggest products you may like, give personal recommendations, and use chatbots to help customers.",
          "Security & monitoring — AI detects unusual activity, recognises faces, spots unattended bags, and sends alerts quickly.",
          "Video games — In chess and similar games, the computer studies moves and chooses the best ones — showing AI can plan and solve problems.",
          "Drones & smart cars — Self-driving cars and military drones are among the most visible uses of modern AI.",
          "Scanning apps — AI identifies objects in photos (plants, shoes, text) and uses OCR to extract text from scanned documents.",
          "Search engines — AI analyses your query and ranks the most relevant results every time you search online.",
        ],
      },
      {
        id: "automation-vs-ai",
        title: "Understanding what is NOT AI — Automation vs AI",
        content: [
          "Not all smart machines use AI! Some machines only follow fixed instructions. That is automation — not artificial intelligence.",
          "Automation machines do not think or learn. They do what they are programmed to do and give the same output every time. AI machines can think, learn from data, and make decisions.",
          "Examples of automation (not AI): a microwave heats food for a set time; a traffic light changes at fixed intervals. They are useful, but they do not think or learn.",
        ],
        bullets: [
          "Automation — works on fixed rules; does not think or learn; same input → same output; cannot handle new situations; needs human help to change behaviour. Examples: traditional washing machine, standard traffic signals.",
          "Artificial Intelligence — learns from data; can think, learn, and improve; output may change as it learns; can handle new situations; can adjust behaviour on its own. Examples: voice assistants, face recognition.",
        ],
      },
      {
        id: "human-vs-machine",
        title: "Human intelligence vs machine intelligence",
        content: [
          "AI-powered machines can think and learn — but their intelligence is different from human intelligence.",
        ],
        bullets: [
          "How it develops — Humans: naturally through biology and experience. Machines: created using algorithms; learns patterns from training data.",
          "Learning — Humans: experience, senses, emotions, reasoning. Machines: data, algorithms, predefined rules.",
          "Adaptability — Humans: highly adaptable to unpredictable situations. Machines: limited; depends on programming and data.",
          "Creativity — Humans: original thought, imagination. Machines: mostly follows patterns in data.",
          "Emotions — Humans: perceive and respond to emotions. Machines: simulate responses but lack true emotional understanding.",
          "Speed & accuracy — Humans: slower, can make errors. Machines: very fast and highly accurate on trained tasks.",
          "Consciousness — Humans: self-aware. Machines: no true consciousness or self-awareness.",
        ],
      },
      {
        id: "how-ai-learns",
        title: "How does AI learn? — Data, labels & Machine Learning",
        content: [
          "AI systems become intelligent because they learn from data — information such as pictures, text, numbers, or sounds. AI studies this data to find patterns and improve performance.",
          "Data can be labelled or unlabelled:",
          "Labelled data already has a predefined label or tag. Example: a teacher collects notebooks after a test. If every book has the student’s name on it, the teacher knows whose book it is — like labelled data.",
          "Unlabelled data has no tags. If notebooks have no names, the teacher must figure out the owner from handwriting or answers — like unlabelled data.",
          "Machine Learning (ML) is the ability of AI to learn from data. It is a branch of AI that lets machines improve over time without being programmed for every single task.",
          "In ML, algorithms create models that are trained on data. Training is the process where the model learns patterns. By analysing large amounts of data, AI can make predictions, recognise patterns, and make decisions.",
        ],
      },
      {
        id: "supervised-learning",
        title: "Type 1 — Supervised Learning",
        content: [
          "Supervised learning uses data that already has correct answers (labelled data). The model learns the relationship between inputs and outputs so it can predict accurately on new data.",
          "It is one of the simplest types of ML and powers many everyday applications.",
          "How it works: labelled data with different categories (e.g. shapes) trains a model. Each item has a correct label. After training, the model receives new unlabelled data and predicts the correct label based on patterns it learned.",
        ],
        bullets: [
          "Email spam detection — classifying emails as spam or not spam",
          "Image recognition — identifying cats, dogs, or cars in pictures",
          "House price prediction — predicting prices from size, location, and features",
          "Handwritten digit recognition — reading numbers on bank cheques",
          "Medical diagnosis — predicting diseases from patient data and symptoms",
        ],
      },
      {
        id: "unsupervised-learning",
        title: "Type 2 — Unsupervised Learning",
        content: [
          "Unsupervised learning studies data to find hidden patterns, structures, or groupings — without predefined labels or correct answers.",
          "The model explores data on its own to discover meaningful relationships. It is commonly used for clustering similar data and detecting anomalies.",
          "How it works: the model is trained on unlabelled data (e.g. various shapes). It finds similarities and groups comparable objects into clusters. When new data arrives, it assigns it to the most appropriate group.",
        ],
        bullets: [
          "Customer segmentation — grouping customers with similar buying habits",
          "Market basket analysis — finding products often bought together",
          "Document clustering — grouping similar articles or news topics",
          "Anomaly detection — spotting unusual banking transactions or fraud",
          "Social network analysis — finding communities with similar interests",
        ],
      },
      {
        id: "reinforcement-learning",
        title: "Type 3 — Reinforcement Learning",
        content: [
          "Reinforcement learning (RL) is based on trial and error. Machines learn by trying new approaches and improving methods that maximise a reward.",
          "Example: a chess program learns by trying moves without knowing which is best. A successful move or win gives a reward; a wrong move or loss gives a penalty. Over many games, it improves its strategy.",
          "Key parts: the Agent (learner/decision-maker) and the Environment (everything around it). The agent observes the current state, takes an action, and receives feedback — a reward (good) or reduced reward (not good). The agent improves its decisions over time.",
        ],
        bullets: [
          "Game-playing AI — learning chess, Go, or video games",
          "Self-driving cars — learning safe driving decisions",
          "Robot navigation — moving through obstacles",
          "Recommendation systems — improving suggestions based on user feedback",
        ],
      },
    ],
    keyPoints: [
      "Intelligence is the ability to learn, think, and solve problems.",
      "Not all automated machines use Artificial Intelligence.",
      "AI learns from data using Machine Learning.",
      "AI improves its performance over time through experience and feedback.",
      "Three types of Machine Learning: Supervised, Unsupervised, and Reinforcement.",
    ],
  },

  "ai-data": {
    learn: [
      {
        id: "overview",
        title: "Introduction — What you will learn",
        content: [
          "In today’s digital world, data is everywhere — weather apps, fitness trackers, report cards, and online videos all depend on it.",
          "This chapter explains what data is, why it matters, the main types of data, and how to collect, organise, and present it using tables and charts. Everything is explained below so you can study right here on the site.",
        ],
        bullets: [
          "What is data? · Importance in daily life · Five types of data",
          "Collecting & organising data · Tables · Bar charts · Pictograms",
        ],
      },
      {
        id: "data-everywhere",
        title: "Data is everywhere",
        content: [
          "Every day you create and use data without thinking about it:",
          "Recording attendance, sending messages, checking weather, watching videos online, and using a fitness app — all involve data.",
          "Weather apps collect data from satellites and weather stations. Map apps use traffic data from many users to suggest faster routes. A school report card compiles attendance and marks.",
          "Data helps us understand any situation, compare information, and make better decisions.",
        ],
      },
      {
        id: "what-is-data",
        title: "What is Data?",
        content: [
          "Data means raw information that can be processed and analysed to get useful insights for decision-making.",
          "Data consists of raw facts. When it is organised and processed, it becomes information that helps us make correct decisions.",
        ],
        bullets: [
          "The number of friends you have",
          "The weather report showing temperature",
          "The marks you score in an exam",
          "The list of books in your school library",
        ],
      },
      {
        id: "importance-decisions",
        title: "Importance of data — Decision making & business",
        content: [
          "Decision making — Data provides information, patterns, and past results so decisions are not based only on guesses. Exam results help teachers see which subjects a student struggles with or excels in. Sales data helps shop owners decide what to stock or remove. Using data correctly reduces uncertainty.",
          "Business growth — Sales records and customer feedback reveal what customers prefer, helping improve products, reduce losses, and increase profit.",
        ],
      },
      {
        id: "importance-research",
        title: "Importance of data — Research, security & personalisation",
        content: [
          "Scientific research — Data is the foundation of every scientific investigation. Researchers run experiments, observe results, and conduct surveys to find patterns, test ideas, and draw conclusions. Trustworthy data drives medicine, space exploration, and environmental research.",
          "Cybersecurity — Security systems study large datasets to spot unusual activity and predict future threats. They analyse login information, network traffic, and access patterns to stop problems from recurring.",
          "Personalised experience — Apps and websites use your search history and preferences to show relevant content. Shopping apps suggest products from past purchases; music apps recommend songs you might enjoy.",
        ],
      },
      {
        id: "data-types",
        title: "Types of data",
        content: [
          "Data can come in many forms. Each type has its own meaning and is used differently:",
        ],
        bullets: [
          "Numerical data — Made of numbers you can count or measure. Examples: counting objects, measuring length, calculating totals, number symbols for counting.",
          "Text data — Made of letters, words, or sentences. Examples: a written name, a list of names, a written address, messages in letters or chats.",
          "Image data — Pictures, drawings, or photos that help people see information. Examples: a photo of your pet, emojis in chat, pictures of fruits, a collection of images.",
          "Video data — Moving pictures, sometimes with sound. Examples: a movie, CCTV footage, recorded video, online meetings.",
          "Sound data — Sounds, speech, or music. Examples: voice recordings, listening to music, your school bell, voice calls.",
        ],
      },
      {
        id: "collecting",
        title: "Collecting data",
        content: [
          "Collecting data means gathering information from people, books, the internet, or instruments to support analysis and correct decisions.",
          "Common sources:",
        ],
        bullets: [
          "People — asking questions or conducting surveys",
          "Books — reading facts and reference information",
          "Internet — searching for information online",
          "Instruments — thermometer (temperature), clock (time), scale (weight)",
          "Counting the total number of plants in the school premises",
          "Asking classmates about their hobbies and writing down answers",
          "Measuring a plant’s height every week to see how it grows",
        ],
      },
      {
        id: "organising",
        title: "Organising data",
        content: [
          "Organising data means arranging, sorting, and classifying raw data into a logical, usable format. Good organisation helps you find, retrieve, share, and protect files — and avoid losing them.",
          "Four steps to organise data systematically:",
        ],
        bullets: [
          "Classification — grouping similar kinds of data together",
          "Structuring — arranging data into folders or tables",
          "Labelling — giving clear, descriptive names",
          "Storage — saving data in appropriate, secure systems",
          "Example: A student saves 50 images randomly on the desktop and cannot find one for a science project — this shows why organising data matters.",
        ],
      },
      {
        id: "tables",
        title: "Representing data — Tables",
        content: [
          "Representing data means using tables and charts for accurate details and visual comparisons.",
          "Tables arrange data in rows and columns so it is simple to read and find specific values. Each cell holds data; columns show categories and rows show subcategories. Tables are best when exact numbers matter more than trends.",
          "Example — Family Kitchen Menu: A big family has different food preferences. To avoid confusion, meal details are organised in a table with columns: Family Member, Food Item, Drink Item.",
        ],
        bullets: [
          "Grandfather — Chapati and Dal · Warm Milk",
          "Grandmother — Khichdi · Tea",
          "Father — Rice and Curds · Buttermilk",
          "Mother — Salad & Soup · Fresh Juice",
          "Brother — Sandwich · Health Drink",
          "Sister — Spinach Rice · Lemonade",
        ],
      },
      {
        id: "charts",
        title: "Representing data — Charts",
        content: [
          "Charts transform numbers into pictures so you can see patterns, trends, and make quick comparisons.",
          "Data is plotted on axes: the X-axis shows categories and the Y-axis shows values.",
          "Common chart types: bar charts, line graphs, pie charts, scatter plots, and pictograms.",
        ],
      },
      {
        id: "bar-charts",
        title: "Bar charts — The Lemonade business example",
        content: [
          "Bar charts use rectangular bars (vertical or horizontal). The length or height of each bar is proportional to the value. Components: X-axis (categories), Y-axis (values), uniform bar width, and spacing. Bar charts are excellent for comparing discrete categories.",
          "Example: Aana and Sana sell Regular Lemonade, Strawberry Lemonade, and Lemon Cookies at a school fair. They want to know which item sold the most.",
          "Total sales (Monday to Friday): Regular Lemonade — 65 · Strawberry Lemonade — 52 · Lemon Cookies — 78.",
          "Lemon Cookies sold the most! A bar chart with Products on the X-axis and Number Sold on the Y-axis makes this easy to see at a glance.",
        ],
      },
      {
        id: "pictograms",
        title: "Pictograms — The Eco Club example",
        content: [
          "Pictograms use pictures or symbols to represent data quantities. They need a clear title, a key (e.g. 1 tree symbol = 5 trees), and evenly spaced, same-sized symbols. They are fun and easy for simple datasets.",
          "Example: Park Valley School Eco Club held a tree-planting drive. Classes 6–9 participated. Trees planted: Class 6 — 20, Class 7 — 15, Class 8 — 25, Class 9 — 10.",
          "Using the key 🌳 = 5 trees: Class 8 planted the most (5 symbols) and is the winner. Class 6 is 2nd (4 symbols), Class 7 is 3rd (3 symbols), Class 9 is 4th (2 symbols).",
        ],
      },
    ],
    keyPoints: [
      "Data is information we collect — numbers, words, pictures, or sounds — to understand and decide better.",
      "Data can be numerical, text, image, video, or sound.",
      "Data is collected from surveys, observations, schools, hospitals, and weather reports.",
      "Tables use rows and columns; bar charts and pictograms make data easy to compare.",
    ],
  },

  "ai-patterns": {
    learn: [
      {
        id: "overview",
        title: "Introduction — What you will learn",
        content: [
          "Patterns are regular, repeated sequences found in numbers, shapes, colours, actions, and events. This chapter shows how to identify patterns, make observations, draw conclusions, and make better decisions.",
          "All concepts are explained below — read each section before you practise.",
        ],
        bullets: [
          "What is a pattern? · Patterns in daily life · Identifying patterns",
          "Repeated actions · Similarities in data · Observations & conclusions · Decision making",
        ],
      },
      {
        id: "what-is-pattern",
        title: "What is a Pattern?",
        content: [
          "A pattern is a regular, consistent, repeated, or predictable sequence of elements — numbers, shapes, text, colours, or actions.",
          "Patterns are everywhere. In mathematics we see 2, 4, 6, 8. In art we see repetition in designs. In science we see weather cycles. In daily life we see changing seasons and days.",
          "Patterns give us a framework for predicting and understanding behaviour — if you recognise the pattern, you can guess what comes next.",
        ],
      },
      {
        id: "importance",
        title: "Importance of patterns",
        content: [
          "Four key ideas about patterns:",
        ],
        bullets: [
          "Symmetry — a pattern may look the same every time it appears and can be repeated",
          "Series — a group of items (numbers, shapes, events) connected by the same rule, e.g. counting by twos",
          "Predictability — if you see a pattern, you can figure out what happens next",
          "Behaviour — patterns can be visible (stripes, dots) or behavioural (habits, routines)",
        ],
      },
      {
        id: "daily-patterns",
        title: "Patterns in things we do every day",
        content: [
          "You already live with patterns:",
        ],
        bullets: [
          "Routines — waking up, eating breakfast, going to school happen every day",
          "Chores — homework and healthy eating often mean repeating the same actions",
          "Schedules — day/night cycle and changing seasons follow time patterns",
          "Shopping — noticing when stores have sales or restock items",
          "Nature — leaf arrangement on stems, bird migration, spirals in sunflowers",
          "Language — rhyming patterns in songs and poems (e.g. CCDD rhyme schemes)",
        ],
      },
      {
        id: "identifying",
        title: "Identifying patterns — The basketball example",
        content: [
          "Identifying patterns means looking at data or events for sequences, similarities, or trends that follow a rule.",
          "This skill helps with everyday problems and advanced data science — it helps you predict, organise, and decide.",
          "Example: You have a basketball game every Friday. You practise for an hour after school each day and score more points — your game improves. When you skip practice, you score fewer points.",
          "Once you notice this pattern, you know practice helps. Instead of waiting until game day, you practise a little every day. You do not need to guess — you know what works.",
        ],
      },
      {
        id: "repeated-actions",
        title: "Recognising repeated actions or events",
        content: [
          "To recognise repeated actions, look for things that happen again and again or in response to a situation. These repetitions create predictable patterns or habits.",
          "Three methods from the chapter:",
        ],
        bullets: [
          "Observation — watching over a period of time is the most basic method",
          "Time series analysis — studying data collected over time to spot seasons and trends",
          "Data visualisation — using charts and graphs to see repeating sequences clearly",
        ],
      },
      {
        id: "similarities",
        title: "Finding similarities in data",
        content: [
          "Finding similarities means sorting data with similar characteristics. This turns huge, complex datasets into manageable, meaningful groups.",
          "Four methods:",
        ],
        bullets: [
          "Sorting and filtering — arrange data by attributes to reveal groups",
          "Data visualisation — charts make complex datasets easier to understand",
          "Statistical analysis — study large datasets, group similar data, and see how changes in one factor affect another",
          "Machine learning — models trained on data to identify patterns and make predictions",
        ],
      },
      {
        id: "observations",
        title: "Making observations from data",
        content: [
          "Making observations means looking for patterns, trends, and key findings in your data.",
          "What to look for:",
        ],
        bullets: [
          "Key findings — the most important numbers, patterns, or relationships",
          "Repeating patterns — themes or groupings that appear again",
          "Irregularities — anything unusual or unexpected",
          "Visuals — graphs and charts reveal patterns hidden in raw numbers",
          "Example observations: more students present on Tuesday than Monday; temperature higher in the afternoon; more students like cricket than football",
        ],
      },
      {
        id: "conclusions",
        title: "Drawing simple conclusions",
        content: [
          "A conclusion answers the question you were trying to find from the data.",
          "A good conclusion also explains why a pattern appeared, forms a general idea from observations, recognises limits of small data, and suggests what to study next.",
        ],
        bullets: [
          "Observation: “More students like cricket than football.” → Conclusion: “Cricket is the most popular sport in our class survey.”",
          "Observation: “Temperature is higher in the afternoon.” → Conclusion: “Afternoons are usually warmer than mornings.”",
          "Observation: “Sales increased during a discount.” → Conclusion: “More people bought when prices were lower.”",
          "Limit: if you only surveyed one small class, the result may not apply to the whole school.",
        ],
      },
      {
        id: "decision-making",
        title: "Decision making",
        content: [
          "Decision-making means choosing what action to take after thinking carefully about the information available.",
          "In daily life we often choose between two or more options. Good decisions select what is more useful, safe, or beneficial. Understanding the situation before deciding leads to better results.",
          "We make decisions by observing what happens around us. Past observations show which choices worked and which did not — helping us avoid repeating mistakes.",
        ],
        bullets: [
          "Revise a subject again after observing low marks in a test",
          "Carry an umbrella after observing cloudy skies",
          "Choose a quieter road after seeing heavy traffic on another route",
          "Save money after observing increased monthly expenses",
        ],
      },
    ],
    keyPoints: [
      "A pattern is a regular, repeated, or predictable sequence of elements.",
      "Identifying patterns means looking for sequences and similarities in data or events.",
      "Observations note what you see; conclusions answer your question using those observations.",
      "Decision-making means choosing an action after thinking about available information.",
    ],
  },

  "ai-ethics": {
    learn: [
      {
        id: "overview",
        title: "Introduction — What you will learn",
        content: [
          "Technology helps us learn, communicate, and explore — but we must use it responsibly, just as we follow rules on the road and in school.",
          "This chapter covers digital responsibility, ethics, online safety, unethical practices, and your digital footprint. Read every section here — no other material is needed.",
        ],
        bullets: [
          "Responsible technology use · Ethics · Arjun’s internet safety story",
          "Plagiarism, hacking, phishing, spamming, privacy, piracy · Digital footprints · Good online behaviour",
        ],
      },
      {
        id: "digital-responsibility",
        title: "Responsible use of technology",
        content: [
          "Technology is used in communication, education, entertainment, and financial transactions. It makes many things easier:",
          "Students learn difficult subjects through educational videos. Families in different cities talk via video calls. Phones help contact police or doctors in emergencies.",
          "But the internet can be dangerous if we are not careful. Digital responsibility means thinking before you click, being careful about what you share, and being respectful to others online.",
          "When we use technology wisely and politely, we become responsible digital citizens who keep ourselves and others safe.",
        ],
      },
      {
        id: "ethics",
        title: "What is Ethics?",
        content: [
          "Ethics means knowing what is right and wrong and choosing to do what is right.",
          "If you find a lost pencil box in class, you return it to the owner. If a friend is upset, you try to help — not laugh. These are ethical choices.",
          "Ethics are principles that guide responsible choices. Ethical behaviour includes honesty, respect for others, and taking responsibility for your actions.",
          "Computer ethics are rules for using computers safely. They matter because of problems like cybercrimes, plagiarism, hacking, and password theft. Following computer ethics creates a secure computing environment.",
        ],
      },
      {
        id: "arjun-story",
        title: "Internet safety — Arjun’s story (read carefully)",
        content: [
          "Arjun was a Class 6 student who loved computers and thought he knew everything about them.",
          "His teacher gave a project on Save Water. Arjun wanted to finish quickly to play games. He found an essay online, copied it, changed a few words, and submitted it. “Done! Now I can play games,” he said.",
          "The next day he got an email that looked like it came from his favourite gaming website: “CONGRATULATIONS ARJUN! You have won a free game. Click here to claim it now.” Excited, he clicked the link.",
          "Suddenly a pop-up appeared: “WARNING! Your computer has a virus. Click here to scan for free.” He clicked again just to make it go away.",
          "One week later his computer was terribly slow. His project folder was empty — all files gone. Strange messages had been posted from his social media account.",
          "Arjun had made serious mistakes: plagiarising work, clicking suspicious links, and not telling an adult. Always create your own work, never click unknown links, and ask a parent or teacher when something feels wrong.",
        ],
      },
      {
        id: "plagiarism-hacking",
        title: "Unethical practices — Plagiarism & Hacking",
        content: [
          "Plagiarism is copying or slightly changing someone else’s work without crediting the original author.",
        ],
        bullets: [
          "Prevent plagiarism — get permission when needed; acknowledge the original author; use quotation marks for exact text; express ideas in your own words",
          "Hacking is unauthorised access to computer systems or networks to steal, modify, or misuse data",
          "Prevent hacking — install firewall and antivirus; scan drives regularly; never share passwords; use strong passwords (numbers, symbols, upper and lower case) and change them periodically; do not click ads claiming to scan viruses; turn off Bluetooth when not needed; be careful on public Wi-Fi",
        ],
      },
      {
        id: "phishing-spamming",
        title: "Unethical practices — Phishing & Spamming",
        content: [
          "Phishing is an illegal attempt to obtain confidential information (usernames, passwords, bank details) through fake emails, texts, or websites that look authentic. It is also called spoofing.",
          "Spamming is sending unwanted junk mail or messages in bulk through email, social media, or websites.",
        ],
        bullets: [
          "Prevent phishing — do not click suspicious links or attachments; check the sender’s email carefully; beware of urgent requests for personal or bank information",
          "Prevent spamming — do not click suspicious pop-up ads; avoid sharing your email on unknown sites; use spam filters; do not open emails from unknown senders",
        ],
      },
      {
        id: "privacy-piracy",
        title: "Unethical practices — Privacy, piracy & intellectual property",
        content: [
          "Individual right to privacy means you control how your personal information is accessed and used. Problems arise when information is shared without consent.",
          "Software piracy is unauthorised copying, sharing, or use of software. It is illegal and punishable.",
          "Intellectual property protects creators’ work — authors, inventors, and artists own exclusive rights for a period through copyright, trademarks, and patents.",
        ],
        bullets: [
          "Protect privacy — limit personal posts on social media; never share passwords or bank details; read privacy policies before signing up",
          "Stop software piracy — buy licensed software; do not distribute copies; download only from official sources",
          "Protect intellectual property — keep business ideas confidential; apply for trademarks; copyright your work; patent inventions",
        ],
      },
      {
        id: "digital-footprint",
        title: "Digital footprint",
        content: [
          "Like footprints on sand at a beach, you leave a trail when you use the internet. Your digital footprint includes posts, likes, searches, shopping records, feedback on news, and data websites collect through cookies.",
          "It may include your IP address, email details, and other sensitive information. Data others share about you can also become part of your digital record.",
        ],
        bullets: [
          "Active digital footprints — data you leave through intentional choices: posting online, filling signup forms, accepting cookies when a browser asks",
          "Passive digital footprints — data left unintentionally: cookies installed without your knowledge, apps using your location, ads based on your likes and comments (why your phone sometimes shows ads for things you talked about)",
          "Protect your footprint — think before posting; do not share full name, address, phone, or school with strangers; use privacy settings; remember online content can be permanent; never share others’ photos without consent; share kind, helpful content to build a positive footprint",
        ],
      },
      {
        id: "good-behaviour",
        title: "Good digital behaviour — Rules to follow",
        content: [
          "Good digital behaviour keeps you safe and respectful online:",
        ],
        bullets: [
          "Never share personal information with strangers without a parent’s permission",
          "Do not share passwords with anyone except parents; always log out on public computers",
          "Do not post photos or videos without parents’ consent",
          "Be careful if someone offers gifts or money online or asks to meet you",
          "Tell parents immediately if messages make you uncomfortable or you see harmful content",
          "Do not illegally download music, movies, or software",
          "Avoid banking or checking email on public Wi-Fi in airports, cafés, or malls — use a secure network",
          "Install antivirus and firewall software; scan devices regularly",
        ],
      },
    ],
    keyPoints: [
      "Think before you click; be careful what you share; be courteous online.",
      "Never give personal information to strangers without a guardian’s permission.",
      "Do not post photos or videos without parents’ consent.",
      "Install antivirus and firewall; scan devices weekly.",
      "Ethics are values that do not harm others.",
    ],
  },
};
