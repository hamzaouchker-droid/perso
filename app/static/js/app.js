// === State ===
let currentStep = 1;
let cvAnalysis = null;
let jobOffers = [];

// === Step Navigation ===
function showStep(step) {
    // Hide all sections
    document.querySelectorAll('.step-section').forEach(s => s.classList.add('d-none'));

    // Show target section
    document.getElementById(`step-${step}`).classList.remove('d-none');

    // Update indicators
    for (let i = 1; i <= 4; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        indicator.classList.remove('active', 'completed');
        if (i < step) {
            indicator.classList.add('completed');
        } else if (i === step) {
            indicator.classList.add('active');
        }
    }

    // Update step lines
    document.querySelectorAll('.step-line').forEach((line, idx) => {
        line.classList.toggle('active', idx < step - 1);
    });

    currentStep = step;
}

// === Notifications ===
function showToast(title, message, isError = false) {
    const toast = document.getElementById('notification-toast');
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-body').textContent = message;
    toast.classList.toggle('bg-danger', isError);
    toast.classList.toggle('text-white', isError);
    new bootstrap.Toast(toast, { delay: 4000 }).show();
}

// === File Upload ===
const uploadZone = document.getElementById('upload-zone');
const cvInput = document.getElementById('cv-input');

uploadZone.addEventListener('click', () => cvInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        cvInput.files = e.dataTransfer.files;
        uploadFile(e.dataTransfer.files[0]);
    }
});

cvInput.addEventListener('change', () => {
    if (cvInput.files.length > 0) {
        uploadFile(cvInput.files[0]);
    }
});

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('cv_file', file);

    // Show loading state
    const uploadContent = uploadZone.querySelector('.upload-content');
    const originalHTML = uploadContent.innerHTML;
    uploadContent.innerHTML = `
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
        <p class="mt-3">Upload de ${file.name}...</p>
    `;

    try {
        const resp = await fetch('/upload', { method: 'POST', body: formData });
        const data = await resp.json();

        if (data.error) {
            showToast('Erreur', data.error, true);
            uploadContent.innerHTML = originalHTML;
            return;
        }

        // Show success
        const previewDiv = document.getElementById('profile-preview');
        const profile = data.profile;
        previewDiv.innerHTML = `
            <strong>${profile.name}</strong> | ${profile.email} | ${profile.phone}
        `;

        document.getElementById('upload-result').classList.remove('d-none');
        uploadZone.style.display = 'none';
        showToast('Succès', 'CV uploadé et analysé avec succès !');

    } catch (err) {
        showToast('Erreur', 'Erreur de connexion au serveur', true);
        uploadContent.innerHTML = originalHTML;
    }
}

// === CV Analysis ===
async function analyzeCV() {
    showStep(2);
    document.getElementById('analysis-loading').classList.remove('d-none');
    document.getElementById('analysis-result').classList.add('d-none');

    try {
        const resp = await fetch('/analyze', { method: 'POST' });
        const data = await resp.json();

        if (data.error) {
            showToast('Erreur', data.error, true);
            showStep(1);
            return;
        }

        cvAnalysis = data.analysis;
        displayAnalysis(cvAnalysis);

        document.getElementById('analysis-loading').classList.add('d-none');
        document.getElementById('analysis-result').classList.remove('d-none');
        showToast('Analyse terminée', 'Votre profil a été analysé avec succès');

    } catch (err) {
        showToast('Erreur', 'Erreur lors de l\'analyse', true);
        showStep(1);
    }
}

function displayAnalysis(analysis) {
    // Info details
    const infoDiv = document.getElementById('info-details');
    infoDiv.innerHTML = `
        <p class="mb-1"><strong>Nom:</strong> ${analysis.name || 'Non détecté'}</p>
        <p class="mb-1"><strong>Poste:</strong> ${analysis.job_title || 'Non détecté'}</p>
        <p class="mb-1"><strong>Expérience:</strong> ${analysis.experience_years || 0} ans</p>
        <p class="mb-1"><strong>Domaine:</strong> ${analysis.domain || 'Non détecté'}</p>
        <p class="mb-1"><strong>Formation:</strong> ${analysis.education || 'Non détecté'}</p>
        <p class="mb-0"><strong>Langues:</strong> ${(analysis.languages || []).join(', ') || 'Non détecté'}</p>
    `;

    // Skills
    const skillsDiv = document.getElementById('skills-tags');
    const skills = analysis.key_skills || [];
    skillsDiv.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

    // Summary
    document.getElementById('profile-summary').textContent = analysis.summary || 'Aucun résumé disponible';
}

// === Job Search ===
async function searchJobs() {
    showStep(3);
    document.getElementById('search-loading').classList.remove('d-none');
    document.getElementById('offers-list').classList.add('d-none');
    document.getElementById('offers-count').classList.add('d-none');

    const location = document.getElementById('location-input').value || 'Île-de-France';

    try {
        const resp = await fetch('/search-jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location }),
        });
        const data = await resp.json();

        if (data.error) {
            showToast('Erreur', data.error, true);
            showStep(2);
            return;
        }

        jobOffers = data.offers;
        displayOffers(jobOffers);

        document.getElementById('search-loading').classList.add('d-none');
        document.getElementById('offers-list').classList.remove('d-none');
        document.getElementById('offers-count').classList.remove('d-none');
        document.getElementById('back-to-analysis').classList.remove('d-none');
        document.getElementById('count-badge').textContent = `${data.count} offre(s) trouvée(s)`;

        showToast('Recherche terminée', `${data.count} offre(s) trouvée(s)`);

    } catch (err) {
        showToast('Erreur', 'Erreur lors de la recherche', true);
        showStep(2);
    }
}

function displayOffers(offers) {
    const listDiv = document.getElementById('offers-list');

    if (offers.length === 0) {
        listDiv.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-inbox display-4 text-muted"></i>
                <p class="mt-2 text-muted">Aucune offre trouvée. Essayez de modifier la localisation.</p>
            </div>
        `;
        return;
    }

    listDiv.innerHTML = offers.map((offer, idx) => {
        const sourceClass = offer.source.toLowerCase().includes('france')
            ? 'source-france-travail'
            : 'source-indeed';

        return `
            <div class="offer-card" onclick="selectOffer(${idx})">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <div class="offer-title">${escapeHtml(offer.title)}</div>
                        <div class="offer-company">
                            <i class="bi bi-building me-1"></i>${escapeHtml(offer.company)}
                        </div>
                        <div class="offer-location">
                            <i class="bi bi-geo-alt me-1"></i>${escapeHtml(offer.location)}
                            ${offer.contract_type ? `<span class="ms-2 badge bg-secondary">${escapeHtml(offer.contract_type)}</span>` : ''}
                        </div>
                        ${offer.description ? `<div class="offer-description">${escapeHtml(offer.description).substring(0, 200)}${offer.description.length > 200 ? '...' : ''}</div>` : ''}
                    </div>
                    <div class="text-end ms-3">
                        <span class="offer-source ${sourceClass}">${escapeHtml(offer.source)}</span>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); selectOffer(${idx})">
                                <i class="bi bi-magic me-1"></i>Générer
                            </button>
                        </div>
                        ${offer.url ? `<div class="mt-1"><a href="${escapeHtml(offer.url)}" target="_blank" class="btn btn-sm btn-outline-secondary" onclick="event.stopPropagation()"><i class="bi bi-box-arrow-up-right me-1"></i>Voir</a></div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// === Generate Documents ===
async function selectOffer(index) {
    const offer = jobOffers[index];
    showStep(4);
    document.getElementById('generate-loading').classList.remove('d-none');
    document.getElementById('generate-result').classList.add('d-none');

    try {
        const resp = await fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job_offer: offer }),
        });
        const data = await resp.json();

        if (data.error) {
            showToast('Erreur', data.error, true);
            showStep(3);
            return;
        }

        displayGeneratedDocs(data, offer);

        document.getElementById('generate-loading').classList.add('d-none');
        document.getElementById('generate-result').classList.remove('d-none');
        showToast('Documents générés', 'CV et lettre de motivation prêts !');

    } catch (err) {
        showToast('Erreur', 'Erreur lors de la génération', true);
        showStep(3);
    }
}

function displayGeneratedDocs(data, offer) {
    // Job info
    document.getElementById('selected-job-info').innerHTML = `
        <strong>${escapeHtml(offer.title)}</strong> chez <strong>${escapeHtml(offer.company)}</strong>
        <span class="ms-2 text-muted">${escapeHtml(offer.location)}</span>
    `;

    // CV content
    document.getElementById('cv-content').textContent = data.adapted_cv;

    // Cover letter content
    document.getElementById('letter-content').textContent = data.cover_letter;

    // Download links
    document.getElementById('cv-download').href = data.cv_pdf;
    document.getElementById('letter-download').href = data.letter_pdf;

    // Apply link
    const applyLink = document.getElementById('apply-link');
    if (data.job_url) {
        applyLink.href = data.job_url;
        applyLink.classList.remove('d-none');
    } else {
        applyLink.classList.add('d-none');
    }
}

// === Utility ===
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
