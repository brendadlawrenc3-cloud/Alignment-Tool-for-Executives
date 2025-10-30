// Assessment Logic and Scoring

// Start the assessment
function startAssessment() {
    document.getElementById('landing-page').classList.remove('active');
    document.getElementById('assessment-page').classList.add('active');
    window.scrollTo(0, 0);
    updateProgress();
}

// Track progress as user answers questions
function updateProgress() {
    const form = document.getElementById('assessment-form');
    const totalQuestions = 30;
    let answeredQuestions = 0;

    // Count answered questions
    for (let i = 1; i <= totalQuestions; i++) {
        const question = form.querySelector(`input[name="q${i}"]:checked`);
        if (question) {
            answeredQuestions++;
        }
    }

    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const percentage = (answeredQuestions / totalQuestions) * 100;

    progressBar.style.width = percentage + '%';
    progressText.textContent = `Question ${answeredQuestions} of ${totalQuestions} answered`;
}

// Listen for changes to update progress
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('assessment-form');
    if (form) {
        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', updateProgress);
        });

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateAndSaveResults();
        });
    }
});

// Calculate scores and save to localStorage
function calculateAndSaveResults() {
    const form = document.getElementById('assessment-form');

    // Validate all questions are answered
    for (let i = 1; i <= 30; i++) {
        const answer = form.querySelector(`input[name="q${i}"]:checked`);
        if (!answer) {
            alert(`Please answer all questions before submitting. Question ${i} is unanswered.`);
            return;
        }
    }

    // Calculate dimension scores
    const dimensions = {
        strategic: { name: 'Strategic Alignment', questions: [1, 2, 3, 4, 5, 6], score: 0 },
        roles: { name: 'Role Clarity', questions: [7, 8, 9, 10, 11, 12], score: 0 },
        decisions: { name: 'Decision-Making & Accountability', questions: [13, 14, 15, 16, 17, 18], score: 0 },
        culture: { name: 'Culture & Values', questions: [19, 20, 21, 22, 23, 24], score: 0 },
        execution: { name: 'Execution & Metrics', questions: [25, 26, 27, 28, 29, 30], score: 0 }
    };

    // Calculate scores for each dimension
    for (const [key, dimension] of Object.entries(dimensions)) {
        let total = 0;
        dimension.questions.forEach(qNum => {
            const answer = form.querySelector(`input[name="q${qNum}"]:checked`);
            total += parseInt(answer.value);
        });
        dimension.score = (total / dimension.questions.length).toFixed(2);
    }

    // Calculate overall score
    const overallScore = Object.values(dimensions).reduce((sum, dim) => sum + parseFloat(dim.score), 0) / 5;

    // Prepare results object
    const results = {
        dimensions: dimensions,
        overallScore: overallScore.toFixed(2),
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('alignmentResults', JSON.stringify(results));

    // Navigate to results page
    window.location.href = 'results.html';
}

// Get rating category
function getRatingCategory(score) {
    if (score >= 4.0) return { label: 'Strong Alignment', color: 'green', icon: '🟢' };
    if (score >= 3.0) return { label: 'Moderate - Room for Improvement', color: 'yellow', icon: '🟡' };
    return { label: 'Needs Immediate Attention', color: 'red', icon: '🔴' };
}

// Get percentile based on score
function getPercentile(score) {
    if (score >= 4.2) return 90;
    if (score >= 4.0) return 80;
    if (score >= 3.8) return 70;
    if (score >= 3.5) return 60;
    if (score >= 3.2) return 50;
    if (score >= 3.0) return 40;
    if (score >= 2.7) return 30;
    if (score >= 2.5) return 20;
    return 10;
}
