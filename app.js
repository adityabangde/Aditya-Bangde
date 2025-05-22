// Function to load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderTeam(data.team);
        renderBuiltWith(data.builtWith);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}


// Function to render team members
function renderTeam(teamData) {
    const teamContainer = document.querySelector('#app-team ul');
    if (!teamContainer) return;

    teamContainer.innerHTML = teamData.map(member => `
        <li class="software-team-member" itemprop="member">
            <div class="bubble">
                <p>${member.description}</p>
            </div>
            <div class="row">
                <div class="small-2 large-4 columns">
                    <figure>
                        <a class="user-profile-link" href="${member.profileUrl}">
                            <img alt="${member.name}"
                                 class="software-member-photo user-photo photo_image image-replacement profile-image"
                                 title="${member.name}"
                                 onerror="this.onerror=null;this.src='https://d2dmyh35ffsxbl.cloudfront.net/assets/defaults/no-avatar-100-b164b29ca37cbce6b6dbcf4d61d40ba7a3081dfd121a32e2a773eb8f018f0a1f.png';"
                                 src="${member.photoUrl}"
                                  />
                        </a>
                    </figure>
                </div>
                <div class="small-10 large-8 columns">
                    <a class="user-profile-link" href="${member.profileUrl}">${member.name}</a>
                    <span class="follow-button-wrapper" 
                          data-context="software-detail"
                          data-layout="condensed" 
                          data-follow-through-id="${member.followThroughId}">
                    </span>
                    <br>
                    <small>${member.role}</small>
                </div>
            </div>
        </li>
    `).join('');
}

// Function to render built with section
function renderBuiltWith(builtWithData) {
    const builtWithContainer = document.querySelector('#built-with ul');
    if (!builtWithContainer) return;

    builtWithContainer.innerHTML = builtWithData.map(tech => {
        if (tech.url) {
            return `
                <li>
                    <span class="cp-tag recognized-tag">
                        <a href="${tech.url}">${tech.name}</a>
                    </span>
                </li>
            `;
        } else {
            return `
                <li>
                    <span class="cp-tag">${tech.name}</span>
                </li>
            `;
        }
    }).join('');
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadData); 