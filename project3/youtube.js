document.addEventListener('DOMContentLoaded', () => {
    const categoryBar = document.getElementById('categoryBar');
    const videoGrid = document.getElementById('videoGrid');
    const nov=document.getElementById('novedio');
   // const apiBaseUrl = 'https://openapi.programming-hero.com/api/videos';

    // Function to fetch categories from the API
      fetchCategories= async()=> {
        try {
            const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
            const data = await response.json();
            const categories = data.data;
           
            // Create an "All" category button
            // createCategoryButton('All', 'all');
            
            // Create buttons for each category fetched from the API
            categories.forEach(category => {
                createCategoryButton(category.category, category.category_id);
               
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    // Function to create category buttons
    createCategoryButton=(name, id) =>{
        const button = document.createElement('button');
        button.classList.add('category-btn');
        if (name == 'All') {
            button.classList.add('active');
        }
        button.textContent = name;
        button.dataset.id = id;
        categoryBar.appendChild(button);

        // Add event listener to the button
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            fetchVideosByCategory(id);
        });
    }

    // Function to fetch videos by category
    async function fetchVideosByCategory(categoryId) {
        try {
            let url;
            if (categoryId === 'all') {
                url = `https://openapi.programming-hero.com/api/videos/category/1000`; // Fetch all videos, modify if needed
            } else {
                url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.data.length);
            if(data.data.length===0){
               videoGrid.innerHTML = '';
               
                const novedio = document.createElement('div');
                novedio.classList.add('novedio');
                novedio.innerHTML=`
                <img class="icon" src="./Icon.png" alt="">
               <p class="n">Oops!! Sorry, There is no content here</p>`;
               videoGrid.appendChild(novedio);
                return;
            }else{
                displayVideos(data.data);
            }
            
        } catch (error) {
            console.error('Error fetching videos:', error);
           
        }
    }

    // Function to display videos
    function displayVideos(videoList) {
        videoGrid.innerHTML = '';
       // videoGrid.classList.add('video-grid')// Clear existing videos
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('video-grid');
        videoList.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            
                      
            videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="time-overlay">
                    ${video.others.posted_date !== "" ? `${Math.floor(video.others.posted_date / 3600)} hours ${Math.floor((video.others.posted_date % 3600) / 60)} minutes ago` : ""}
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="author">
                    <img src="${video.authors[0].profile_picture}" alt="${video.authors[0].profile_name}">
                    <p>
                        ${video.authors[0].profile_name} 
                        ${video.authors[0].verified ? '<img src="./v.png" alt="Verified">' : ''}
                    </p>
                </div>
                <p>${video.others.views} views</p>
            </div>
        `;
        parentDiv .appendChild(videoCard);
        
        });
        videoGrid.appendChild(parentDiv);
    }
 
    // Initial fetch of categories and videos
    fetchCategories();
    fetchVideosByCategory('all');
     sortVideos = async () => 
        {
        
                try { 
                      
                    const url = `https://openapi.programming-hero.com/api/videos/category/1000`;
                    const res = await fetch(url);
                    const videos = await res.json();
                   const vedios= videos.data;
                  vedios.sort((a,b)=>{
                    let viewsA = parseFloat(a.others.views);
                    let viewsB = parseFloat(b.others.views);
                    return viewsB - viewsA;
                         
                     });
                    
                     displayVideos(vedios);
                    
                } catch (error) {
                    console.error('Error fetching videos:', error);
                }
            };
       
        blog=()=>{
            document.getElementById('blog').addEventListener('click', function() {
                window.location.href = './seocmd.html';
            });
        }

        });