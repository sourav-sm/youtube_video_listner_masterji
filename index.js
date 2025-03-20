const API_URL = "https://api.freeapi.app/api/v1/public/youtube/videos";

    const videoGrid = document.getElementById('videoGrid');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    let allVideos = [];

    // Fetch videos from the API
    async function fetchVideos() {
      try {
        fetch('https://api.freeapi.app/api/v1/public/youtube/videos')
        .then(res=>res.json())
        .then(result=>{
            console.log('data is ',result);
            allVideos=result.data.data;
            displayVideos(allVideos);
         });
      } catch (error) {
        videoGrid.innerHTML = "<p style='color:red;text-align:center;'>Failed to fetch videos.</p>";
        console.error("Error fetching videos:", error);
      }
    }

    // Display video cards
    function displayVideos(videos) {
      console.log('videos are ',videos);
      videoGrid.innerHTML = "";

      if (videos.length === 0) {
        noResults.style.display = "block";
        return;
      } else {
        noResults.style.display = "none";
      }


      videos.map(video => {
        const card = document.createElement('div');
        card.className = "video-card";
        card.innerHTML = `
          <img src="${video.items.snippet.thumbnails.maxres.url}" alt="Video Thumbnail">
          <div class="video-info">
            <div class="video-title">${video.items.snippet.title}</div>
            <div class="channel-name">${video.items.snippet.channelTitle}</div>
          </div>
        `;
        const id=video.items.id;

        card.onclick = () => {
          window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
        };

        videoGrid.appendChild(card);
      });
    }

   

    // Initial load
    fetchVideos();