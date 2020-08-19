 const searchBox = document.getElementById('searchBox') ;
 const result= document.getElementById('show_result') ;
 const singleLyric = document.getElementById('lyrics') ;
 
 
 //Search by song or artist event handler
    function searchSong(){

      const songName = document.getElementById('input_box').value ;

       if(!songName){
           alert ('No search item entered') ;
        } else {

           fetch(`https://api.lyrics.ovh/suggest/`+songName)
           .then(response => response.json())
           .then(data => {
              showData(data)
        })
    }
 }

 //Show songs name and artists
    function showData(search){
        let output = '' ;
    
       for(let i=0 ; i<10 ;i++){
           let title = search.data[i].title ;
           let artistName = search.data[i].artist.name ;
        
        output += `
            <div class="single-result row align-items-center my-3 p-3">
             <div class="col-md-9">
               <h3 class="lyrics-name">${title}</h3>
                 <p class="author lead">Album by <span>${artistName}</span></p>
             </div>
             <div class="col-md-3 text-md-right text-center">
               <button id="get_lyrics" class="btn btn-success" data-artist="${artistName}" data-songtitle="${title}">Get Lyrics</button>
            </div>
         </div>`
       

        result.innerHTML  = `
          <div class="search-result col-md-8 mx-auto py-4">
             ${output}
          </div> ` ;
       }
    }


 //Get Lyrics button click event handler
    result.addEventListener('click' , function(){
        const getLyrics = document.getElementById('get_lyrics');

         const artist = getLyrics.getAttribute('data-artist') ;
         const songTitle = getLyrics.getAttribute('data-songtitle') ;

         showLyrics(artist , songTitle) ;
      })


 //Showing lyrics
 async function showLyrics(artist , songTitle){
   const response =await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`) ;

    const data =await response.json() ;

     const lyrics = data.lyrics ;
  
       singleLyric.innerHTML = `
        
          <button id="goBack" class="text-white btn go-back" onclick="goBack()">&lsaquo; Go Back</button>
            <h2 class="text-success">${artist} - ${songTitle}</h2>
            <pre class="lyric text-white"> ${lyrics} </pre>
        ` ;
        result.style.display = "none" ;
   }

   //GoBack Button function
   function goBack() {
      result.style.display = "block";
      singleLyric.innerHTML = "";
  }