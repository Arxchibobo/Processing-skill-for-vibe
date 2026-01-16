/**
 * Data Visualization Patterns
 * Animated charts and data displays
 *
 * Great for: Dashboards, presentations, reports
 */

// ============================================
// BAR CHART WITH ANIMATION
// ============================================

const barChartConfig = {
  data: [65, 59, 80, 81, 56, 55, 40, 72, 88, 64],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
           '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
  padding: 60,
  animationSpeed: 0.03
};

let barAnimProgress = 0;

function drawBarChart(p5, config = barChartConfig) {
  const { data, labels, colors, padding, animationSpeed } = config;

  barAnimProgress = Math.min(barAnimProgress + animationSpeed, 1);

  const chartWidth = p5.width - padding * 2;
  const chartHeight = p5.height - padding * 2;
  const barWidth = chartWidth / (data.length * 1.5);
  const maxVal = Math.max(...data);

  p5.push();
  p5.translate(padding, p5.height - padding);

  // Draw axes
  p5.stroke(100);
  p5.strokeWeight(2);
  p5.line(0, 0, chartWidth, 0); // X axis
  p5.line(0, 0, 0, -chartHeight); // Y axis

  // Draw bars
  for (let i = 0; i < data.length; i++) {
    const x = i * (chartWidth / data.length) + barWidth / 2;
    const targetHeight = (data[i] / maxVal) * chartHeight;
    const currentHeight = targetHeight * easeOutQuart(barAnimProgress);

    // Bar
    p5.noStroke();
    p5.fill(colors[i % colors.length]);
    p5.rect(x, 0, barWidth, -currentHeight, 4, 4, 0, 0);

    // Value label
    p5.fill(255);
    p5.textAlign(p5.CENTER);
    p5.textSize(12);
    p5.text(Math.floor(data[i] * easeOutQuart(barAnimProgress)), x + barWidth / 2, -currentHeight - 10);

    // X axis label
    p5.fill(150);
    p5.text(labels[i], x + barWidth / 2, 20);
  }

  p5.pop();
}

// ============================================
// LINE CHART WITH ANIMATION
// ============================================

const lineChartConfig = {
  datasets: [
    { data: [30, 45, 28, 60, 80, 65, 90], color: '#36A2EB', label: 'Series A' },
    { data: [20, 35, 45, 50, 55, 70, 60], color: '#FF6384', label: 'Series B' }
  ],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  padding: 60,
  showPoints: true,
  showArea: true,
  areaOpacity: 30
};

let lineAnimProgress = 0;

function drawLineChart(p5, config = lineChartConfig) {
  const { datasets, labels, padding, showPoints, showArea, areaOpacity } = config;

  lineAnimProgress = Math.min(lineAnimProgress + 0.02, 1);

  const chartWidth = p5.width - padding * 2;
  const chartHeight = p5.height - padding * 2;
  const allData = datasets.flatMap(d => d.data);
  const maxVal = Math.max(...allData);
  const stepX = chartWidth / (labels.length - 1);

  p5.push();
  p5.translate(padding, padding);

  // Draw grid
  p5.stroke(50);
  p5.strokeWeight(1);
  for (let i = 0; i <= 5; i++) {
    const y = (chartHeight / 5) * i;
    p5.line(0, y, chartWidth, y);
  }

  // Draw each dataset
  for (const dataset of datasets) {
    const points = [];

    // Calculate points
    for (let i = 0; i < dataset.data.length; i++) {
      const progress = Math.min(lineAnimProgress * dataset.data.length, i + 1);
      if (progress >= i) {
        const x = i * stepX;
        const y = chartHeight - (dataset.data[i] / maxVal) * chartHeight * Math.min(progress - i, 1);
        points.push({ x, y });
      }
    }

    // Draw area
    if (showArea && points.length > 1) {
      p5.noStroke();
      const c = p5.color(dataset.color);
      c.setAlpha(areaOpacity);
      p5.fill(c);
      p5.beginShape();
      p5.vertex(points[0].x, chartHeight);
      for (const pt of points) {
        p5.vertex(pt.x, pt.y);
      }
      p5.vertex(points[points.length - 1].x, chartHeight);
      p5.endShape(p5.CLOSE);
    }

    // Draw line
    p5.stroke(dataset.color);
    p5.strokeWeight(3);
    p5.noFill();
    p5.beginShape();
    for (const pt of points) {
      p5.vertex(pt.x, pt.y);
    }
    p5.endShape();

    // Draw points
    if (showPoints) {
      p5.fill(dataset.color);
      p5.noStroke();
      for (const pt of points) {
        p5.ellipse(pt.x, pt.y, 10, 10);
      }
    }
  }

  // X axis labels
  p5.fill(150);
  p5.noStroke();
  p5.textAlign(p5.CENTER);
  p5.textSize(12);
  for (let i = 0; i < labels.length; i++) {
    p5.text(labels[i], i * stepX, chartHeight + 20);
  }

  p5.pop();
}

// ============================================
// PIE / DONUT CHART
// ============================================

const pieChartConfig = {
  data: [30, 25, 20, 15, 10],
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Other'],
  colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
  innerRadius: 0.5, // 0 for pie, 0.5+ for donut
  showLabels: true
};

let pieAnimProgress = 0;

function drawPieChart(p5, config = pieChartConfig) {
  const { data, labels, colors, innerRadius, showLabels } = config;

  pieAnimProgress = Math.min(pieAnimProgress + 0.02, 1);

  const total = data.reduce((a, b) => a + b, 0);
  const radius = Math.min(p5.width, p5.height) * 0.35;
  const innerR = radius * innerRadius;

  p5.push();
  p5.translate(p5.width / 2, p5.height / 2);

  let currentAngle = -p5.HALF_PI;
  const animAngle = p5.TWO_PI * easeOutQuart(pieAnimProgress);

  for (let i = 0; i < data.length; i++) {
    const sliceAngle = (data[i] / total) * p5.TWO_PI;
    const endAngle = Math.min(currentAngle + sliceAngle, -p5.HALF_PI + animAngle);

    if (endAngle > currentAngle) {
      p5.fill(colors[i % colors.length]);
      p5.noStroke();

      if (innerRadius > 0) {
        // Donut
        p5.beginShape();
        for (let a = currentAngle; a < endAngle; a += 0.05) {
          p5.vertex(p5.cos(a) * radius, p5.sin(a) * radius);
        }
        p5.vertex(p5.cos(endAngle) * radius, p5.sin(endAngle) * radius);
        for (let a = endAngle; a > currentAngle; a -= 0.05) {
          p5.vertex(p5.cos(a) * innerR, p5.sin(a) * innerR);
        }
        p5.vertex(p5.cos(currentAngle) * innerR, p5.sin(currentAngle) * innerR);
        p5.endShape(p5.CLOSE);
      } else {
        // Pie
        p5.arc(0, 0, radius * 2, radius * 2, currentAngle, endAngle, p5.PIE);
      }

      // Labels
      if (showLabels && pieAnimProgress > 0.5) {
        const midAngle = currentAngle + sliceAngle / 2;
        const labelRadius = radius * (innerRadius > 0 ? 0.75 : 0.65);
        const lx = p5.cos(midAngle) * labelRadius;
        const ly = p5.sin(midAngle) * labelRadius;

        p5.fill(255);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(12);
        p5.text(`${Math.round(data[i] / total * 100)}%`, lx, ly);
      }
    }

    currentAngle += sliceAngle;
  }

  // Center text for donut
  if (innerRadius > 0) {
    p5.fill(255);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(24);
    p5.text(total, 0, -10);
    p5.textSize(12);
    p5.fill(150);
    p5.text('Total', 0, 15);
  }

  p5.pop();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// ============================================
// STANDALONE SKETCH EXAMPLE
// ============================================

/*
function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(30);

  // Uncomment one:
  // drawBarChart(window);
  // drawLineChart(window);
  // drawPieChart(window);
}
*/
