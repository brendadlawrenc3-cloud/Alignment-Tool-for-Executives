// Results Display and PDF Generation

// Load and display results when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadResults();
});

// Load results from localStorage
function loadResults() {
    const resultsData = localStorage.getItem('alignmentResults');

    if (!resultsData) {
        alert('No assessment results found. Please complete the assessment first.');
        window.location.href = 'index.html';
        return;
    }

    const results = JSON.parse(resultsData);
    displayResults(results);
}

// Display all results
function displayResults(results) {
    // Display overall score
    displayOverallScore(results.overallScore);

    // Display dimension scores
    displayDimensionScores(results.dimensions);

    // Display insights and recommendations
    displayInsights(results);

    // Display action steps
    displayActionSteps(results);
}

// Display overall score
function displayOverallScore(score) {
    const scoreNum = parseFloat(score);
    const category = getRatingCategory(scoreNum);
    const percentile = getPercentile(scoreNum);

    document.getElementById('overall-score').textContent = scoreNum.toFixed(1);
    document.getElementById('overall-label').textContent = category.icon + ' ' + category.label;
    document.getElementById('overall-label').className = 'score-label ' + category.color;
    document.getElementById('percentile-text').textContent = `You're in the ${percentile}th percentile of executive teams`;

    // Update benchmark section
    document.getElementById('your-score-benchmark').textContent = scoreNum.toFixed(1);

    let positionText = '';
    if (scoreNum >= 4.2) {
        positionText = 'Congratulations! You\'re among the top performers';
    } else if (scoreNum >= 3.2) {
        positionText = 'Above average alignment with room to reach elite status';
    } else if (scoreNum >= 3.0) {
        positionText = 'In the average range with significant opportunity';
    } else {
        positionText = 'Below average - immediate action recommended';
    }
    document.getElementById('your-position').textContent = positionText;
}

// Display dimension scores
function displayDimensionScores(dimensions) {
    const container = document.getElementById('dimension-cards');
    container.innerHTML = '';

    for (const [key, dimension] of Object.entries(dimensions)) {
        const scoreNum = parseFloat(dimension.score);
        const category = getRatingCategory(scoreNum);

        const card = document.createElement('div');
        card.className = 'dimension-card';
        card.innerHTML = `
            <h3>${dimension.name}</h3>
            <div class="dimension-score ${category.color}">
                <span class="score-number">${scoreNum.toFixed(1)}</span>
                <span class="score-icon">${category.icon}</span>
            </div>
            <div class="dimension-label">${category.label}</div>
            <div class="dimension-bar">
                <div class="dimension-bar-fill ${category.color}" style="width: ${(scoreNum / 5) * 100}%"></div>
            </div>
        `;
        container.appendChild(card);
    }
}

// Display insights
function displayInsights(results) {
    const container = document.getElementById('insights-content');
    const dimensions = results.dimensions;
    const overallScore = parseFloat(results.overallScore);

    let insights = '';

    // Find strengths and weaknesses
    const dimensionScores = Object.entries(dimensions).map(([key, dim]) => ({
        key: key,
        name: dim.name,
        score: parseFloat(dim.score)
    })).sort((a, b) => b.score - a.score);

    const strongest = dimensionScores[0];
    const weakest = dimensionScores[dimensionScores.length - 1];

    // Overall assessment
    if (overallScore >= 4.2) {
        insights += `
            <div class="insight-card success">
                <h3>🎯 Exceptional Alignment</h3>
                <p>Your leadership team demonstrates outstanding alignment across all dimensions. You're in the top 10% of executive teams. Focus on maintaining this excellence and continuing to model these behaviors throughout your organization.</p>
            </div>
        `;
    } else if (overallScore >= 3.5) {
        insights += `
            <div class="insight-card good">
                <h3>✅ Solid Foundation</h3>
                <p>Your team has good alignment with room to reach elite status. With focused effort on your lower-scoring dimensions, you can join the top-performing teams.</p>
            </div>
        `;
    } else if (overallScore >= 3.0) {
        insights += `
            <div class="insight-card warning">
                <h3>⚠️ Moderate Alignment</h3>
                <p>Your team is in the average range. While you have some aligned areas, addressing gaps in lower-scoring dimensions will significantly improve your team's effectiveness and execution capability.</p>
            </div>
        `;
    } else {
        insights += `
            <div class="insight-card alert">
                <h3>🚨 Critical Gaps</h3>
                <p>Your team faces significant alignment challenges that are likely impacting growth and execution. Immediate, focused intervention is recommended. Consider bringing in a facilitator to help address these gaps systematically.</p>
            </div>
        `;
    }

    // Strength insight
    insights += `
        <div class="insight-card">
            <h3>💪 Your Greatest Strength: ${strongest.name}</h3>
            <p>With a score of <strong>${strongest.score.toFixed(1)}</strong>, this is your team's strongest area. Leverage this strength and use it as a model for improving other dimensions. ${getStrengthInsight(strongest.key)}</p>
        </div>
    `;

    // Weakness insight
    if (weakest.score < 4.0) {
        insights += `
            <div class="insight-card">
                <h3>🎯 Priority Opportunity: ${weakest.name}</h3>
                <p>With a score of <strong>${weakest.score.toFixed(1)}</strong>, this dimension needs the most attention. ${getWeaknessInsight(weakest.key)}</p>
            </div>
        `;
    }

    container.innerHTML = insights;
}

// Get strength-specific insight
function getStrengthInsight(dimension) {
    const insights = {
        strategic: 'Your clear strategic alignment provides a strong foundation. Use this to drive alignment in other areas by consistently connecting decisions back to strategy.',
        roles: 'Your clarity on roles and responsibilities is excellent. This should make it easier to improve decision-making and accountability.',
        decisions: 'Your strong decision-making processes are a competitive advantage. Ensure these practices cascade throughout the organization.',
        culture: 'Your cultural alignment at the leadership level is exemplary. This is critical for scaling successfully—continue to model and reinforce these behaviors.',
        execution: 'Your execution discipline and metrics alignment are strong. This operational excellence can drive improvements in strategic and cultural alignment.'
    };
    return insights[dimension] || '';
}

// Get weakness-specific insight
function getWeaknessInsight(dimension) {
    const insights = {
        strategic: 'Start by facilitating a strategy alignment workshop. Ensure every executive can articulate the vision, priorities, and how their function supports strategic goals. Consider creating a one-page strategic plan that everyone commits to.',
        roles: 'Invest time in clarifying decision rights and responsibilities. Use a RACI matrix or similar framework to document who does what. Address overlaps and gaps explicitly in your next leadership offsite.',
        decisions: 'Implement a clear decision-making framework (like RAPID or DACI). Practice "disagree and commit" behaviors. Hold each other accountable for follow-through. Consider bringing in a coach to help with difficult conversations.',
        culture: 'Start by defining your desired culture explicitly as a team. Identify specific behaviors you want to see more of and less of. Hold each other accountable to modeling these behaviors. Cultural alignment starts at the top.',
        execution: 'Establish clear, shared metrics and KPIs. Implement a regular rhythm of review meetings. Ensure individual goals ladder up to company objectives. Consider an OKR framework or similar system to drive alignment.'
    };
    return insights[dimension] || '';
}

// Display action steps
function displayActionSteps(results) {
    const container = document.getElementById('action-steps');
    const dimensions = results.dimensions;
    const overallScore = parseFloat(results.overallScore);

    // Get dimensions that need attention (score < 4.0)
    const needsAttention = Object.entries(dimensions)
        .filter(([key, dim]) => parseFloat(dim.score) < 4.0)
        .sort((a, b) => parseFloat(a[1].score) - parseFloat(b[1].score))
        .slice(0, 3);

    let steps = '<div class="action-steps-list">';

    // Immediate actions
    steps += '<div class="action-step"><div class="step-number">1</div><div class="step-content">';
    steps += '<h3>📋 Share Results with Your Team</h3>';
    steps += '<p>Schedule a dedicated session to review these results as a leadership team. Create psychological safety for honest discussion about the scores and what they mean.</p>';
    steps += '</div></div>';

    steps += '<div class="action-step"><div class="step-number">2</div><div class="step-content">';
    steps += '<h3>🎯 Prioritize Your Focus Areas</h3>';
    steps += '<p>As a team, agree on 1-2 dimensions to focus on first. Don\'t try to fix everything at once. ';
    if (needsAttention.length > 0) {
        steps += `Based on your scores, consider starting with <strong>${needsAttention[0][1].name}</strong>.`;
    }
    steps += '</p></div></div>';

    steps += '<div class="action-step"><div class="step-number">3</div><div class="step-content">';
    steps += '<h3>📝 Create Action Plans</h3>';
    steps += '<p>For each priority dimension, define specific, measurable actions with owners and timelines. Make these commitments visible and review progress regularly.</p>';
    steps += '</div></div>';

    steps += '<div class="action-step"><div class="step-number">4</div><div class="step-content">';
    steps += '<h3>🔄 Establish Regular Check-ins</h3>';
    steps += '<p>Schedule monthly or quarterly alignment check-ins. Consider retaking this assessment in 6 months to measure progress and identify new areas for improvement.</p>';
    steps += '</div></div>';

    if (overallScore < 3.5) {
        steps += '<div class="action-step"><div class="step-number">5</div><div class="step-content">';
        steps += '<h3>👥 Consider External Facilitation</h3>';
        steps += '<p>Given your current scores, you may benefit from working with an experienced executive coach or facilitator to help navigate these alignment challenges.</p>';
        steps += '</div></div>';
    }

    steps += '</div>';
    container.innerHTML = steps;
}

// Helper functions
function getRatingCategory(score) {
    if (score >= 4.0) return { label: 'Strong Alignment', color: 'green', icon: '🟢' };
    if (score >= 3.0) return { label: 'Moderate', color: 'yellow', icon: '🟡' };
    return { label: 'Needs Attention', color: 'red', icon: '🔴' };
}

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

// PDF Generation
function downloadPDF() {
    const resultsData = localStorage.getItem('alignmentResults');
    if (!resultsData) {
        alert('No results to download');
        return;
    }

    const results = JSON.parse(resultsData);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('Executive Alignment Scorecard', 105, 20, { align: 'center' });

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const date = new Date(results.timestamp).toLocaleDateString();
    doc.text(`Assessment Date: ${date}`, 105, 28, { align: 'center' });

    // Overall Score
    doc.setFontSize(16);
    doc.setTextColor(44, 62, 80);
    doc.text('Overall Alignment Score', 20, 45);

    doc.setFontSize(36);
    const overallScore = parseFloat(results.overallScore);
    const category = getRatingCategory(overallScore);

    if (category.color === 'green') doc.setTextColor(46, 204, 113);
    else if (category.color === 'yellow') doc.setTextColor(241, 196, 15);
    else doc.setTextColor(231, 76, 60);

    doc.text(overallScore.toFixed(1), 20, 60);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(category.label, 20, 68);

    // Dimension Scores
    doc.setFontSize(16);
    doc.setTextColor(44, 62, 80);
    doc.text('Dimension Scores', 20, 85);

    let yPosition = 95;
    doc.setFontSize(11);

    for (const [key, dimension] of Object.entries(results.dimensions)) {
        const score = parseFloat(dimension.score);
        const dimCategory = getRatingCategory(score);

        doc.setTextColor(44, 62, 80);
        doc.text(dimension.name, 20, yPosition);

        if (dimCategory.color === 'green') doc.setTextColor(46, 204, 113);
        else if (dimCategory.color === 'yellow') doc.setTextColor(241, 196, 15);
        else doc.setTextColor(231, 76, 60);

        doc.text(score.toFixed(1), 120, yPosition);
        doc.text(dimCategory.icon, 135, yPosition);

        yPosition += 10;
    }

    // Benchmarking
    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(44, 62, 80);
    doc.text('Benchmarking', 20, yPosition);

    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);

    const percentile = getPercentile(overallScore);
    doc.text(`Your team is in the ${percentile}th percentile of executive teams`, 20, yPosition);

    yPosition += 8;
    doc.text('Top Performers: 4.2+ | Average Teams: 3.1-3.2 | Your Score: ' + overallScore.toFixed(1), 20, yPosition);

    // Key Recommendations
    yPosition += 15;
    doc.setFontSize(16);
    doc.setTextColor(44, 62, 80);
    doc.text('Key Recommendations', 20, yPosition);

    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    const dimensionScores = Object.entries(results.dimensions).map(([key, dim]) => ({
        key: key,
        name: dim.name,
        score: parseFloat(dim.score)
    })).sort((a, b) => a.score - b.score);

    const weakest = dimensionScores[0];

    const recommendations = [
        '1. Share these results with your leadership team in a dedicated session',
        `2. Focus immediate attention on: ${weakest.name} (score: ${weakest.score.toFixed(1)})`,
        '3. Create specific action plans with owners and timelines',
        '4. Establish monthly check-ins to track progress',
        '5. Retake this assessment in 6 months to measure improvement'
    ];

    recommendations.forEach(rec => {
        const lines = doc.splitTextToSize(rec, 170);
        lines.forEach(line => {
            doc.text(line, 20, yPosition);
            yPosition += 6;
        });
        yPosition += 2;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Executive Alignment Scorecard | For internal use only', 105, 285, { align: 'center' });

    // Save PDF
    doc.save('Executive-Alignment-Scorecard.pdf');
}
