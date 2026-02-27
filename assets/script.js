document.addEventListener('DOMContentLoaded', () => {
    console.log('Swiggy Clone Script Loaded');

    // --- Data Mock ---
    const mindCategories = [
        { name: 'Biryani', img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60' },
        { name: 'Pizza', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60' },
        { name: 'Burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60' },
        { name: 'North Indian', img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60' },
        { name: 'South Indian', img: 'https://images.unsplash.com/photo-1596450523773-f1122a2810a0?w=500&auto=format&fit=crop&q=60' },
        { name: 'Chinese', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60' },
        { name: 'Cake', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60' },
        { name: 'Rolls', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60' },
    ];

    const restaurants = [
        {
            name: "Meghana Foods",
            rating: "4.4",
            time: "30-35 mins",
            cuisine: "Biryani, Andhra, South Indian",
            location: "Koramangala",
            offer: "50% OFF UPTO ₹100",
            img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "Truffles",
            rating: "4.5",
            time: "25-30 mins",
            cuisine: "American, Continental, Desserts",
            location: "St. Marks Road",
            offer: "20% OFF",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "Empire Restaurant",
            rating: "4.1",
            time: "40-45 mins",
            cuisine: "North Indian, Mughlai, Chinese",
            location: "Church Street",
            offer: "ITEMS AT ₹129",
            img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "Kannur Food Point",
            rating: "3.9",
            time: "35-40 mins",
            cuisine: "Kerala, Chinese",
            location: "BTM Layout",
            offer: "60% OFF UPTO ₹120",
            img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "Leon's - Burgers & Wings",
            rating: "4.3",
            time: "20-25 mins",
            cuisine: "American, Fast Food",
            location: "Indiranagar",
            offer: "₹150 OFF ABOVE ₹399",
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "Pizza Hut",
            rating: "3.7",
            time: "30-40 mins",
            cuisine: "Pizzas",
            location: "Koramangala",
            offer: "ITEMS AT ₹179",
            img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "Corner House Ice Cream",
            rating: "4.7",
            time: "15-20 mins",
            cuisine: "Ice Cream, Desserts",
            location: "Residency Road",
            offer: "",
            img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60"
        },
        {
            name: "KFC",
            rating: "4.0",
            time: "25-30 mins",
            cuisine: "Burgers, Biryani, American",
            location: "MG Road",
            offer: "20% OFF",
            img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60"
        }
    ];

    // --- Render Functions ---

    function renderMindCategories() {
        const carousel = document.getElementById('mindCarousel');
        carousel.innerHTML = mindCategories.map(cat => `
            <div class="mind-item">
                <img src="${cat.img}" alt="${cat.name}">
                <!-- Swiggy images often have text nicely integrated, but we rely on alt/title if needed, 
                     here the images from Swiggy CDN already have the food cutouts. 
                     We can add a label if we want, but Swiggy 'mind' section is usually just the image bubbles. -->
            </div>
        `).join('');
    }

    function renderRestaurants() {
        const grid = document.getElementById('restaurantGrid');
        grid.innerHTML = restaurants.map(res => `
            <div class="restaurant-card">
                <div class="card-img-container">
                    <img src="${res.img}" alt="${res.name}" class="card-img">
                    <div class="offer-tag">${res.offer}</div>
                </div>
                <div class="card-info">
                    <div class="res-name">${res.name}</div>
                    <div class="res-rating-time">
                        <span class="rating-icon">
                            <i class="fa-solid fa-star"></i>
                        </span>
                        <span>${res.rating} • ${res.time}</span>
                    </div>
                    <div class="res-cuisine">${res.cuisine}</div>
                    <div class="res-location">${res.location}</div>
                </div>
            </div>
        `).join('');
    }

    // --- Init ---
    renderMindCategories();
    // renderRestaurants(); // Replaced by dynamic render in bottom logic

    // --- Scroll Buttons Logic ---
    function setupCarousel(carouselId, sectionClass) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const section = carousel.closest(sectionClass);
        if (!section) return;

        const prevBtn = section.querySelector('.prev-btn');
        const nextBtn = section.querySelector('.next-btn');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -300, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    }

    setupCarousel('mindCarousel', '.mind-section');
    setupCarousel('chainsCarousel', '.top-chains-section');
    // Note: ensure chainsCarousel ID exists in HTML, I noticed I might have missed populating chains data.




    // --- Chains Mock Data & Render ---
    const chainsResults = [
        { name: 'Dominos Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60' },
        { name: 'KFC', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60' },
        { name: 'Burger King', img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60' },
        { name: 'Subway', img: 'https://images.unsplash.com/photo-1621800043295-a73fe2f76e2c?w=500&auto=format&fit=crop&q=60' },
        { name: 'McDonalds', img: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?w=500&auto=format&fit=crop&q=60' },
        { name: 'Pizza Hut', img: 'https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?w=500&auto=format&fit=crop&q=60' }
    ];

    function renderChains() {
        const carousel = document.getElementById('chainsCarousel');
        if (!carousel) return;
        carousel.innerHTML = chainsResults.map(chain => `
            <div class="restaurant-card" style="min-width: 250px;">
                <div class="card-img-container" style="height: 160px;">
                    <img src="${chain.img}" alt="${chain.name}" class="card-img">
                </div>
                <div class="card-info">
                    <div class="res-name">${chain.name}</div>
                    <div class="res-rating-time">
                        <span class="rating-icon" style="background:green;">
                             <i class="fa-solid fa-star"></i> 4.2
                        </span>
                        <span> • 25 mins</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    renderChains();


    // --- Sticky Header Logic ---
    // Hide header on scroll down, show on scroll up (common pattern) or just shadow?
    // Let's implement simple "shadow on scroll" if not at top.
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.style.boxShadow = "0 15px 40px -20px rgba(40, 44, 63, .15)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    // --- Search Filter Logic (Simple) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            this.classList.add('active');

            // For demo: if 'Ratings 4.0+' clicked, filter list
            if (this.textContent.includes('Ratings 4.0+')) {
                const filtered = restaurants.filter(r => parseFloat(r.rating) >= 4.0);
                // Re-render (we'd need to modify renderRestaurants to accept data, 
                // but let's just quick hack it for the demo or refactor renderRestaurants)
                renderRestaurantsWithData(filtered);
            } else if (this.textContent.includes('Fast Delivery')) {
                const filtered = restaurants.filter(r => parseInt(r.time) <= 30);
                renderRestaurantsWithData(filtered);
            } else {
                // Reset
                renderRestaurantsWithData(restaurants);
            }
        });
    });

    function renderRestaurantsWithData(data) {
        const grid = document.getElementById('restaurantGrid');
        grid.innerHTML = data.map(res => `
             <div class="restaurant-card">
                <div class="card-img-container">
                    <img src="${res.img}" alt="${res.name}" class="card-img">
                    <div class="offer-tag">${res.offer}</div>
                </div>
                <div class="card-info">
                    <div class="res-name">${res.name}</div>
                    <div class="res-rating-time">
                        <span class="rating-icon">
                            <i class="fa-solid fa-star"></i>
                        </span>
                        <span>${res.rating} • ${res.time}</span>
                    </div>
                    <div class="res-cuisine">${res.cuisine}</div>
                    <div class="res-location">${res.location}</div>
                </div>
            </div>
        `).join('');
    }

    // Initial Render
    renderRestaurantsWithData(restaurants);

});
