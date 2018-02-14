import reddit from './reddit-api';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit' , (e)=>{
    // get search term
    const searchTerm = searchInput.value;

    //get sort by
    const sortBy = document.querySelector('input[name = "sortby"]:checked').value ;

    //get search limit
    const searchLimit = document.getElementById('limit').value ;

    // checking if search field is empty
    if(searchTerm.length === 0){
        message();
    }

    //clearing search field after submitting request
    searchInput.value = '';

    // calling reddit api
    reddit.search(searchTerm , searchLimit , sortBy)
        .then(results => {

             console.log(results);
             // result div
             let output = `<div class="card-columns mt-5">` ;

             //looping through the results

             results.forEach(post => {
                  // image url
                  const image = post.preview ? post.preview.images[0].source.url 
                            : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

                  // card div          
                  output += `<div class="card">
                            <img class="card-img-top" src=" ${image} " alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title"> ${post.title} </h5>
                                <p class="card-text"> ${truncate(post.selftext ,100)} </p>
                                <a href=" ${post.url} " target="_blank" class="btn btn-primary">Read More</a>
                                <hr>
                                <span class="badge badge-secondary">Subreddit: ${post.subreddit} </span>
                                <span class="badge badge-dark">Score: ${post.score} </span>
                            </div>
                            </div>` ;
             });

             output += '</div>' ;
             document.getElementById('results').innerHTML = output ;
        });
    
    e.preventDefault();
});


// message function
const message = ()=>{
    // displaying message
    const messageBox =  document.getElementById('message');
    messageBox.style.display = 'block';

    // hiding message
    setTimeout(()=>{
           messageBox.style.display = 'none';
    }, 3000);
}


// string truncate function
const truncate = (text , limit)=>{
    const spaceIndex = text.indexOf(' ' , limit); // finding index of space

    if(spaceIndex === -1){
        return text;
    }
    else{
        return text.substring(0 , spaceIndex);
    }
}