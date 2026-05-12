// ========== SAMPLE JOBS DATA ==========
let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    category: "Technology",
    type: "Full-time",
    location: "San Francisco, CA",
    salary: "$90k - $120k",
    description: "Looking for a React developer to join our frontend team. You'll build modern web applications.",
    logo: "💻"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    category: "Design",
    type: "Remote",
    location: "Remote",
    salary: "$75k - $95k",
    description: "Seeking a creative designer to craft beautiful user experiences for our clients.",
    logo: "🎨"
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Growth Co",
    category: "Marketing",
    type: "Full-time",
    location: "New York, NY",
    salary: "$80k - $110k",
    description: "Lead our marketing campaigns and digital strategy.",
    logo: "📢"
  },
  {
    id: 4,
    title: "Financial Analyst",
    company: "Capital Group",
    category: "Finance",
    type: "Full-time",
    location: "Chicago, IL",
    salary: "$70k - $90k",
    description: "Analyze financial data and support investment decisions.",
    logo: "💰"
  },
  {
    id: 5,
    title: "Sales Executive",
    company: "SalesForce Inc",
    category: "Sales",
    type: "Full-time",
    location: "Austin, TX",
    salary: "$60k + Commission",
    description: "Drive new business and manage client relationships.",
    logo: "🤝"
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "Cloud Systems",
    category: "Technology",
    type: "Remote",
    location: "Remote",
    salary: "$110k - $140k",
    description: "Build scalable APIs using Node.js and Python.",
    logo: "☁️"
  },
  {
    id: 7,
    title: "Product Manager",
    company: "Innovate Labs",
    category: "Technology",
    type: "Full-time",
    location: "Seattle, WA",
    salary: "$130k - $160k",
    description: "Lead product development from concept to launch.",
    logo: "📱"
  },
  {
    id: 8,
    title: "Graphic Designer",
    company: "Pixel Perfect",
    category: "Design",
    type: "Part-time",
    location: "Los Angeles, CA",
    salary: "$45k - $60k",
    description: "Create engaging visuals for digital and print media.",
    logo: "✏️"
  }
];

let nextJobId = 9;

// Load applications from localStorage
let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];

// Current job being applied to
let currentJob = null;

// DOM Elements
const jobsTab = document.getElementById('jobsTab');
const applicationsTab = document.getElementById('applicationsTab');
const postTab = document.getElementById('postTab');
const jobsList = document.getElementById('jobsList');
const applicationsList = document.getElementById('applicationsList');
const jobCountSpan = document.getElementById('jobCount');
const noJobsMsg = document.getElementById('noJobsMsg');
const noAppsMsg = document.getElementById('noAppsMsg');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const resetBtn = document.getElementById('resetBtn');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const applyModal = document.getElementById('applyModal');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

// ========== UTILITIES ==========
function showToast(message, isError = false) {
  toast.classList.remove('hidden');
  toastMsg.textContent = message;
  toast.style.background = isError ? '#ef4444' : '#10b981';
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

function saveApplications() {
  localStorage.setItem('jobApplications', JSON.stringify(applications));
}

// ========== RENDER JOBS ==========
function renderJobs() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const type = typeFilter.value;
  
  let filtered = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm) ||
                        job.company.toLowerCase().includes(searchTerm);
    const matchCategory = !category || job.category === category;
    const matchType = !type || job.type === type;
    return matchSearch && matchCategory && matchType;
  });
  
  jobCountSpan.textContent = filtered.length;
  
  if (filtered.length === 0) {
    noJobsMsg.classList.remove('hidden');
    jobsList.classList.add('hidden');
  } else {
    noJobsMsg.classList.add('hidden');
    jobsList.classList.remove('hidden');
  }
  
  jobsList.innerHTML = filtered.map(job => `
    <div class="job-card" data-id="${job.id}">
      <div class="job-header">
        <div class="job-icon">${job.logo || '🏢'}</div>
        <div class="job-info">
          <h3>${job.title}</h3>
          <div class="company">${job.company}</div>
        </div>
      </div>
      <div class="job-tags">
        <span class="tag">${job.category}</span>
        <span class="tag tag-tech">${job.type}</span>
      </div>
      <div class="job-location">
        <i class="fas fa-map-marker-alt"></i> ${job.location}
      </div>
      ${job.salary ? `<div class="job-location"><i class="fas fa-dollar-sign"></i> ${job.salary}</div>` : ''}
      <button class="apply-btn" data-id="${job.id}">Apply Now</button>
    </div>
  `).join('');
  
  // Add apply button listeners
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = parseInt(btn.dataset.id);
      openApplyModal(jobId);
    });
  });
  
  // Add card click for details
  document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('apply-btn')) {
        const jobId = parseInt(card.dataset.id);
        showJobDetails(jobId);
      }
    });
  });
}

function showJobDetails(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (job) {
    alert(`📋 ${job.title} at ${job.company}\n\n${job.description}\n\n📍 ${job.location}\n💰 ${job.salary || 'Negotiable'}`);
  }
}

// ========== APPLY MODAL ==========
function openApplyModal(jobId) {
  currentJob = jobs.find(j => j.id === jobId);
  if (!currentJob) return;
  
  document.getElementById('modalJobInfo').innerHTML = `
    <strong>${currentJob.title}</strong><br>
    ${currentJob.company} • ${currentJob.location}<br>
    ${currentJob.type}
  `;
  document.getElementById('applicantName').value = '';
  document.getElementById('applicantEmail').value = '';
  document.getElementById('coverLetter').value = '';
  applyModal.classList.add('show');
}

// Submit application
document.getElementById('applyForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentJob) return;
  
  const application = {
    id: Date.now(),
    jobId: currentJob.id,
    jobTitle: currentJob.title,
    company: currentJob.company,
    location: currentJob.location,
    applicantName: document.getElementById('applicantName').value,
    applicantEmail: document.getElementById('applicantEmail').value,
    coverLetter: document.getElementById('coverLetter').value,
    appliedDate: new Date().toLocaleDateString()
  };
  
  applications.unshift(application);
  saveApplications();
  showToast(`Applied to ${currentJob.title}!`);
  applyModal.classList.remove('show');
  renderApplications();
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
  applyModal.classList.remove('show');
});
applyModal.addEventListener('click', (e) => {
  if (e.target === applyModal) applyModal.classList.remove('show');
});

// ========== RENDER APPLICATIONS ==========
function renderApplications() {
  if (applications.length === 0) {
    noAppsMsg.classList.remove('hidden');
    applicationsList.classList.add('hidden');
  } else {
    noAppsMsg.classList.add('hidden');
    applicationsList.classList.remove('hidden');
    applicationsList.innerHTML = applications.map(app => `
      <div class="application-card">
        <div class="application-info">
          <h4>${app.jobTitle}</h4>
          <p>${app.company} • ${app.location}</p>
          <div class="applied-date">Applied: ${app.appliedDate}</div>
        </div>
        <span class="status">Applied</span>
      </div>
    `).join('');
  }
}

// ========== POST JOB ==========
document.getElementById('postJobForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newJob = {
    id: nextJobId++,
    title: document.getElementById('jobTitle').value,
    company: document.getElementById('company').value,
    category: document.getElementById('jobCategory').value,
    type: document.getElementById('jobType').value,
    location: document.getElementById('location').value,
    salary: document.getElementById('salary').value || "Negotiable",
    description: document.getElementById('description').value,
    logo: "🏢"
  };
  
  jobs.unshift(newJob);
  renderJobs();
  document.getElementById('postJobForm').reset();
  showToast("Job posted successfully!");
  
  // Switch to jobs tab
  switchTab('jobs');
});

// ========== FILTERS ==========
function resetFilters() {
  searchInput.value = '';
  categoryFilter.value = '';
  typeFilter.value = '';
  renderJobs();
}

searchInput.addEventListener('input', renderJobs);
categoryFilter.addEventListener('change', renderJobs);
typeFilter.addEventListener('change', renderJobs);
resetBtn.addEventListener('click', resetFilters);
clearFiltersBtn?.addEventListener('click', resetFilters);

// ========== TAB NAVIGATION ==========
function switchTab(tabName) {
  // Hide all tabs
  jobsTab.classList.remove('active');
  applicationsTab.classList.remove('active');
  postTab.classList.remove('active');
  
  // Show selected tab
  if (tabName === 'jobs') jobsTab.classList.add('active');
  else if (tabName === 'applications') applicationsTab.classList.add('active');
  else if (tabName === 'post') postTab.classList.add('active');
  
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) btn.classList.add('active');
  });
  
  // Refresh data
  if (tabName === 'jobs') renderJobs();
  else if (tabName === 'applications') renderApplications();
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// ========== INITIAL RENDER ==========
renderJobs();
renderApplications();