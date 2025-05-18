// Load blog posts from JSON
function loadBlogPosts(filter = {}) {
    fetch('data/blog-posts.json')
        .then(response => response.json())
        .then(posts => {
            let filteredPosts = posts;
            
            // Apply filters if any
            if (filter.category) {
                filteredPosts = filteredPosts.filter(post => 
                    post.category.toLowerCase() === filter.category.toLowerCase()
                );
            }
            
            if (filter.tag) {
                filteredPosts = filteredPosts.filter(post => 
                    post.tags.some(tag => tag.toLowerCase() === filter.tag.toLowerCase())
                );
            }
            
            if (filter.search) {
                const searchTerm = filter.search.toLowerCase();
                filteredPosts = filteredPosts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm) || 
                    post.content.toLowerCase().includes(searchTerm) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
            }
            
            renderBlogPosts(filteredPosts);
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-posts-container').innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">Error loading blog posts. Please try again later.</div>
                </div>
            `;
        });
}

// Render blog posts to the DOM
function renderBlogPosts(posts) {
    const container = document.getElementById('blog-posts-container');
    
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">No blog posts found matching your criteria.</div>
            </div>
        `;
        return;
    }
    
    let html = '';
    posts.forEach(post => {
        html += `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                <div class="card blog-card h-100">
                    <img src="${post.image}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="badge bg-primary">${post.category}</span>
                            <small class="text-muted">${post.date}</small>
                        </div>
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.excerpt}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <a href="blog-single.html?id=${post.id}" class="btn btn-sm btn-outline-primary">Read More</a>
                        <small class="float-end text-muted">
                            <i class="fas fa-comment"></i> ${post.comments}
                        </small>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Check URL for filters on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = {};
    
    if (urlParams.has('category')) {
        filters.category = urlParams.get('category');
    }
    
    if (urlParams.has('tag')) {
        filters.tag = urlParams.get('tag');
    }
    
    if (urlParams.has('search')) {
        filters.search = urlParams.get('search');
    }
    
    loadBlogPosts(filters);
    
    // Handle search form submission
    document.getElementById('blog-search-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input').value.trim();
        if (searchTerm) {
            window.location.href = `blog.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
});