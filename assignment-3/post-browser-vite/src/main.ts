import './styles.css'
import { ModelManager } from './fetch.ts';

interface Comment {
    name: string;
    body: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const model:ModelManager = new ModelManager;
    (window as any).model = model;

    const postNumber = document.getElementById("post-number") as HTMLSpanElement;
    const titleElement = document.getElementById("post-title-display") as HTMLHeadingElement;
    const bodyElement = document.getElementById("post-body-display") as HTMLParagraphElement;
    const commentsContainer = document.getElementById("comments-container") as HTMLDivElement;
    const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
    const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
    const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;
    const viewCommentsBtn = document.getElementById("view-comments-btn") as HTMLButtonElement;
    const loader = document.getElementById("post-loader") as HTMLDivElement;
    const postTextContent = document.getElementById("post-text-content") as HTMLDivElement;

    // DOM element assertions
    console.assert(postNumber !== null, "postNumber element not found — check id='post-number'");
    console.assert(titleElement !== null, "titleElement not found — check id='post-title-display'");
    console.assert(bodyElement !== null, "bodyElement not found — check id='post-body-display'");
    console.assert(commentsContainer !== null, "commentsContainer not found — check id='comments-container'");
    console.assert(prevBtn !== null, "prevBtn not found — check id='prev-btn'");
    console.assert(nextBtn !== null, "nextBtn not found — check id='next-btn'");
    console.assert(refreshBtn !== null, "refreshBtn not found — check id='refresh-btn'");
    console.assert(viewCommentsBtn !== null, "viewCommentsBtn not found — check id='view-comments-btn'");
    console.assert(loader !== null, "loader not found — check id='post-loader'");
    console.assert(postTextContent !== null, "postTextContent not found — check id='post-text-content'");


    const TOTAL_POSTS = 10;
    let currentId = 1;

    async function loadPost(id: number) {
        loader.style.display = "flex";
        postTextContent.style.visibility = "hidden";
        commentsContainer.innerHTML = "";

        // pre conditions
        console.assert(loader.style.display === "flex", "loader should be visible before fetch");
        console.assert(postTextContent.style.visibility === "hidden", "content should be hidden before fetch");

        try {
            const post = await model.fetchPost(id);
            postNumber.textContent = String(id);
            titleElement.textContent = post.title;
            bodyElement.textContent = post.body;

            // post conditions
            console.assert(postNumber.textContent === String(id), "post number should match current id");
            console.assert(titleElement.textContent === post.title, "title should be populated");
            console.assert(bodyElement.textContent === post.body, "body should be populated");
            console.assert(titleElement.textContent !== "", "title should not be empty");
            console.assert(bodyElement.textContent !== "", "body should not be empty");

            prevBtn.disabled = id === 1;
            nextBtn.disabled = id === TOTAL_POSTS;
        } catch (err) {
            titleElement.textContent = "Error loading post";
            bodyElement.textContent = String(err);
        } finally {
            loader.style.display = "none";
            postTextContent.style.visibility = "visible";

            // post conditions
            console.assert(loader.style.display === "none", "loader should be hidden after fetch");
            console.assert(postTextContent.style.visibility === "visible", "content should be visible after fetch");
        }
    }

    prevBtn.addEventListener("click", () => {
        if (currentId > 1) {
            loadPost(--currentId); 
            updateButtons();
        }
    });
    nextBtn.addEventListener("click", () => {
        if (currentId < TOTAL_POSTS) {
            loadPost(++currentId);
            updateButtons();
        }
    });
    refreshBtn.addEventListener("click", () => loadPost(currentId));

    viewCommentsBtn.addEventListener("click", async () => {
        commentsContainer.innerHTML = "";
        try {
            const comments = await model.fetchComments(String(currentId));
            comments.forEach((comment: Comment) => {
                const div = document.createElement("div");
                div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
                commentsContainer.appendChild(div);
            });
        } catch (err) {
            commentsContainer.textContent = "Error loading comments: " + err;
        }
    });

    function updateButtons() {
        prevBtn.disabled = currentId === 1;
        nextBtn.disabled = currentId === TOTAL_POSTS;

        if(currentId === 1) {
            prevBtn.classList.add("disabled");
        } else {
            prevBtn.classList.remove("disabled");
        }

        if(currentId === TOTAL_POSTS) {
            nextBtn.classList.add("disabled");
        } else {
            nextBtn.classList.remove("disabled");
        }
    }

    updateButtons();
    loadPost(currentId);
});


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div id="app">
    <div id="background"></div>
    <header>
        <h1>Post <span>Browser</span></h1>
    </header>
    <main id="post-container">
        <article class="card">
            <div class="post-content-wrapper">
            <span class="post-id" id="post-id-display">Post #<span id="post-number"></span> of 10</span>
            <div class="post-text-area" id="post-text-area">
                <div class="overlay-loader" id="post-loader" style="display: none;">
                <div class="loader"></div>
                </div>
                <div id="post-text-content" style="visibility: visible;">
                <h2 class="post-title" id="post-title-display"></h2>
                <p class="post-body" id="post-body-display"></p>
                </div>
            </div>
            
            <div class="actions" id="post-actions">
            <button class="btn btn-secondary" id="refresh-btn">
                <span>🔄</span> Refresh
            </button>
            <button class="btn btn-primary" id="view-comments-btn">View Comments</button>
            </div>
                <div id="comments-container"></div>
                </div>

                <div class="nav-controls" id="nav-controls">
            <button class="btn btn-secondary" id="prev-btn" disabled="">
                <span>←</span> Previous
            </button>
            <button class="btn btn-secondary" id="next-btn">
                Next <span>→</span>
            </button>
        </div>
    </article>
  </main>
  <footer>
    <p>© 2026 Post Browser</p>
  </footer>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`
