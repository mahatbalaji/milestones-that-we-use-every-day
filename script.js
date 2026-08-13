// API Configuration
const API_CONFIG = {
    endpoint: 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-vibe-summer-2026'
    },
    model: 'class-chat-model'
};

// Age-appropriate topics for each age group
const topicsByAge = {
    '8-10': [
        'How are pencils made?',
        'How is paper manufactured?',
        'How are crayons created?',
        'How is bread baked?',
        'How are shoes made?'
    ],
    '11-13': [
        'How are smartphones manufactured?',
        'How is chocolate made from beans?',
        'How are computers built?',
        'How is electricity generated?',
        'How are video games created?'
    ],
    '14-16': [
        'How are electric vehicles designed and built?',
        'How is artificial intelligence developed?',
        'How are renewable energy systems created?',
        'How are medicines developed and tested?',
        'How are aircraft engineered?'
    ],
    '17-18': [
        'How does quantum computing work?',
        'How are vaccines developed using biotechnology?',
        'How are neural networks trained?',
        'How is renewable energy infrastructure built?',
        'How are advanced prosthetics engineered?'
    ]
};

// DOM Elements
const ageGroupSelect = document.getElementById('ageGroup');
const getRecommendationsBtn = document.getElementById('getRecommendationsBtn');
const recommendationsBox = document.getElementById('recommendations');
const recommendationsList = document.getElementById('recommendationsList');

const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const stage4 = document.getElementById('stage4');

const selectedMilestoneSpan = document.getElementById('selectedMilestone');
const proceedToWriteBtn = document.getElementById('proceedToWriteBtn');
const proceedToPolishBtn = document.getElementById('proceedToPolishBtn');
const downloadBtn = document.getElementById('downloadBtn');
const startOverBtn = document.getElementById('startOverBtn');
const rerollBtn = document.getElementById('rerollBtn');

const outlineLoading = document.getElementById('outlineLoading');
const outlineDisplay = document.getElementById('outlineDisplay');
const outlineContent = document.getElementById('outlineContent');

const writingLoading = document.getElementById('writingLoading');
const writingDisplay = document.getElementById('writingDisplay');
const writingContent = document.getElementById('writingContent');

const polishLoading = document.getElementById('polishLoading');
const polishDisplay = document.getElementById('polishDisplay');
const polishContent = document.getElementById('polishContent');

// State Variables
let currentAgeGroup = '';
let selectedTopic = '';
let currentOutline = '';
let currentWriting = '';
let isInitialRecommendations = true;

// Event Listeners
ageGroupSelect.addEventListener('change', (e) => {
    currentAgeGroup = e.target.value;
    getRecommendationsBtn.disabled = !currentAgeGroup;
});

getRecommendationsBtn.addEventListener('click', displayRecommendations);
rerollBtn.addEventListener('click', generateMoreRecommendations);
proceedToWriteBtn.addEventListener('click', generateWriting);
proceedToPolishBtn.addEventListener('click', generatePolish);
downloadBtn.addEventListener('click', downloadArticle);
startOverBtn.addEventListener('click', startOver);

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to display recommendations
function displayRecommendations() {
    const topics = [...topicsByAge[currentAgeGroup]]; // Create a copy
    shuffleArray(topics); // Shuffle the topics for variety
    recommendationsList.innerHTML = '';

    topics.forEach((topic) => {
        const div = document.createElement('div');
        div.className = 'recommendation-item';
        div.innerHTML = `
            <div class="recommendation-item-text">
                <strong>${topic}</strong>
                <small>Click to learn more about this milestone</small>
            </div>
            <span class="arrow">→</span>
        `;
        div.addEventListener('click', () => selectMilestone(topic));
        recommendationsList.appendChild(div);
    });

    recommendationsBox.style.display = 'block';
}

// Function to generate more recommendations from LLM
async function generateMoreRecommendations() {
    rerollBtn.disabled = true;
    rerollBtn.innerHTML = '⏳ Generating new ideas...';

    try {
        const ageRange = currentAgeGroup.split('-');
        const prompt = `You are an educational content expert. Generate 5 creative, age-appropriate milestone topics (how things are made or how processes work) for ${ageRange[0]}-${ageRange[1]} year-old students.

The topics should be:
- Interesting and engaging for this age group
- Educational and appropriate for their learning level
- Different from typical school topics (be creative!)
- Formatted as simple questions like "How are X made?" or "How does X work?"

Return ONLY the 5 topics, one per line, without numbering or extra text. For example:
How are video games created?
How is renewable energy generated?`;

        const result = await callAPI(prompt);
        
        // Parse the response into individual topics
        const newTopics = result
            .split('\n')
            .map(topic => topic.trim())
            .filter(topic => topic.length > 0)
            .slice(0, 5); // Ensure we only get 5 topics

        // Clear and display new topics
        recommendationsList.innerHTML = '';
        
        newTopics.forEach((topic) => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.innerHTML = `
                <div class="recommendation-item-text">
                    <strong>${topic}</strong>
                    <small>Click to learn more about this milestone</small>
                </div>
                <span class="arrow">→</span>
            `;
            div.addEventListener('click', () => selectMilestone(topic));
            recommendationsList.appendChild(div);
        });

        rerollBtn.disabled = false;
        rerollBtn.innerHTML = '🔄 Get More Recommendations';
    } catch (error) {
        console.error('Error generating recommendations:', error);
        rerollBtn.disabled = false;
        rerollBtn.innerHTML = '🔄 Get More Recommendations';
        rerollBtn.textContent = '❌ Error - Try Again';
        setTimeout(() => {
            rerollBtn.innerHTML = '🔄 Get More Recommendations';
        }, 3000);
    }
}

// Function to select a milestone and proceed to stage 2
function selectMilestone(topic) {
    selectedTopic = topic;
    selectedMilestoneSpan.textContent = topic;

    // Hide stage 1, show stage 2
    stage1.classList.remove('active');
    stage2.style.display = 'block';
    stage2.classList.add('active');

    // Generate outline
    generateOutline();
}

// Function to call the API
async function callAPI(userMessage) {
    try {
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [
                    { role: 'user', content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Stage 2: Generate Outline
async function generateOutline() {
    outlineLoading.style.display = 'block';
    outlineDisplay.style.display = 'none';

    try {
        const prompt = `You are Agent 2, a content outline creator. Create a detailed outline for an educational article about: "${selectedTopic}". 

The outline should be age-appropriate for ${currentAgeGroup.split('-')[0]}-${currentAgeGroup.split('-')[1]} year-olds.

Format the outline with:
- Main Topic
- Introduction (what will be covered)
- 3-4 main sections with subtopics
- Conclusion
- Fun Fact section

Keep it concise but informative.`;

        const result = await callAPI(prompt);
        currentOutline = result;

        outlineContent.innerHTML = `<pre style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(result)}</pre>`;
        outlineLoading.style.display = 'none';
        outlineDisplay.style.display = 'block';
    } catch (error) {
        outlineLoading.innerHTML = `<p style="color: red;">Error generating outline. Please try again.</p>`;
    }
}

// Stage 3: Generate Writing
async function generateWriting() {
    stage2.classList.remove('active');
    stage3.style.display = 'block';
    stage3.classList.add('active');

    writingLoading.style.display = 'block';
    writingDisplay.style.display = 'none';

    try {
        const prompt = `You are Agent 3, a professional writer. Write a complete, engaging educational article based on this outline:

${currentOutline}

Topic: ${selectedTopic}
Target Age Group: ${currentAgeGroup}

Requirements:
- Write in clear, easy-to-understand language
- Use engaging storytelling
- Make it informative but fun
- Include interesting facts and examples
- Keep paragraphs short and readable
- Make it age-appropriate

Write the full article now:`;

        const result = await callAPI(prompt);
        currentWriting = result;

        writingContent.innerHTML = `<div style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(result)}</div>`;
        writingLoading.style.display = 'none';
        writingDisplay.style.display = 'block';
    } catch (error) {
        writingLoading.innerHTML = `<p style="color: red;">Error generating article. Please try again.</p>`;
    }
}

// Stage 4: Polish Writing
async function generatePolish() {
    stage3.classList.remove('active');
    stage4.style.display = 'block';
    stage4.classList.add('active');

    polishLoading.style.display = 'block';
    polishDisplay.style.display = 'none';

    try {
        const prompt = `You are Agent 4, a professional editor and writing polish expert. Review and improve this article:

${currentWriting}

Your tasks:
1. Fix any spelling or grammar errors
2. Improve the flow and readability
3. Ensure consistency in tone and voice
4. Make sure it's engaging for ages ${currentAgeGroup.split('-')[0]}-${currentAgeGroup.split('-')[1]}
5. Add better transitions between paragraphs
6. Enhance vocabulary where appropriate
7. Ensure all facts are clear and accurate

Return the polished, final version of the article:`;

        const result = await callAPI(prompt);

        polishContent.innerHTML = `<div style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(result)}</div>`;
        polishLoading.style.display = 'none';
        polishDisplay.style.display = 'block';
    } catch (error) {
        polishLoading.innerHTML = `<p style="color: red;">Error polishing article. Please try again.</p>`;
    }
}

// Download Article
function downloadArticle() {
    const text = polishContent.textContent;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `${selectedTopic.replace(/\s+/g, '_')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Start Over
function startOver() {
    // Reset variables
    currentAgeGroup = '';
    selectedTopic = '';
    currentOutline = '';
    currentWriting = '';
    isInitialRecommendations = true;

    // Reset form
    ageGroupSelect.value = '';
    getRecommendationsBtn.disabled = true;
    recommendationsBox.style.display = 'none';

    // Show stage 1, hide others
    stage1.classList.add('active');
    stage2.style.display = 'none';
    stage3.style.display = 'none';
    stage4.style.display = 'none';

    stage2.classList.remove('active');
    stage3.classList.remove('active');
    stage4.classList.remove('active');
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
console.log('Stones That Go For Miles - Ready to discover everyday milestones!');
